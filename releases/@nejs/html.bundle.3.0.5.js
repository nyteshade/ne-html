(globalThis.nejs = (globalThis.nejs||{})).html = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var src_exports = {};
  __export(src_exports, {
    HTML: () => HTML,
    Levels: () => Levels,
    commands: () => commands
  });

  // src/html.js
  var isObj = (o) => o && typeof o === "object";
  var isArr = (o) => Array.isArray(o);
  var isStr = (o) => typeof o === "string";
  var envPrefix = typeof process !== "undefined" && process.env.NEJS_HTML_PREFIX;
  var prefix = envPrefix || "@nejs.html";
  var commands = {
    parse: Symbol.for(`${prefix}.init.parser`),
    parseOrdered: Symbol.for(`${prefix}.init.ordered.params`),
    parseNamed: Symbol.for(`${prefix}.init.named.params`),
    parseShadow: Symbol.for(`${prefix}.init.shadow.params`),
    createStorage: Symbol.for(`${prefix}.global.storage.key`),
    register: Symbol.for(`${prefix}.factory.element`),
    registered: Symbol.for(`${prefix}.list.factory.elements`),
    define: Symbol.for(`${prefix}.define.webcomponent`),
    // todo: implement this
    additionalFunctions: Symbol.for(`${prefix}.result.prototype`),
    prefix
  };
  var HTML = class _HTML {
    /**
     * Creates an HTML element based on specified options, applying
     * attributes, styles, content, and potentially a shadow DOM with
     * custom CSS variables.
     *
     * Strings supplied for 'content' will be wrapped in a DOM TextNode
     * rather than applied as innerHTML; this is intentional.
     *
     * The HTML.create() method can receive its input in one of two
     * manners, either in normal ordered input format (as with most
     * functions) or it can be given a name and then supplied an object
     * with more values. This latter format provides more flexibility
     * and some helper values that translate automatically into their
     * expected locations on the created element.
     *
     * Ordered Parameters (only name is required)
     *   1. name - the tag name
     *   2. content - optional string of content for the tag
     *   3. style - an object with style properties that will be
     *      applied as a style attribute. So `{ fontName: 'courier' }`
     *      becomes `<tag style="font-name: 'courier';">`
     *   4. attributes - an object of additional tag attributes that
     *      are applied using `element.setAttribute`. So an object
     *      with `{ id: 'identifier' }` becomes `<tag id="identifier">`
     *   5. webComponentName - this must be supplied if the element
     *      being created is a web component. This should be a string
     *      that will automatically be converted to `{ is: value }`
     *      before being used with `document.createElement()`
     *   6. useDocument - a way to specify an alternate `document`
     *      object than the global `document`. Can be used to denote
     *      a frame's `document` or another window's `document`
     *   7. children - an array of `HTMLElement` object instances that
     *      or strings that will be appended to the created element.
     *   8. shadow - if preset, this should be either an object or
     *      an array. If supplied as an array, it will represent
     *      `HTMLElement` instances that are inserted into the attached
     *      shadowRoot of the created element. If it is an object it
     *      should have the keys `options` and `children`. Omitting
     *      either value will result in defaults being added. The
     *      default shadow dom options are `{ mode: 'open',
     *      clonable: true, slotAssignment: 'named' }`. These can
     *      be overridden individually or as a whole by specifying
     *      each and their new value in `{shadow: {options: { ... }}}`
     *
     * Object Parameters (only name is required)
     *
     *   1. name
     *   2. config
     *
     * The config can process the above ordered properties when given
     * as object keys. These map, in the same order, as the ordered
     * parameters that were just described above:
     *
     *   `content`, `style`, `attributes`, `webComponentName`,
     *   `useDocument`, `children`, `shadow`
     *
     * Additionally, the following properties can be supplied
     *
     *   - `class`: this property becomes a `class="value"` attribute
     *     on the resulting element.
     *   - `classes`: this must be an array of strings, non-string
     *     values will be ignored. Each will be joined with a space
     *     in between and appended to any previously existing class
     *     attribute. If no previous class attribute exists, one
     *     will be created. If the resulting filter of non-strings
     *     leaves an empty string, and not previous class attribute
     *     was otherwise specified, no class attribute will be created
     *   - `dataset`: any object supplied here will have its keys and
     *     values set on the element.dataset object. When assigning
     *     keys and values to this object in a browser they become
     *     attributes on a tag with the 'data-' prefix. These values
     *     must be valid names or an error will occur. Camel cased
     *     values will be shown with dashes. So `'greatScott'` becomes
     *     `<tag data-great-scott>`.
     *
     * A Proxy is included in the prototype chain of the HTML class,
     * allowing first parameter, denoting the tags name, as a property
     * on the HTML class itself. See examples below.
     *
     * @param {...*} args - Arguments to configure the element.
     * @returns {Element} The newly created HTML element.
     * @example
     * // Create a simple element with content:
     * const element = HTML.create('div', {content: 'Hello, world!'});
     * document.body.appendChild(element);
     *
     * @example
     * // Using the prototype chain proxy, simpler syntax can be
     * // achieved.
     * const element = HTML.div('Hello world');
     * // <div>Hello world</div>
     *
     * // This syntax is also overloaded for convenience in many ways
     * const element = HTML.div([
     *   HTML.label({ for: 'input-name', content: 'Name' }),
     *   HTML.input({ id: 'input-name, type: 'text' }),
     * ])
     * // <div>
     * //   <label for="input-name">Name</label>
     * //   <input type="text" id="input-name">
     * // </div>
     */
    static create() {
      const options = _HTML[commands.parse](...arguments);
      const doc = options?.useDocument ?? top.window.document;
      const reusableStyleSheet = new CSSStyleSheet();
      let reusableStyleElement = doc.querySelector("style#htmljs");
      const { tagName: _tag, webComponentName: _wcn } = options;
      const element = doc.createElement(_tag, _wcn);
      for (const [key, value] of options.attributes) {
        if (isObj(key)) {
          let attribute;
          let { name, namespaceURI: ns, qualifiedName: qn } = key;
          if (namespaceURI || qualifiedName) {
            attribute = doc.createAttributeNS(ns, qn);
            attribute.value = value;
            element.setAttributeNodeNS(attribute);
          } else {
            if (!isStr(name)) {
              name = !name && String(name) || (Object.valueOf.call(name).toString() || String(name));
            }
            attribute = doc.createAttribute(name);
            attribute.value = value;
            element.setAttributeNode(attribute);
          }
        } else {
          const validKey = typeof key === "symbol" && key || String(key);
          element.setAttribute(validKey, value);
        }
      }
      for (const [key, value] of Object.entries(options.style)) {
        element.style[key] = value;
      }
      const validPrimitives = ["number", "symbol", "boolean", "bigint"];
      const contentType = typeof options.content;
      let textContent = void 0;
      if (isStr(options.content)) {
        textContent = [options.content];
      } else if (validPrimitives.includes(contentType)) {
        textContent = [String(options.content)];
      } else if (isArr(options.content)) {
        textContent = options.content.map((contentValue) => {
          const valueType = typeof contentValue;
          if ((isStr(contentValue) || validPrimitives.includes(valueType)) && !(valueType === "object" && contentValue?.valueOf)) {
            return String(contentValue);
          } else if (contentValue?.valueOf) {
            return String(contentValue.valueOf());
          } else {
            return void 0;
          }
        });
      }
      if (isArr(textContent)) {
        const nodes = textContent.filter((truthy) => truthy).map((s) => doc.createTextNode(s));
        if (nodes.length) {
          element.append(...nodes);
        }
      }
      for (const child of options.children) {
        element.append(child);
      }
      if (isObj(options.shadow)) {
        const root = element.attachShadow(options.shadow.options);
        if (options.shadow.children && options.shadow.children.length) {
          root.append(...options.shadow.children);
        }
      }
      if (isObj(options?.dataset)) {
        Object.assign(element.dataset, options.dataset);
      }
      _HTML[commands.additionalFunctions]({
        element,
        reusableStyleSheet,
        reusableStyleElement,
        doc
      });
      Object.defineProperty(element, "identifier", {
        enumerable: false,
        configurable: false,
        writable: true,
        value: `#${Math.random().toString(36).slice(2)}`
      });
      return element;
    }
    /**
     * Parses the provided arguments to construct a configuration
     * object for creating an HTML element. This method dynamically
     * determines the parsing strategy based on the number and type
     * of arguments provided.
     *
     * @param {...*} args - The arguments used to configure the web
     * component. The first argument is always the name of the
     * component. The subsequent arguments determine the properties
     * and children of the component.
     * @returns {Object} The configuration object for the web component
     * @throws {SyntaxError} If no arguments are provided.
     * @example
     * // Create a parsed arguments with default properties:
     * const {parse} = commands;
     * HTML[parse]('my-component');
     *
     * @example
     * // Create parsed arguments with named properties:
     * const {parse} = commands;
     * HTML[parse]('my-component', {
     *   id: 'unique-id',
     *   class: 'container'
     * });
     *
     * @example
     * // Create parsed arguments with children defined
     * // through an array:
     * const {parse} = commands;
     * HTML[parse]('my-component', ['child1', 'child2']);
     */
    static [commands.parse](...args) {
      const parseOrdered = this[commands.parseOrdered].bind(_HTML);
      const parseNamed = this[commands.parseNamed].bind(_HTML);
      if (args.length === 0) {
        throw new SyntaxError("HTML.create must have parameters!");
      }
      if (args.length === 1) {
        const tagName = String(args[0]);
        return { tagName, ...parseOrdered(tagName) };
      } else {
        const tagName = args[0];
        const rest = args.slice(1);
        const firstParam = rest?.[0];
        if (firstParam && typeof firstParam === "object") {
          if (Array.isArray(firstParam)) {
            const result = {
              tagName,
              ...parseOrdered(tagName, ...rest)
            };
            if (result.children.length === 0) {
              result.children = result.content;
              result.content = void 0;
            }
            return result;
          }
          return { tagName, ...parseNamed(tagName, firstParam) };
        }
        return { tagName, ...parseOrdered(tagName, ...rest) };
      }
    }
    /**
     * Constructs an object representing the configuration for a web
     * component, including its content, styles, attributes, and
     * shadow DOM options.
     *
     * @param {string} content - The inner content of the web component.
     * @param {Object} [style={}] - CSS styles to apply to the
     * component.
     * @param {Object} [attributes={}] - HTML attributes to set on
     * the component.
     * @param {string} [webComponentName] - Name for custom element
     * registration.
     * @param {Document} [useDocument=document] - The document context
     * to use.
     * @param {Array} [children=[]] - Child elements to append to the
     * component.
     * @param {boolean} [addShadowDOM=false] - Whether to attach a
     * shadow DOM.
     * @param {Object} [shadowDOMOpts={}] - Options for the shadow DOM.
     * @param {Array} [shadowChildren=[]] - Children to append to the
     * shadow DOM.
     * @returns {Object} The configuration object for the web component.
     *
     * @example
     * const symbol = Symbol.for('@raptive.html.init.ordered.params')
     * const config = HTML[symbol](
     *   'Hello, World!', {}, {}, 'my-component', document, [], true,
     *   { mode: 'open', clonable: true, slotAssignment: 'named' }, []
     * );
     */
    static [commands.parseOrdered](tagName, content, style, attributes, webComponentName, useDocument, children, shadow) {
      const _shadow = _HTML[commands.parseShadow](tagName, shadow);
      if (webComponentName) {
        webComponentName = { is: webComponentName };
      }
      if (isObj(attributes) && !(attributes instanceof Map)) {
        attributes = new Map(
          isArr(attributes) ? attributes : Object.entries(attributes)
        );
      }
      return {
        content,
        style: style ?? {},
        attributes: attributes ?? /* @__PURE__ */ new Map(),
        webComponentName: webComponentName ?? void 0,
        useDocument: useDocument ?? document,
        children: children ?? [],
        shadow: _shadow
      };
    }
    /**
     * Parses the named parameters and initializes the object with
     * additional attributes if specified. This method handles the
     * extraction and assignment of properties from a parameter object
     * to a new object with structured attributes for web components.
     *
     * @param {Object} params - The parameters object containing all
     * settings.
     * @param {string} params.content - The content for the web
     * component.
     * @param {Object} params.style - The style settings for the web
     * component.
     * @param {Object} params.attributes - Initial attributes for the
     * web component.
     * @param {string} params.webComponentName - The tag name for the
     * web component.
     * @param {Document} params.useDocument - The document to be used
     * for creating elements.
     * @param {Array} params.children - Child elements of the web
     * component.
     * @param {Object} params.shadow - Shadow DOM settings for the web
     * component.
     * @param {string} params.class - Class attribute for the web
     * component.
     * @param {string} params.id - ID attribute for the web component.
     * @param {Array} params.classes - Additional classes for the web
     * component.
     * @returns {Object} The parsed object with structured web
     * component settings.
     *
     * @example
     * const {parseNamed} = commands
     * const params = {
     *   content: 'Example',
     *   style: { color: 'red' },
     *   attributes: { 'data-type': 'primary' },
     *   webComponentName: 'custom-element',
     *   useDocument: document,
     *   children: [],
     *   shadow: {},
     *   class: 'main-class',
     *   id: 'unique-id',
     *   classes: ['additional-class', 'theme-dark']
     * };
     * const componentConfig = HTML[parseNamed](params);
     *
     * // Note that componentConfig will now have normalized even the
     * // helpers like class, id, and classes. Attributes should now
     * // look like this:
     * console.log(componentConfig.attributes);
     * // {
     * //   'data-type': 'primary',
     * //   id: 'main-class',
     * //   class: 'main-class additional-class theme-dark'
     * // }
     */
    static [commands.parseNamed](tagName, params) {
      const {
        // ordered parameters
        content,
        style,
        attributes,
        webComponentName,
        useDocument,
        children,
        shadow,
        // helpers when using object init
        class: klass,
        classes,
        dataset
        // all other keys are assumed to be attributes
      } = params;
      const ignoredKeys = Object.keys({
        content,
        style,
        attributes,
        webComponentName,
        useDocument,
        children,
        shadow,
        class: klass,
        classes,
        dataset
      });
      const parsed = this[commands.parseOrdered](
        tagName,
        content,
        style,
        attributes,
        webComponentName,
        useDocument,
        children,
        shadow
      );
      if (isStr(klass)) {
        parsed.attributes.set("class", klass);
      }
      if (isArr(classes)) {
        const newClass = [
          parsed.attributes.get("class") || "",
          classes.filter((item) => isStr(item)).join(" ")
        ].join(" ").trim();
        if (newClass) {
          parsed.attributes.set("class", newClass);
        } else if (parsed.attributes.has("class") && !parsed.attributes.get("class")) {
          parsed.delete("class");
        }
      }
      if (isObj(dataset) && !isArr(dataset)) {
        parsed.dataset = dataset;
      }
      const convertToAttributes = Object.keys(params).filter(
        (key) => !ignoredKeys.some((ignoredKey) => ignoredKey === key)
      );
      for (const attrKey of convertToAttributes) {
        parsed.attributes.set(attrKey, params[attrKey]);
      }
      return parsed;
    }
    /**
     * Parses the provided tag name and shadow DOM options to
     * determine if a shadow DOM can be attached to the specified
     * element. It validates the element against a set of criteria
     * including tag name and the presence of a hyphen, which is
     * required for custom elements that support shadow DOM.
     *
     * @param {string} tagName - The name of the tag to which the
     * shadow DOM might be attached.
     * @param {Object} shadowDOMOptions - Configuration options for
     * the shadow DOM, including whether to force attachment with
     * `tryAnyhow`.
     * @returns {Object|undefined} The normalized shadow DOM options
     * if the element is valid, otherwise `undefined`.
     *
     * @example
     * // To parse shadow DOM options for a custom element:
     * const shadowOptions = HTML[commands.parseShadow](
     *  'my-custom-element', { tryAnyhow: false }
     * );
     */
    static [commands.parseShadow](tagName, shadowDOMOptions) {
      if (!shadowDOMOptions) {
        return void 0;
      }
      let _shadow = isObj(shadowDOMOptions) && shadowDOMOptions;
      let options = {
        mode: "open",
        clonable: true,
        slotAssignment: "named"
      };
      const supportedElements = [
        "article",
        "aside",
        "blockquote",
        "body",
        "div",
        "footer",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "header",
        "main",
        "nav",
        "p",
        "section",
        "span"
      ];
      if (_shadow && (!_shadow?.tryAnyhow && !(tagName.includes("-") || supportedElements.includes(tagName)))) {
        _shadow = void 0;
        console.warn([
          `Elements with a name of "${tagName}" cannot `,
          `have an attached shadow DOM. Please see MDN documents.
`,
          `Supported elements are any with a dash in their name
`,
          `or any of these:
`,
          `  ${supportedElements.join(",")}
`
        ].join(""));
      }
      if (_shadow) {
        const existingOpts = _shadow?.options ?? {};
        const existingKids = isArr(_shadow?.children) && _shadow.children || void 0;
        if (isArr(_shadow)) {
          _shadow = { children: _shadow };
        } else {
          _shadow.children = existingKids ?? [];
        }
        _shadow.options = { ...options, ...existingOpts };
      }
      return _shadow;
    }
    /**
     * Defines additional functions on an element, particularly for
     * managing CSS variables through a dynamic interface. This
     * method enhances an element with methods to get and set CSS
     * variables efficiently, using either a shadow DOM or the global
     * document.
     *
     * @param {Object} config - The configuration object for
     * additional functions.
     * @param {Element} config.element - The DOM element to which the
     * functions will be attached.
     * @param {CSSStyleSheet} [config.reusableStyleSheet] - A reusable
     * style sheet for efficient style management. Optional.
     * @param {HTMLStyleElement} [config.reusableStyleElement] - A
     * style element that can be reused for dynamic style changes.
     * Optional.
     * @param {Object} [config.descriptorBase] - Base configuration
     * for property descriptors applied to the element.
     *
     * @example
     * // Define additional CSS variable functions on a custom element
     * MyCustomElement.additionalFunctions({
     *   element: document.querySelector('#myElement'),
     *   descriptorBase: { enumerable: true, configurable: true }
     * });
     */
    static [commands.additionalFunctions]({
      element,
      reusableStyleSheet,
      reusableStyleElement,
      doc,
      descriptorBase = { enumerable: false, configurable: true }
    }) {
      doc = doc || top.window.document;
      Object.defineProperty(
        element,
        "cssVar",
        {
          ...descriptorBase,
          value: {
            /**
             * Retrieves the value of a CSS variable from the specified
             * layer or the default document or shadow root.
             *
             * @param {string} variableSansLeadingDashes - The CSS
             * variable name without the leading '--'.
             * @param {Element|ShadowRoot|Document} [layer] - The context
             * from which to retrieve the CSS variable. If not specified,
             * defaults to the element's shadowRoot or the document.
             * @returns {string|null} The value of the CSS variable,
             * or null if not found.
             * @throws {Error} If no root is found or if the variable
             * name is invalid.
             * @example
             * // Assuming there is a CSS variable `--main-color`
             * // defined in the document:
             * const color = element.cssVar.get('main-color');
             * console.log(color); // Outputs the value of `--main-color`
             */
            get(variableSansLeadingDashes, layer) {
              const key = `--${variableSansLeadingDashes}`;
              const root = layer ? layer : element?.shadowRoot || doc;
              if (!root || !key.startsWith("--")) {
                throw new Error([
                  "Invalid arguments: root and valid CSS variable name",
                  "are required."
                ].join(" "));
              }
              const el = root?.host ?? document.documentElement;
              const styles = getComputedStyle(el);
              const value = styles.getPropertyValue(key).trim();
              return value || null;
            },
            /**
             * Sets a CSS variable on the specified layer or the default
             * document or shadow root.
             *
             * This method dynamically determines the appropriate CSS
             * layer (`:host` for shadow DOM, `:root` for the document)
             * and applies the CSS variable. If the shadow DOM or
             * document supports `adoptedStyleSheets`, it uses them;
             * otherwise, it falls back to creating or updating a
             * `<style>` element in the document head.
             *
             * @param {string} variableSansLeadingDashes - The CSS
             * variable name without the leading '--'.
             * @param {string} value - The value to set for the CSS
             * variable.
             * @param {Element|ShadowRoot|Document} [layer] - The context
             * in which to set the CSS variable. Defaults to the
             * element's shadowRoot or the document.
             *
             * @example
             * // Set the CSS variable `--main-color` to `blue` in the
             * // document:
             * element.cssVar.set('main-color', 'blue');
             *
             * @example
             * // Set the CSS variable `--main-color` to `blue` in a
             * // specific shadow root:
             * element.cssVar.set('main-color', 'blue', someShadowRoot);
             */
            set(variableSansLeadingDashes, value, layer) {
              const root = layer ? layer : element?.shadowRoot || doc;
              const key = `--${variableSansLeadingDashes}`;
              const cssLayer = element.shadowRoot ? ":host" : ":root";
              const style = `${cssLayer} { ${key}: ${value}; }`;
              reusableStyleSheet.replaceSync(style);
              if (root?.adoptedStyleSheets) {
                root.adoptedStyleSheets = [reusableStyleSheet];
              } else {
                if (!reusableStyleElement) {
                  reusableStyleElement = _HTML.style({
                    id: "html_reusable_style_sheet",
                    content: style
                  });
                  document.head.appendChild(reusableStyleElement);
                } else {
                  reusableStyleElement.textContent = [...reusableStyleSheet].map((rule) => rule.cssText).join(" ");
                }
              }
            }
          }
        }
      );
      Object.defineProperty(element, "addTo", {
        ...descriptorBase,
        /**
         * As the name of the function indicates, it adds this instance
         * of HTMLElement to an element specified by the supplied
         * CSS selector. If the `element` exists in the `document`, then
         * an attempt to insert this instance into that `element`.
         *
         * @param {string} selector - the CSS selector supplied to
         * denote the element within which this instance of HTMLElement
         * is to be inserted.
         * @param {Document} doc - an alternate document object with a
         * `<body>` tag you wish to use other than `top.window.document`
         * @returns {boolean} `true` if the insertion was successful,
         * `false` otherwise.
         */
        value: function addTo(selector, doc2 = top.window.document) {
          const located = doc2.querySelector(selector);
          if (located?.append && typeof located.append === "function") {
            located.append(this);
            return true;
          } else {
            return false;
          }
        }
      });
      Object.defineProperty(element, "addToBody", {
        ...descriptorBase,
        /**
         * As the name of the function indicates, it adds this instance
         * of HTMLElement to the document.body. It's a small helper to
         * reduce typing.
         *
         * @param {Document} doc - an alternate document object with a
         * `<body>` tag you wish to use other than `top.window.document`
         * @returns {boolean} `true` if the insertion was successful,
         * `false` otherwise.
         */
        value: function addToBody(doc2 = top.window.document) {
          doc2?.body?.append(this);
          return doc2?.body?.contains(this);
        }
      });
      Object.defineProperty(element, "addToHead", {
        ...descriptorBase,
        /**
         * Adds this instance of HTMLElement to the document.head.
         * It's a small helper to reduce typing.
         *
         * @param {Document} doc - an alternate document object with a
         * `<head>` tag you wish to use other than `top.window.document`
         * @returns {boolean} true if the insertion was successful,
         * false otherwise.
         */
        value: function addToBody(doc2 = top.window.document) {
          doc2?.head?.append(this);
          return doc2?.head?.contains(this);
        }
      });
    }
    /**
     * Creates or accesses a storage map for managing primary and sub
     * keys. This method ensures that a unique storage is available
     * globally for specified keys, allowing for structured data
     * storage across different components or modules.
     *
     * @param {string} forPrimaryKey - The primary key under which to
     * store or retrieve data.
     * @param {string} forSubKey - The sub key under which to store or
     * retrieve data within the primary key's map.
     * @param {boolean} [create=true] - Determines whether to create
     * a new storage map if one does not exist for the provided keys.
     * @returns {Map} Returns the storage map associated with the sub
     * key, or the primary key if no sub key is provided, or the
     * entire storage if neither key is provided.
     *
     * @example
     * // Create or access storage for a primary key 'userSettings'
     * // and sub key 'theme'
     * const themeStorage = HTML[commands.createStorage](
     *   'userSettings', 'theme'
     * );
     * // Use the storage to set a new theme
     * themeStorage.set('color', 'dark');
     */
    static [commands.createStorage](forPrimaryKey, forSubKey = null, create = true) {
      let _present = Reflect.has(globalThis, commands.createStorage);
      const [hasStorage, storage] = [
        _present,
        _present && globalThis[commands.createStorage] || /* @__PURE__ */ new Map()
      ];
      if (!hasStorage) {
        globalThis[commands.createStorage] = storage;
      }
      const _pkTmp = create && /* @__PURE__ */ new Map() || void 0;
      const [hasPkData, pkData] = [
        storage.has(forPrimaryKey),
        forPrimaryKey && (storage.get(forPrimaryKey) ?? _pkTmp)
      ];
      const _skTmp = create && /* @__PURE__ */ new Map() || void 0;
      const [hasSkData, skData] = [
        pkData?.has(forSubKey),
        forSubKey && (pkData?.get(forSubKey) ?? _skTmp)
      ];
      if (!hasPkData && pkData) {
        storage.set(forPrimaryKey, pkData);
      }
      if (!hasSkData && skData) {
        pkData?.set(forSubKey, skData);
      }
      return skData || pkData || storage;
    }
    /**
     * Registers a factory function under a given name with optional
     * configuration, binding context, and additional arguments. This
     * method stores the factory function and its associated data in a
     * centralized storage, allowing for retrieval and utilization
     * elsewhere in the application.
     *
     * For read only or otherwise immutable components, the factories
     * can be fairly simply. Simply stamping down a new component as
     * one might expect.
     *
     * For composite components that support dynamism in their creation
     * a more complex factory is often required, but also engenders
     * greater reusability.
     *
     * @param {string} name - The unique name to register the factory
     * function under.
     * @param {Function} factoryFunction - The factory function to
     * register.
     * @param {Object} [config={}] - Optional configuration object for
     * the factory function.
     * @param {any} thisArg - The value of `this` to be used when
     * invoking the factory function.
     * @param {...any} args - Additional arguments to pass to the
     * factory function upon invocation.
     *
     * @example
     * HTML[commands.register](
     *   'SmRedButton',
     *   buttonFactory,
     *   {color: 'red'},
     *   this,
     *   'small'
     * );
     *
     * const button = HTML.SmRedButton();
     *
     * // This registers a `buttonFactory` under the name 'SmRedButton'
     * // with a configuration specifying the color as 'red', binds
     * // `this` for context, and passes 'small' as an argument.
     */
    static [commands.register](name, factoryFunction, config = {}, thisArg = void 0, ...args) {
      const storage = _HTML[commands.createStorage](
        commands.register,
        name
      );
      storage.set("factory", factoryFunction);
      storage.set("config", config);
      storage.set("thisArg", thisArg);
      storage.set("args", args);
    }
    /**
     * Generator function that iterates over all registered component
     * factories. This method provides access to the internal storage
     * of registered factories, yielding each registered element's name
     * and its associated metadata.
     *
     * @yields {Array} An array containing the element name and its
     * metadata.
     *
     * @example
     * for (const [name, data] of HTML[commands.registered]()) {
     *   console.log(`Factory for ${name}:`, data);
     * }
     */
    static *[commands.registered]() {
      const storage = _HTML[commands.createStorage](commands.register);
      for (const [elementName, metadata] of storage.entries()) {
        yield [elementName, metadata];
      }
    }
  };
  var prototype = Object.create(Function.prototype);
  var proxiedProto = new Proxy(
    prototype,
    {
      get(target, property, receiver) {
        const factoryElements = HTML[commands.createStorage](
          commands.register,
          property,
          false
        );
        if (factoryElements) {
          const factory = factoryElements.get("factory");
          const config = factoryElements.get("config");
          const thisArg = factoryElements.get("thisArg");
          const args = factoryElements.get("args") ?? [];
          if (typeof factory === "function" && typeof config === "object") {
            if (thisArg && !factory.prototype && factory.toString().includes("=>")) {
              console.warn([
                `HTML[${property}] is likely a big arrow function and`,
                `it was registered with a \`thisArg\` value. This`,
                `will not work as expected. You have been warned!`
              ].join(" "));
            }
            return (...dynamicArgs) => factory.call(
              thisArg,
              config,
              ...args,
              ...dynamicArgs
            );
          }
        }
        if (typeof property === "string" && property !== "create") {
          return HTML.create.bind(HTML, property);
        }
        return Reflect.get(target, property, receiver);
      }
    }
  );
  Object.setPrototypeOf(HTML, proxiedProto);
  HTML[commands.register]("script:src", function scriptSource(config, source, attrs) {
    if (!source && typeof source !== "string") {
      throw new SyntaxError('HTML["script:src"] must have a source param');
    }
    const src = String(source);
    const attributes = attrs ?? {};
    return HTML.script({
      src,
      attributes,
      type: "application/javascript"
    });
  }, {});
  HTML[commands.register]("script:module", function scriptSource2(config, argOpts = {}) {
    if (isStr(argOpts)) {
      let url = void 0;
      let code2 = void 0;
      try {
        url = new URL(argOpts);
      } catch (ignore) {
        code2 = argOpts;
      }
      argOpts = {
        src: url?.href,
        imports: [],
        awaitImports: [],
        code: code2,
        attributes: {}
      };
    }
    let {
      src = config?.src,
      imports = [],
      awaitImports = [],
      code = config?.code,
      attributes = { ...config?.attributes || {} }
    } = argOpts;
    imports = [...config?.imports || [], ...imports];
    awaitImports = [...config?.awaitImports || [], ...awaitImports];
    const options = {
      ...config ?? {},
      src,
      imports,
      awaitImports,
      code,
      attributes
    };
    ({ src, imports, awaitImports, code, attributes } = options);
    const wantsContent = !!(code || imports.length || awaitImports.length);
    if (isStr(src) && wantsContent) {
      throw new SyntaxError(
        'HTML["script:module"] cannot have both content and "src"'
      );
    }
    let statements = [];
    if (src) {
      return HTML.script({
        src,
        type: "module",
        attributes
      });
    }
    const convertKeys = (keys) => {
      if (keys.length === 1)
        return `${keys[0]}`;
      let response = [];
      for (const key of keys) {
        if (isArr(key)) {
          if (key.length !== 2)
            continue;
          response.push(`${key[0]}: ${key[1]}`);
        } else
          response.push(key);
      }
      return response.length ? response.join(", ") : void 0;
    };
    for (const esmImport of [...imports, ...awaitImports]) {
      const isDynamicImport = awaitImports.includes(esmImport);
      if (!isArr(esmImport))
        continue;
      let [keys, value] = esmImport;
      keys = isStr(keys) ? [keys] : isArr(keys) ? keys : void 0;
      if (!isStr(value) || !keys)
        continue;
      const importValues = convertKeys(keys);
      if (!importValues)
        continue;
      if (isDynamicImport) {
        statements.push(
          `const ${importValues} = await import('${value}');`
        );
      } else {
        statements.push(
          `import ${importValues} from '${value}';`
        );
      }
    }
    if (code) {
      statements.push("");
      statements.push(String(code));
    }
    return HTML.script({
      content: statements.join("\n"),
      type: "module",
      attributes
    });
  }, {});
  HTML[commands.register]("link:rel", function scriptSource3(config, url, rel = "stylesheet", attrs) {
    if (!url && typeof url !== "string") {
      throw new SyntaxError('HTML["link:rel"] must have a url param');
    }
    const href = String(url);
    const attributes = attrs ?? {};
    return HTML.link({
      href,
      rel,
      attributes
    });
  }, {});

  // src/factories/levels.js
  function Levels(options, argLabel = void 0, argStyles) {
    const opportunities = ["low", "medium", "high"];
    let { preset, solid, label, signal, noBackground, percent } = options;
    preset = argStyles?.preset ?? preset;
    solid = argStyles?.solid ?? solid;
    label = argLabel ?? argStyles?.label ?? label;
    signal = argStyles?.signal ?? signal;
    noBackground = argStyles?.noBackground ?? noBackground;
    if (typeof percent !== "undefined") {
      preset = void 0;
      percent = Math.min(100, Math.max(0, parseInt(percent)));
    }
    const levelSheet = new CSSStyleSheet();
    const elemSize = { w: 12, h: 32 };
    const boxSize = { w: signal ? elemSize.w * 3 : elemSize.w };
    const element = HTML.section({
      class: "levels",
      shadow: [
        HTML.style(generateCSS(elemSize)),
        HTML.article([
          HTML.figure({
            class: `levels`,
            children: [
              HTML.figure({ class: `level` })
            ].concat(signal ? [
              HTML.figure({ class: `level` }),
              HTML.figure({ class: `level` })
            ] : [])
          })
        ])
      ]
    });
    const [article, levels] = ["article", ".levels"].map((s) => element.shadowRoot.querySelector(s));
    if (article && label && typeof label === "string") {
      article.append(HTML.span({
        content: label,
        class: "label"
      }));
    }
    if (levels) {
      const classes = [
        ["low", "medium", "high"].includes(preset) && preset,
        !!solid && "solid",
        !!signal && "signal-aspect",
        !!noBackground && "no-background"
      ].filter((className) => className);
      levels.classList.add(...classes);
    }
    Object.defineProperty(element, "setLevel", {
      value(percent2) {
        if (!signal) {
          this.cssVar.set("level-height", `${percent2}%`);
        } else {
          levels[0].style.display = percent2 === 0 ? "none" : "";
          levels[1].style.display = percent2 <= 66 ? "none" : "";
          levels[2].style.display = percent2 < 100 ? "none" : "";
        }
      },
      enumerable: false,
      configurable: true,
      writable: true
    });
    if (percent) {
      element.setLevel(percent);
    }
    return element;
  }
  function generateCSS(elemSize) {
    return `
    :host {
      --low-color: #8691B6;
      --medium-color: #5D6C9E;
      --high-color: #202B50;
      --gradient-height: ${elemSize.h}px;
      --per-level-height: calc(var(--gradient-height) / 3);
      --level-height: 0%;
      --standard-box-shadows:
        inset 1px 0px 0px rgba(255 255 255 / 20%),
        inset 0px 1px 0px 0px rgba(255 255 255 / 40%),
        inset ${elemSize.w - 1}px 1px 0px 0px rgba(255 255 255 / 40%);
      --standalone-box-shadows:
        inset 1px 0px 0px rgba(255 255 255 / 20%),
        inset 0px 1px 0px 0px rgba(255 255 255 / 40%),
        inset 11px 1px 0px 0px rgba(255 255 255 / 40%),
        0px 1px 0px 0px rgb(32 43 80 / 63%);

      font-family:
        Tenorite, -apple-system, "system-ui", "Segoe UI",
        Roboto, Oxygen-Sans, Ubuntu, Cantarell;
      font-size: 0;
      margin: 0 4px;

      display: inline-flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
    }

    article {
      display: inline-flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;

      figure.levels {
        background-color: darkgray;
        border: 1px solid white;
        box-shadow:
          1px 1px 3px rgb(0 0 0 / 25%),
          inset 1px 1px 2px rgb(0 0 0 / 45%);
        display: inline-flex;
        font-size: 16px;
        height: 32px;
        margin: 0;
        padding: 0;
        position: relative;
        width: ${elemSize.w}px;

        &.no-background {
          background-color: unset;
          border: unset;
          box-shadow: unset;

          figure.level {
            box-shadow: var(--standalone-box-shadows);
          }
        }

        &.signal-aspect {
          width: ${elemSize.w * 3}px;

          figure.level {
            opacity: 33%;
          }

          figure.level:nth-child(1) {
            left: 0;
            height: 33%;
          }

          figure.level:nth-child(2) {
            height: 66%;
            left: ${elemSize.w}px;
          }

          figure.level:nth-child(3) {
            height: 100%;
            left: ${elemSize.w * 2}px;
          }

          &.no-background {
            filter: drop-shadow(1px 1px 1px rgb(0 0 0 /50%));

            figure.level {
              opacity: 33%;
              display: unset !important;
            }

            &.low {
              figure.level:nth-child(1) {
                height: 33%;
                opacity: 100%;
              }
            }

            &.medium {
              figure.level:nth-child(1),
              figure.level:nth-child(2) {
                opacity: 100%;
              }
            }

            &.high {
              figure.level:nth-child(1),
              figure.level:nth-child(2),
              figure.level:nth-child(3) {
                opacity: 100%;
              }
            }
          }

          &.solid {
            figure.level:nth-child(1) {
              background-image: unset;
              background-color: var(--low-color);
            }
            figure.level:nth-child(2) {
              background-image: unset;
              background-color: var(--medium-color);
            }
            figure.level:nth-child(3) {
              background-image: unset;
              background-color: var(--high-color);
            }
          }

          &.low {
            figure.level:nth-child(1) {opacity: 100%;}
          }

          &.medium {
            figure.level:nth-child(1),
            figure.level:nth-child(2) {opacity: 100%;}
          }

          &.high {
            figure.level:nth-child(1),
            figure.level:nth-child(2),
            figure.level:nth-child(3) {opacity: 100%;}
          }
        }

        &.low {
          figure.level {
            height: 33%;
            left: 0;
          }

          &.solid {
            figure.level:only-child,
            figure.level:nth-child(1) {
              background-image: unset !important;
              background-color: var(--low-color);
            }
          }
        }

        &.medium {
          figure.level {
            height: 66%;
            left: 0
          }

          &.solid {
            figure.level:only-child,
            figure.level:nth-child(2) {
              background-image: unset !important;
              background-color: var(--medium-color);
            }
          }
        }

        &.high {
          figure.level {
            height: 100%;
            left: 0
          }

          &.solid {
            figure.level:only-child,
            figure.level:nth-child(3) {
              background-image: unset !important;
              background-color: var(--high-color);
            }
          }
        }

        figure.level {
          margin: 0;
          padding: 0;
          position: absolute;
          bottom: 0;
          left: 0;
          height: var(--level-height);
          width: ${elemSize.w}px;
          background-image: linear-gradient(
            to top,
            var(--low-color) var(--per-level-height),
            var(--medium-color) calc(var(--per-level-height) * 2),
            var(--high-color) calc(var(--per-level-height) * 3)
          );
          box-shadow: var(--standard-box-shadows);
          transition: height 0.3s ease, background-image 0.3s ease;
        }
      }

      span.label {
        margin-left: 0.5em;
        font-size: 16px;
      }
    }
  `;
  }
  var registerLevels = function(HTML2, commands2) {
    HTML2[commands2.register](
      "NELowSignalLevel",
      function(config, label, styles, ...args) {
        return Levels(config, ...[label, styles, ...args]);
      },
      { preset: "low", signal: true, noBackground: true }
    );
    HTML2[commands2.register](
      "NEMediumSignalLevel",
      function(config, label, styles, ...args) {
        return Levels(config, ...[label, styles, ...args]);
      },
      { preset: "medium", signal: true, noBackground: true }
    );
    HTML2[commands2.register](
      "NEHighSignalLevel",
      function(config, label, styles, ...args) {
        return Levels(config, ...[label, styles, ...args]);
      },
      { preset: "high", signal: true, noBackground: true }
    );
    HTML2[commands2.register](
      "NELevel",
      function NELevelFactory(config, percent, label, styles) {
        return Levels(
          config,
          label,
          { percent, ...styles || {} }
        );
      },
      { percent: 0 }
    );
  }.bind(void 0, HTML, commands)();
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=html.bundle.3.0.5.js.map
