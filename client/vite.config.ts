import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [vue()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
            @use "@/assets/scss/_vars.scss" as *;
            @use "@/assets/scss/_mixins.scss" as *;
          `
			}
		}
	},
	resolve: {
		alias: {
			'@': './src'
		}
	},
	server: {
		cors: true,
		host: true,
		port: 443
	},
	build: {
		outDir: 'dist',
		rollupOptions: {
			output: {
				entryFileNames: '[name].[hash].js',
				chunkFileNames: '[name].[hash].js',
				assetFileNames: 'assets/[name][extname]'
			}
		}
	}
})
