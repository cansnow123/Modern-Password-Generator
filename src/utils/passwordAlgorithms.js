/**
 * 密码生成算法工具类
 * Password generation algorithms utility
 */

/**
 * 生成随机字节数组
 * Generate random bytes array
 * @param {number} length - 字节长度
 * @returns {Uint8Array} 随机字节数组
 */
export const getRandomBytes = (length) => {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  return array
}

/**
 * SHA-512 + 随机盐算法（当前默认算法）
 * SHA-512 + Random Salt Algorithm (Current default)
 * @param {string} memoryPassword - 记忆密码
 * @param {string} distinguishCode - 区分代码
 * @param {number} length - 密码长度
 * @returns {Promise<Uint8Array>} 生成的哈希数组
 */
export const sha512WithSalt = async (memoryPassword, distinguishCode, length) => {
  const encoder = new TextEncoder()
  const baseData = encoder.encode(memoryPassword + distinguishCode)
  
  // 添加随机因子，确保每次生成的密码都不同
  const randomSalt = getRandomBytes(16)
  const combinedData = new Uint8Array(baseData.length + randomSalt.length)
  combinedData.set(baseData)
  combinedData.set(randomSalt, baseData.length)

  const hashBuffer = await window.crypto.subtle.digest('SHA-512', combinedData)
  return new Uint8Array(hashBuffer)
}

/**
 * PBKDF2 算法
 * PBKDF2 Algorithm
 * @param {string} memoryPassword - 记忆密码
 * @param {string} distinguishCode - 区分代码
 * @param {number} length - 密码长度
 * @param {number} iterations - 迭代次数
 * @returns {Promise<Uint8Array>} 生成的密钥数组
 */
export const pbkdf2Algorithm = async (memoryPassword, distinguishCode, length, iterations = 100000) => {
  const encoder = new TextEncoder()
  const password = encoder.encode(memoryPassword)
  const salt = encoder.encode(distinguishCode + Date.now().toString())
  
  // 导入密码作为密钥材料
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    password,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  
  // 使用PBKDF2派生密钥
  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-256'
    },
    keyMaterial,
    length * 8 // 转换为位数
  )
  
  return new Uint8Array(derivedBits)
}

/**
 * 双重哈希算法（SHA-256 + SHA-512）
 * Double Hash Algorithm (SHA-256 + SHA-512)
 * @param {string} memoryPassword - 记忆密码
 * @param {string} distinguishCode - 区分代码
 * @param {number} length - 密码长度
 * @returns {Promise<Uint8Array>} 生成的哈希数组
 */
export const doubleHashAlgorithm = async (memoryPassword, distinguishCode, length) => {
  const encoder = new TextEncoder()
  const baseData = encoder.encode(memoryPassword + distinguishCode)
  
  // 第一次SHA-256哈希
  const firstHash = await window.crypto.subtle.digest('SHA-256', baseData)
  
  // 添加时间戳和随机盐
  const timestamp = new TextEncoder().encode(Date.now().toString())
  const randomSalt = getRandomBytes(8)
  const combinedData = new Uint8Array(firstHash.byteLength + timestamp.length + randomSalt.length)
  combinedData.set(new Uint8Array(firstHash))
  combinedData.set(timestamp, firstHash.byteLength)
  combinedData.set(randomSalt, firstHash.byteLength + timestamp.length)
  
  // 第二次SHA-512哈希
  const secondHash = await window.crypto.subtle.digest('SHA-512', combinedData)
  return new Uint8Array(secondHash)
}

/**
 * 时间基础算法（基于当前时间的确定性算法）
 * Time-based Algorithm (Deterministic algorithm based on current time)
 * @param {string} memoryPassword - 记忆密码
 * @param {string} distinguishCode - 区分代码
 * @param {number} length - 密码长度
 * @param {number} timeWindow - 时间窗口（分钟），默认30分钟
 * @returns {Promise<Uint8Array>} 生成的哈希数组
 */
export const timeBasedAlgorithm = async (memoryPassword, distinguishCode, length, timeWindow = 30) => {
  const encoder = new TextEncoder()
  
  // 计算时间窗口（每30分钟一个窗口）
  const currentTime = Math.floor(Date.now() / (timeWindow * 60 * 1000))
  const timeData = encoder.encode(currentTime.toString())
  
  const baseData = encoder.encode(memoryPassword + distinguishCode)
  const combinedData = new Uint8Array(baseData.length + timeData.length)
  combinedData.set(baseData)
  combinedData.set(timeData, baseData.length)
  
  const hashBuffer = await window.crypto.subtle.digest('SHA-512', combinedData)
  return new Uint8Array(hashBuffer)
}

/**
 * 自定义混合算法（结合多种哈希方法）
 * Custom Hybrid Algorithm (Combining multiple hash methods)
 * @param {string} memoryPassword - 记忆密码
 * @param {string} distinguishCode - 区分代码
 * @param {number} length - 密码长度
 * @returns {Promise<Uint8Array>} 生成的哈希数组
 */
