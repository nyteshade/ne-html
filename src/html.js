/* html.js
 *
 * HTML is a class that aids with the JavaScript creation of HTML
 * elements in the browser. This is usually a multi-step process that
 * is significantly eased by having this helper class.
 *
 * MIT License
 *
 * Copyright (c) 2024 Brielle Harrison
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * Raptive Licensing Clause:
 * Notwithstanding the above, Brielle Harrison grants Raptive a
 * non-exclusive, non-transferable license to use, modify, and
 * distribute the Software within the scope of Raptive's business
 * operations. This license does not grant Raptive any ownership
 * rights to the Software, and any modifications or derivative works
 * created by Raptive shall be owned by Brielle Harrison. Brielle
 * Harrison retains full ownership of the Software and any future
 * versions developed by Brielle Harrison.
 */

// Non-exported helpers to make the code cleaner
const isObj = o => o && typeof o === 'object';
const isArr = o => Array.isArray(o);
const isStr = o => typeof o === 'string';

// Symbol identifier
const envPrefix = typeof process !== 'undefined' && process.env.NEJS_HTML_PREFIX;
const prefix = envPrefix || '@nejs.html';

/**
 * Defines a collection of unique symbols used as commands within
 * the HTML module. These symbols are used to uniquely identify
 * various operations and settings within the HTML component system.
 *
 * @property {Symbol} parse - Initializes the parser. This is where
 * the logic and detection of whether or not to use ordered or named
 * parameters occurs.
 * @property {Symbol} parseOrdered - Initializes the parser with
 * ordered parameters.
 * @property {Symbol} parseNamed - Initializes the parser with
 * named parameters.
 * @property {Symbol} createStorage - Creates a global storage key.
 * @property {Symbol} register - Registers a new factory element.
 * @property {Symbol} define - Defines a new web component.
 * @property {string} prefix - The prefix used for all symbol
 * definitions. Defined outside the commands object, but shipped with
 * it for other parsing if desired.
 *
 * @example
 * // Register a new element factory
 * HTML[commands.register]('custom-element', elementFactoryFunction);
 */
export const commands = {
  parse: Symbol.for(`${prefix}.init.parser`),
  parseOrdered: Symbol.for(`${prefix}.init.ordered.params`),
  parseNamed: Symbol.for(`${prefix}.init.named.params`),
  parseShadow: Symbol.for(`${prefix}.init.shadow.params`),

  createStorage: Symbol.for(`${prefix}.global.storage.key`),

  register: Symbol.for(`${prefix}.factory.element`),
  define: Symbol.for(`${prefix}.define.webcomponent`), // todo: implement this

  additionalFunctions: Symbol.for(`${prefix}.result.prototype`),

  prefix,
}

export class HTML {
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
    // Passed in arguments are validated and parsed using the
    // relevant parser. See HTML[commands.parse] for more details
    const options = HTML[commands.parse](...arguments);

    // Shorthand for the parsed.useDocument value. Should never be
    // null or undefined.
    const doc = options?.useDocument ?? top.window.document;

    // Reusable style sheet used and updated for all instances of the
    // HTMLElement instances created. These are used specifically
    // with the `cssVar` property `.get()` and `.set()` methods.
    const reusableStyleSheet = new CSSStyleSheet();

    // The first time that `cssVar` are used with an element that
    // does not possess a `shadowRoot`, an element is created and
    // placed in the DOM. This element has reused `id`, and since the
    // contents of the inserted stylesheet are irrelevant after each
    // call to `element.cssVar.set(key, value)`, the DOM element is
    // reused. If no HTML class generated elements use `.cssVar`,
    // then the expected value of `reusableStyleElement` is `null`.
    let reusableStyleElement = doc.querySelector('style#htmljs');

    // Create the element instance itself
    const { tagName: _tag, webComponentName: _wcn } = options;
    const element = doc.createElement(_tag, _wcn);

