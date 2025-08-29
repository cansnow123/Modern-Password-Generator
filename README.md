# 现代密码生成器 (Modern Password Generator)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue Version](https://img.shields.io/badge/vue-3.x-brightgreen.svg)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.x-blue.svg)

一个安全、现代、易用的密码生成工具，帮助用户基于记忆密码生成不同网站的强密码。所有计算都在本地完成，确保安全性。

## ✨ 特性

- 🔒 本地计算，不联网，确保安全
- 🎨 现代化 UI 设计，支持深色模式
- 📱 响应式布局，完美支持移动端
- 🔑 基于记忆密码 + 区分代码生成强密码
- 🧮 支持多种密码生成算法：
  - SHA-512 + 随机盐（默认）
  - PBKDF2（极高安全性）
  - 双重哈希（SHA-256 + SHA-512）
  - 时间基础算法（确定性）
  - 混合算法（多重哈希组合）
- 📊 密码强度详细分析
  - 实时密码强度评估（极弱/弱/一般/良好/强）
  - 多维度分析（长度、字符多样性、常见密码检查、键盘模式检查、重复字符检查）
  - 详细的改进建议和安全提示
  - 可视化强度指示器和进度条
  - 字符类型使用情况显示
- 🎯 可自定义密码规则：
  - 密码长度（10-20位）
  - 大小写字母
  - 数字
  - 特殊字符
- ⚡️ 快速复制生成的密码
- 🌙 深色模式支持
- 🔄 每次生成不同的密码
- 🌍 多语言支持（中文/英文）
- 📊 算法安全级别显示和详细说明

## 🚀 在线演示

[在线体验地址](https://api.photo8.site/mima/)

## 📦 安装

```bash
# 克隆项目
git clone https://github.com/cansnow123/Modern-Password-Generator.git

# 进入项目目录
cd modern-password-generator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🔨 部署

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 目录下的文件部署到你的 Web 服务器。

### 使用 Docker 部署

```bash
# 构建镜像
docker build -t password-generator .

# 运行容器
docker run -d -p 80:80 password-generator
```

## 💡 使用方法

1. 设置一个强记忆密码（主密码）
   - 这个密码要足够复杂
   - 需要牢记，因为它是生成其他密码的基础
   
2. 为不同网站设置区分代码
   - 建议使用网站的特征，如：
   - GitHub -> github
   - QQ -> qq
   - 微信 -> wx
   
3. 选择密码选项
   - 设置合适的密码长度
   - 选择需要包含的字符类型
   
4. 点击"生成密码"
   - 系统会根据你的设置生成强密码
   - 可以点击"复制"按钮复制密码
   
5. 查看密码强度
   - 系统会实时显示生成密码的强度
   - 建议使用"强"或"极强"的密码

## 🌍 多语言支持

本应用支持以下语言：
- 🇨🇳 中文（简体）
- 🇺🇸 English（英语）

### 语言切换
- 点击右上角的语言切换按钮可以切换界面语言
- 系统会自动检测浏览器语言并设置为默认语言
- 语言设置会保存在本地存储中，下次访问时自动应用

## 🔐 安全说明

- 所有密码生成过程都在本地完成
- 使用 Web Crypto API 进行加密
- 不存储任何密码信息
- 不进行网络传输
- 每次生成的密码都不同，即使使用相同的记忆密码和区分代码

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **国际化**: Vue I18n
- **加密算法**: Web Crypto API (SHA-512, SHA-256, SHA-1, PBKDF2)
- **密码强度分析**: 自研多维度评估算法
- **组件**: 
  - `LanguageSwitcher.vue` - 语言切换组件
  - `AlgorithmInfo.vue` - 算法说明组件
  - `PasswordStrength.vue` - 密码强度分析组件
- **工具类**:
  - `passwordAlgorithms.js` - 密码生成算法集合
  - `passwordStrengthAnalyzer.js` - 密码强度分析器

## 📝 开发计划

- [ ] 添加密码历史记录（本地存储）
- [ ] 支持导出/导入配置
- [ ] 添加密码规则模板
- [x] 支持更多的密码生成算法
  - [x] 实现5种不同安全级别的算法
  - [x] 添加算法选择器和详细说明
  - [x] 集成算法安全性评级系统
   - [x] 修复算法说明组件中安全建议显示问题
- [x] 修复生产构建资源路径问题，配置相对路径避免部署错误
- [x] 支持多语言
- [x] 修复多语言使用说明显示问题（彻底解决数组渲染问题）✅
- [ ] 开发浏览器扩展
- [x] 开发移动应用

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 开源协议

本项目基于 MIT 协议开源，详见 [LICENSE](LICENSE) 文件。
