(globalThis.nejs = (globalThis.nejs||{})).html =(()=>{var O=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var $=Object.prototype.hasOwnProperty;var x=(c,e)=>{for(var s in e)O(c,s,{get:e[s],enumerable:!0})},N=(c,e,s,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of A(e))!$.call(c,t)&&t!==s&&O(c,t,{get:()=>e[t],enumerable:!(n=k(e,t))||n.enumerable});return c};var P=c=>N(O({},"__esModule",{value:!0}),c);var D={};x(D,{HTML:()=>m,commands:()=>d});var b=c=>c&&typeof c=="object",w=c=>Array.isArray(c),S=c=>typeof c=="string",M=typeof process<"u"&&process.env.NEJS_HTML_PREFIX,g=M||"@nejs.html",d={parse:Symbol.for(`${g}.init.parser`),parseOrdered:Symbol.for(`${g}.init.ordered.params`),parseNamed:Symbol.for(`${g}.init.named.params`),parseShadow:Symbol.for(`${g}.init.shadow.params`),createStorage:Symbol.for(`${g}.global.storage.key`),register:Symbol.for(`${g}.factory.element`),define:Symbol.for(`${g}.define.webcomponent`),additionalFunctions:Symbol.for(`${g}.result.prototype`),prefix:g},m=class c{static create(){let e=c[d.parse](...arguments),s=e?.useDocument??top.window.document,n=new CSSStyleSheet,t=s.querySelector("style#htmljs"),{tagName:i,webComponentName:o}=e,a=s.createElement(i,o);for(let[r,l]of e.attributes)if(b(r)){let u,{name:f,namespaceURI:p,qualifiedName:j}=r;namespaceURI||qualifiedName?(u=s.createAttributeNS(p,j),u.value=l,a.setAttributeNodeNS(u)):(S(f)||(f=!f&&String(f)||Object.valueOf.call(f).toString()||String(f)),u=s.createAttribute(f),u.value=l,a.setAttributeNode(u))}else{let u=typeof r=="symbol"&&r||String(r);a.setAttribute(u,l)}for(let[r,l]of Object.entries(e.style))a.style[r]=l;S(e.content)?a.append(s.createTextNode(e.content)):w(e.content)&&a.append(...e.content.map(r=>s.createTextNode(String(r))));for(let r of e.children)a.append(r);if(b(e.shadow)){let r=a.attachShadow(e.shadow.options);e.shadow.children&&e.shadow.children.length&&r.append(...e.shadow.children)}return b(e?.dataset)&&Object.assign(a.dataset,e.dataset),c[d.additionalFunctions]({element:a,reusableStyleSheet:n,reusableStyleElement:t}),Object.defineProperty(a,"identifier",{enumerable:!1,configurable:!1,writable:!0,value:`#${Math.random().toString(36).slice(2)}`}),a}static[d.parse](...e){let s=this[d.parseOrdered].bind(c),n=this[d.parseNamed].bind(c);if(e.length===0)throw new SyntaxError("HTML.create must have parameters!");if(e.length===1){let t=String(e[0]);return{tagName:t,...s(t)}}else{let t=e[0],i=e.slice(1),o=i?.[0];if(o&&typeof o=="object"){if(Array.isArray(o)){let a={tagName:t,...s(t,...i)};return a.children.length===0&&(a.children=a.content,a.content=void 0),a}return{tagName:t,...n(t,o)}}return{tagName:t,...s(t,...i)}}}static[d.parseOrdered](e,s,n,t,i,o,a,r){let l=c[d.parseShadow](e,r);return i&&(i={is:i}),b(t)&&!(t instanceof Map)&&(t=new Map(w(t)?t:Object.entries(t))),{content:s,style:n??{},attributes:t??new Map,webComponentName:i??void 0,useDocument:o??document,children:a??[],shadow:l}}static[d.parseNamed](e,s){let{content:n,style:t,attributes:i,webComponentName:o,useDocument:a,children:r,shadow:l,class:u,classes:f,dataset:p}=s,j=Object.keys({content:n,style:t,attributes:i,webComponentName:o,useDocument:a,children:r,shadow:l,class:u,classes:f,dataset:p}),h=this[d.parseOrdered](e,n,t,i,o,a,r,l);if(S(u)&&h.attributes.set("class",u),w(f)){let y=[h.attributes.get("class")||"",f.filter(v=>S(v)).join(" ")].join(" ").trim();y?h.attributes.set("class",y):h.attributes.has("class")&&!h.attributes.get("class")&&h.delete("class")}b(p)&&!w(p)&&(h.dataset=p);let T=Object.keys(s).filter(y=>!j.some(v=>v===y));for(let y of T)h.attributes.set(y,s[y]);return h}static[d.parseShadow](e,s){if(!s)return;let n=b(s)&&s,t={mode:"open",clonable:!0,slotAssignment:"named"},i=["article","aside","blockquote","body","div","footer","h1","h2","h3","h4","h5","h6","header","main","nav","p","section","span"];if(n&&!n?.tryAnyhow&&!(e.includes("-")||i.includes(e))&&(n=void 0,console.warn([`Elements with a name of "${e}" cannot `,`have an attached shadow DOM. Please see MDN documents.
`,`Supported elements are any with a dash in their name
`,`or any of these:
`,`  ${i.join(",")}
`].join(""))),n){let o=n?.options??{},a=w(n?.children)&&n.children||void 0;w(n)?n={children:n}:n.children=a??[],n.options={...t,...o}}return n}static[d.additionalFunctions]({element:e,reusableStyleSheet:s,reusableStyleElement:n,descriptorBase:t={enumerable:!1,configurable:!0}}){Object.defineProperty(e,"cssVar",{...t,value:{get(i,o){let a=`--${i}`,r=o||e?.shadowRoot||doc;if(!r||!a.startsWith("--"))throw new Error(["Invalid arguments: root and valid CSS variable name","are required."].join(" "));let l=r?.host??document.documentElement;return getComputedStyle(l).getPropertyValue(a).trim()||null},set(i,o,a){let r=a||e?.shadowRoot||doc,l=`--${i}`,f=`${e.shadowRoot?":host":":root"} { ${l}: ${o}; }`;s.replaceSync(f),r?.adoptedStyleSheets?r.adoptedStyleSheets=[s]:n?n.textContent=[...s].map(p=>p.cssText).join(" "):(n=c.style({id:"html_reusable_style_sheet",content:f}),document.head.appendChild(n))}}}),Object.defineProperty(e,"addTo",{...t,value:function(o,a=top.window.document){let r=a.querySelector(o);return r?.append&&typeof r.append=="function"?(r.append(this),!0):!1}}),Object.defineProperty(e,"addToBody",{...t,value:function(o=top.window.document){return o?.body?.append(this),o?.body?.contains(this)}}),Object.defineProperty(e,"addToHead",{...t,value:function(o=top.window.document){return o?.head?.append(this),o?.head?.contains(this)}})}static[d.createStorage](e,s=null,n=!0){let t=Reflect.has(globalThis,d.createStorage),[i,o]=[t,t&&globalThis[d.createStorage]||new Map];i||(globalThis[d.createStorage]=o);let a=n&&new Map||void 0,[r,l]=[o.has(e),e&&(o.get(e)??a)],u=n&&new Map||void 0,[f,p]=[l?.has(s),s&&(l?.get(s)??u)];return!r&&l&&o.set(e,l),!f&&p&&l?.set(s,p),p||l||o}static[d.register](e,s,n={},t,...i){let o=c[d.createStorage](d.register,e);o.set("factory",s),o.set("config",n),o.set("thisArg",t),o.set("args",i)}},R=Object.create(Function.prototype),q=new Proxy(R,{get(c,e,s){let n=m[d.createStorage](d.register,e,!1);if(n){let t=n.get("factory"),i=n.get("config"),o=n.get("thisArg"),a=n.get("args")??[];if(typeof t=="function"&&typeof i=="object")return o&&!t.prototype&&t.toString().includes("=>")&&console.warn([`HTML[${e}] is likely a big arrow function and`,"it was registered with a `thisArg` value. This","will not work as expected. You have been warned!"].join(" ")),(...r)=>t.call(o,i,...r)}return typeof e=="string"&&e!=="create"?m.create.bind(m,e):Reflect.get(c,e,s)}});Object.setPrototypeOf(m,q);return P(D);})();
//# sourceMappingURL=html.bundle.2.1.3.js.map
