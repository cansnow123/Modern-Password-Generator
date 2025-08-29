/**
 * 密码强度分析工具类
 * 提供全面的密码强度评估和详细分析
 */

// 常见弱密码列表
const COMMON_PASSWORDS = [
  '123456', 'password', '123456789', '12345678', '12345', '1234567',
  'qwerty', 'abc123', 'password123', 'admin', 'letmein', 'welcome',
  '123123', 'password1', '1234', 'qwerty123', 'iloveyou', 'princess',
  'monkey', 'dragon', '000000', '111111', '666666', '888888'
];

// 常见键盘模式
const KEYBOARD_PATTERNS = [
  'qwerty', 'asdf', 'zxcv', '1234', 'abcd', 'qwertyuiop',
  'asdfghjkl', 'zxcvbnm', '123456789', 'abcdefg'
];

// 常见重复模式
const REPEAT_PATTERNS = [
  'aa', 'bb', 'cc', '11', '22', '33', 'aaa', 'bbb', '111', '222'
];

/**
 * 分析密码强度
 * @param {string} password - 要分析的密码
 * @returns {Object} 密码强度分析结果
 */
export function analyzePasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      level: 'very-weak',
      percentage: 0,
      details: {
        length: { score: 0, passed: false, message: 'password_empty' },
        variety: { score: 0, passed: false, message: 'no_characters' },
        common: { score: 0, passed: false, message: 'password_empty' },
        patterns: { score: 0, passed: false, message: 'password_empty' },
        repetition: { score: 0, passed: false, message: 'password_empty' }
      },
      suggestions: ['add_length', 'add_variety', 'avoid_common']
    };
  }

  const analysis = {
    length: analyzeLengthStrength(password),
    variety: analyzeCharacterVariety(password),
    common: analyzeCommonPasswords(password),
    patterns: analyzeKeyboardPatterns(password),
    repetition: analyzeRepetition(password)
  };

  // 计算总分 (满分100)
  const totalScore = Math.round(
    analysis.length.score * 0.25 +
    analysis.variety.score * 0.25 +
    analysis.common.score * 0.2 +
    analysis.patterns.score * 0.15 +
    analysis.repetition.score * 0.15
  );

  // 确定强度等级
  const level = getStrengthLevel(totalScore);
  
  // 生成改进建议
  const suggestions = generateSuggestions(analysis);

  return {
    score: totalScore,
    level,
    percentage: totalScore,
    details: analysis,
    suggestions
  };
}

/**
 * 分析密码长度强度
 * @param {string} password - 密码
 * @returns {Object} 长度分析结果
 */
function analyzeLengthStrength(password) {
  const length = password.length;
  let score = 0;
  let passed = false;
  let message = '';

  if (length < 6) {
    score = Math.min(length * 10, 30);
    message = 'too_short';
  } else if (length < 8) {
    score = 40;
    message = 'short';
  } else if (length < 12) {
    score = 60;
    passed = true;
    message = 'good_length';
  } else if (length < 16) {
    score = 80;
    passed = true;
    message = 'very_good_length';
  } else {
    score = 100;
    passed = true;
    message = 'excellent_length';
  }

  return { score, passed, message, value: length };
}

/**
 * 分析字符类型多样性
 * @param {string} password - 密码
 * @returns {Object} 字符多样性分析结果
 */
function analyzeCharacterVariety(password) {
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  
  const varietyCount = [hasLower, hasUpper, hasDigits, hasSpecial].filter(Boolean).length;
  
  let score = 0;
  let passed = false;
  let message = '';
  
  switch (varietyCount) {
    case 0:
      score = 0;
      message = 'no_characters';
      break;
    case 1:
      score = 25;
      message = 'single_type';
      break;
    case 2:
      score = 50;
      message = 'two_types';
      break;
    case 3:
      score = 75;
      passed = true;
      message = 'three_types';
      break;
    case 4:
      score = 100;
      passed = true;
      message = 'all_types';
      break;
  }
  
  return {
    score,
    passed,
    message,
    details: { hasLower, hasUpper, hasDigits, hasSpecial, count: varietyCount }
  };
}

/**
 * 检查是否为常见密码
 * @param {string} password - 密码
 * @returns {Object} 常见密码检查结果
 */
