import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import eslintPlugin from 'vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression';

interface Config {
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_APP_TITLE: string;
	VITE_REPORT: boolean;
	VITE_SOURCE_MAP: boolean;
	VITE_GZIP: boolean;
}

// 将纯字符串配置转换类型
const toTransformConfig = config => {
	const isNumberKeys = ['VITE_PORT'];
	return Object.entries(config).reduce((total, cur) => {
		const [key, value] = cur;
		if (value === 'true') return { ...total, [key]: true };
		if (value === 'false') return { ...total, [key]: false };
		if (isNumberKeys.includes(key)) return { ...total, [key]: Number(value) };
		return { ...total, [key]: value };
	}, {});
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, process.cwd());
	const IS_PROD = ['production', 'prod'].includes(mode);
	const IS_BUILD = command === 'build';
	const { VITE_PORT, VITE_OPEN, VITE_APP_TITLE, VITE_REPORT, VITE_SOURCE_MAP, VITE_GZIP } = toTransformConfig(env) as Config;

	return {
		// base: "/",
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		server: {
			cors: true,
			port: VITE_PORT,
			open: VITE_OPEN,
			host: '0.0.0.0',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
			// https: false,
		},
		plugins: [
			react(),
			splitVendorChunkPlugin(),
			// EsLint 报错信息显示在浏览器界面上
			eslintPlugin({
				include: ['src/**/*.ts', 'src/**/*.tsx', 'src/*.ts', 'src/*.tsx']
			}),
			createHtmlPlugin({
				inject: {
					data: {
						title: VITE_APP_TITLE,
						injectScript: IS_BUILD
							? IS_PROD
								? `<script src="/env.js?t=${Date.now()}"></script>`
								: `<script src="./script.${mode}.js?t=${Date.now()}"></script>`
							: `<script src="/public/script.${mode}.js"></script>`
					}
				}
			}),
			VITE_GZIP &&
				viteCompression({
					filter: (file: string) => {
						// 文档不压缩
						return !/.*docs.*/.test(file) && /\.(js|mjs|json|css|html)$/i.test(file);
					}
				}),
			VITE_REPORT && visualizer()
		],
		build: {
			sourcemap: !IS_BUILD && VITE_SOURCE_MAP,
			minify: 'esbuild',
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		}
	};
});
