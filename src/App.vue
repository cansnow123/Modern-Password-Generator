<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-4">
        <div class="flex justify-between items-start mb-2">
          <div></div>
          <LanguageSwitcher />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t('title') }}</h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {{ $t('subtitle') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 space-y-5">
        <!-- 说明部分 -->
        <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
          <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">{{ $t('instructions.title') }}</h3>
          <ul class="mt-1 text-sm text-yellow-700 dark:text-yellow-300 list-disc pl-5 space-y-0.5">
            <li v-for="(item, index) in instructionItems" :key="index">{{ item }}</li>
          </ul>
        </div>

        <div class="space-y-4">
          <!-- 记忆密码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('form.memoryPassword') }}
            </label>
            <div class="relative rounded-md shadow-sm">
              <input
                v-model="memoryPassword"
                :type="showPassword ? 'text' : 'password'"
                class="input pr-20"
                :placeholder="$t('form.memoryPasswordPlaceholder')"
              />
              <button
                @click="togglePasswordVisibility"
                class="absolute right-0 top-0 h-full px-3 border-l border-gray-300 dark:border-gray-600 
                       text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                       flex items-center justify-center transition-colors duration-200"
              >
                {{ showPassword ? $t('buttons.hide') : $t('buttons.show') }}
              </button>
            </div>
          </div>

          <!-- 区分代码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('form.distinguishCode') }}
            </label>
            <div class="relative rounded-md shadow-sm">
              <input
                v-model="distinguishCode"
                type="text"
                class="input"
                :placeholder="$t('form.distinguishCodePlaceholder')"
              />
            </div>
          </div>

          <!-- 密码选项 -->
          <div class="space-y-3">
            <!-- 算法选择 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ $t('form.algorithm') }}
              </label>
              <select v-model="selectedAlgorithm" class="input py-1.5">
                <option 
                  v-for="(algorithm, key) in algorithms" 
                  :key="key" 
                  :value="key"
                >
                  {{ $t('locale') === 'zh' ? algorithm.name : algorithm.nameEn }}
                  ({{ $t('security.' + algorithm.security) }})
                </option>
              </select>
              <div class="flex items-center justify-between mt-1">
                 <p class="text-xs text-gray-500 dark:text-gray-400">
                   {{ $t('locale') === 'zh' ? algorithms[selectedAlgorithm].description : algorithms[selectedAlgorithm].descriptionEn }}
                 </p>
                 <button 
                   @click="showAlgorithmInfo = !showAlgorithmInfo"
                   class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ml-2"
                 >
                   {{ showAlgorithmInfo ? $t('algorithmInfo.hide') : $t('algorithmInfo.show') }}
                 </button>
               </div>
             </div>
             
             <!-- 算法说明面板 -->
             <div v-if="showAlgorithmInfo" class="mt-4">
               <AlgorithmInfo :selected-algorithm="selectedAlgorithm" />
             </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ $t('form.passwordLength') }}
              </label>
              <select v-model="passwordLength" class="input py-1.5">
                <option v-for="length in [10,11,12,13,14,15,16,17,18,19,20]" :key="length" :value="length">
                  {{ length }} {{ $t('form.lengthUnit') }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="usePunctuation" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ $t('options.usePunctuation') }}</span>
                </label>
              </div>
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="useUpperCase" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ $t('options.useUpperCase') }}</span>
                </label>
              </div>
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="useNumbers" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ $t('options.useNumbers') }}</span>
                </label>
              </div>
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="useSpecialChars" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ $t('options.useSpecialChars') }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 生成的密码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('form.generatedPassword') }}
            </label>
            <div class="flex space-x-2">
              <div class="relative flex-1">
                <input
                  :value="generatedPassword"
                  type="text"
                  class="input py-1.5 font-mono"
                  readonly
                />
              </div>
              <button
                @click="copyPassword"
                class="btn btn-primary py-1.5"
              >
                {{ $t('buttons.copy') }}
              </button>
            </div>
          </div>

          <!-- 密码强度详细分析 -->
          <div v-if="generatedPassword" class="mt-4">
            <PasswordStrength :strength-data="passwordStrengthData" />
          </div>

          <!-- 生成按钮 -->
          <button
            @click="generatePassword"
            class="w-full btn btn-primary py-2 text-base font-semibold"
            :disabled="isGenerating"
          >
            {{ isGenerating ? $t('buttons.generating') : $t('buttons.generate') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import AlgorithmInfo from './components/AlgorithmInfo.vue'
import PasswordStrength from './components/PasswordStrength.vue'
import zh from './locales/zh.js'
import en from './locales/en.js'
import { generatePasswordWithAlgorithm, algorithms } from './utils/passwordAlgorithms.js'
import { analyzePasswordStrength } from './utils/passwordStrengthAnalyzer.js'

export default {
  name: 'App',
  components: {
    LanguageSwitcher,
    AlgorithmInfo,
    PasswordStrength
  },
  setup() {
    const { t } = useI18n()
    const memoryPassword = ref('')
    const distinguishCode = ref('')
    const passwordLength = ref(16)
    const usePunctuation = ref(true)
    const useUpperCase = ref(true)
    const useNumbers = ref(true)
    const useSpecialChars = ref(true)
    const showPassword = ref(false)
    const generatedPassword = ref('')
    const isGenerating = ref(false)
    const selectedAlgorithm = ref('sha512-salt') // 默认算法
    const showAlgorithmInfo = ref(false) // 控制算法说明面板显示

    // 获取使用说明列表
    const instructionItems = computed(() => {
      const { locale } = useI18n()
      const currentLocale = locale.value
      
      // 直接从语言对象中获取数组
      if (currentLocale === 'zh') {
        return zh.instructions.items
      } else {
        return en.instructions.items
      }
    })

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    // 生成随机字节数组
    const getRandomBytes = (length) => {
      const array = new Uint8Array(length)
      window.crypto.getRandomValues(array)
      return array
    }

    const generatePassword = async () => {
      if (!memoryPassword.value || !distinguishCode.value) {
        alert(t('messages.fillRequired'))
        return
      }

      isGenerating.value = true

      try {
        const options = {
          useUpperCase: useUpperCase.value,
          useNumbers: useNumbers.value,
          useSpecialChars: useSpecialChars.value
        }
        
        const password = await generatePasswordWithAlgorithm(
          selectedAlgorithm.value,
          memoryPassword.value,
          distinguishCode.value,
          passwordLength.value,
          options
        )
        
        generatedPassword.value = password
      } catch (error) {
        console.error('密码生成失败:', error)
        alert(t('messages.generateFailed'))
      } finally {
        isGenerating.value = false
      }
    }

    const copyPassword = async () => {
      if (!generatedPassword.value) return
      
      try {
        await navigator.clipboard.writeText(generatedPassword.value)
        alert(t('messages.passwordCopied'))
      } catch (err) {
        console.error('复制失败:', err)
        // 如果 clipboard API 失败，使用传统方法
        const input = document.createElement('textarea')
        input.value = generatedPassword.value
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        alert(t('messages.passwordCopied'))
      }
    }

    // 密码强度分析
    const passwordStrengthData = computed(() => {
      if (!generatedPassword.value) {
        return {
          score: 0,
          level: 'very-weak',
          percentage: 0,
          details: {},
          suggestions: []
        }
      }
      return analyzePasswordStrength(generatedPassword.value)
    })

    return {
      memoryPassword,
      distinguishCode,
      passwordLength,
      usePunctuation,
      useUpperCase,
      useNumbers,
      useSpecialChars,
      showPassword,
      generatedPassword,
      isGenerating,
      selectedAlgorithm,
      algorithms,
      showAlgorithmInfo,
      instructionItems,
      togglePasswordVisibility,
      generatePassword,
      copyPassword,
      passwordStrengthData
    }
  }
}
</script>