function analyzeCommonPasswords(password) {
  const lowerPassword = password.toLowerCase();
  const isCommon = COMMON_PASSWORDS.includes(lowerPassword);
  
  // 检查是否包含常见密码作为子串
  const containsCommon = COMMON_PASSWORDS.some(common => 
    lowerPassword.includes(common) && common.length >= 4
  );
  
  let score = 100;
  let passed = true;
  let message = 'not_common';
  
  if (isCommon) {
    score = 0;
    passed = false;
    message = 'very_common';
  } else if (containsCommon) {
    score = 30;
    passed = false;
    message = 'contains_common';
  }
  
  return { score, passed, message };
}

/**
 * 分析键盘模式
 * @param {string} password - 密码
 * @returns {Object} 键盘模式分析结果
 */
function analyzeKeyboardPatterns(password) {
  const lowerPassword = password.toLowerCase();
  
  // 检查键盘模式
  const hasKeyboardPattern = KEYBOARD_PATTERNS.some(pattern => 
    lowerPassword.includes(pattern)
  );
  
  // 检查连续字符 (如 abc, 123)
  const hasSequential = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/.test(lowerPassword);
  
  let score = 100;
  let passed = true;
  let message = 'no_patterns';
  
  if (hasKeyboardPattern || hasSequential) {
    score = 20;
    passed = false;
    message = hasKeyboardPattern ? 'keyboard_pattern' : 'sequential_pattern';
  }
  
  return { score, passed, message };
}

/**
 * 分析重复字符
 * @param {string} password - 密码
 * @returns {Object} 重复字符分析结果
 */
function analyzeRepetition(password) {
  // 检查连续重复字符 (如 aaa, 111)
  const hasConsecutiveRepeats = /(.)\1{2,}/.test(password);
  
  // 计算字符重复率
  const charCount = {};
  for (const char of password) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  const maxRepeat = Math.max(...Object.values(charCount));
  const repeatRatio = maxRepeat / password.length;
  
  let score = 100;
  let passed = true;
  let message = 'no_repetition';
  
  if (hasConsecutiveRepeats) {
    score = 10;
    passed = false;
    message = 'consecutive_repeats';
  } else if (repeatRatio > 0.5) {
    score = 30;
    passed = false;
    message = 'high_repetition';
  } else if (repeatRatio > 0.3) {
    score = 60;
    message = 'moderate_repetition';
  }
  
  return { score, passed, message, repeatRatio: Math.round(repeatRatio * 100) };
}

/**
 * 根据分数确定强度等级
 * @param {number} score - 总分
 * @returns {string} 强度等级
 */
function getStrengthLevel(score) {
  if (score < 20) return 'very-weak';
  if (score < 40) return 'weak';
  if (score < 60) return 'fair';
  if (score < 80) return 'good';
  return 'strong';
}

/**
 * 生成改进建议
 * @param {Object} analysis - 分析结果
 * @returns {Array} 建议列表
 */
function generateSuggestions(analysis) {
  const suggestions = [];
  
  // 长度建议
  if (analysis.length.score < 60) {
    suggestions.push('increase_length');
  }
  
  // 字符多样性建议
  if (analysis.variety.score < 75) {
    const { details } = analysis.variety;
    if (!details.hasUpper) suggestions.push('add_uppercase');
    if (!details.hasLower) suggestions.push('add_lowercase');
    if (!details.hasDigits) suggestions.push('add_numbers');
    if (!details.hasSpecial) suggestions.push('add_special');
  }
  
  // 常见密码建议
  if (analysis.common.score < 50) {
    suggestions.push('avoid_common');
  }
  
  // 模式建议
  if (analysis.patterns.score < 50) {
    suggestions.push('avoid_patterns');
  }
  
  // 重复建议
  if (analysis.repetition.score < 50) {
    suggestions.push('reduce_repetition');
  }
  
  return suggestions;
}

/**
 * 获取强度等级的颜色
 * @param {string} level - 强度等级
 * @returns {string} 颜色类名
 */
export function getStrengthColor(level) {
  const colors = {
    'very-weak': 'text-red-600',
    'weak': 'text-orange-500',
    'fair': 'text-yellow-500',
    'good': 'text-blue-500',
    'strong': 'text-green-600'
  };
  return colors[level] || 'text-gray-500';
}

/**
 * 获取强度等级的背景颜色
 * @param {string} level - 强度等级
 * @returns {string} 背景颜色类名
 */
export function getStrengthBgColor(level) {
  const colors = {
    'very-weak': 'bg-red-500',
    'weak': 'bg-orange-500',
    'fair': 'bg-yellow-500',
    'good': 'bg-blue-500',
    'strong': 'bg-green-500'
  };
  return colors[level] || 'bg-gray-500';
}