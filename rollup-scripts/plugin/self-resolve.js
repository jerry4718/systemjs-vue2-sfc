import { dirname as pathDirname, resolve as pathResolve } from 'path';
import { existsSync } from 'fs';

export function rollupSelfResolve () {
  function resolve (path) {
    return pathResolve(process.cwd(), path);
  }

  const postcssLibReg = /node_modules\/postcss\/lib$/;
  const es6ExtensionReg = /\.es6(\?[^\/]*?|)$/;
  return {
    name: 'rollup-plugin-bundle-resolve',
    resolveId (importToken, importer, ...otherArgs) {

      if (importToken === 'postcss' || /node_modules\/postcss\/lib\/postcss$/.test(importToken)) {
        return resolve('node_modules/postcss/lib/postcss.es6');
      }

      if (importToken === 'postcss-modules-sync') {
        return resolve('node_modules/postcss-modules-sync/src/index.js');
      }

      if (importToken === '@vue/component-compiler-utils') {
        return resolve('node_modules/@vue/component-compiler-utils/lib/index.ts');
      }

      if (importToken === 'events') {
        return resolve('node_modules/events/event.js');
      }

      // console.log(`:::: ${source} :::: resolveId ::::`, JSON.stringify(otherArgs));
      if (postcssLibReg.test(importToken)) {
        if (!es6ExtensionReg.test(importToken)) {
          return importToken + '.es6'; // this signals that rollup should not ask other plugins or check the file system to find this id
        }
      }

      if (!importer) {
        return null;
      }

      let importerDir = pathDirname(importer);
      if (importer && es6ExtensionReg.test(importer) && postcssLibReg.test(importerDir) && /^\.\//.test(importToken)) {
        const postcssModule = pathResolve(importerDir, `${importToken}.es6`);
        console.log(`:::: ${postcssModule} ::::`);
        if (existsSync(postcssModule)) {
          if (!es6ExtensionReg.test(importToken)) {
            return postcssModule;
          }
        }
      }
      return null; // other ids should be handled as usually
    },
    load (id, ...otherArgs) {
      // console.log(`:::: ${id} :::: load ::::`, otherArgs);
      if (id === 'virtual-module') {
        return 'export default "This is virtual!"'; // the source code for "virtual-module"
      }
      return null; // other ids should be handled as usually
    },
  };
}
