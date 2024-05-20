(globalThis.nejs = (globalThis.nejs||{})).html =(()=>{var j=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var A=Object.prototype.hasOwnProperty;var N=(l,e)=>{for(var n in e)j(l,n,{get:e[n],enumerable:!0})},P=(l,e,n,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of T(e))!A.call(l,t)&&t!==n&&j(l,t,{get:()=>e[t],enumerable:!(s=O(e,t))||s.enumerable});return l};var M=l=>P(j({},"__esModule",{value:!0}),l);var q={};N(q,{HTML:()=>p,Levels:()=>$,commands:()=>h});var y=l=>l&&typeof l=="object",x=l=>Array.isArray(l),S=l=>typeof l=="string",L=typeof process<"u"&&process.env.NEJS_HTML_PREFIX,v=L||"@nejs.html",h={parse:Symbol.for(`${v}.init.parser`),parseOrdered:Symbol.for(`${v}.init.ordered.params`),parseNamed:Symbol.for(`${v}.init.named.params`),parseShadow:Symbol.for(`${v}.init.shadow.params`),createStorage:Symbol.for(`${v}.global.storage.key`),register:Symbol.for(`${v}.factory.element`),define:Symbol.for(`${v}.define.webcomponent`),additionalFunctions:Symbol.for(`${v}.result.prototype`),prefix:v},p=class l{static create(){let e=l[h.parse](...arguments),n=e?.useDocument??top.window.document,s=new CSSStyleSheet,t=n.querySelector("style#htmljs"),{tagName:r,webComponentName:o}=e,i=n.createElement(r,o);for(let[a,d]of e.attributes)if(y(a)){let c,{name:u,namespaceURI:g,qualifiedName:w}=a;namespaceURI||qualifiedName?(c=n.createAttributeNS(g,w),c.value=d,i.setAttributeNodeNS(c)):(S(u)||(u=!u&&String(u)||Object.valueOf.call(u).toString()||String(u)),c=n.createAttribute(u),c.value=d,i.setAttributeNode(c))}else{let c=typeof a=="symbol"&&a||String(a);i.setAttribute(c,d)}for(let[a,d]of Object.entries(e.style))i.style[a]=d;S(e.content)?i.append(n.createTextNode(e.content)):x(e.content)&&i.append(...e.content.map(a=>n.createTextNode(String(a))));for(let a of e.children)i.append(a);if(y(e.shadow)){let a=i.attachShadow(e.shadow.options);e.shadow.children&&e.shadow.children.length&&a.append(...e.shadow.children)}return y(e?.dataset)&&Object.assign(i.dataset,e.dataset),l[h.additionalFunctions]({element:i,reusableStyleSheet:s,reusableStyleElement:t}),Object.defineProperty(i,"identifier",{enumerable:!1,configurable:!1,writable:!0,value:`#${Math.random().toString(36).slice(2)}`}),i}static[h.parse](...e){let n=this[h.parseOrdered].bind(l),s=this[h.parseNamed].bind(l);if(e.length===0)throw new SyntaxError("HTML.create must have parameters!");if(e.length===1){let t=String(e[0]);return{tagName:t,...n(t)}}else{let t=e[0],r=e.slice(1),o=r?.[0];if(o&&typeof o=="object"){if(Array.isArray(o)){let i={tagName:t,...n(t,...r)};return i.children.length===0&&(i.children=i.content,i.content=void 0),i}return{tagName:t,...s(t,o)}}return{tagName:t,...n(t,...r)}}}static[h.parseOrdered](e,n,s,t,r,o,i,a){let d=l[h.parseShadow](e,a);return r&&(r={is:r}),y(t)&&!(t instanceof Map)&&(t=new Map(x(t)?t:Object.entries(t))),{content:n,style:s??{},attributes:t??new Map,webComponentName:r??void 0,useDocument:o??document,children:i??[],shadow:d}}static[h.parseNamed](e,n){let{content:s,style:t,attributes:r,webComponentName:o,useDocument:i,children:a,shadow:d,class:c,classes:u,dataset:g}=n,w=Object.keys({content:s,style:t,attributes:r,webComponentName:o,useDocument:i,children:a,shadow:d,class:c,classes:u,dataset:g}),f=this[h.parseOrdered](e,s,t,r,o,i,a,d);if(S(c)&&f.attributes.set("class",c),x(u)){let b=[f.attributes.get("class")||"",u.filter(k=>S(k)).join(" ")].join(" ").trim();b?f.attributes.set("class",b):f.attributes.has("class")&&!f.attributes.get("class")&&f.delete("class")}y(g)&&!x(g)&&(f.dataset=g);let m=Object.keys(n).filter(b=>!w.some(k=>k===b));for(let b of m)f.attributes.set(b,n[b]);return f}static[h.parseShadow](e,n){if(!n)return;let s=y(n)&&n,t={mode:"open",clonable:!0,slotAssignment:"named"},r=["article","aside","blockquote","body","div","footer","h1","h2","h3","h4","h5","h6","header","main","nav","p","section","span"];if(s&&!s?.tryAnyhow&&!(e.includes("-")||r.includes(e))&&(s=void 0,console.warn([`Elements with a name of "${e}" cannot `,`have an attached shadow DOM. Please see MDN documents.
`,`Supported elements are any with a dash in their name
`,`or any of these:
`,`  ${r.join(",")}
`].join(""))),s){let o=s?.options??{},i=x(s?.children)&&s.children||void 0;x(s)?s={children:s}:s.children=i??[],s.options={...t,...o}}return s}static[h.additionalFunctions]({element:e,reusableStyleSheet:n,reusableStyleElement:s,descriptorBase:t={enumerable:!1,configurable:!0}}){Object.defineProperty(e,"cssVar",{...t,value:{get(r,o){let i=`--${r}`,a=o||e?.shadowRoot||doc;if(!a||!i.startsWith("--"))throw new Error(["Invalid arguments: root and valid CSS variable name","are required."].join(" "));let d=a?.host??document.documentElement;return getComputedStyle(d).getPropertyValue(i).trim()||null},set(r,o,i){let a=i||e?.shadowRoot||doc,d=`--${r}`,u=`${e.shadowRoot?":host":":root"} { ${d}: ${o}; }`;n.replaceSync(u),a?.adoptedStyleSheets?a.adoptedStyleSheets=[n]:s?s.textContent=[...n].map(g=>g.cssText).join(" "):(s=l.style({id:"html_reusable_style_sheet",content:u}),document.head.appendChild(s))}}}),Object.defineProperty(e,"addTo",{...t,value:function(o,i=top.window.document){let a=i.querySelector(o);return a?.append&&typeof a.append=="function"?(a.append(this),!0):!1}}),Object.defineProperty(e,"addToBody",{...t,value:function(o=top.window.document){return o?.body?.append(this),o?.body?.contains(this)}}),Object.defineProperty(e,"addToHead",{...t,value:function(o=top.window.document){return o?.head?.append(this),o?.head?.contains(this)}})}static[h.createStorage](e,n=null,s=!0){let t=Reflect.has(globalThis,h.createStorage),[r,o]=[t,t&&globalThis[h.createStorage]||new Map];r||(globalThis[h.createStorage]=o);let i=s&&new Map||void 0,[a,d]=[o.has(e),e&&(o.get(e)??i)],c=s&&new Map||void 0,[u,g]=[d?.has(n),n&&(d?.get(n)??c)];return!a&&d&&o.set(e,d),!u&&g&&d?.set(n,g),g||d||o}static[h.register](e,n,s={},t,...r){let o=l[h.createStorage](h.register,e);o.set("factory",n),o.set("config",s),o.set("thisArg",t),o.set("args",r)}},R=Object.create(Function.prototype),C=new Proxy(R,{get(l,e,n){let s=p[h.createStorage](h.register,e,!1);if(s){let t=s.get("factory"),r=s.get("config"),o=s.get("thisArg"),i=s.get("args")??[];if(typeof t=="function"&&typeof r=="object")return o&&!t.prototype&&t.toString().includes("=>")&&console.warn([`HTML[${e}] is likely a big arrow function and`,"it was registered with a `thisArg` value. This","will not work as expected. You have been warned!"].join(" ")),(...a)=>t.call(o,r,...a)}return typeof e=="string"&&e!=="create"?p.create.bind(p,e):Reflect.get(l,e,n)}});Object.setPrototypeOf(p,C);function $(l,e=void 0,n){let s=["low","medium","high"],{preset:t,solid:r,label:o,signal:i,noBackground:a}=l;t=n?.preset??t,r=n?.solid??r,o=e??o,i=n?.signal??i,a=n?.noBackground??a;let d=new CSSStyleSheet,c={w:12,h:32},u={w:i?c.w*3:c.w},g=p.section({class:"levels",shadow:[p.style(`
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

              figure.level {
                opacity: 33%;
              }

              figure.level:nth-child(1) {
                left: 0;
                height: 33%;
              }

              figure.level:nth-child(2) {
                height: 66%;
                left: ${c.w}px;
              }

              figure.level:nth-child(3) {
                height: 100%;
                left: ${c.w*2}px;
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
      `),p.article([p.figure({class:`levels ${t}`,children:[p.figure({class:"level"})].concat(i?[p.figure({class:"level"}),p.figure({class:"level"})]:[])})])]}),[w,f]=["article",".levels"].map(m=>g.shadowRoot.querySelector(m));if(w&&o&&typeof o=="string"&&w.append(p.span({content:o,class:"label"})),f){let m=[!!r&&"solid",!!i&&"signal-aspect",!!a&&"no-background"].filter(b=>b);f.classList.add(...m)}return Object.defineProperty(g,"setLevel",{value(m){i?(f[0].style.display=m===0?"none":"",f[1].style.display=m<=66?"none":"",f[2].style.display=m<100?"none":""):this.cssVar.set("level-height",`${m}%`)},enumerable:!1,configurable:!0,writable:!0}),g}return M(q);})();
//# sourceMappingURL=html.bundle.2.2.0.js.map
