import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // 使用相对路径，避免部署到子目录时资源加载失败
  server: {
    port: 3000
  }
})