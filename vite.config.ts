/// <reference lib="es2015" />
import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

const __dirname = new URL('.', import.meta.url).pathname.replace(/\/$/, '');

const resolvePath = (...segments: string[]) => segments.join('/');

type OutputAsset = {
  type: 'asset';
  source: string | Uint8Array;
  fileName: string;
};

type OutputChunk = {
  type: 'chunk';
  code: string;
  fileName: string;
};

type OutputBundle = {
  [fileName: string]: OutputAsset | OutputChunk;
};

export default defineConfig({
  plugins: [
    vue(),
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: 51780,
      spaEntryPoints: 'src/main.ts',
      assetFileNames: 'assets/style.css',
      cssStrategy: 'none',
    }),
  ],
  resolve: {
    alias: {
      '@': resolvePath(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/_global_variables.scss" as *;`,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['bootstrap'],
      output: {
        globals: {
          bootstrap: 'bootstrap',
        },
      },
      plugins: [
        {
          name: 'pack-css',
          apply: 'build',
          enforce: 'post',
          generateBundle(_options, bundle: OutputBundle) {
            const cssFile = Object.keys(bundle).find((file): boolean =>
              file.endsWith('.css')
            );
            if (!cssFile) return;

            const rawCss = (bundle[cssFile] as OutputAsset).source.toString();

            const jsFile = Object.keys(bundle).find((file): boolean =>
              file.endsWith('.js')
            );
            if (!jsFile) return;

            const component = bundle[jsFile] as OutputChunk;
            const IIFEcss = `
              (function() {
                try {
                  var style = document.createElement('style');
                  style.innerText = ${JSON.stringify(rawCss)};
                  document.head.appendChild(style);
                } catch(e) {
                  console.error(e);
                }
              })()`;
            component.code += IIFEcss;
            delete bundle[cssFile];
          },
        } as Plugin,
      ],
    },
  },
  server: {
    port: 51780,
  },
});