    // Based on the parsed attributes, apply each value using
    // logic depending on whether or not the key is an object
    // rather than a string or symbol.
    for (const [key, value] of options.attributes) {
      if (isObj(key)) {
        let attribute;
        let { name, namespaceURI: ns, qualifiedName: qn } = key;

        if (namespaceURI || qualifiedName) {
          attribute = doc.createAttributeNS(ns, qn);
          attribute.value = value;
          element.setAttributeNodeNS(attribute);
        }
        else {
          if (!isStr(name)) {
            name = (!name && String(name)) || (
              Object.valueOf.call(name).toString() ||
              String(name)
            );
          }
          attribute = doc.createAttribute(name);
          attribute.value = value;
          element.setAttributeNode(attribute);
        }
      }
      else {
        const validKey = (
          (typeof key === 'symbol' && key) ||
          String(key)
        );
        element.setAttribute(validKey, value);
      }
    }

    // For each `key`, `value`, pair in the `options.style` object,
    // apply to the `element.style` object. This action will
    // modify the style values of the element and end up with
    // a browser parsed style attribute on the element.
    for (const [key, value] of Object.entries(options.style)) {
      element.style[key] = value;
    }

    // ------------------------------------------------------------
    // Note: `options.content` is not a substitue for `.innerHTML`
    // intentionally. Create individual elements so that things
    // like event or instance state on the elements are retained
    // and not accidentally destroyed.
    // ------------------------------------------------------------

    // If the contents of the `options.content` property is a string,
    // then a `Text` node is created with the strings contents and
    // it is appended to the element.
    if (isStr(options.content)) {
      element.append(doc.createTextNode(options.content));
    }
    // Optionally if the options.content value is an Array, each
    // element is blindly coerced into a String and wrapped in a
    // browser `Text` node, before being appended in the supplied
    // order to the element.
    else if (isArr(options.content)) {
      element.append(
        ...(options.content.map(e => doc.createTextNode(String(e)))),
      );
    }

    // Any child nodes/elements in the `options.children` array,
    // will be appended to the element in the order they exist in
    // the array.
    for (const child of options.children) {
      element.append(child);
    }

    // A truthy `.shadow` object property, validated in the init
    // parse methods, will result in a `shadowRoot` being attached
    // to the element. Any `.shadow.children` elements or nodes will
    // be attached to the `shadowRoot` after being created. The
    // default `.shadow.options` will be applied to the attached
    // `shadowRoot`.
    if (isObj(options.shadow)) {
      const root = element.attachShadow(options.shadow.options);

      if (options.shadow.children && options.shadow.children.length) {
        root.append(...options.shadow.children);
      }
    }

    // An object of validly named string keys to string values will
    // be set on the `element.dataset` object. This action will
    // generate the associated `data-` attributes on the element.
    if (isObj(options?.dataset)) {
      Object.assign(element.dataset, options.dataset);
    }

    // Apply some additional functions to the element post creation
    // that can make life a bit easier.
    HTML[commands.additionalFunctions]({
      element, reusableStyleSheet, reusableStyleElement
    });

