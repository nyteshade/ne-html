# ne-html
A very convenient way to generate HTML elements using JavaScript

## Overview

## Getting Started

## Using jsdeliv cdn
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
