import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import FullReload from 'vite-plugin-full-reload';
import StimulusHMR from 'vite-plugin-stimulus-hmr';
import inject from "@rollup/plugin-inject";

export default defineConfig({
  clearScreen: false,
  plugins: [
    inject({   // => that should be first under plugins array
      $: 'jquery',
      jQuery: 'jquery',
    }),
    RubyPlugin(),
    FullReload(["config/routes.rb", "app/views/**/*"], { delay: 200 }),
    StimulusHMR()
  ],
  root: "./app/javascript",
  build: {
    manifest: true,
    rollupOptions: {
      input: "/app/javascript/entrypoints/application.js"
    }
  },
  resolve: {
    alias: {
      '~bootstrap': './node_modules/bootstrap'
    }
  }
})