    Object.defineProperty(element, 'identifier', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: `#${Math.random().toString(36).slice(2)}`,
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
    // Grab these out to make the code a bit more readable. Bind
    // them in case relative static references are made to the HTML
    // class itself.
    const parseOrdered = this[commands.parseOrdered].bind(HTML);
    const parseNamed = this[commands.parseNamed].bind(HTML);

    // Only true error case; we need at least a tag name here
    if (args.length === 0) {
      throw new SyntaxError('HTML.create must have parameters!')
    }

    // If we get a string as the tagName we can proceed. All
    // other parametes will be set to default by the call to
    // `parseOrdered`.
    if (args.length === 1) {
      const tagName = String(args[0]);
      return { tagName, ...(parseOrdered(tagName)) };
    }

    // If we get an object as the first parameter, this is either
    // going to be an array or a config object.
    else {
      const tagName = args[0];
      const rest = args.slice(1);
      const firstParam = rest?.[0];

      if (firstParam && typeof firstParam === 'object') {
        // If the firstParam is an array, then a custom flow is
        // enacted. All other ordered parameters will be checked as
        // though an ordered parameter invocation has occurred. If
        // `.content` has length but `.children` does not, then we
        // assume `children` were sent as the `content` and `content`
        // itself is set to `null` and its value is moved to
        // `children`
        if (Array.isArray(firstParam)) {
          // Convert all remaining parameters
          const result = {
            tagName,
            ...parseOrdered(tagName, ...rest)
          };

          // Special flow expectation. If `.children` is an empty
          // array then the contents of `.content` is assumed to have
          // been meant for `.children` as a shorthand.
          //
          // Note: in the case that `.children` has `length` and
          // `.content` also is an array with `length`. Then the
          // elements of `.content` will be coerced into strings in
          // the `HTML.create()` call.
          if (result.children.length === 0) {
            result.children = result.content;
            result.content = undefined;
          }

          return result;
        }

        // If we made it here, we assume we have a config object that
        // needs to be parsed by `parsedNamed`.
        return { tagName, ...(parseNamed(tagName, firstParam)) };
      }

      // At this point, we can only assume that we have an ordered
      // set of parameters and that flow will be invoked.
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
  static [commands.parseOrdered](
    tagName, content, style, attributes, webComponentName,
    useDocument, children, shadow,
  ) {
    // The shadow object's presence, lets us know we wish to
    // add a shadow DOM to the element being created.
    const _shadow = HTML[commands.parseShadow](tagName, shadow);

    // When webComponentName is supplied to document.createElement,
    // it must be encapsulated in an object with the `is` property
    if (webComponentName) {
      webComponentName = { is: webComponentName };
    }

    // Convert any non-Map object supplied for `.attributes` to
    // a map with the same keys and values. If an array of [key,
    // value] entry arrays is supplied, that array is blindly
    // passed to the new Map constructor. Handle with care!
    if (isObj(attributes) && !(attributes instanceof Map)) {
      attributes = new Map(isArr(attributes)
        ? attributes
        : Object.entries(attributes)
      );
    }

    return {
      content,
      style: style ?? {},
      attributes: attributes ?? new Map(),
      webComponentName: webComponentName ?? undefined,
      useDocument: useDocument ?? document,
      children: children ?? [],
      shadow: _shadow,
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
    // Extract expected properties for ordered params
    // as well as object init helpers
    const {
      // ordered parameters
      content, style, attributes, webComponentName,
      useDocument, children, shadow,

      // helpers when using object init
      class: klass, classes, dataset,

      // all other keys are assumed to be attributes
    } = params;

    const ignoredKeys = Object.keys({
      content, style, attributes, webComponentName,
      useDocument, children, shadow, class: klass,
      classes, dataset,
    })

    // parse the ordered parameters
    const parsed = this[commands.parseOrdered](
      tagName, content, style, attributes, webComponentName,
      useDocument, children, shadow,
    );

    // if we have a class property and its a string, set it
    // as an attribute to ease excess typing
    if (isStr(klass)) {
      parsed.attributes.set('class', klass);
    }

    // if classes is defined, and its an array, fetch all its
    // string elements and set them, separated by spaces, after
    // any previously defined class, as an attribute on the
    // element. If the class string is an empty string (i.e. with
    // 0 length), remove it from the attributes object so we
    // don't get a useless attribute taking up bytes.
    if (isArr(classes)) {
      const newClass = [
        (parsed.attributes.get('class') || ''),
        classes.filter(item => isStr(item)).join(' '),
      ].join(' ').trim();

      if (newClass) {
        parsed.attributes.set('class', newClass);
      }
      else if (
        parsed.attributes.has('class') &&
        !parsed.attributes.get('class')
      ) {
        parsed.delete('class');
      }
    }

    // Only allow the setting of a `.dataset` property if the
    // value is a non-array object.
    if (isObj(dataset) && !isArr(dataset)) {
      parsed.dataset = dataset;
    }

    // Convert all remaining non-special keys into attributes
    // in the resulting element.
    const convertToAttributes = Object.keys(params).filter(
      key => !ignoredKeys.some(ignoredKey => ignoredKey === key)
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
      return undefined;
    }

    let _shadow = isObj(shadowDOMOptions) && shadowDOMOptions;

    // Set some default, but overridable options for our created
    // shadow DOM
    let options = {
      mode: 'open',
      clonable: true,
      slotAssignment: 'named',
    };

    // First we must validate that an element can have a shadow
    // dom according to MDN docs, before processing options.shadow
    const supportedElements = [
      'article', 'aside', 'blockquote', 'body', 'div', 'footer',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'main', 'nav',
      'p', 'section', 'span'
    ];

    // Not in the list, or not containing a dash in the tag name,
    // means that the element cannot have an attached shadow dom
    // Unsupported, you can try to force it using shadow.tryAnyhow
    // but expect it to fail and throw an error.
    if (_shadow && (!_shadow?.tryAnyhow &&
      !(tagName.includes('-') || supportedElements.includes(tagName))
    )) {
      _shadow = undefined;
      console.warn([
        `Elements with a name of "${tagName}" cannot `,
        `have an attached shadow DOM. Please see MDN documents.\n`,
        `Supported elements are any with a dash in their name\n`,
        `or any of these:\n`,
        `  ${supportedElements.join(',')}\n`
      ].join(''));
    }

    // If `_shadow` is truthy, it means that we need to normalize
    // the supplied shadow values. It can be supplied as an array
    // signaling that the children of the supplied shadow object
    // should be children of the shadow DOM as opposed to those
    // of the element directly. If a whole object is supplied with
    // both `options` and `children` then we normalize those too
    if (_shadow) {
      // See if we have an object specifying options, remember that
      // arrays are also considered objects.
      const existingOpts = _shadow?.options ?? {};

      // Check to see if we have supplied a `children` property in
      // the supplied object.
      const existingKids =
        (isArr(_shadow?.children) && _shadow.children) || undefined;

      // If the _shadow object is an array, let's use its value as
      // the children property of our returned shadow object
      if (isArr(_shadow)) {
        _shadow = {children: _shadow};
      }

      // If the _shadow object is an object but not an array, then
      // create a children property and assign any extracted children
      else {
        _shadow.children = existingKids ?? [];
      }

      // Lastly, at this point we should have an object, not an array,
      // for the value of `_shadow`. Let's ensure the options use our
      // defaults and then overlay any previously extracted options
      // on top.
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
    element, reusableStyleSheet, reusableStyleElement,
    descriptorBase = { enumerable: false, configurable: true },
  }) {
    Object.defineProperty(element, 'cssVar', { ...descriptorBase,
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
          const root = layer ? layer : (element?.shadowRoot || doc);

          if (!root || !key.startsWith('--')) {
            throw new Error([
              'Invalid arguments: root and valid CSS variable name',
              'are required.'
            ].join(' '));
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
          const root = layer ? layer : (element?.shadowRoot || doc);
          const key = `--${variableSansLeadingDashes}`;
          const cssLayer = element.shadowRoot ? ':host' : ':root';
          const style = `${cssLayer} { ${key}: ${value}; }`;

          reusableStyleSheet.replaceSync(style);

          if (root?.adoptedStyleSheets) {
            root.adoptedStyleSheets = [reusableStyleSheet];
          }
          else {
            if (!reusableStyleElement) {
              reusableStyleElement = HTML.style({
                id: 'html_reusable_style_sheet',
                content: style
              });
              document.head.appendChild(reusableStyleElement);
            }
            else {
              reusableStyleElement
                .textContent = [...reusableStyleSheet]
                .map(rule => rule.cssText)
                .join(' ');
            }
          }
        }
      }}
    );

    Object.defineProperty(element, 'addTo', { ...descriptorBase,
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
      value: function addTo(selector, doc = top.window.document) {
        const located = doc.querySelector(selector);

        if (located?.append && typeof located.append === 'function') {
          located.append(this);
          return true;
        }
        else {
          return false;
        }
      }
    });

    Object.defineProperty(element, 'addToBody', { ...descriptorBase,
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
      value: function addToBody(doc = top.window.document) {
        doc?.body?.append(this);
        return doc?.body?.contains(this);
      }
    });

    Object.defineProperty(element, 'addToHead', { ...descriptorBase,
      /**
       * Adds this instance of HTMLElement to the document.head.
       * It's a small helper to reduce typing.
       *
       * @param {Document} doc - an alternate document object with a
       * `<head>` tag you wish to use other than `top.window.document`
       * @returns {boolean} true if the insertion was successful,
       * false otherwise.
       */
      value: function addToBody(doc = top.window.document) {
        doc?.head?.append(this);
        return doc?.head?.contains(this);
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
  static [commands.createStorage](
    forPrimaryKey,
    forSubKey = null,
    create = true
  ) {
    let _present = Reflect.has(globalThis, commands.createStorage);

    const [hasStorage, storage] = [
      _present,
      (_present && globalThis[commands.createStorage]) || new Map()
    ];
    if (!hasStorage) {
      globalThis[commands.createStorage] = storage;
    }

    const _pkTmp = create && new Map() || undefined;
    const [hasPkData, pkData] = [
      storage.has(forPrimaryKey),
      forPrimaryKey && (storage.get(forPrimaryKey) ?? _pkTmp)
    ];

    const _skTmp = create && new Map() || undefined;
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

  static [commands.register](name, factoryFunction, config = {}, thisArg, ...args) {
    const storage = HTML[commands.createStorage](
      commands.register,
      name,
    );

    storage.set('factory', factoryFunction);
    storage.set('config', config);
    storage.set('thisArg', thisArg);
    storage.set('args', args);
  }
}

// Duplicates the Function.prototype object so we don't affect it
const prototype = Object.create(Function.prototype);

// Applies a Proxy around the duplicated Function.prototype
const proxiedProto = new Proxy(
  prototype,
  {
    get(target, property, receiver) {
      const factoryElements = HTML[commands.createStorage](
        commands.register, property, false
      );

      if (factoryElements) {
        const factory = factoryElements.get('factory');
        const config = factoryElements.get('config');
        const thisArg = factoryElements.get('thisArg');
        const args = factoryElements.get('args') ?? [];

        if (
          typeof factory === 'function' &&
          typeof config === 'object'
        ) {
          if (
            thisArg &&
            !factory.prototype &&
            factory.toString().includes('=>')
          ) {
            console.warn([
              `HTML[${property}] is likely a big arrow function and`,
              `it was registered with a \`thisArg\` value. This`,
              `will not work as expected. You have been warned!`,
            ].join(' '))
          }
          return ((...args) => factory.call(thisArg, config, ...args));
        }
      }

      if (typeof property === 'string' && property !== 'create') {
        return HTML.create.bind(HTML, property);
      }

      return Reflect.get(target, property, receiver);
    },
  },
);

// Sets the prototype of the HTML class to the proxied Function
// prototype copy, ensuring that nothing detects anything odd
// about the HTML class itself, in spite of it having a custom
// proxy in its prototype chain.
Object.setPrototypeOf(HTML, proxiedProto);

// Register some basics

HTML[commands.register]('script:src', function scriptSource(
  config,
  source,
  attrs,
) {
  if (!source && typeof source !== 'string') {
    throw new SyntaxError('HTML["script:src"] must have a source param');
  }

  const src = String(source);
  const attributes = attrs ?? {};

  return HTML.script({
    src,
    attributes,
    type: 'application/javascript'
  });
}, {})

HTML[commands.register]('script:module', function scriptSource(
  config,
  srcOrImports,
  initialContent,
  attrs,
) {
  let src = undefined;
  let imports = [];

  if (srcOrImports) {
    if (Array.isArray(srcOrImports)) {
      imports = srcOrImports.map(item => {
        if (Array.isArray(item)) {
          const [nameOrNames, from] = item;
          let names = nameOrNames;
          if (!Array.isArray(nameOrNames)) {
            names = [String(nameOrNames)];
          }
          return `import { ${names.join(', ')} } from '${from}';`
        }
        else {
          return `import * from '${String(item)}';`;
        }
      });
    }
    else if (typeof srcOrImports === 'string') {
      src = srcOrImports;
    }
  }

  const attributes = attrs ?? {};
  let content = initialContent;

  if (src) {
    attributes.src = src;
  }

  if (imports.length) {
    content = `${imports.join('\n')}\n\n${content || ''}`;
  }

  return HTML.script({
    content,
    attributes,
    type: 'module'
  });
}, {})

HTML[commands.register]('link:rel', function scriptSource(
  config,
  url,
  rel = "stylesheet",
  attrs,
) {
  if (!url && typeof url !== 'string') {
    throw new SyntaxError('HTML["link:rel"] must have a url param');
  }

  const href = String(url);
  const attributes = attrs ?? {};

  return HTML.link({
    href,
    rel,
    attributes,
  });
}, {})

export default HTML;
