// @ts-ignore
import replaceSymbols from 'icss-replace-symbols'

export default class Parser {
  exportTokens: {};
  translations: {};

  constructor(){
    this.exportTokens = {}
    this.translations = {}
  }

  // @ts-ignore
  extractExports = css => {
    // @ts-ignore
    css.each(node => {
      if (node.type === "rule" && node.selector === ":export") this.handleExport(node)
    })
  }

  // @ts-ignore
  handleExport = exportNode => {
    // @ts-ignore
    exportNode.each(decl => {
      if (decl.type === 'decl') {
        Object.keys(this.translations).forEach(translation => {
          // @ts-ignore
          decl.value = decl.value.replace(translation, this.translations[translation])
        })
        // @ts-ignore
        this.exportTokens[decl.prop] = decl.value
      }
    })
    exportNode.remove()
  }

  // @ts-ignore
  plugin = (css, result) => {
    replaceSymbols(css, this.translations)
    this.extractExports(css)
  }
}
