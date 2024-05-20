(globalThis.nejs = (globalThis.nejs||{})).html =(()=>{var j=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var A=Object.prototype.hasOwnProperty;var N=(l,e)=>{for(var s in e)j(l,s,{get:e[s],enumerable:!0})},P=(l,e,s,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of T(e))!A.call(l,t)&&t!==s&&j(l,t,{get:()=>e[t],enumerable:!(o=O(e,t))||o.enumerable});return l};var M=l=>P(j({},"__esModule",{value:!0}),l);var q={};N(q,{HTML:()=>u,Levels:()=>$,commands:()=>h});var x=l=>l&&typeof l=="object",S=l=>Array.isArray(l),k=l=>typeof l=="string",R=typeof process<"u"&&process.env.NEJS_HTML_PREFIX,b=R||"@nejs.html",h={parse:Symbol.for(`${b}.init.parser`),parseOrdered:Symbol.for(`${b}.init.ordered.params`),parseNamed:Symbol.for(`${b}.init.named.params`),parseShadow:Symbol.for(`${b}.init.shadow.params`),createStorage:Symbol.for(`${b}.global.storage.key`),register:Symbol.for(`${b}.factory.element`),define:Symbol.for(`${b}.define.webcomponent`),additionalFunctions:Symbol.for(`${b}.result.prototype`),prefix:b},u=class l{static create(){let e=l[h.parse](...arguments),s=e?.useDocument??top.window.document,o=new CSSStyleSheet,t=s.querySelector("style#htmljs"),{tagName:r,webComponentName:n}=e,a=s.createElement(r,n);for(let[i,d]of e.attributes)if(x(i)){let f,{name:c,namespaceURI:g,qualifiedName:w}=i;namespaceURI||qualifiedName?(f=s.createAttributeNS(g,w),f.value=d,a.setAttributeNodeNS(f)):(k(c)||(c=!c&&String(c)||Object.valueOf.call(c).toString()||String(c)),f=s.createAttribute(c),f.value=d,a.setAttributeNode(f))}else{let f=typeof i=="symbol"&&i||String(i);a.setAttribute(f,d)}for(let[i,d]of Object.entries(e.style))a.style[i]=d;k(e.content)?a.append(s.createTextNode(e.content)):S(e.content)&&a.append(...e.content.map(i=>s.createTextNode(String(i))));for(let i of e.children)a.append(i);if(x(e.shadow)){let i=a.attachShadow(e.shadow.options);e.shadow.children&&e.shadow.children.length&&i.append(...e.shadow.children)}return x(e?.dataset)&&Object.assign(a.dataset,e.dataset),l[h.additionalFunctions]({element:a,reusableStyleSheet:o,reusableStyleElement:t}),Object.defineProperty(a,"identifier",{enumerable:!1,configurable:!1,writable:!0,value:`#${Math.random().toString(36).slice(2)}`}),a}static[h.parse](...e){let s=this[h.parseOrdered].bind(l),o=this[h.parseNamed].bind(l);if(e.length===0)throw new SyntaxError("HTML.create must have parameters!");if(e.length===1){let t=String(e[0]);return{tagName:t,...s(t)}}else{let t=e[0],r=e.slice(1),n=r?.[0];if(n&&typeof n=="object"){if(Array.isArray(n)){let a={tagName:t,...s(t,...r)};return a.children.length===0&&(a.children=a.content,a.content=void 0),a}return{tagName:t,...o(t,n)}}return{tagName:t,...s(t,...r)}}}static[h.parseOrdered](e,s,o,t,r,n,a,i){let d=l[h.parseShadow](e,i);return r&&(r={is:r}),x(t)&&!(t instanceof Map)&&(t=new Map(S(t)?t:Object.entries(t))),{content:s,style:o??{},attributes:t??new Map,webComponentName:r??void 0,useDocument:n??document,children:a??[],shadow:d}}static[h.parseNamed](e,s){let{content:o,style:t,attributes:r,webComponentName:n,useDocument:a,children:i,shadow:d,class:f,classes:c,dataset:g}=s,w=Object.keys({content:o,style:t,attributes:r,webComponentName:n,useDocument:a,children:i,shadow:d,class:f,classes:c,dataset:g}),m=this[h.parseOrdered](e,o,t,r,n,a,i,d);if(k(f)&&m.attributes.set("class",f),S(c)){let p=[m.attributes.get("class")||"",c.filter(v=>k(v)).join(" ")].join(" ").trim();p?m.attributes.set("class",p):m.attributes.has("class")&&!m.attributes.get("class")&&m.delete("class")}x(g)&&!S(g)&&(m.dataset=g);let y=Object.keys(s).filter(p=>!w.some(v=>v===p));for(let p of y)m.attributes.set(p,s[p]);return m}static[h.parseShadow](e,s){if(!s)return;let o=x(s)&&s,t={mode:"open",clonable:!0,slotAssignment:"named"},r=["article","aside","blockquote","body","div","footer","h1","h2","h3","h4","h5","h6","header","main","nav","p","section","span"];if(o&&!o?.tryAnyhow&&!(e.includes("-")||r.includes(e))&&(o=void 0,console.warn([`Elements with a name of "${e}" cannot `,`have an attached shadow DOM. Please see MDN documents.
`,`Supported elements are any with a dash in their name
`,`or any of these:
`,`  ${r.join(",")}
`].join(""))),o){let n=o?.options??{},a=S(o?.children)&&o.children||void 0;S(o)?o={children:o}:o.children=a??[],o.options={...t,...n}}return o}static[h.additionalFunctions]({element:e,reusableStyleSheet:s,reusableStyleElement:o,descriptorBase:t={enumerable:!1,configurable:!0}}){Object.defineProperty(e,"cssVar",{...t,value:{get(r,n){let a=`--${r}`,i=n||e?.shadowRoot||doc;if(!i||!a.startsWith("--"))throw new Error(["Invalid arguments: root and valid CSS variable name","are required."].join(" "));let d=i?.host??document.documentElement;return getComputedStyle(d).getPropertyValue(a).trim()||null},set(r,n,a){let i=a||e?.shadowRoot||doc,d=`--${r}`,c=`${e.shadowRoot?":host":":root"} { ${d}: ${n}; }`;s.replaceSync(c),i?.adoptedStyleSheets?i.adoptedStyleSheets=[s]:o?o.textContent=[...s].map(g=>g.cssText).join(" "):(o=l.style({id:"html_reusable_style_sheet",content:c}),document.head.appendChild(o))}}}),Object.defineProperty(e,"addTo",{...t,value:function(n,a=top.window.document){let i=a.querySelector(n);return i?.append&&typeof i.append=="function"?(i.append(this),!0):!1}}),Object.defineProperty(e,"addToBody",{...t,value:function(n=top.window.document){return n?.body?.append(this),n?.body?.contains(this)}}),Object.defineProperty(e,"addToHead",{...t,value:function(n=top.window.document){return n?.head?.append(this),n?.head?.contains(this)}})}static[h.createStorage](e,s=null,o=!0){let t=Reflect.has(globalThis,h.createStorage),[r,n]=[t,t&&globalThis[h.createStorage]||new Map];r||(globalThis[h.createStorage]=n);let a=o&&new Map||void 0,[i,d]=[n.has(e),e&&(n.get(e)??a)],f=o&&new Map||void 0,[c,g]=[d?.has(s),s&&(d?.get(s)??f)];return!i&&d&&n.set(e,d),!c&&g&&d?.set(s,g),g||d||n}static[h.register](e,s,o={},t,...r){let n=l[h.createStorage](h.register,e);n.set("factory",s),n.set("config",o),n.set("thisArg",t),n.set("args",r)}},L=Object.create(Function.prototype),C=new Proxy(L,{get(l,e,s){let o=u[h.createStorage](h.register,e,!1);if(o){let t=o.get("factory"),r=o.get("config"),n=o.get("thisArg"),a=o.get("args")??[];if(typeof t=="function"&&typeof r=="object")return n&&!t.prototype&&t.toString().includes("=>")&&console.warn([`HTML[${e}] is likely a big arrow function and`,"it was registered with a `thisArg` value. This","will not work as expected. You have been warned!"].join(" ")),(...i)=>t.call(n,r,...i)}return typeof e=="string"&&e!=="create"?u.create.bind(u,e):Reflect.get(l,e,s)}});Object.setPrototypeOf(u,C);function $(l,e="low",s=void 0,o={noBackground:!1,solid:!1,signal:!1}){let t=["low","medium","high"],{preset:r=e??"high",solid:n=!1,label:a=s,signal:i=!1,noBackground:d=!1}=l;for(let[p,v]of Object.entries(o||{}))Reflect.has(l,p)&&(l[p]=!!v);let f=new CSSStyleSheet,c={w:12,h:32},g={w:i?c.w*3:c.w},w=u.section({class:"levels",shadow:[u.style(`
        :host {
          --low-color: #8691B6;
          --medium-color: #5D6C9E;
          --high-color: #202B50;
          --gradient-height: ${c.h}px;
          --per-level-height: calc(var(--gradient-height) / 3);
          --level-height: 0%;
          --standard-box-shadows:
            inset 1px 0px 0px rgba(255 255 255 / 20%),
            inset 0px 1px 0px 0px rgba(255 255 255 / 40%),
            inset ${c.w-1}px 1px 0px 0px rgba(255 255 255 / 40%);
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
            width: ${c.w}px;

            &.no-background {
              background-color: unset;
              border: unset;
              box-shadow: unset;

              figure.level {
                box-shadow: var(--standalone-box-shadows);
              }
            }

            &.signal-aspect {
              width: ${c.w*3}px;

              &.no-background {
                figure.level {
                  opacity: 33%;
                  display: unset;
                }
              }

              &.low {
                figure.level:nth-child(2),
                figure.level:nth-child(3) {
                  display: none;
                }

                &.no-background {
                  figure.level:nth-child(2),
                  figure.level:nth-child(3) {
                    opacity: 33%;
                    display: unset;
                  }
                }
              }

              &.medium {
                figure.level:nth-child(3) {
                  display: none;
                }

                &.no-background {
                  figure.level:nth-child(3) {
                    opacity: 33%;
                    display: unset;
                  }
                }
              }

              figure.level:nth-child(1) {
                height: 33%;
                left: 0;
              }

              figure.level:nth-child(2) {
                height: 66%;
                left: ${c.w}px;
              }

              figure.level:nth-child(3) {
                height: 100%;
                left: ${c.w*2}px;
              }
            }

            &.low {
              figure.level:nth-child(1) {
                height: 33%;
                left: 0;
              }
            }

            &.medium {
              figure.level:nth-child(1) {
                height: 66%;
                left: 0
              }
            }

            &.high {
              figure.level:nth-child(1) {
                height: 100%;
                left: 0
              }
            }


            &.low.solid figure.level {
              background-image: unset !important;
              background-color: var(--low-color);
            }

            &.medium.solid figure.level {
              background-image: unset !important;
              background-color: var(--high-color);
            }

            &.high.solid figure.level {
              background-image: unset !important;
              background-color: var(--high-color);
            }

            figure.level {
              margin: 0;
              padding: 0;
              position: absolute;
              bottom: 0;
              left: 0;
              height: var(--level-height);
              width: ${c.w}px;
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
      `),u.article([u.figure({class:`levels ${r}`,children:[u.figure({class:"level"})].concat(i?[u.figure({class:"level"}),u.figure({class:"level"})]:[])})])]}),[m,y]=["article",".levels"].map(p=>w.shadowRoot.querySelector(p));if(m&&a&&typeof a=="string"&&m.append(u.span({content:a,class:"label"})),y){let p=[!!n&&"solid",!!i&&"signal-aspect",!!d&&"no-background"].filter(v=>v);y.classList.add(...p)}return Object.defineProperty(w,"setLevel",{value(p){i?(y[0].style.display=p===0?"none":"",y[1].style.display=p<=66?"none":"",y[2].style.display=p<100?"none":""):this.cssVar.set("level-height",`${p}%`)},enumerable:!1,configurable:!0,writable:!0}),w}return M(q);})();
//# sourceMappingURL=html.bundle.2.1.5.js.map
