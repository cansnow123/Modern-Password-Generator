<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">密码生成器</h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          安全、现代、易用的密码生成工具
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 space-y-5">
        <!-- 说明部分 -->
        <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
          <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">使用说明</h3>
          <ul class="mt-1 text-sm text-yellow-700 dark:text-yellow-300 list-disc pl-5 space-y-0.5">
            <li>密码计算全部在本地进行，确保安全</li>
            <li>建议使用复杂的记忆密码</li>
            <li>区分代码建议使用网站特征（如：qq, github）</li>
          </ul>
        </div>

        <div class="space-y-4">
          <!-- 记忆密码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              记忆密码
            </label>
            <div class="relative rounded-md shadow-sm">
              <input
                v-model="memoryPassword"
                :type="showPassword ? 'text' : 'password'"
                class="input pr-20"
                placeholder="输入你的记忆密码"
              />
              <button
                @click="togglePasswordVisibility"
                class="absolute right-0 top-0 h-full px-3 border-l border-gray-300 dark:border-gray-600 
                       text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                       flex items-center justify-center transition-colors duration-200"
              >
                {{ showPassword ? '隐藏' : '显示' }}
              </button>
            </div>
          </div>

          <!-- 区分代码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              区分代码
            </label>
            <div class="relative rounded-md shadow-sm">
              <input
                v-model="distinguishCode"
                type="text"
                class="input"
                placeholder="输入区分代码（如：qq）"
              />
            </div>
          </div>

          <!-- 密码选项 -->
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                密码长度
              </label>
              <select v-model="passwordLength" class="input py-1.5">
                <option v-for="length in [10,11,12,13,14,15,16,17,18,19,20]" :key="length" :value="length">
                  {{ length }} 位
                </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="usePunctuation" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">使用标点</span>
                </label>
              </div>
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="useUpperCase" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">大写字母</span>
                </label>
              </div>
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="useNumbers" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">使用数字</span>
                </label>
              </div>
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="useSpecialChars" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">特殊字符</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 生成的密码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              生成的密码
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
                复制
              </button>
            </div>
          </div>

          <!-- 密码强度指示器 -->
          <div v-if="generatedPassword" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">密码强度</span>
              <span :class="passwordStrengthClass">{{ passwordStrengthText }}</span>
            </div>
            <div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                :class="passwordStrengthBarClass"
                :style="{ width: passwordStrengthPercentage + '%' }"
                class="h-full transition-all duration-300"
              ></div>
            </div>
          </div>

          <!-- 生成按钮 -->
          <button
            @click="generatePassword"
            class="w-full btn btn-primary py-2 text-base font-semibold"
            :disabled="isGenerating"
          >
            {{ isGenerating ? '生成中...' : '生成密码' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'App',
  setup() {
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
        alert('请填写记忆密码和区分代码')
        return
      }

      isGenerating.value = true

      try {
        // 使用 Web Crypto API 进行更安全的密码生成
        const encoder = new TextEncoder()
        const baseData = encoder.encode(memoryPassword.value + distinguishCode.value)
        
        // 添加随机因子，确保每次生成的密码都不同
        const randomSalt = getRandomBytes(16)
        const combinedData = new Uint8Array(baseData.length + randomSalt.length)
        combinedData.set(baseData)
        combinedData.set(randomSalt, baseData.length)

        const hashBuffer = await window.crypto.subtle.digest('SHA-512', combinedData)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        
        // 根据选项生成密码
        let password = ''
        const chars = {
          lowercase: 'abcdefghijklmnopqrstuvwxyz',
          uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          numbers: '0123456789',
          special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        }

        let availableChars = chars.lowercase
        if (useUpperCase.value) availableChars += chars.uppercase
        if (useNumbers.value) availableChars += chars.numbers
        if (useSpecialChars.value) availableChars += chars.special

        // 使用更多的熵来生成密码
        const randomValues = getRandomBytes(passwordLength.value * 2)
        for (let i = 0; i < passwordLength.value; i++) {
          const combinedEntropy = (hashArray[i] + randomValues[i]) % availableChars.length
          password += availableChars[combinedEntropy]
        }

        generatedPassword.value = password
      } catch (error) {
        console.error('密码生成失败:', error)
        alert('密码生成失败，请重试')
      } finally {
        isGenerating.value = false
      }
    }

    const copyPassword = async () => {
      if (!generatedPassword.value) return
      
      try {
        await navigator.clipboard.writeText(generatedPassword.value)
        alert('密码已复制到剪贴板')
      } catch (err) {
        console.error('复制失败:', err)
        // 如果 clipboard API 失败，使用传统方法
        const input = document.createElement('textarea')
        input.value = generatedPassword.value
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        alert('密码已复制到剪贴板')
      }
    }

    const passwordStrength = computed(() => {
      if (!generatedPassword.value) return 0

      let strength = 0
      const password = generatedPassword.value

      // 长度得分
      strength += Math.min(password.length * 4, 40)

      // 字符类型得分
      if (password.match(/[A-Z]/)) strength += 10
      if (password.match(/[a-z]/)) strength += 10
      if (password.match(/[0-9]/)) strength += 10
      if (password.match(/[^A-Za-z0-9]/)) strength += 10

      // 重复字符扣分
      const uniqueChars = new Set(password).size
      strength -= (password.length - uniqueChars) * 2

      return Math.max(0, Math.min(100, strength))
    })

    const passwordStrengthPercentage = computed(() => passwordStrength.value)
    
    const passwordStrengthText = computed(() => {
      if (passwordStrength.value < 40) return '弱'
      if (passwordStrength.value < 60) return '中等'
      if (passwordStrength.value < 80) return '强'
      return '极强'
    })

    const passwordStrengthClass = computed(() => {
      if (passwordStrength.value < 40) return 'text-red-600 dark:text-red-400'
      if (passwordStrength.value < 60) return 'text-yellow-600 dark:text-yellow-400'
      if (passwordStrength.value < 80) return 'text-blue-600 dark:text-blue-400'
      return 'text-green-600 dark:text-green-400'
    })

    const passwordStrengthBarClass = computed(() => {
      if (passwordStrength.value < 40) return 'bg-red-500'
      if (passwordStrength.value < 60) return 'bg-yellow-500'
      if (passwordStrength.value < 80) return 'bg-blue-500'
      return 'bg-green-500'
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
      togglePasswordVisibility,
      generatePassword,
      copyPassword,
      passwordStrengthPercentage,
      passwordStrengthText,
      passwordStrengthClass,
      passwordStrengthBarClass
    }
  }
}
</script> 