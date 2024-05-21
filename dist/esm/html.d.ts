
export const commands: {
  readonly parse: unique symbol;
  readonly parseOrdered: unique symbol;
  readonly parseNamed: unique symbol;
  readonly parseShadow: unique symbol;
  readonly createStorage: unique symbol;
  readonly register: unique symbol;
  readonly registered: unique symbol;
  readonly define: unique symbol;
  readonly additionalFunctions: unique symbol;
  readonly prefix: string;
};

/**
 * Represents the HTML class which provides methods to create and
 * manage HTML elements / dynamically. This class serves as a central
 * point for creating complex HTML structures / using JavaScript,
 * offering both ordered and named parameter handling for element
 * creation.
 *
 * @class HTML
 */
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
  static create(...args: any[]): HTMLElement;

  /**
   * Registers a function to create a script element with a specified
   * source. This function validates the source parameter and
   * constructs a script element with optional attributes.
   *
   * @param {Object} config - Configuration object (currently unused).
   * @param {string} source - The URL source for the script.
   * @param {Object} [attrs={}] - Additional attributes to apply to
   * the script tag.
   * @throws {SyntaxError} If the source parameter is not provided
   * or is not a string.
   * @returns {HTMLScriptElement} The constructed script element.
   *
   * @example
   * // Usage:
   * const scriptElement = HTML['script:src'](
   *   'https://example.com/script.js',
   *   { async: true }
   * );
   * document.body.appendChild(scriptElement);
   * // <script src="https://example.com/script.js" async></script>
   */
  static ['script:src']: (...args: any[]) => HTMLScriptElement;

  /**
   * Registers a function to create a module script element, optionally
   * with dynamic imports and inline code. This function can either
   * link to an external module via `src` or include inline module
   * code along with static and dynamic imports.
   *
   * @param {Object} config - Configuration object which may contain
   * default `src`, `code`, and `attributes`.
   * @param {Object} [argOpts={}] - Options object to override or
   * specify additional properties:
   *   - `src`: URL of the module script (if external).
   *   - `imports`: Array of static imports.
   *   - `awaitImports`: Array of dynamic imports.
   *   - `code`: Inline code to be included in the script.
   *   - `attributes`: HTML attributes for the script tag.
   * @throws {SyntaxError} If both `src` and content (`code`,
   * `imports`, or `awaitImports`) are provided.
   * @returns {HTMLScriptElement} The constructed script element,
   * either linked or inline based on provided options.ded options.
   *
   * @example
   * // Registering a module with external source:
   * HTML['script:module']({ src: 'https://example.com/module.js' });
   *
   * @example
   * // Or a supported shorthand is if args is URL convertible it will
   * // become the same as { src: argOpts }. If it is not, it but is
   * // still a string, it is assumed to be { code: argOpts }, so
   * HTML['script:module]('https://example.com/module.js') // or
   * HTML['script:modeul]('console.log("hello")') // both work safely
   *
   * @example
   * // Registering a module with inline code and imports:
   * HTML['script:module']({
   *   imports: [['defaultExport1', 'module1.js']],
   *   awaitImports: [['defaultExport', 'module2.js']],
   *   code: 'console.log("Inline module code executed");'
   * });
   *
   * // Generates
   * <script type="module">
   *   import defaultExport1 from 'module1.js';
   *   const { defaultExport } = await import('module2.js');
   *
   *   console.log("Inline module code executed");
   * </script>
   *
   * @example
   * HTML['script:module']({
   *  imports: [['defaultExport', 'module1.js']],
   *  awaitImports: [[['HTML', ['commands','Commands']] ,'@nejs/html']],
   * })
   *
   * // Generates
   * <script type="module">
   *   import defaultExport from 'module1.js';
   *   const { HTML, commands: Commands } = await import('@nejs/html');
   * </script>
   */
  static ['script:module']: (...args: any[]) => HTMLScriptElement;

  /**
   * Registers a function under the 'link:rel' command to create a
   * link element with specified attributes. This function ensures
   * that a URL is provided and constructs a link element with the
   * given relationship type and additional attributes.
   *
   * @param {Object} config - Configuration object (currently unused).
   * @param {string} url - The URL for the link element. Must be
   * a string.
   * @param {string} [rel="stylesheet"] - The relationship type of
   * the link element.
   * @param {Object} [attrs={}] - Additional attributes to apply to
   * the link element.
   * @throws {SyntaxError} If the `url` parameter is not provided or
   * is not a string.
   * @returns {HTMLLinkElement} The constructed link element.
   *
   * @example
   * // Usage:
   * HTML.link("https://example.com/stylesheet.css");
   *
   * // Generates
   * <link rel="stylesheet" href="https://example.com/stylesheet.css">
   */
  static ['link:rel']: (...args:[]) => HTMLLinkElement;

  /**
   * Creates a composite element that is shipped with the HTML class.
   * The low signal level is a sort of progress indiciator that shows
   * three vertical bars in ascending order from left to right. The
   * low signal variant, shows the first bar in color with the second
   * two in a translucent appearance to indicate they are not filled.
   *
   * It invokes the Levels factory method with the following default
   * configuration:
   *
   * ```js
   * { preset: 'low', signal: true, noBackground: true }
   * ```
   *
   * @param {string} label if the label parameter is provided, a
   * text label will appear adjacent to the right of the levels
   * icon that is generated.
   * @param {object} styles an optional object that supports setting
   * the following values:
   *   {string} preset - a string with one of 'low', 'medium', 'high'
   *     as values.
   *   {boolean} solid - if true, will prevent the component from
   *     indicating each vertical bar as a gradient and use a single
   *     color for each to differentiate their appearance.
   *   {string} label - same as the first parameter, applied here it
   *     will overwrite the value of the first parameter. You can
   *     supply an object with a getter for `label` using this
   *     approach if the value needs to be dynamic.
   *   {boolean} signal - if true, as is the default here, you will
   *     see three adjacent vertical bars instead of a single bar
   *     with a more dynamic value.
   *   {boolean} noBackground - if true, as is the default, there
   *     will be no rendered and shadowed border around the bars.
   *   {number} percent - a number value clamped from 0 to 100 that
   *     indicates how full the vertical bar in this component should
   *     be. [Note: does nothing if signal is true]
   */
  static NELowSignalLevel: (...args: []) => HTMLElement;

  /**
   * Creates a composite element that is shipped with the HTML class.
   * The medium signal level is a sort of progress indiciator that
   * shows three vertical bars in ascending order from left to right.
   * The medium signal variant, shows the first and second bar in
   * color with the third in a translucent appearance to indicate it
   * is not filled.
   *
   * It invokes the Levels factory method with the following default
   * configuration:
   *
   * ```js
   * { preset: 'medium', signal: true, noBackground: true }
   * ```
   *
   * @param {string} label if the label parameter is provided, a
   * text label will appear adjacent to the right of the levels
   * icon that is generated.
   * @param {object} styles an optional object that supports setting
   * the following values:
   *   {string} preset - a string with one of 'low', 'medium', 'high'
   *     as values.
   *   {boolean} solid - if true, will prevent the component from
   *     indicating each vertical bar as a gradient and use a single
   *     color for each to differentiate their appearance.
   *   {string} label - same as the first parameter, applied here it
   *     will overwrite the value of the first parameter. You can
   *     supply an object with a getter for `label` using this
   *     approach if the value needs to be dynamic.
   *   {boolean} signal - if true, as is the default here, you will
   *     see three adjacent vertical bars instead of a single bar
   *     with a more dynamic value.
   *   {boolean} noBackground - if true, as is the default, there
   *     will be no rendered and shadowed border around the bars.
   *   {number} percent - a number value clamped from 0 to 100 that
   *     indicates how full the vertical bar in this component should
   *     be. [Note: does nothing if signal is true]
   */
  static NEMediumSignalLevel: (...args: []) => HTMLElement;

  /**
   * Creates a composite element that is shipped with the HTML class.
   * The high signal level is a sort of progress indiciator that
   * shows three vertical bars in ascending order from left to right.
   * All three vertical bars will appear opaque and in color
   * indicating the "signal" is at its strongest.
   *
   * It invokes the Levels factory method with the following default
   * configuration:
   *
   * ```js
   * { preset: 'high', signal: true, noBackground: true }
   * ```
   *
   * @param {string} label if the label parameter is provided, a
   * text label will appear adjacent to the right of the levels
   * icon that is generated.
   * @param {object} styles an optional object that supports setting
   * the following values:
   *   {string} preset - a string with one of 'low', 'medium', 'high'
   *     as values.
   *   {boolean} solid - if true, will prevent the component from
   *     indicating each vertical bar as a gradient and use a single
   *     color for each to differentiate their appearance.
   *   {string} label - same as the first parameter, applied here it
   *     will overwrite the value of the first parameter. You can
   *     supply an object with a getter for `label` using this
   *     approach if the value needs to be dynamic.
   *   {boolean} signal - if true, as is the default here, you will
   *     see three adjacent vertical bars instead of a single bar
   *     with a more dynamic value.
   *   {boolean} noBackground - if true, as is the default, there
   *     will be no rendered and shadowed border around the bars.
   *   {number} percent - a number value clamped from 0 to 100 that
   *     indicates how full the vertical bar in this component should
   *     be. [Note: does nothing if signal is true]
   */
  static NEHighSignalLevel: (...args: []) => HTMLElement;

  /**
   * Creates a composite element that ships with the HTML class. This
   * variant of the Levels factory method shows a vertical bar, by
   * defalut with a rendered and shadowed border. The bar's height
   * can be adjusted by supplying a percent value as the first
   * parameter. The second parameter will optionally provide a label,
   * while the third allows full overrides of the styles.
   *
   * It invokes the Levels factory method with the following default
   * configuration:
   *
   * ```js
   * { percent: 0 }
   * ```
   *
   * @param {number} percent a value from 0 to 100, indicating the
   * percent complete the vertical bar is.
   * @param {string} label if the label parameter is provided, a
   * text label will appear adjacent to the right of the levels
   * icon that is generated.
   * @param {object} styles an optional object that supports setting
   * the following values:
   *   {string} preset - a string with one of 'low', 'medium', 'high'
   *     as values. low equates to 33% percent, medium 66% and high
   *     will be the same as 100%
   *   {boolean} solid - if true, will prevent the component from
   *     indicating each vertical bar as a gradient and use a single
   *     color for each to differentiate their appearance.
   *   {string} label - same as the first parameter, applied here it
   *     will overwrite the value of the first parameter. You can
   *     supply an object with a getter for `label` using this
   *     approach if the value needs to be dynamic.
   *   {boolean} signal - if true, you will see three adjacent
   *     vertical bars instead of a single bar with a more dynamic
   *     value. if true, percent will mean nothing and you must use
   *     the preset property to choose one of three values for display
   *   {boolean} noBackground - if true, as is the default, there
   *     will be no rendered and shadowed border around the bars.
   *   {number} percent - a number value clamped from 0 to 100 that
   *     indicates how full the vertical bar in this component should
   *     be. [Note: does nothing if signal is true]
   */
  static NELevel: (...args) => HTMLElement;

  static [tagName: string]: (...args: any[]) => HTMLElement;

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
  static [commands.parse](...args: any[]): Record<string | symbol, any>;

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
    tagName: string,
    content?: string | string[],
    style?: Record<string, string>,
    attributes?: Record<string, string>,
    webComponentName?: string,
    useDocument?: Document,
    children?: Node[],
    shadow?:
      | {
          options?: Record<string, any>;
          children?: Node[];
        }
      | Node[],
  ): Record<string | symbol, any>;

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
  static [commands.parseNamed](
    tagName: string,
    config: Record<any, any>,
  ): Record<string | symbol, any>;

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
  static [commands.parseShadow](
    tagName: string,
    shadowDOMOptions?:
      | {
          options?: Record<string, any>;
          children?: Node[];
        }
      | Node[],
  ): Record<string | symbol, any>;

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
  static [commands.additionalFunctions](args: any[]): void;

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
    forPrimaryKey: string,
    forSubKey?: string,
    create?: boolean,
  ): Map<any, any>;

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
  static [commands.register](
    name: string,
    factoryFunction: (...args: any[]) => any,
    config?: Record<any, any>,
    thisArg?: any,
    args?: any[],
  ): void;

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
  static [commands.registered](): Generator<[string, Map<string, any>], void, unknown>;
}
