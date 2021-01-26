import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: [
        // 'antd/lib/style/index.css',
    ]
  }
}
