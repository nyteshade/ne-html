(globalThis.nejs = (globalThis.nejs||{})).html =(()=>{var k=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var O=Object.prototype.hasOwnProperty;var A=(r,e)=>{for(var s in e)k(r,s,{get:e[s],enumerable:!0})},E=(r,e,s,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of N(e))!O.call(r,t)&&t!==s&&k(r,t,{get:()=>e[t],enumerable:!(n=x(e,t))||n.enumerable});return r};var T=r=>E(k({},"__esModule",{value:!0}),r);var P={};A(P,{HTML:()=>g,commands:()=>u});var b=r=>r&&typeof r=="object",S=r=>Array.isArray(r),j=r=>typeof r=="string",M=typeof process<"u"&&process.env.NEJS_HTML_PREFIX,m=M||"@nejs.html",u={parse:Symbol.for(`${m}.init.parser`),parseOrdered:Symbol.for(`${m}.init.ordered.params`),parseNamed:Symbol.for(`${m}.init.named.params`),parseShadow:Symbol.for(`${m}.init.shadow.params`),createStorage:Symbol.for(`${m}.global.storage.key`),register:Symbol.for(`${m}.factory.element`),define:Symbol.for(`${m}.define.webcomponent`),additionalFunctions:Symbol.for(`${m}.result.prototype`),prefix:m},g=class r{static create(){let e=r[u.parse](...arguments),s=e?.useDocument??document,n=new CSSStyleSheet,t=s.querySelector("style#htmljs"),{tagName:c,webComponentName:i}=e,o=s.createElement(c,i);for(let[a,d]of e.attributes)if(b(a)){let l,{name:f,namespaceURI:h,qualifiedName:w}=a;namespaceURI||qualifiedName?(l=s.createAttributeNS(h,w),l.value=d,o.setAttributeNodeNS(l)):(j(f)||(f=!f&&String(f)||Object.valueOf.call(f).toString()||String(f)),l=s.createAttribute(f),l.value=d,o.setAttributeNode(l))}else{let l=typeof a=="symbol"&&a||String(a);o.setAttribute(l,d)}for(let[a,d]of Object.entries(e.style))o.style[a]=d;j(e.content)?o.append(s.createTextNode(e.content)):S(e.content)&&o.append(...e.content.map(a=>s.createTextNode(String(a))));for(let a of e.children)o.append(a);if(b(e.shadow)){let a=o.attachShadow(e.shadow.options);e.shadow.children&&e.shadow.children.length&&a.append(...e.shadow.children)}return b(e?.dataset)&&Object.assign(o.dataset,e.dataset),Object.defineProperties(o,{identifier:{enumerable:!1,configurable:!1,writable:!0,value:`#${Math.random().toString(36).slice(2)}`},cssVar:{enumerable:!1,value:{get(a,d){let l=`--${a}`,f=d||o?.shadowRoot||s;if(!f||!l.startsWith("--"))throw new Error(["Invalid arguments: root and valid CSS variable name","are required."].join(" "));let h=f?.host??document.documentElement;return getComputedStyle(h).getPropertyValue(l).trim()||null},set(a,d,l){let f=l||o?.shadowRoot||s,h=`--${a}`,p=`${o.shadowRoot?":host":":root"} { ${h}: ${d}; }`;n.replaceSync(p),f?.adoptedStyleSheets?f.adoptedStyleSheets=[n]:t?t.textContent=[...n].map(v=>v.cssText).join(" "):(t=r.style({id:"html_reusable_style_sheet",content:p}),document.head.appendChild(t))}}}}),o}static[u.parse](...e){let s=this[u.parseOrdered].bind(r),n=this[u.parseNamed].bind(r);if(e.length===0)throw new SyntaxError("HTML.create must have parameters!");if(e.length===1){let t=String(e[0]);return{tagName:t,...s(t)}}else{let t=e[0],c=e.slice(1),i=c?.[0];if(i&&typeof i=="object"){if(Array.isArray(i)){let o={tagName:t,...s(t,...c)};return o.children.length===0&&(o.children=o.content,o.content=void 0),o}return{tagName:t,...n(t,i)}}return{tagName:t,...s(t,...c)}}}static[u.parseOrdered](e,s,n,t,c,i,o,a){let d=r[u.parseShadow](e,a);return c&&(c={is:c}),b(t)&&!(t instanceof Map)&&(t=new Map(S(t)?t:Object.entries(t))),{content:s,style:n??{},attributes:t??new Map,webComponentName:c??void 0,useDocument:i??document,children:o??[],shadow:d}}static[u.parseNamed](e,s){let{content:n,style:t,attributes:c,webComponentName:i,useDocument:o,children:a,shadow:d,class:l,classes:f,dataset:h}=s,w=Object.keys({content:n,style:t,attributes:c,webComponentName:i,useDocument:o,children:a,shadow:d,class:l,classes:f,dataset:h}),p=this[u.parseOrdered](e,n,t,c,i,o,a,d);if(j(l)&&p.attributes.set("class",l),S(f)){let y=[p.attributes.get("class")||"",f.filter($=>j($)).join(" ")].join(" ").trim();y?p.attributes.set("class",y):p.attributes.has("class")&&!p.attributes.get("class")&&p.delete("class")}b(h)&&!S(h)&&(p.dataset=h);let v=Object.keys(s).filter(y=>!w.some($=>$===y));for(let y of v)p.attributes.set(y,s[y]);return p}static[u.parseShadow](e,s){if(!s)return;let n=b(s)&&s,t={mode:"open",clonable:!0,slotAssignment:"named"},c=["article","aside","blockquote","body","div","footer","h1","h2","h3","h4","h5","h6","header","main","nav","p","section","span"];if(n&&!n?.tryAnyhow&&!(e.includes("-")||c.includes(e))&&(n=void 0,console.warn([`Elements with a name of "${e}" cannot `,`have an attached shadow DOM. Please see MDN documents.
`,`Supported elements are any with a dash in their name
`,`or any of these:
`,`  ${c.join(",")}
`].join(""))),n){let i=n?.options??{},o=S(n?.children)&&n.children||void 0;S(n)?n={children:n}:n.children=o??[],n.options={...t,...i}}return n}static[u.createStorage](e,s,n=!0){let t=Reflect.has(globalThis,u.createStorage),[c,i]=[t,t&&globalThis[u.createStorage]||new Map];c||(globalThis[u.createStorage]=i);let o=n&&new Map||void 0,[a,d]=[i.has(e),e&&(i.get(e)??o)],l=n&&new Map||void 0,[f,h]=[i.has(s),s&&(i.get(s)??l)];return!a&&d&&i.set(e,d),!f&&h&&i.set(s,h),h||d||i}static[u.register](e,s,n){let t=r[u.createStorage](u.register,e);t.set("factory",s),t.set("config",n)}},R=Object.create(Function.prototype),D=new Proxy(R,{get(r,e,s){let n=g[u.createStorage](u.register,e,!1);if(n){let t=n.get("factory"),c=n.get("config");if(typeof t=="function"&&typeof c=="object")return()=>t(c)}return typeof e=="string"&&e!=="create"?g.create.bind(g,e):Reflect.get(r,e,s)}});Object.setPrototypeOf(g,D);return T(P);})();
//# sourceMappingURL=html.bundle.2.0.7.js.map