export const hybridAlgorithm = async (memoryPassword, distinguishCode, length) => {
  const encoder = new TextEncoder()
  const baseData = encoder.encode(memoryPassword + distinguishCode)
  
  // 使用多种哈希算法
  const sha1Hash = await window.crypto.subtle.digest('SHA-1', baseData)
  const sha256Hash = await window.crypto.subtle.digest('SHA-256', baseData)
  const sha512Hash = await window.crypto.subtle.digest('SHA-512', baseData)
  
  // 组合所有哈希结果
  const combinedLength = sha1Hash.byteLength + sha256Hash.byteLength + sha512Hash.byteLength
  const combinedHash = new Uint8Array(combinedLength)
  combinedHash.set(new Uint8Array(sha1Hash))
  combinedHash.set(new Uint8Array(sha256Hash), sha1Hash.byteLength)
  combinedHash.set(new Uint8Array(sha512Hash), sha1Hash.byteLength + sha256Hash.byteLength)
  
  // 添加随机盐并进行最终哈希
  const randomSalt = getRandomBytes(16)
  const finalData = new Uint8Array(combinedHash.length + randomSalt.length)
  finalData.set(combinedHash)
  finalData.set(randomSalt, combinedHash.length)
  
  const finalHash = await window.crypto.subtle.digest('SHA-512', finalData)
  return new Uint8Array(finalHash)
}

/**
 * 算法配置对象
 * Algorithm configuration object
 */
export const algorithms = {
  'sha512-salt': {
    name: 'SHA-512 + 随机盐',
    nameEn: 'SHA-512 + Random Salt',
    description: '使用SHA-512哈希算法配合随机盐，提供良好的安全性和随机性',
    descriptionEn: 'Uses SHA-512 hash algorithm with random salt, providing good security and randomness',
    security: 'high',
    deterministic: false,
    function: sha512WithSalt
  },
  'pbkdf2': {
    name: 'PBKDF2',
    nameEn: 'PBKDF2',
    description: '基于密码的密钥派生函数，使用10万次迭代，抗暴力破解能力强',
    descriptionEn: 'Password-Based Key Derivation Function with 100,000 iterations, strong against brute force attacks',
    security: 'very-high',
    deterministic: false,
    function: pbkdf2Algorithm
  },
  'double-hash': {
    name: '双重哈希',
    nameEn: 'Double Hash',
    description: '先使用SHA-256再使用SHA-512，双重加密提高安全性',
    descriptionEn: 'First SHA-256 then SHA-512, double encryption for enhanced security',
    security: 'high',
    deterministic: false,
    function: doubleHashAlgorithm
  },
  'time-based': {
    name: '时间基础',
    nameEn: 'Time-based',
    description: '基于30分钟时间窗口的确定性算法，同一时间段生成相同密码',
    descriptionEn: 'Deterministic algorithm based on 30-minute time windows, generates same password within time period',
    security: 'medium',
    deterministic: true,
    function: timeBasedAlgorithm
  },
  'hybrid': {
    name: '混合算法',
    nameEn: 'Hybrid Algorithm',
    description: '结合SHA-1、SHA-256、SHA-512多种哈希算法，提供最高安全性',
    descriptionEn: 'Combines SHA-1, SHA-256, SHA-512 hash algorithms for maximum security',
    security: 'very-high',
    deterministic: false,
    function: hybridAlgorithm
  }
}

/**
 * 根据算法类型生成密码
 * Generate password based on algorithm type
 * @param {string} algorithmType - 算法类型
 * @param {string} memoryPassword - 记忆密码
 * @param {string} distinguishCode - 区分代码
 * @param {number} passwordLength - 密码长度
 * @param {object} options - 密码选项
 * @returns {Promise<string>} 生成的密码
 */
export const generatePasswordWithAlgorithm = async (algorithmType, memoryPassword, distinguishCode, passwordLength, options) => {
  const algorithm = algorithms[algorithmType]
  if (!algorithm) {
    throw new Error(`未知的算法类型: ${algorithmType}`)
  }
  
  // 获取哈希数组
  const hashArray = await algorithm.function(memoryPassword, distinguishCode, passwordLength)
  
  // 字符集定义
  const chars = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  }
  
  // 构建可用字符集
  let availableChars = chars.lowercase
  if (options.useUpperCase) availableChars += chars.uppercase
  if (options.useNumbers) availableChars += chars.numbers
  if (options.useSpecialChars) availableChars += chars.special
  
  // 生成密码
  let password = ''
  const randomValues = algorithm.deterministic ? new Uint8Array(passwordLength) : getRandomBytes(passwordLength * 2)
  
  for (let i = 0; i < passwordLength; i++) {
    const combinedEntropy = algorithm.deterministic 
      ? hashArray[i % hashArray.length]
      : (hashArray[i % hashArray.length] + randomValues[i]) % availableChars.length
    password += availableChars[combinedEntropy % availableChars.length]
  }
  
  return password
}