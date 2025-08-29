<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
             bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md 
             hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500
             transition-colors duration-200"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span>{{ currentLanguageLabel }}</span>
      <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <!-- 下拉菜单 -->
    <div v-if="isOpen" 
         class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                rounded-md shadow-lg z-50 overflow-hidden">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="switchLanguage(lang.code)"
        class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 
               hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400': currentLanguage === lang.code }"
      >
        {{ lang.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { switchLanguage as switchLang, getCurrentLanguage } from '../locales/index.js'

export default {
  name: 'LanguageSwitcher',
  setup() {
    const { t } = useI18n()
    const isOpen = ref(false)
    const currentLanguage = ref(getCurrentLanguage())
    
    /**
     * 可用语言列表
     * Available languages list
     */
    const languages = [
      { code: 'zh', label: '中文' },
      { code: 'en', label: 'English' }
    ]
    
    /**
     * 当前语言标签
     * Current language label
     */
    const currentLanguageLabel = computed(() => {
      const lang = languages.find(l => l.code === currentLanguage.value)
      return lang ? lang.label : '中文'
    })
    
    /**
     * 切换下拉菜单显示状态
     * Toggle dropdown visibility
     */
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }
    
    /**
     * 切换语言
     * Switch language
     */
    const switchLanguage = (locale) => {
      switchLang(locale)
      currentLanguage.value = locale
      isOpen.value = false
    }
    
    /**
     * 点击外部关闭下拉菜单
     * Close dropdown when clicking outside
     */
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        isOpen.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      isOpen,
      currentLanguage,
      currentLanguageLabel,
      languages,
      toggleDropdown,
      switchLanguage
    }
  }
}
</script>