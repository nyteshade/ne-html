export namespace commands {
    export let parse: symbol;
    export let parseOrdered: symbol;
    export let parseNamed: symbol;
    export let parseShadow: symbol;
    export let createStorage: symbol;
    export let register: symbol;
    export let registered: symbol;
    export let define: symbol;
    export let additionalFunctions: symbol;
    export { prefix };
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
    static create(...args: any[]): Element;
}
export default HTML;
declare const prefix: string;
