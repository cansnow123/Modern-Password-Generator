/**
 * English language configuration
 * 英文语言配置文件
 */
export default {
  // Page title and description
  title: 'Password Generator',
  subtitle: 'Secure, modern, and easy-to-use password generation tool',
  
  // Instructions
  instructions: {
    title: 'Instructions',
    items: [
      'All password calculations are performed locally to ensure security',
      'It is recommended to use a complex memory password',
      'Distinguish codes should use website features (e.g., qq, github)'
    ]
  },
  
  // Form labels
  form: {
    memoryPassword: 'Memory Password',
    memoryPasswordPlaceholder: 'Enter your memory password',
    distinguishCode: 'Distinguish Code',
    distinguishCodePlaceholder: 'Enter distinguish code (e.g., qq)',
    passwordLength: 'Password Length',
    lengthUnit: 'characters',
    algorithm: 'Generation Algorithm',
    generatedPassword: 'Generated Password'
  },
  
  // Password options
  options: {
    usePunctuation: 'Use Punctuation',
    useUpperCase: 'Uppercase Letters',
    useNumbers: 'Use Numbers',
    useSpecialChars: 'Special Characters'
  },
  
  // Button text
  buttons: {
    show: 'Show',
    hide: 'Hide',
    copy: 'Copy',
    generate: 'Generate Password',
    generating: 'Generating...'
  },
  
  // Password strength
  strength: {
    label: 'Password Strength',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    veryStrong: 'Very Strong'
  },
  
  // Messages
  messages: {
    fillRequired: 'Please fill in memory password and distinguish code',
    passwordCopied: 'Password copied to clipboard',
    generateFailed: 'Password generation failed, please try again',
    copyFailed: 'Copy failed'
  },

  // Security levels
  security: {
    'medium': 'Medium Security',
    'high': 'High Security',
    'very-high': 'Very High Security'
  },
  
  // Algorithm information
  algorithmInfo: {
    title: 'Algorithm Information',
    show: 'Show Details',
    hide: 'Hide Details',
    deterministic: 'Deterministic',
    random: 'Random',
    securityTips: {
      title: 'Security Tips',
      items: [
        'Choose high security algorithms for better protection',
        'Deterministic algorithms generate same password within time window',
        'Random algorithms generate different passwords each time',
        'PBKDF2 algorithm is suitable for scenarios requiring highest security',
        'Regularly change memory password and distinguish code'
      ]
    }
  },
  
  // Password Strength Analysis
  passwordStrength: {
    title: 'Password Strength Analysis',
    detailsTitle: 'Detailed Analysis',
    suggestionsTitle: 'Improvement Suggestions',
    showDetails: 'Show Details',
    hideDetails: 'Hide Details',
    
    // Strength Levels
    levels: {
      'very-weak': 'Very Weak',
      'weak': 'Weak',
      'fair': 'Fair',
      'good': 'Good',
      'strong': 'Strong'
    },
    
    // Evaluation Criteria
    criteria: {
      length: 'Password Length',
      variety: 'Character Variety',
      common: 'Common Password Check',
      patterns: 'Keyboard Pattern Check',
      repetition: 'Character Repetition Check'
    },
    
    // Character Types
    charTypes: {
      lowercase: 'Lowercase',
      uppercase: 'Uppercase',
      numbers: 'Numbers',
      special: 'Special Characters'
    },
    
    // Analysis Messages
    messages: {
      // Length related
      password_empty: 'Password is empty',
      too_short: 'Password too short, recommend at least 6 characters',
      short: 'Password is short, recommend at least 8 characters',
      good_length: 'Good password length',
      very_good_length: 'Very good password length',
      excellent_length: 'Excellent password length',
      
      // Character variety related
      no_characters: 'No valid characters',
      single_type: 'Contains only one character type',
      two_types: 'Contains two character types',
      three_types: 'Contains three character types, good',
      all_types: 'Contains all character types, excellent',
      
      // Common password related
      not_common: 'Not a common password',
      very_common: 'This is a very common password',
      contains_common: 'Contains common password fragments',
      
      // Keyboard pattern related
      no_patterns: 'No obvious keyboard patterns',
      keyboard_pattern: 'Contains keyboard patterns',
      sequential_pattern: 'Contains sequential character patterns',
      
      // Character repetition related
      no_repetition: 'No obvious repetition',
      consecutive_repeats: 'Contains consecutive repeated characters',
      high_repetition: 'Character repetition rate too high',
      moderate_repetition: 'Moderate character repetition rate'
    },
    
    // Improvement Suggestions
    suggestions: {
      increase_length: 'Increase password length to at least 8 characters',
      add_uppercase: 'Add uppercase letters',
      add_lowercase: 'Add lowercase letters',
      add_numbers: 'Add numbers',
      add_special: 'Add special characters (!@#$%^&* etc.)',
      avoid_common: 'Avoid using common passwords',
      avoid_patterns: 'Avoid keyboard patterns or sequential characters',
      reduce_repetition: 'Reduce character repetition'
    }
  },
  
  // Language switcher
  language: {
    label: 'Language',
    chinese: '中文',
    english: 'English'
  }
}