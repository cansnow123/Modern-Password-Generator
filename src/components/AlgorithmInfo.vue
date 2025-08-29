<template>
  <div class="algorithm-info">
    <!-- 算法说明标题 -->
    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
      {{ $t('algorithmInfo.title') }}
    </h3>
    
    <!-- 算法列表 -->
    <div class="space-y-4">
      <div 
        v-for="(algorithm, key) in algorithms" 
        :key="key"
        class="algorithm-card p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20': selectedAlgorithm === key }"
      >
        <!-- 算法名称和安全级别 -->
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-medium text-gray-800 dark:text-gray-200">
            {{ $t('locale') === 'zh' ? algorithm.name : algorithm.nameEn }}
          </h4>
          <span 
            class="px-2 py-1 text-xs rounded-full"
            :class="getSecurityBadgeClass(algorithm.security)"
          >
            {{ $t('security.' + algorithm.security) }}
          </span>
        </div>
        
        <!-- 算法描述 -->
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {{ $t('locale') === 'zh' ? algorithm.description : algorithm.descriptionEn }}
        </p>
        
        <!-- 算法特性 -->
        <div class="flex items-center space-x-4 text-xs">
          <span 
            class="flex items-center"
            :class="algorithm.deterministic ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'"
          >
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path v-if="algorithm.deterministic" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            {{ algorithm.deterministic ? $t('algorithmInfo.deterministic') : $t('algorithmInfo.random') }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- 安全建议 -->
    <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <h4 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
        {{ $t('algorithmInfo.securityTips.title') }}
      </h4>
      <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
        <li v-for="tip in securityTips" :key="tip">
          • {{ tip }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { algorithms } from '../utils/passwordAlgorithms.js'
import zh from '../locales/zh.js'
import en from '../locales/en.js'

export default {
  name: 'AlgorithmInfo',
  props: {
    selectedAlgorithm: {
      type: String,
      default: 'sha512-salt'
    }
  },
  setup() {
    const { locale } = useI18n()
    
    /**
     * 获取安全建议列表
     * Get security tips list
     * @returns {Array} 安全建议数组
     */
    const securityTips = computed(() => {
      const currentLocale = locale.value
      if (currentLocale === 'zh') {
        return zh.algorithmInfo.securityTips.items
      } else {
        return en.algorithmInfo.securityTips.items
      }
    })
    
    /**
     * 获取安全级别徽章样式
     * Get security level badge class
     * @param {string} security - 安全级别
     * @returns {string} CSS类名
     */
    const getSecurityBadgeClass = (security) => {
      const classes = {
        'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        'high': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        'very-high': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      }
      return classes[security] || classes.medium
    }
    
    return {
      algorithms,
      securityTips,
      getSecurityBadgeClass
    }
  }
}
</script>

<style scoped>
.algorithm-card {
  transition: all 0.2s ease-in-out;
}

.algorithm-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .algorithm-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>