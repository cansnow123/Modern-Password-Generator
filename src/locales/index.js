/**
 * 国际化配置文件
 * Internationalization configuration
 */
import { createI18n } from 'vue-i18n'
import zh from './zh.js'
import en from './en.js'

/**
 * 获取浏览器默认语言
 * Get browser default language
 */
function getDefaultLocale() {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    return savedLocale
  }
  
  const browserLocale = navigator.language || navigator.userLanguage
  if (browserLocale.startsWith('zh')) {
    return 'zh'
  }
  return 'en'
}

/**
 * 创建i18n实例
 * Create i18n instance
 */
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(), // 默认语言
  fallbackLocale: 'zh', // 回退语言
  messages: {
    zh,
    en
  }
})

/**
 * 切换语言
 * Switch language
 */
export function switchLanguage(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

/**
 * 获取当前语言
 * Get current language
 */
export function getCurrentLanguage() {
  return i18n.global.locale.value
}

export default i18n