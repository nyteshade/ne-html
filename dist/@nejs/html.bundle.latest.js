(globalThis.nejs = (globalThis.nejs||{})).html =(()=>{var j=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var N=Object.prototype.hasOwnProperty;var L=(d,e)=>{for(var t in e)j(d,t,{get:e[t],enumerable:!0})},O=(d,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of T(e))!N.call(d,n)&&n!==t&&j(d,n,{get:()=>e[n],enumerable:!(i=A(e,n))||i.enumerable});return d};var M=d=>O(j({},"__esModule",{value:!0}),d);var C={};L(C,{HTML:()=>u,Levels:()=>S,commands:()=>l});var w=d=>d&&typeof d=="object",x=d=>Array.isArray(d),$=d=>typeof d=="string",E=typeof process<"u"&&process.env.NEJS_HTML_PREFIX,b=E||"@nejs.html",l={parse:Symbol.for(`${b}.init.parser`),parseOrdered:Symbol.for(`${b}.init.ordered.params`),parseNamed:Symbol.for(`${b}.init.named.params`),parseShadow:Symbol.for(`${b}.init.shadow.params`),createStorage:Symbol.for(`${b}.global.storage.key`),register:Symbol.for(`${b}.factory.element`),registered:Symbol.for(`${b}.list.factory.elements`),define:Symbol.for(`${b}.define.webcomponent`),additionalFunctions:Symbol.for(`${b}.result.prototype`),prefix:b},u=class d{static create(){let e=d[l.parse](...arguments),t=e?.useDocument??top.window.document,i=new CSSStyleSheet,n=t.querySelector("style#htmljs"),{tagName:s,webComponentName:o}=e,r=t.createElement(s,o);for(let[a,c]of e.attributes)if(w(a)){let g,{name:h,namespaceURI:p,qualifiedName:y}=a;namespaceURI||qualifiedName?(g=t.createAttributeNS(p,y),g.value=c,r.setAttributeNodeNS(g)):($(h)||(h=!h&&String(h)||Object.valueOf.call(h).toString()||String(h)),g=t.createAttribute(h),g.value=c,r.setAttributeNode(g))}else{let g=typeof a=="symbol"&&a||String(a);r.setAttribute(g,c)}for(let[a,c]of Object.entries(e.style))r.style[a]=c;$(e.content)?r.append(t.createTextNode(e.content)):x(e.content)&&r.append(...e.content.map(a=>t.createTextNode(String(a))));for(let a of e.children)r.append(a);if(w(e.shadow)){let a=r.attachShadow(e.shadow.options);e.shadow.children&&e.shadow.children.length&&a.append(...e.shadow.children)}return w(e?.dataset)&&Object.assign(r.dataset,e.dataset),d[l.additionalFunctions]({element:r,reusableStyleSheet:i,reusableStyleElement:n}),Object.defineProperty(r,"identifier",{enumerable:!1,configurable:!1,writable:!0,value:`#${Math.random().toString(36).slice(2)}`}),r}static[l.parse](...e){let t=this[l.parseOrdered].bind(d),i=this[l.parseNamed].bind(d);if(e.length===0)throw new SyntaxError("HTML.create must have parameters!");if(e.length===1){let n=String(e[0]);return{tagName:n,...t(n)}}else{let n=e[0],s=e.slice(1),o=s?.[0];if(o&&typeof o=="object"){if(Array.isArray(o)){let r={tagName:n,...t(n,...s)};return r.children.length===0&&(r.children=r.content,r.content=void 0),r}return{tagName:n,...i(n,o)}}return{tagName:n,...t(n,...s)}}}static[l.parseOrdered](e,t,i,n,s,o,r,a){let c=d[l.parseShadow](e,a);return s&&(s={is:s}),w(n)&&!(n instanceof Map)&&(n=new Map(x(n)?n:Object.entries(n))),{content:t,style:i??{},attributes:n??new Map,webComponentName:s??void 0,useDocument:o??document,children:r??[],shadow:c}}static[l.parseNamed](e,t){let{content:i,style:n,attributes:s,webComponentName:o,useDocument:r,children:a,shadow:c,class:g,classes:h,dataset:p}=t,y=Object.keys({content:i,style:n,attributes:s,webComponentName:o,useDocument:r,children:a,shadow:c,class:g,classes:h,dataset:p}),m=this[l.parseOrdered](e,i,n,s,o,r,a,c);if($(g)&&m.attributes.set("class",g),x(h)){let f=[m.attributes.get("class")||"",h.filter(k=>$(k)).join(" ")].join(" ").trim();f?m.attributes.set("class",f):m.attributes.has("class")&&!m.attributes.get("class")&&m.delete("class")}w(p)&&!x(p)&&(m.dataset=p);let v=Object.keys(t).filter(f=>!y.some(k=>k===f));for(let f of v)m.attributes.set(f,t[f]);return m}static[l.parseShadow](e,t){if(!t)return;let i=w(t)&&t,n={mode:"open",clonable:!0,slotAssignment:"named"},s=["article","aside","blockquote","body","div","footer","h1","h2","h3","h4","h5","h6","header","main","nav","p","section","span"];if(i&&!i?.tryAnyhow&&!(e.includes("-")||s.includes(e))&&(i=void 0,console.warn([`Elements with a name of "${e}" cannot `,`have an attached shadow DOM. Please see MDN documents.
`,`Supported elements are any with a dash in their name
`,`or any of these:
`,`  ${s.join(",")}
`].join(""))),i){let o=i?.options??{},r=x(i?.children)&&i.children||void 0;x(i)?i={children:i}:i.children=r??[],i.options={...n,...o}}return i}static[l.additionalFunctions]({element:e,reusableStyleSheet:t,reusableStyleElement:i,descriptorBase:n={enumerable:!1,configurable:!0}}){Object.defineProperty(e,"cssVar",{...n,value:{get(s,o){let r=`--${s}`,a=o||e?.shadowRoot||doc;if(!a||!r.startsWith("--"))throw new Error(["Invalid arguments: root and valid CSS variable name","are required."].join(" "));let c=a?.host??document.documentElement;return getComputedStyle(c).getPropertyValue(r).trim()||null},set(s,o,r){let a=r||e?.shadowRoot||doc,c=`--${s}`,h=`${e.shadowRoot?":host":":root"} { ${c}: ${o}; }`;t.replaceSync(h),a?.adoptedStyleSheets?a.adoptedStyleSheets=[t]:i?i.textContent=[...t].map(p=>p.cssText).join(" "):(i=d.style({id:"html_reusable_style_sheet",content:h}),document.head.appendChild(i))}}}),Object.defineProperty(e,"addTo",{...n,value:function(o,r=top.window.document){let a=r.querySelector(o);return a?.append&&typeof a.append=="function"?(a.append(this),!0):!1}}),Object.defineProperty(e,"addToBody",{...n,value:function(o=top.window.document){return o?.body?.append(this),o?.body?.contains(this)}}),Object.defineProperty(e,"addToHead",{...n,value:function(o=top.window.document){return o?.head?.append(this),o?.head?.contains(this)}})}static[l.createStorage](e,t=null,i=!0){let n=Reflect.has(globalThis,l.createStorage),[s,o]=[n,n&&globalThis[l.createStorage]||new Map];s||(globalThis[l.createStorage]=o);let r=i&&new Map||void 0,[a,c]=[o.has(e),e&&(o.get(e)??r)],g=i&&new Map||void 0,[h,p]=[c?.has(t),t&&(c?.get(t)??g)];return!a&&c&&o.set(e,c),!h&&p&&c?.set(t,p),p||c||o}static[l.register](e,t,i={},n,...s){let o=d[l.createStorage](l.register,e);o.set("factory",t),o.set("config",i),o.set("thisArg",n),o.set("args",s)}static*[l.registered](){let e=d[l.createStorage](l.register);for(let[t,i]of e.entries())yield[t,i]}},P=Object.create(Function.prototype),R=new Proxy(P,{get(d,e,t){let i=u[l.createStorage](l.register,e,!1);if(i){let n=i.get("factory"),s=i.get("config"),o=i.get("thisArg"),r=i.get("args")??[];if(typeof n=="function"&&typeof s=="object")return o&&!n.prototype&&n.toString().includes("=>")&&console.warn([`HTML[${e}] is likely a big arrow function and`,"it was registered with a `thisArg` value. This","will not work as expected. You have been warned!"].join(" ")),(...a)=>n.call(o,s,...a)}return typeof e=="string"&&e!=="create"?u.create.bind(u,e):Reflect.get(d,e,t)}});Object.setPrototypeOf(u,R);u[l.register]("script:src",function(e,t,i){if(!t&&typeof t!="string")throw new SyntaxError('HTML["script:src"] must have a source param');let n=String(t),s=i??{};return u.script({src:n,attributes:s,type:"application/javascript"})},{});u[l.register]("script:module",function(e,t,i,n){let s,o=[];t&&(Array.isArray(t)?o=t.map(c=>{if(Array.isArray(c)){let[g,h]=c,p=g;return Array.isArray(g)||(p=[String(g)]),`import { ${p.join(", ")} } from '${h}';`}else return`import * from '${String(c)}';`}):typeof t=="string"&&(s=t));let r=n??{},a=i;return s&&(r.src=s),o.length&&(a=`${o.join(`
`)}

${a||""}`),u.script({content:a,attributes:r,type:"module"})},{});u[l.register]("link:rel",function(e,t,i="stylesheet",n){if(!t&&typeof t!="string")throw new SyntaxError('HTML["link:rel"] must have a url param');let s=String(t),o=n??{};return u.link({href:s,rel:i,attributes:o})},{});function S(d,e=void 0,t){let i=["low","medium","high"],{preset:n,solid:s,label:o,signal:r,noBackground:a,percent:c}=d;n=t?.preset??n,s=t?.solid??s,o=e??o,r=t?.signal??r,a=t?.noBackground??a,typeof c<"u"&&(n=void 0,c=Math.min(100,Math.max(0,parseInt(c))));let g=new CSSStyleSheet,h={w:12,h:32},p={w:r?h.w*3:h.w},y=u.section({class:"levels",shadow:[u.style(`
        :host {
          --low-color: #8691B6;
          --medium-color: #5D6C9E;
          --high-color: #202B50;
          --gradient-height: ${h.h}px;
          --per-level-height: calc(var(--gradient-height) / 3);
          --level-height: 0%;
          --standard-box-shadows:
            inset 1px 0px 0px rgba(255 255 255 / 20%),
            inset 0px 1px 0px 0px rgba(255 255 255 / 40%),
            inset ${h.w-1}px 1px 0px 0px rgba(255 255 255 / 40%);
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
            width: ${h.w}px;

            &.no-background {
              background-color: unset;
              border: unset;
              box-shadow: unset;

              figure.level {
                box-shadow: var(--standalone-box-shadows);
              }
            }

            &.signal-aspect {
              width: ${h.w*3}px;

              figure.level {
                opacity: 33%;
              }

              figure.level:nth-child(1) {
                left: 0;
                height: 33%;
              }

              figure.level:nth-child(2) {
                height: 66%;
                left: ${h.w}px;
              }

              figure.level:nth-child(3) {
                height: 100%;
                left: ${h.w*2}px;
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
              width: ${h.w}px;
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
      `),u.article([u.figure({class:`levels ${n}`,children:[u.figure({class:"level"})].concat(r?[u.figure({class:"level"}),u.figure({class:"level"})]:[])})])]}),[m,v]=["article",".levels"].map(f=>y.shadowRoot.querySelector(f));if(m&&o&&typeof o=="string"&&m.append(u.span({content:o,class:"label"})),v){let f=[!!s&&"solid",!!r&&"signal-aspect",!!a&&"no-background"].filter(k=>k);v.classList.add(...f)}return Object.defineProperty(y,"setLevel",{value(f){r?(v[0].style.display=f===0?"none":"",v[1].style.display=f<=66?"none":"",v[2].style.display=f<100?"none":""):this.cssVar.set("level-height",`${f}%`)},enumerable:!1,configurable:!0,writable:!0}),c&&y.setLevel(c),y}u[l.register]("NELowSignalLevel",S,{preset:"low",signal:!0,noBackground:!0});u[l.register]("NEMediumSignalLevel",S,{preset:"medium",signal:!0,noBackground:!0});u[l.register]("NEHighSignalLevel",S,{preset:"high",signal:!0,noBackground:!0});u[l.register]("NELevel",S,{percent:0});return M(C);})();
//# sourceMappingURL=html.bundle.2.2.1.js.map
