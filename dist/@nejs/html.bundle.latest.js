(globalThis.nejs = (globalThis.nejs||{})).html =(()=>{var $=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var A=Object.prototype.hasOwnProperty;var M=(c,e)=>{for(var t in e)$(c,t,{get:e[t],enumerable:!0})},N=(c,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of L(e))!A.call(c,n)&&n!==t&&$(c,n,{get:()=>e[n],enumerable:!(i=T(e,n))||i.enumerable});return c};var O=c=>N($({},"__esModule",{value:!0}),c);var R={};M(R,{HTML:()=>u,Levels:()=>j,commands:()=>h});var w=c=>c&&typeof c=="object",x=c=>Array.isArray(c),k=c=>typeof c=="string",E=typeof process<"u"&&process.env.NEJS_HTML_PREFIX,b=E||"@nejs.html",h={parse:Symbol.for(`${b}.init.parser`),parseOrdered:Symbol.for(`${b}.init.ordered.params`),parseNamed:Symbol.for(`${b}.init.named.params`),parseShadow:Symbol.for(`${b}.init.shadow.params`),createStorage:Symbol.for(`${b}.global.storage.key`),register:Symbol.for(`${b}.factory.element`),define:Symbol.for(`${b}.define.webcomponent`),additionalFunctions:Symbol.for(`${b}.result.prototype`),prefix:b},u=class c{static create(){let e=c[h.parse](...arguments),t=e?.useDocument??top.window.document,i=new CSSStyleSheet,n=t.querySelector("style#htmljs"),{tagName:s,webComponentName:o}=e,r=t.createElement(s,o);for(let[a,l]of e.attributes)if(w(a)){let g,{name:d,namespaceURI:p,qualifiedName:v}=a;namespaceURI||qualifiedName?(g=t.createAttributeNS(p,v),g.value=l,r.setAttributeNodeNS(g)):(k(d)||(d=!d&&String(d)||Object.valueOf.call(d).toString()||String(d)),g=t.createAttribute(d),g.value=l,r.setAttributeNode(g))}else{let g=typeof a=="symbol"&&a||String(a);r.setAttribute(g,l)}for(let[a,l]of Object.entries(e.style))r.style[a]=l;k(e.content)?r.append(t.createTextNode(e.content)):x(e.content)&&r.append(...e.content.map(a=>t.createTextNode(String(a))));for(let a of e.children)r.append(a);if(w(e.shadow)){let a=r.attachShadow(e.shadow.options);e.shadow.children&&e.shadow.children.length&&a.append(...e.shadow.children)}return w(e?.dataset)&&Object.assign(r.dataset,e.dataset),c[h.additionalFunctions]({element:r,reusableStyleSheet:i,reusableStyleElement:n}),Object.defineProperty(r,"identifier",{enumerable:!1,configurable:!1,writable:!0,value:`#${Math.random().toString(36).slice(2)}`}),r}static[h.parse](...e){let t=this[h.parseOrdered].bind(c),i=this[h.parseNamed].bind(c);if(e.length===0)throw new SyntaxError("HTML.create must have parameters!");if(e.length===1){let n=String(e[0]);return{tagName:n,...t(n)}}else{let n=e[0],s=e.slice(1),o=s?.[0];if(o&&typeof o=="object"){if(Array.isArray(o)){let r={tagName:n,...t(n,...s)};return r.children.length===0&&(r.children=r.content,r.content=void 0),r}return{tagName:n,...i(n,o)}}return{tagName:n,...t(n,...s)}}}static[h.parseOrdered](e,t,i,n,s,o,r,a){let l=c[h.parseShadow](e,a);return s&&(s={is:s}),w(n)&&!(n instanceof Map)&&(n=new Map(x(n)?n:Object.entries(n))),{content:t,style:i??{},attributes:n??new Map,webComponentName:s??void 0,useDocument:o??document,children:r??[],shadow:l}}static[h.parseNamed](e,t){let{content:i,style:n,attributes:s,webComponentName:o,useDocument:r,children:a,shadow:l,class:g,classes:d,dataset:p}=t,v=Object.keys({content:i,style:n,attributes:s,webComponentName:o,useDocument:r,children:a,shadow:l,class:g,classes:d,dataset:p}),m=this[h.parseOrdered](e,i,n,s,o,r,a,l);if(k(g)&&m.attributes.set("class",g),x(d)){let f=[m.attributes.get("class")||"",d.filter(S=>k(S)).join(" ")].join(" ").trim();f?m.attributes.set("class",f):m.attributes.has("class")&&!m.attributes.get("class")&&m.delete("class")}w(p)&&!x(p)&&(m.dataset=p);let y=Object.keys(t).filter(f=>!v.some(S=>S===f));for(let f of y)m.attributes.set(f,t[f]);return m}static[h.parseShadow](e,t){if(!t)return;let i=w(t)&&t,n={mode:"open",clonable:!0,slotAssignment:"named"},s=["article","aside","blockquote","body","div","footer","h1","h2","h3","h4","h5","h6","header","main","nav","p","section","span"];if(i&&!i?.tryAnyhow&&!(e.includes("-")||s.includes(e))&&(i=void 0,console.warn([`Elements with a name of "${e}" cannot `,`have an attached shadow DOM. Please see MDN documents.
`,`Supported elements are any with a dash in their name
`,`or any of these:
`,`  ${s.join(",")}
`].join(""))),i){let o=i?.options??{},r=x(i?.children)&&i.children||void 0;x(i)?i={children:i}:i.children=r??[],i.options={...n,...o}}return i}static[h.additionalFunctions]({element:e,reusableStyleSheet:t,reusableStyleElement:i,descriptorBase:n={enumerable:!1,configurable:!0}}){Object.defineProperty(e,"cssVar",{...n,value:{get(s,o){let r=`--${s}`,a=o||e?.shadowRoot||doc;if(!a||!r.startsWith("--"))throw new Error(["Invalid arguments: root and valid CSS variable name","are required."].join(" "));let l=a?.host??document.documentElement;return getComputedStyle(l).getPropertyValue(r).trim()||null},set(s,o,r){let a=r||e?.shadowRoot||doc,l=`--${s}`,d=`${e.shadowRoot?":host":":root"} { ${l}: ${o}; }`;t.replaceSync(d),a?.adoptedStyleSheets?a.adoptedStyleSheets=[t]:i?i.textContent=[...t].map(p=>p.cssText).join(" "):(i=c.style({id:"html_reusable_style_sheet",content:d}),document.head.appendChild(i))}}}),Object.defineProperty(e,"addTo",{...n,value:function(o,r=top.window.document){let a=r.querySelector(o);return a?.append&&typeof a.append=="function"?(a.append(this),!0):!1}}),Object.defineProperty(e,"addToBody",{...n,value:function(o=top.window.document){return o?.body?.append(this),o?.body?.contains(this)}}),Object.defineProperty(e,"addToHead",{...n,value:function(o=top.window.document){return o?.head?.append(this),o?.head?.contains(this)}})}static[h.createStorage](e,t=null,i=!0){let n=Reflect.has(globalThis,h.createStorage),[s,o]=[n,n&&globalThis[h.createStorage]||new Map];s||(globalThis[h.createStorage]=o);let r=i&&new Map||void 0,[a,l]=[o.has(e),e&&(o.get(e)??r)],g=i&&new Map||void 0,[d,p]=[l?.has(t),t&&(l?.get(t)??g)];return!a&&l&&o.set(e,l),!d&&p&&l?.set(t,p),p||l||o}static[h.register](e,t,i={},n,...s){let o=c[h.createStorage](h.register,e);o.set("factory",t),o.set("config",i),o.set("thisArg",n),o.set("args",s)}},H=Object.create(Function.prototype),P=new Proxy(H,{get(c,e,t){let i=u[h.createStorage](h.register,e,!1);if(i){let n=i.get("factory"),s=i.get("config"),o=i.get("thisArg"),r=i.get("args")??[];if(typeof n=="function"&&typeof s=="object")return o&&!n.prototype&&n.toString().includes("=>")&&console.warn([`HTML[${e}] is likely a big arrow function and`,"it was registered with a `thisArg` value. This","will not work as expected. You have been warned!"].join(" ")),(...a)=>n.call(o,s,...a)}return typeof e=="string"&&e!=="create"?u.create.bind(u,e):Reflect.get(c,e,t)}});Object.setPrototypeOf(u,P);u[h.register]("script:src",function(e,t,i){if(!t&&typeof t!="string")throw new SyntaxError('HTML["script:src"] must have a source param');let n=String(t),s=i??{};return u.script({src:n,attributes:s,type:"application/javascript"})},{});u[h.register]("script:module",function(e,t,i,n){let s,o=[];t&&(Array.isArray(t)?o=t.map(l=>{if(Array.isArray(l)){let[g,d]=l,p=g;return Array.isArray(g)||(p=[String(g)]),`import { ${p.join(", ")} } from '${d}';`}else return`import * from '${String(l)}';`}):typeof t=="string"&&(s=t));let r=n??{},a=i;return s&&(r.src=s),o.length&&(a=`${o.join(`
`)}

${a||""}`),u.script({content:a,attributes:r,type:"module"})},{});u[h.register]("link:rel",function(e,t,i="stylesheet",n){if(!t&&typeof t!="string")throw new SyntaxError('HTML["link:rel"] must have a url param');let s=String(t),o=n??{};return u.link({href:s,rel:i,attributes:o})},{});function j(c,e=void 0,t){let i=["low","medium","high"],{preset:n,solid:s,label:o,signal:r,noBackground:a,percent:l}=c;n=t?.preset??n,s=t?.solid??s,o=e??o,r=t?.signal??r,a=t?.noBackground??a,typeof l<"u"&&(n=void 0,l=Math.min(100,Math.max(0,parseInt(l))));let g=new CSSStyleSheet,d={w:12,h:32},p={w:r?d.w*3:d.w},v=u.section({class:"levels",shadow:[u.style(`
        :host {
          --low-color: #8691B6;
          --medium-color: #5D6C9E;
          --high-color: #202B50;
          --gradient-height: ${d.h}px;
          --per-level-height: calc(var(--gradient-height) / 3);
          --level-height: 0%;
          --standard-box-shadows:
            inset 1px 0px 0px rgba(255 255 255 / 20%),
            inset 0px 1px 0px 0px rgba(255 255 255 / 40%),
            inset ${d.w-1}px 1px 0px 0px rgba(255 255 255 / 40%);
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
            width: ${d.w}px;

            &.no-background {
              background-color: unset;
              border: unset;
              box-shadow: unset;

              figure.level {
                box-shadow: var(--standalone-box-shadows);
              }
            }

            &.signal-aspect {
              width: ${d.w*3}px;

              figure.level {
                opacity: 33%;
              }

              figure.level:nth-child(1) {
                left: 0;
                height: 33%;
              }

              figure.level:nth-child(2) {
                height: 66%;
                left: ${d.w}px;
              }

              figure.level:nth-child(3) {
                height: 100%;
                left: ${d.w*2}px;
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
              width: ${d.w}px;
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
      `),u.article([u.figure({class:`levels ${n}`,children:[u.figure({class:"level"})].concat(r?[u.figure({class:"level"}),u.figure({class:"level"})]:[])})])]}),[m,y]=["article",".levels"].map(f=>v.shadowRoot.querySelector(f));if(m&&o&&typeof o=="string"&&m.append(u.span({content:o,class:"label"})),y){let f=[!!s&&"solid",!!r&&"signal-aspect",!!a&&"no-background"].filter(S=>S);y.classList.add(...f)}return Object.defineProperty(v,"setLevel",{value(f){r?(y[0].style.display=f===0?"none":"",y[1].style.display=f<=66?"none":"",y[2].style.display=f<100?"none":""):this.cssVar.set("level-height",`${f}%`)},enumerable:!1,configurable:!0,writable:!0}),l&&v.setLevel(l),v}HTML[commands.register]("NELowSignalLevel",Levels,{preset:"low",signal:!0,noBackground:!0});HTML[commands.register]("NEMediumSignalLevel",Levels,{preset:"medium",signal:!0,noBackground:!0});HTML[commands.register]("NEHighSignalLevel",Levels,{preset:"high",signal:!0,noBackground:!0});HTML[commands.register]("NELevel",Levels,{percent:0});return O(R);})();
//# sourceMappingURL=html.bundle.2.2.0.js.map
