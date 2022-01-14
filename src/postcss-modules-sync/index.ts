import Parser from './Parser'
import scopeGenerator from './scopeGenerator'
import localByDefault from 'postcss-modules-local-by-default'
import scope from 'postcss-modules-scope'
import postcss from 'postcss'
import genericNames from 'generic-names';

// @ts-ignore
function getScopedNameGenerator(opts) {
  const scopedNameGenerator = opts.generateScopedName || scopeGenerator;

  if (typeof scopedNameGenerator === 'function') return scopedNameGenerator;
  return genericNames(scopedNameGenerator, {context: process.cwd()});
}

export default postcss.plugin('postcss-css-modules', (opts = {}) => {
  const plugins = [localByDefault, scope];
  const parser = new Parser();

  // @ts-ignore
  scope.generateScopedName = getScopedNameGenerator(opts);

  // @ts-ignore
  return (css, result) => {
    // @ts-ignore
    const styles = postcss(plugins.concat(parser.plugin)).process(css).css;
    // @ts-ignore
    if (opts.getJSON != undefined) {
      // @ts-ignore
      opts.getJSON(parser.exportTokens)
    }
  }
})
