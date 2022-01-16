System.register(["@vue/component-compiler-utils", "@/postcss-modules-sync/index", "@/SystemJSPrototype", "./postcss-clean", "path", "hash-sum", "vue-template-compiler"], function (exports_1, context_1) {
    "use strict";
    var component_compiler_utils_1, index_1, SystemJSPrototype_1, postcss_clean_1, path, hash_sum_1, vue_template_compiler_1, SFCCompiler;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (component_compiler_utils_1_1) {
                component_compiler_utils_1 = component_compiler_utils_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (SystemJSPrototype_1_1) {
                SystemJSPrototype_1 = SystemJSPrototype_1_1;
            },
            function (postcss_clean_1_1) {
                postcss_clean_1 = postcss_clean_1_1;
            },
            function (path_1) {
                path = path_1;
            },
            function (hash_sum_1_1) {
                hash_sum_1 = hash_sum_1_1;
            },
            function (vue_template_compiler_1_1) {
                vue_template_compiler_1 = vue_template_compiler_1_1;
            }
        ],
        execute: function () {
            SFCCompiler = class SFCCompiler {
                script;
                style;
                template;
                resolve;
                constructor(script, style, template, resolve = path.resolve) {
                    this.template = template;
                    this.style = style;
                    this.script = script;
                    this.resolve = resolve;
                }
                async compileToDescriptor(filename, source) {
                    const descriptor = component_compiler_utils_1.parse({
                        source,
                        filename,
                        needMap: true,
                        // @ts-ignore
                        compiler: vue_template_compiler_1.default,
                    });
                    const scopeId = 'data-v-' +
                        (this.template.isProduction
                            ? hash_sum_1.default(path.basename(filename) + source)
                            : hash_sum_1.default(filename + source));
                    const template = descriptor.template
                        ? await this.compileTemplate(filename, descriptor.template)
                        : undefined;
                    const styles = await Promise.all(descriptor.styles.map(style => this.compileStyle(filename, scopeId, style)));
                    const { script: rawScript, customBlocks } = descriptor;
                    const script = rawScript
                        ? {
                            code: rawScript.src
                                ? await SFCCompiler.read(rawScript.src, filename)
                                : rawScript.content,
                            map: rawScript.map,
                        }
                        : undefined;
                    return {
                        scopeId,
                        template,
                        styles,
                        script,
                        customBlocks,
                    };
                }
                async compileTemplate(filename, template) {
                    const { preprocessOptions, ...options } = this.template;
                    const functional = 'functional' in template.attrs;
                    return {
                        functional,
                        ...component_compiler_utils_1.compileTemplate({
                            ...options,
                            source: template.src
                                ? await SFCCompiler.read(template.src, filename)
                                : template.content,
                            filename,
                            preprocessLang: template.lang,
                            preprocessOptions: (template.lang &&
                                preprocessOptions &&
                                preprocessOptions[template.lang]) ||
                                {},
                            isFunctional: functional,
                        }),
                    };
                }
                async compileStyle(filename, scopeId, style) {
                    const { options, prepare } = await this.doCompileStyle(filename, scopeId, style);
                    return prepare(await component_compiler_utils_1.compileStyleAsync(options));
                }
                async doCompileStyle(filename, scopeId, style) {
                    let tokens = undefined;
                    const needsCSSModules = style.module === true || typeof style.module === 'string';
                    const needsCleanCSS = this.template.isProduction && !(this.style.postcssCleanOptions && this.style.postcssCleanOptions.disabled);
                    const postcssPlugins = (this.style.postcssPlugins || [])
                        .slice()
                        .concat([
                        needsCSSModules
                            ? index_1.default({
                                generateScopedName: '[path][local]-[hash:base64:4]',
                                ...this.style.postcssModulesOptions,
                                getJSON: (t) => {
                                    tokens = t;
                                },
                            })
                            : undefined,
                        needsCleanCSS
                            ? postcss_clean_1.default(this.style.postcssCleanOptions)
                            : undefined,
                    ])
                        .filter(Boolean);
                    const preprocessOptions = (style.lang &&
                        this.style.preprocessOptions &&
                        this.style.preprocessOptions[style.lang]) ||
                        {};
                    const source = style.src ? await SFCCompiler.read(style.src, filename) : style.content;
                    return {
                        options: {
                            source: preprocessOptions.data ? `${preprocessOptions.data}\n${source}` : source,
                            filename,
                            id: scopeId,
                            map: style.map,
                            scoped: style.scoped || false,
                            postcssPlugins,
                            postcssOptions: this.style.postcssOptions,
                            preprocessLang: style.lang,
                            preprocessOptions,
                            trim: this.style.trim,
                        },
                        prepare: result => ({
                            media: typeof style.attrs.media === 'string' ? style.attrs.media : undefined,
                            scoped: style.scoped,
                            moduleName: style.module === true ? '$style' : style.module,
                            module: tokens,
                            ...result,
                            code: result.code,
                        }),
                    };
                }
                static async read(filename, context) {
                    try {
                        let fetchWith = path.resolve(path.dirname(context), filename);
                        return SystemJSPrototype_1.SystemJSPrototype.fetch(/!text$/.test(fetchWith)
                            ? fetchWith
                            : fetchWith + '!text');
                    }
                    catch (e) {
                        if (/cannot find module/i.test(e.message)) {
                            throw Error(`Cannot find '${filename}' in '${context}'`);
                        }
                        throw e;
                    }
                }
            };
            exports_1("SFCCompiler", SFCCompiler);
        }
    };
});
//# sourceMappingURL=compiler.js.map