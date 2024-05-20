(globalThis.nejs = (globalThis.nejs||{})).html =(()=>{var j=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var N=Object.prototype.hasOwnProperty;var L=(d,e)=>{for(var t in e)j(d,t,{get:e[t],enumerable:!0})},O=(d,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of A(e))!N.call(d,n)&&n!==t&&j(d,n,{get:()=>e[n],enumerable:!(r=T(e,n))||r.enumerable});return d};var M=d=>O(j({},"__esModule",{value:!0}),d);var C={};L(C,{HTML:()=>u,Levels:()=>w,commands:()=>l});var x=d=>d&&typeof d=="object",S=d=>Array.isArray(d),$=d=>typeof d=="string",E=typeof process<"u"&&process.env.NEJS_HTML_PREFIX,b=E||"@nejs.html",l={parse:Symbol.for(`${b}.init.parser`),parseOrdered:Symbol.for(`${b}.init.ordered.params`),parseNamed:Symbol.for(`${b}.init.named.params`),parseShadow:Symbol.for(`${b}.init.shadow.params`),createStorage:Symbol.for(`${b}.global.storage.key`),register:Symbol.for(`${b}.factory.element`),registered:Symbol.for(`${b}.list.factory.elements`),define:Symbol.for(`${b}.define.webcomponent`),additionalFunctions:Symbol.for(`${b}.result.prototype`),prefix:b},u=class d{static create(){let e=d[l.parse](...arguments),t=e?.useDocument??top.window.document,r=new CSSStyleSheet,n=t.querySelector("style#htmljs"),{tagName:s,webComponentName:o}=e,i=t.createElement(s,o);for(let[a,c]of e.attributes)if(x(a)){let g,{name:h,namespaceURI:p,qualifiedName:y}=a;namespaceURI||qualifiedName?(g=t.createAttributeNS(p,y),g.value=c,i.setAttributeNodeNS(g)):($(h)||(h=!h&&String(h)||Object.valueOf.call(h).toString()||String(h)),g=t.createAttribute(h),g.value=c,i.setAttributeNode(g))}else{let g=typeof a=="symbol"&&a||String(a);i.setAttribute(g,c)}for(let[a,c]of Object.entries(e.style))i.style[a]=c;$(e.content)?i.append(t.createTextNode(e.content)):S(e.content)&&i.append(...e.content.map(a=>t.createTextNode(String(a))));for(let a of e.children)i.append(a);if(x(e.shadow)){let a=i.attachShadow(e.shadow.options);e.shadow.children&&e.shadow.children.length&&a.append(...e.shadow.children)}return x(e?.dataset)&&Object.assign(i.dataset,e.dataset),d[l.additionalFunctions]({element:i,reusableStyleSheet:r,reusableStyleElement:n}),Object.defineProperty(i,"identifier",{enumerable:!1,configurable:!1,writable:!0,value:`#${Math.random().toString(36).slice(2)}`}),i}static[l.parse](...e){let t=this[l.parseOrdered].bind(d),r=this[l.parseNamed].bind(d);if(e.length===0)throw new SyntaxError("HTML.create must have parameters!");if(e.length===1){let n=String(e[0]);return{tagName:n,...t(n)}}else{let n=e[0],s=e.slice(1),o=s?.[0];if(o&&typeof o=="object"){if(Array.isArray(o)){let i={tagName:n,...t(n,...s)};return i.children.length===0&&(i.children=i.content,i.content=void 0),i}return{tagName:n,...r(n,o)}}return{tagName:n,...t(n,...s)}}}static[l.parseOrdered](e,t,r,n,s,o,i,a){let c=d[l.parseShadow](e,a);return s&&(s={is:s}),x(n)&&!(n instanceof Map)&&(n=new Map(S(n)?n:Object.entries(n))),{content:t,style:r??{},attributes:n??new Map,webComponentName:s??void 0,useDocument:o??document,children:i??[],shadow:c}}static[l.parseNamed](e,t){let{content:r,style:n,attributes:s,webComponentName:o,useDocument:i,children:a,shadow:c,class:g,classes:h,dataset:p}=t,y=Object.keys({content:r,style:n,attributes:s,webComponentName:o,useDocument:i,children:a,shadow:c,class:g,classes:h,dataset:p}),m=this[l.parseOrdered](e,r,n,s,o,i,a,c);if($(g)&&m.attributes.set("class",g),S(h)){let f=[m.attributes.get("class")||"",h.filter(k=>$(k)).join(" ")].join(" ").trim();f?m.attributes.set("class",f):m.attributes.has("class")&&!m.attributes.get("class")&&m.delete("class")}x(p)&&!S(p)&&(m.dataset=p);let v=Object.keys(t).filter(f=>!y.some(k=>k===f));for(let f of v)m.attributes.set(f,t[f]);return m}static[l.parseShadow](e,t){if(!t)return;let r=x(t)&&t,n={mode:"open",clonable:!0,slotAssignment:"named"},s=["article","aside","blockquote","body","div","footer","h1","h2","h3","h4","h5","h6","header","main","nav","p","section","span"];if(r&&!r?.tryAnyhow&&!(e.includes("-")||s.includes(e))&&(r=void 0,console.warn([`Elements with a name of "${e}" cannot `,`have an attached shadow DOM. Please see MDN documents.
`,`Supported elements are any with a dash in their name
`,`or any of these:
`,`  ${s.join(",")}
`].join(""))),r){let o=r?.options??{},i=S(r?.children)&&r.children||void 0;S(r)?r={children:r}:r.children=i??[],r.options={...n,...o}}return r}static[l.additionalFunctions]({element:e,reusableStyleSheet:t,reusableStyleElement:r,descriptorBase:n={enumerable:!1,configurable:!0}}){Object.defineProperty(e,"cssVar",{...n,value:{get(s,o){let i=`--${s}`,a=o||e?.shadowRoot||doc;if(!a||!i.startsWith("--"))throw new Error(["Invalid arguments: root and valid CSS variable name","are required."].join(" "));let c=a?.host??document.documentElement;return getComputedStyle(c).getPropertyValue(i).trim()||null},set(s,o,i){let a=i||e?.shadowRoot||doc,c=`--${s}`,h=`${e.shadowRoot?":host":":root"} { ${c}: ${o}; }`;t.replaceSync(h),a?.adoptedStyleSheets?a.adoptedStyleSheets=[t]:r?r.textContent=[...t].map(p=>p.cssText).join(" "):(r=d.style({id:"html_reusable_style_sheet",content:h}),document.head.appendChild(r))}}}),Object.defineProperty(e,"addTo",{...n,value:function(o,i=top.window.document){let a=i.querySelector(o);return a?.append&&typeof a.append=="function"?(a.append(this),!0):!1}}),Object.defineProperty(e,"addToBody",{...n,value:function(o=top.window.document){return o?.body?.append(this),o?.body?.contains(this)}}),Object.defineProperty(e,"addToHead",{...n,value:function(o=top.window.document){return o?.head?.append(this),o?.head?.contains(this)}})}static[l.createStorage](e,t=null,r=!0){let n=Reflect.has(globalThis,l.createStorage),[s,o]=[n,n&&globalThis[l.createStorage]||new Map];s||(globalThis[l.createStorage]=o);let i=r&&new Map||void 0,[a,c]=[o.has(e),e&&(o.get(e)??i)],g=r&&new Map||void 0,[h,p]=[c?.has(t),t&&(c?.get(t)??g)];return!a&&c&&o.set(e,c),!h&&p&&c?.set(t,p),p||c||o}static[l.register](e,t,r={},n,...s){let o=d[l.createStorage](l.register,e);o.set("factory",t),o.set("config",r),o.set("thisArg",n),o.set("args",s)}static*[l.registered](){let e=d[l.createStorage](l.register);for(let[t,r]of e.entries())yield[t,r]}},P=Object.create(Function.prototype),R=new Proxy(P,{get(d,e,t){let r=u[l.createStorage](l.register,e,!1);if(r){let n=r.get("factory"),s=r.get("config"),o=r.get("thisArg"),i=r.get("args")??[];if(typeof n=="function"&&typeof s=="object")return o&&!n.prototype&&n.toString().includes("=>")&&console.warn([`HTML[${e}] is likely a big arrow function and`,"it was registered with a `thisArg` value. This","will not work as expected. You have been warned!"].join(" ")),(...a)=>n.call(o,s,...a)}return typeof e=="string"&&e!=="create"?u.create.bind(u,e):Reflect.get(d,e,t)}});Object.setPrototypeOf(u,R);u[l.register]("script:src",function(e,t,r){if(!t&&typeof t!="string")throw new SyntaxError('HTML["script:src"] must have a source param');let n=String(t),s=r??{};return u.script({src:n,attributes:s,type:"application/javascript"})},{});u[l.register]("script:module",function(e,t,r,n){let s,o=[];t&&(Array.isArray(t)?o=t.map(c=>{if(Array.isArray(c)){let[g,h]=c,p=g;return Array.isArray(g)||(p=[String(g)]),`import { ${p.join(", ")} } from '${h}';`}else return`import * from '${String(c)}';`}):typeof t=="string"&&(s=t));let i=n??{},a=r;return s&&(i.src=s),o.length&&(a=`${o.join(`
`)}

${a||""}`),u.script({content:a,attributes:i,type:"module"})},{});u[l.register]("link:rel",function(e,t,r="stylesheet",n){if(!t&&typeof t!="string")throw new SyntaxError('HTML["link:rel"] must have a url param');let s=String(t),o=n??{};return u.link({href:s,rel:r,attributes:o})},{});function w(d,e=void 0,t){let r=["low","medium","high"],{preset:n,solid:s,label:o,signal:i,noBackground:a,percent:c}=d;n=t?.preset??n,s=t?.solid??s,o=e??o,i=t?.signal??i,a=t?.noBackground??a,typeof c<"u"&&(n=void 0,c=Math.min(100,Math.max(0,parseInt(c))));let g=new CSSStyleSheet,h={w:12,h:32},p={w:i?h.w*3:h.w},y=u.section({class:"levels",shadow:[u.style(`
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
      `),u.article([u.figure({class:`levels ${n}`,children:[u.figure({class:"level"})].concat(i?[u.figure({class:"level"}),u.figure({class:"level"})]:[])})])]}),[m,v]=["article",".levels"].map(f=>y.shadowRoot.querySelector(f));if(m&&o&&typeof o=="string"&&m.append(u.span({content:o,class:"label"})),v){let f=[!!s&&"solid",!!i&&"signal-aspect",!!a&&"no-background"].filter(k=>k);v.classList.add(...f)}return Object.defineProperty(y,"setLevel",{value(f){i?(v[0].style.display=f===0?"none":"",v[1].style.display=f<=66?"none":"",v[2].style.display=f<100?"none":""):this.cssVar.set("level-height",`${f}%`)},enumerable:!1,configurable:!0,writable:!0}),c&&y.setLevel(c),y}u[l.register]("NELowSignalLevel",w,{preset:"low",signal:!0,noBackground:!0});u[l.register]("NEMediumSignalLevel",w,{preset:"medium",signal:!0,noBackground:!0});u[l.register]("NEHighSignalLevel",w,{preset:"high",signal:!0,noBackground:!0});u[l.register]("NELevel",w,{percent:0});return M(C);})();
//# sourceMappingURL=html.bundle.2.2.0.js.map
