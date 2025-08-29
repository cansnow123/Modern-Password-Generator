/**
 * 中文语言配置文件
 * Chinese language configuration
 */
export default {
  // 页面标题和描述
  title: '密码生成器',
  subtitle: '安全、现代、易用的密码生成工具',
  
  // 使用说明
  instructions: {
    title: '使用说明',
    items: [
      '密码计算全部在本地进行，确保安全',
      '建议使用复杂的记忆密码',
      '区分代码建议使用网站特征（如：qq, github）'
    ]
  },
  
  // 表单标签
  form: {
    memoryPassword: '记忆密码',
    memoryPasswordPlaceholder: '输入你的记忆密码',
    distinguishCode: '区分代码',
    distinguishCodePlaceholder: '输入区分代码（如：qq）',
    passwordLength: '密码长度',
    lengthUnit: '位',
    algorithm: '生成算法',
    generatedPassword: '生成的密码'
  },
  
  // 密码选项
  options: {
    usePunctuation: '使用标点',
    useUpperCase: '大写字母',
    useNumbers: '使用数字',
    useSpecialChars: '特殊字符'
  },
  
  // 按钮文本
  buttons: {
    show: '显示',
    hide: '隐藏',
    copy: '复制',
    generate: '生成密码',
    generating: '生成中...'
  },
  
  // 密码强度
  strength: {
    label: '密码强度',
    weak: '弱',
    medium: '中等',
    strong: '强',
    veryStrong: '极强'
  },
  
  // 提示信息
  messages: {
    fillRequired: '请填写记忆密码和区分代码',
    passwordCopied: '密码已复制到剪贴板',
    generateFailed: '密码生成失败，请重试',
    copyFailed: '复制失败'
  },
  
  // 安全级别
  security: {
    'medium': '中等安全',
    'high': '高安全',
    'very-high': '极高安全'
  },
  
  // 算法说明
  algorithmInfo: {
    title: '算法说明',
    show: '查看详情',
    hide: '收起详情',
    deterministic: '确定性',
    random: '随机性',
    securityTips: {
      title: '安全建议',
      items: [
        '选择高安全级别的算法以获得更好的保护',
        '确定性算法在相同时间窗口内生成相同密码',
        '随机性算法每次生成不同的密码',
        'PBKDF2算法适合需要最高安全性的场景',
        '定期更换记忆密码和区分代码'
      ]
    }
  },
  
  // 密码强度分析
  passwordStrength: {
    title: '密码强度分析',
    detailsTitle: '详细分析',
    suggestionsTitle: '改进建议',
    showDetails: '显示详情',
    hideDetails: '隐藏详情',
    
    // 强度等级
    levels: {
      'very-weak': '极弱',
      'weak': '弱',
      'fair': '一般',
      'good': '良好',
      'strong': '强'
    },
    
    // 评估标准
    criteria: {
      length: '密码长度',
      variety: '字符多样性',
      common: '常见密码检查',
      patterns: '键盘模式检查',
      repetition: '重复字符检查'
    },
    
    // 字符类型
    charTypes: {
      lowercase: '小写字母',
      uppercase: '大写字母',
      numbers: '数字',
      special: '特殊字符'
    },
    
    // 分析消息
    messages: {
      // 长度相关
      password_empty: '密码为空',
      too_short: '密码过短，建议至少6位',
      short: '密码较短，建议至少8位',
      good_length: '密码长度良好',
      very_good_length: '密码长度很好',
      excellent_length: '密码长度优秀',
      
      // 字符多样性相关
      no_characters: '无有效字符',
      single_type: '仅包含一种字符类型',
      two_types: '包含两种字符类型',
      three_types: '包含三种字符类型，很好',
      all_types: '包含所有字符类型，优秀',
      
      // 常见密码相关
      not_common: '不是常见密码',
      very_common: '这是非常常见的密码',
      contains_common: '包含常见密码片段',
      
      // 键盘模式相关
      no_patterns: '无明显键盘模式',
      keyboard_pattern: '包含键盘模式',
      sequential_pattern: '包含连续字符模式',
      
      // 重复字符相关
      no_repetition: '无明显重复',
      consecutive_repeats: '包含连续重复字符',
      high_repetition: '字符重复率过高',
      moderate_repetition: '字符重复率适中'
    },
    
    // 改进建议
    suggestions: {
      increase_length: '增加密码长度至少到8位',
      add_uppercase: '添加大写字母',
      add_lowercase: '添加小写字母',
      add_numbers: '添加数字',
      add_special: '添加特殊字符(!@#$%^&*等)',
      avoid_common: '避免使用常见密码',
      avoid_patterns: '避免使用键盘模式或连续字符',
      reduce_repetition: '减少字符重复'
    }
  },
  
  // 语言切换
  language: {
    label: '语言',
    chinese: '中文',
    english: 'English'
  }
}