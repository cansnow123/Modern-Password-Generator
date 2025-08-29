<template>
  <div class="password-strength-container">
    <!-- 总体强度显示 -->
    <div class="strength-overview mb-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {{ $t('passwordStrength.title') }}
        </h3>
        <div class="flex items-center space-x-2">
          <span :class="getStrengthColor(strengthData.level)" class="font-bold">
            {{ $t(`passwordStrength.levels.${strengthData.level}`) }}
          </span>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            ({{ strengthData.score }}/100)
          </span>
        </div>
      </div>
      
      <!-- 强度进度条 -->
      <div class="strength-bar-container">
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
          <div 
            :class="getStrengthBgColor(strengthData.level)"
            class="h-3 rounded-full transition-all duration-500 ease-out"
            :style="{ width: strengthData.percentage + '%' }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{{ $t('passwordStrength.levels.very-weak') }}</span>
          <span>{{ $t('passwordStrength.levels.weak') }}</span>
          <span>{{ $t('passwordStrength.levels.fair') }}</span>
          <span>{{ $t('passwordStrength.levels.good') }}</span>
          <span>{{ $t('passwordStrength.levels.strong') }}</span>
        </div>
      </div>
    </div>

    <!-- 详细分析 -->
    <div class="strength-details" v-if="showDetails">
      <h4 class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
        {{ $t('passwordStrength.detailsTitle') }}
      </h4>
      
      <div class="space-y-3">
        <!-- 长度分析 -->
        <div class="detail-item">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i :class="strengthData.details.length.passed ? 'text-green-500' : 'text-red-500'" 
                 class="fas fa-ruler-horizontal"></i>
              <span class="font-medium">{{ $t('passwordStrength.criteria.length') }}</span>
              <span class="text-sm text-gray-500">({{ strengthData.details.length.value }})</span>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="strengthData.details.length.passed ? 'text-green-600' : 'text-red-600'" 
                    class="text-sm font-medium">
                {{ strengthData.details.length.score }}/100
              </span>
              <i :class="strengthData.details.length.passed ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500'"></i>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6">
            {{ $t(`passwordStrength.messages.${strengthData.details.length.message}`) }}
          </p>
        </div>

        <!-- 字符多样性分析 -->
        <div class="detail-item">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i :class="strengthData.details.variety.passed ? 'text-green-500' : 'text-red-500'" 
                 class="fas fa-palette"></i>
              <span class="font-medium">{{ $t('passwordStrength.criteria.variety') }}</span>
              <span class="text-sm text-gray-500">({{ strengthData.details.variety.details.count }}/4)</span>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="strengthData.details.variety.passed ? 'text-green-600' : 'text-red-600'" 
                    class="text-sm font-medium">
                {{ strengthData.details.variety.score }}/100
              </span>
              <i :class="strengthData.details.variety.passed ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500'"></i>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6">
            {{ $t(`passwordStrength.messages.${strengthData.details.variety.message}`) }}
          </p>
          <!-- 字符类型指示器 -->
          <div class="flex space-x-2 mt-2 ml-6">
            <span :class="strengthData.details.variety.details.hasLower ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'" 
                  class="px-2 py-1 rounded text-xs">
              {{ $t('passwordStrength.charTypes.lowercase') }}
            </span>
            <span :class="strengthData.details.variety.details.hasUpper ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'" 
                  class="px-2 py-1 rounded text-xs">
              {{ $t('passwordStrength.charTypes.uppercase') }}
            </span>
            <span :class="strengthData.details.variety.details.hasDigits ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'" 
                  class="px-2 py-1 rounded text-xs">
              {{ $t('passwordStrength.charTypes.numbers') }}
            </span>
            <span :class="strengthData.details.variety.details.hasSpecial ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'" 
                  class="px-2 py-1 rounded text-xs">
              {{ $t('passwordStrength.charTypes.special') }}
            </span>
          </div>
        </div>

        <!-- 常见密码检查 -->
        <div class="detail-item">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i :class="strengthData.details.common.passed ? 'text-green-500' : 'text-red-500'" 
                 class="fas fa-shield-alt"></i>
              <span class="font-medium">{{ $t('passwordStrength.criteria.common') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="strengthData.details.common.passed ? 'text-green-600' : 'text-red-600'" 
                    class="text-sm font-medium">
                {{ strengthData.details.common.score }}/100
              </span>
              <i :class="strengthData.details.common.passed ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500'"></i>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6">
            {{ $t(`passwordStrength.messages.${strengthData.details.common.message}`) }}
          </p>
        </div>

        <!-- 键盘模式检查 -->
        <div class="detail-item">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i :class="strengthData.details.patterns.passed ? 'text-green-500' : 'text-red-500'" 
                 class="fas fa-keyboard"></i>
              <span class="font-medium">{{ $t('passwordStrength.criteria.patterns') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="strengthData.details.patterns.passed ? 'text-green-600' : 'text-red-600'" 
                    class="text-sm font-medium">
                {{ strengthData.details.patterns.score }}/100
              </span>
              <i :class="strengthData.details.patterns.passed ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500'"></i>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6">
            {{ $t(`passwordStrength.messages.${strengthData.details.patterns.message}`) }}
          </p>
        </div>

        <!-- 重复字符检查 -->
        <div class="detail-item">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i :class="strengthData.details.repetition.passed ? 'text-green-500' : 'text-red-500'" 
                 class="fas fa-repeat"></i>
              <span class="font-medium">{{ $t('passwordStrength.criteria.repetition') }}</span>
              <span class="text-sm text-gray-500" v-if="strengthData.details.repetition.repeatRatio">
                ({{ strengthData.details.repetition.repeatRatio }}%)
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="strengthData.details.repetition.passed ? 'text-green-600' : 'text-red-600'" 
                    class="text-sm font-medium">
                {{ strengthData.details.repetition.score }}/100
              </span>
              <i :class="strengthData.details.repetition.passed ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500'"></i>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6">
            {{ $t(`passwordStrength.messages.${strengthData.details.repetition.message}`) }}
          </p>
        </div>
      </div>
    </div>

    <!-- 改进建议 -->
    <div class="suggestions mt-4" v-if="strengthData.suggestions && strengthData.suggestions.length > 0">
      <h4 class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
        {{ $t('passwordStrength.suggestionsTitle') }}
      </h4>
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
        <ul class="space-y-1">
          <li v-for="suggestion in strengthData.suggestions" :key="suggestion" 
              class="flex items-start space-x-2 text-sm text-yellow-800 dark:text-yellow-200">
            <i class="fas fa-lightbulb text-yellow-600 mt-0.5"></i>
            <span>{{ $t(`passwordStrength.suggestions.${suggestion}`) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 展开/收起按钮 -->
    <div class="mt-4 text-center">
      <button 
        @click="showDetails = !showDetails"
        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
      >
        <i :class="showDetails ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="mr-1"></i>
        {{ showDetails ? $t('passwordStrength.hideDetails') : $t('passwordStrength.showDetails') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getStrengthColor, getStrengthBgColor } from '../utils/passwordStrengthAnalyzer.js';

/**
 * 组件属性定义
 */
const props = defineProps({
  /**
   * 密码强度分析数据
   * @type {Object}
   */
  strengthData: {
    type: Object,
    required: true,
    default: () => ({
      score: 0,
      level: 'very-weak',
      percentage: 0,
      details: {},
      suggestions: []
    })
  }
});

/**
 * 响应式数据
 */
const showDetails = ref(false);

/**
 * 获取强度等级对应的文本颜色类
 * @param {string} level - 强度等级
 * @returns {string} CSS类名
 */
const getStrengthColorClass = (level) => {
  return getStrengthColor(level);
};

/**
 * 获取强度等级对应的背景颜色类
 * @param {string} level - 强度等级
 * @returns {string} CSS类名
 */
const getStrengthBgColorClass = (level) => {
  return getStrengthBgColor(level);
};
</script>

<script>
export default {
  name: 'PasswordStrength',
  methods: {
    /**
     * 获取强度颜色类
     * @param {string} level - 强度等级
     * @returns {string} 颜色类名
     */
    getStrengthColor(level) {
      return getStrengthColor(level);
    },
    
    /**
     * 获取强度背景颜色类
     * @param {string} level - 强度等级
     * @returns {string} 背景颜色类名
     */
    getStrengthBgColor(level) {
      return getStrengthBgColor(level);
    }
  }
};
</script>

<style scoped>
.password-strength-container {
  @apply bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4;
}

.detail-item {
  @apply bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-100 dark:border-gray-600;
}

.strength-bar-container {
  @apply relative;
}

/* 进度条动画 */
.strength-bar-container .h-3 {
  transition: width 0.5s ease-out;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .password-strength-container {
    @apply p-3;
  }
  
  .detail-item {
    @apply p-2;
  }
  
  .flex.items-center.justify-between {
    @apply flex-col items-start space-y-2;
  }
}
</style>