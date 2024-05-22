# ne-html
A very convenient way to generate HTML elements using JavaScript

## Overview

Creating elements in a pure JavaScript environment can be a troublesome
affair. It requires a lot of steps per element and nesting and creating
many can quickly become something you don't want to deal with. In
environments such as Angular, or React, working with web components can
mean additional steps as well.

While React and other frameworks are lighter weight than something like
Angular, working with pure JavaScript in the latter space might be
desirable in some cases. An example is when other frameworks want to
manage two way binding and find themselves battling an Angular component
that wishes to do the same.

`HTML` allows creating many HTML elements in JavaScript with little
fuss and in a manner that other devs on your team can read legibly.

Additionally, it provides a mechanism that allows you to register a
previously created element (within the same runtime) that can be
given a name. This composite element can then be parameterized and
created in a clean way without having to deal directly with things
like webcomponents.

Finally, there is support for attaching a shadowDOM to your created
elements and inserting other elements quickly and easily.

## <a name="toc">Table of Contents</a>

 * [Installing](#installing)
 * [Getting Started](#getting-started)
 * [API](#api)
 * [Proxy Notes](#proxy-notes)
 * [Command Symbols](#proxy-commands)
 * [Composite Elements](#composite-elements)
 * [ShadowDOM](#shadowdom)
 * [JSDelivr](#using-jsdelivr)
 * [Change Log](#changelog)

## <a name="installing">Installing</a>
_[↩︎ Back to top](#toc)_

Install to your npm project using

```sh
npm i @nejs/html
```

Or if you want to directly use it on a webpage, see the jsdelivr
section [below](#using-jsdelivr).

## <a name="using-jsdelivr">Using jsdelivr cdn</a>
_[↩︎ Back to top](#toc)_

JS Delivr makes it very easy to grab a version of the library right from the
browser. To fetch the latest ESM module version you can write some code like
the following and add it your code

```js
const {
  HTML,
  commands,
} = await import (
  'https://cdn.jsdelivr.net/gh/nyteshade/ne-html/dist/esm/html.js'
);
```

Or in non ESM environments, the script can be added using a script tag, which
will create the `var nejs_html` which will have the object properties `HTML`
and `commands` exported.

```html
<script type="application/javascript" src="https://cdn.jsdelivr.net/gh/nyteshade/ne-html/dist/@nejs/html.bundle.latest.js"></script>
```

If you would prefer to create and append the script tag using JavaScript, here
is a nice little pasteable script.

```js
async function nsJsHtmlScript(useDocument) {
  const doc = useDocument ?? top.document;
  const deferred = { promise: undefined };
  const jsDelivrBase = 'https://cdn.jsdelivr.net';
  const url = new URL(
    '/gh/nyteshade/ne-html/dist/@nejs/html.bundle.latest.js',
    jsDelivrBase
  );

  deferred.promise = new Promise((resolve, reject) => {
    Object.assign(deferred, { resolve, reject })
  })

  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('type', 'application/javascript');
  scriptTag.setAttribute('src', url.href);
  scriptTag.onload = function() {
    deferred.resolve(globalThis?.nejs?.html);
  }

  doc.body.append(scriptTag);
  return deferred.promise;
}

const { HTML, commands } = await nsJsHtmlScript();
```

## <a name="getting-started">Getting Started</a>
_[↩︎ Back to top](#toc)_

In its base form, the syntax looks a bit like
this:

```js
const element = HTML.create('div', 'text node content');
```

This is far more terse than the equivalent

```js
const element = document.createElement('div');
element.append(document.createTextNode('text node content'));
```

And while this is not a big deal, this is also a very small example,
and almost never do you need a contrived example as simple as this.
When you need to set attributes and styles, gets even more complex.

Let's look at this MDN example:

```html
<div class="preference">
  <label for="cheese">Do you like cheese?</label>
  <input type="checkbox" name="cheese" id="cheese" />
</div>

<div class="preference">
  <label for="peas">Do you like peas?</label>
  <input type="checkbox" name="peas" id="peas" />
</div>
```

Creating this with JavaScript would be something like the following:

```js
const preference1 = document.createElement('div');
const label1 = document.createElement('label');
const textInput1 = document.createElement('input');

const preference2 = document.createElement('div');
const label2 = document.createElement('label');
const textInput2 = document.createElement('input');

label1.append(document.createTextNode('Do you like cheese?'));
label1.setAttribute('for', 'cheese');
textInput1.setAttribute('type', 'checkbox');
textInput1.setAttribute('name', 'cheese');
textInput1.setAttribute('id', 'cheese');
preference1.classList.add('preference');
preference1.append(label1, textInput1);

label2.append(document.createTextNode('Do you like peas?'));
label2.setAttribute('for', 'peas');
textInput2.setAttribute('type', 'checkbox');
textInput2.setAttribute('name', 'peas');
textInput2.setAttribute('id', 'peas');
preference2.classList.add('preference');
preference2.append(label2, textInput1);
```

However, using the `HTML` class, it looks more like this:

```js
const preference1 = HTML.div({
  class: 'preference',
  children: [
    HTML.label({for: 'cheese', content: 'Do you like cheese?' }),
    HTML.input({type: 'checkbox', id: 'cheese', name: 'cheese' }),
  ]
});

const preference2 = HTML.div({
  class: 'preference',
  children: [
    HTML.label({for: 'peas', content: 'Do you like peas?' }),
    HTML.input({type: 'checkbox', id: 'peas', name: 'peas' }),
  ]
});
```

## <a name="api">API</a>
_[↩︎ Back to top](#toc)_

The `HTML.create()` method is the primary interface. As hinted above,
you can use the tag name as a property off of HTML, but it is actually
a proxied shortcut. It also uses the `HTML.create()` method.

**<a name="api-html-create">HTML.create()</a>**

Creates an HTML element based on specified options, applying
attributes, styles, content, and potentially a shadow DOM with
custom CSS variables.

Strings supplied for 'content' will be wrapped in a DOM TextNo
rather than applied as innerHTML; this is intentional.
The HTML.create() method can receive its input in one of two
manners, either in normal ordered input format (as with most
functions) or it can be given a name and then supplied an obje
with more values. This latter format provides more flexibility
and some helper values that translate automatically into their
expected locations on the created element.

**_Ordered Parameters (only name is required)_**

  1. **`name`** - the tag name
  2. **`content`** - optional string of content for the tag
  3. **`style`** - an object with style properties that will be
     applied as a style attribute. So `{ fontName: 'courier' }
     becomes `<tag style="font-name: 'courier';">`
  4. **`attributes`** - an object of additional tag attributes that
     are applied using `element.setAttribute`. So an object
     with `{ id: 'identifier' }` becomes `<tag id="identifier">`
  5. **`webComponentName`** - this must be supplied if the element
     being created is a web component. This should be a string
     that will automatically be converted to `{ is: value }`
     before being used with `document.createElement()`
  6. **`useDocument`** - a way to specify an alternate `document`
     object than the global `document`. Can be used to denote
     a frame's `document` or another window's `document`
  7. **`children`** - an array of `HTMLElement` object instances tha
     or strings that will be appended to the created element.
  8. **`shadow`** - if preset, this should be either an object or
     an array. If supplied as an array, it will represent
     `HTMLElement` instances that are inserted into the attach
     shadowRoot of the created element. If it is an object it
     should have the keys `options` and `children`. Omitting
     either value will result in defaults being added. The
     default shadow dom options are `{ mode: 'open',
     clonable: true, slotAssignment: 'named' }`. These can
     be overridden individually or as a whole by specifying
     each and their new value in `{shadow: {options: { ... }}}

**_Object Parameters (only name is required)_**

  1. **`name`**
  2. **`config`**
     The config can process the above ordered properties when given
     as object keys. These map, in the same order, as the ordered
     parameters that were just described above:
     `content`, `style`, `attributes`, `webComponentName`,
     `useDocument`, `children`, `shadow`

Additionally, the following properties can be supplied
  - **`class`**: this property becomes a `class="value"` attribute
    on the resulting element.
  - **`classes`**: this must be an array of strings, non-string
    values will be ignored. Each will be joined with a space
    in between and appended to any previously existing class
    attribute. If no previous class attribute exists, one
    will be created. If the resulting filter of non-strings
    leaves an empty string, and not previous class attribute
    was otherwise specified, no class attribute will be create
  - **`dataset`**: any object supplied here will have its keys and
    values set on the element.dataset object. When assigning
    keys and values to this object in a browser they become
    attributes on a tag with the 'data-' prefix. These values
    must be valid names or an error will occur. Camel cased
    values will be shown with dashes. So `'greatScott'` become
    `<tag data-great-scott>`.

Finally, any properties in the config object that have not been
mentioned, will be translated to an attribute of the resulting
element. So `HTML.div({id: 'fun'})` becomes `<div id="fun"></div>`

Some Examples:

```js
// Create a simple element with content:
const element = HTML.create('div', {content: 'Hello, world!'})
document.body.appendChild(element);
```

```js
// Using the prototype chain proxy, simpler syntax can be
// achieved.
const element = HTML.div('Hello world');
// <div>Hello world</div>
// This syntax is also overloaded for convenience in many ways
const element = HTML.div([
  HTML.label({ for: 'input-name', content: 'Name' }),
  HTML.input({ id: 'input-name, type: 'text' }),
])
// <div>
//   <label for="input-name">Name</label>
//   <input type="text" id="input-name">
// </div>
```

**<a name="api-html-register">HTML[commands.register]</a>**
<br><a>_↩︎ Back to_</a> ◌ _[ Top](#toc)_ ◌ _[API](#api)_

Registers a factory function under a given name with optional
configuration, binding context, and additional arguments. This
method stores the factory function and its associated data in a
centralized storage, allowing for retrieval and utilization
elsewhere in the application. For read only or otherwise immutable
components, the factories can be fairly simply. Simply stamping
down a new component as one might expect.

For composite components that support dynamism in their creation
a more complex factory is often required, but also engenders
greater reusability. *[See example](#composite-elements)*

 * **{** *string* **}** **name -** The unique name to register the factory
   function under.
 * **{** *Function* **}** **factoryFunction -** The factory function to
   register.
 * **{** *Object* **}** **[config={}] -** Optional configuration object for
   the factory function.
 * **{** *any* **}** **thisArg -** The value of `this` to be used when
   invoking the factory function.
 * **{** *...any* **}** **args -** Additional arguments to pass to the
   factory function upon invocation.

```js
HTML[commands.register](
  'SmRedButton',
  buttonFactory,
  {color: 'red'},
  this,
  'small'
);

const button = HTML.SmRedButton();

// This registers a `buttonFactory` under the name 'SmRedButton'
// with a configuration specifying the color as 'red', binds
// `this` for context, and passes 'small' as an argument.
```

**<a name="api-html-registered">HTML[commands.registered]</a>**
<br><a>_↩︎ Back to_</a> ◌ _[ Top](#toc)_ ◌ _[API](#api)_

Invoking the `HTML[commands.registered]()` function will return a
*Iterable* that can be walked or converted to an array using either
`[...HTML[commands.registered]()]` or `Array.from(HTML[commands.registered]())`.
The elements inside are a set of entries, in the format:

```js
[[registeredName, registeredMetadata]]
```

Each `registeredMetadata` is a `Map` that has at least these four keys
registered for each composite component

 * `factory` - the function that generates html elements when invoked
 * `config` - the preset configuration that allows you to, by default,
   get different output from the same function under differently
   registered names
 * `thisArg` - an optional `this` for the `factory` function execution.
   *Note: if you supply a big arrow function (`() => {}`) then you will
   not be able to apply a `thisArg` to its execution. Use a normal
   function if this is a need you have.*
 * `args` - note that arguments here are essential the first n-arguments
   in order, but if your factory doesn't support working with configs

Effectively, when a composite element is created, this data is used like
this:

```js
(...dynamicArgs) => factory.call(
  thisArg,
  config,
  ...args,
  ...dynamicArgs
)
```

Where `args` are the arguments at the time of registration, and
`dynamicArgs` are those passed into the call.

```js
const button = HTML.SmRedButton(clickHandler);

// would result in an invocation similar to the following, assuming
// you were using the example used in HTML[commands.registered]
factory.call(thisArg, {color: 'red'}, 'small', clickHandler);
```

## <a name="proxy-notes">A note on the proxy in the prototype (what?!)</a>
_[↩︎ Back to top](#toc)_

The `HTML` class has a proxy inserted in its prototype chain. This
proxy allows you to do the magic that is `HTML.div` instead of the
more verbose `HTML.create('div')`.

The way it works is that the proxy checks for previously registered
composite elements (see below) and then it checks if the property
was 'create' (_as in `HTML.create`_). If it was neither of those,
then it invokes `HTML.create` using the property name as the
`tagName`.

Since there is no `div` property on the `HTML` class, it considers this
property access to evaluate to a bound version of `HTML.create` with
the already supplied first parameter, the tag name, of `div`.

### <a name="proxy-commands">What are the `commands` symbols?</a>
_[↩︎ Back to top](#toc)_

In some of these examples you'll see an import like

```js
import {HTML, commands} from '@nejs/html';
```

Well as noted above, we don't want to pollute the `HTML` property
space with anything that might be a tag you want to use in your
application. The proxy in the prototype, checks for `string` properties,
not symbols.

Ala, extra functionality via the magic of the `Symbol` class. If you
don't know what a symbol is in JavaScript, take a look at the
[MDN site for Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).

The only real command of import for external users is the `register`
command.

 * **`commands.register`** - this is used to tell `HTML` that you
   have a factory function that when invoked will return a valid
   `HTMLElement`. While no type checking is done, failure to follow
   this pattern may result in confusion.

## <a name="composite-elements">Composite elements</a>
_[↩︎ Back to top](#toc)_

Sometimes you may have created a custom element that you want to reuse,
again without creating something like an Angular component or installing
React. In this case, the `HTML` class allows you to register a factory
function that returns an element.

Let's take the above example with a label and checkbox input type. If
you'll recall it looked like this.

```js
const preference1 = HTML.div({
  class: 'preference',
  children: [
    HTML.label({for: 'cheese', content: 'Do you like cheese?' }),
    HTML.input({type: 'checkbox', id: 'cheese', name: 'cheese' }),
  ]
});
```

Let's turn this into a composite, and reusable element. Factory
functions receive a config object as their first parameter. This
parameter provides a non-argument based method of customizing the
output of the factory function.

Functionally, there are three key bits of information a labeled
checkbox needs to track. The `id`, which needs to match the `for`
attribute of the label.. The `name` attribute which is important
for the form to know which checkbox was checked. And lastly, the
text content for the label itself.

If we want to default to "preference" for the class of the containing
div, then we don't need to do anything, but we can make it flexible
by using that value unless its defined;

```js
const defaultConfig = {
  label: 'undefined',
  name: 'undefined',
  id: 'undefined',
  class: 'preference',
}

function LabeledCheckbox(config = defaultConfig) {
  const id = config?.id ?? Math.random().toString(36).slice(2);
  const name = config?.name;
  const labelText = config?.label;

  const element = HTML.div([
    HTML.label({ for: id, content: labelText }),
    HTML.input({ type: 'checkbox', id, name })
  ]);

  element.classList.add(config?.class ?? 'preference');

  return element;
}
```

At this point, if we call `LabeledCheckbox()` we will get the
elements but there are going to be a lot `"undefined"` values that
we don't want and its pretty verbose to specify the config each time.

So lets register it as a factory and see what it looks like

```js
HTML[commands.register]('LabeledCheckbox', LabeledCheckbox, {
  label: 'Do you like cheese?',
  name: 'cheese',
});

const checkbox1 = HTML.LabeledCheckbox();
```

This is pretty neat, but it will always ask the same question and
by itself, that's not very helpful. Let's modify our implementation
of `LabeledCheckbox`.

```js
function LabeledCheckbox(config = defaultConfig, ...args) {
  const [argsLabel, argsName] = args;

  const id = config?.id ?? Math.random().toString(36).slice(2);
  const name = config?.name;
  const labelText = argsLabel ?? config?.label ?? 'ERROR';

  const element = HTML.div([
    HTML.label({ for: id, content: labelText }),
    HTML.input({ type: 'checkbox', id, name })
  ]);

  element.classList.add(config?.class ?? 'preference');

  return element;
}
```

Now if we register this modified version which takes into account
the supplied arguments we get something more useful. _Ideally,
error checking and other measures should go into your factory
functions._

```js
const preferences = [
  HTML.LabeledCheckbox('Do you like cheese?', 'cheese'),
  HTML.LabeledCheckbox('Do you like peas?', 'peas'),
];

document.body.append(...preferences);
```

This is nice, neat, tidy and will feel a lot like using webcomponents,
Angular components or React. But it will be plain JavaScript.

## <a name="shadowdom">A final word about the shadowDOM</a>
_[↩︎ Back to top](#toc)_

ShadowDOM elements allow you to simplify your usage of shadowRoot
and attaching such to your elements after creation. While most of
the elements that use a shadowRoot are registered webcomponents,
you can add these to supported elements that are not such.

The following elements are allowed to have a shadow root attached

```js
'article', 'aside', 'blockquote', 'body', 'div', 'footer',
'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'main', 'nav',
'p', 'section', 'span'
```

Additionally any element that has a tag name with a hyphen in it
will be allowed by the browser.

Creating an element with a shadowRoot using `HTML` is very simple. It
looks like this.

```js
const shadyDiv = HTML.div({shadow: [
  HTML.label({ for: 'name', content: 'What is your name?' }),
  HTML.input({ type: 'text', placeholder: 'Your name' }),
]})
```

Inspecting `shadyDiv` in a browser will often look like this:

```html
<div>
  #shadow-root (open)
</div>
```

This brings up an important note; the default options passed to
`element.attachShadow` are:

```js
{
  mode: 'open',
  clonable: true,
  slotAssignment: 'named',
}
```

These can be overridden by using the full object syntax when
adding a `shadowRoot` to your element using `HTML`. You will
need to supply one of the default applied values with a different
value to change it.

```js
const shadyDiv = HTML.div({shadow: {
  options: {
    mode: 'closed',
    clonable: false,
    slotAssignment: 'manual',
    // ...any other attachShadow() config value
  },
  children: [
    HTML.label({ for: 'name', content: 'What is your name?' }),
    HTML.input({ type: 'text', placeholder: 'Your name' }),
  ],
}})
```

## <a name="changelog">Changelog</a>
_[↩︎ Back to top](#toc)_
 * **3.0.2** - More typescript crap
 * **3.0.1** - Le sigh. Small oversight in `cssVar` property.
 * **3.0.0** - Provides more robust options.content conversion for text
   nodes. This will allow types to better and more naturally be converted
   whereas previously it was a bit too blind.

   Additionally full documentation for registered composite components
   and all typed methods are added to the built html.d.ts file so
   that TypeScript users, misguided as they are, will see documentation
   in its full glory.

   Major rev due to changing how levels and composite components are
   registered. Previously they were set to be invoked as a separate
   command but I realised that since we were deploying to a browser
   my previous concerns about horizontal scaling did not apply. Its
   not a server side component.
 * **2.4.3** - Adding comments to html.d.ts and fixing a small type issue.
 * **2.4.2** - TypeScript, you are the reason we cannot have nice things
 * **2.4.1** - TypeScript, ever annoying, needs some hand crafted
   types for HTML since it uses a Proxy in its prototype chain
 * **2.4.0** - Added unit tests for `HTML.Levels` and significantly
   improved documentation.
 * **2.3.0** - Added in the `HTML.Levels` composite element both
   as an example as well as the first use case upon which this
   library was heavily tested.
 * **2.1.0** - Added basic `vitest` tests and allowed registered
   composite elements to have a specified thisArg and variable
   parameters making them more reusable and configurable.
 * _All previous versions_ - anything prior to 2.1.0 is considered
   to be alpha and buggy. Only present for historical reasons.
