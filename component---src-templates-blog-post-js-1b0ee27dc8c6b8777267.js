(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{193:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(201),i=n.n(o),l=n(195),u=n(225),c=n.n(u),s=n(196),p=n(205),d=n(202);n(227);function f(){var e=g(["\n    width: 100%;\n  "]);return f=function(){return e},e}function m(){var e=g(["\n      width: auto;\n      position: relative;\n    "]);return m=function(){return e},e}function y(){var e=g(["\n    padding: 0 16px;\n  "]);return y=function(){return e},e}function g(e,t){return t||(t=e.slice(0)),e.raw=t,e}var b=function(e){var t=e.frontmatter,n=e.html,r=t.title,o=t.date,i=t.excerpt,l=t.tags;return a.a.createElement(a.a.Fragment,null,a.a.createElement(h,null,a.a.createElement(d.a,null,a.a.createElement("h1",null,r),a.a.createElement(v,null,i),a.a.createElement("div",null,l.map(function(e,t){return a.a.createElement(p.a,{key:t},e)})),a.a.createElement(v,null,o)),a.a.createElement(w,null),a.a.createElement(d.a,null,a.a.createElement(E,{dangerouslySetInnerHTML:{__html:n}}))),a.a.createElement(c.a,{repo:"jyhwng/jyhwng.github.io",type:"title",theme:"github-light",crossOrigin:"anonymous"}))},h=l.b.div.withConfig({displayName:"Post__PostBase",componentId:"pg7qz8-0"})(['font-family:"Spoqa Han Sans",Roboto,sans-serif;position:relative;',";"],s.a.tablet(y())),v=l.b.p.withConfig({displayName:"Post__P",componentId:"pg7qz8-1"})(["margin:16px 0;"]),w=l.b.hr.withConfig({displayName:"Post__Hr",componentId:"pg7qz8-2"})(["margin:72px 0;border:0.5px solid #ddd;"]),E=l.b.div.withConfig({displayName:"Post__Content",componentId:"pg7qz8-3"})(["margin-bottom:60px;h2{margin-top:0;word-break:break-all;",";}ul,ol{margin-top:4px;padding-left:20px;}p{margin-top:16px;margin-bottom:0;}"," hr{margin:32px 0;border:0.5px solid #ddd;}li > p{margin-bottom:0;}li + li{margin-top:8px;}"],s.a.tablet(m()),s.a.tablet(f())),_=n(200);function x(e){var t=e.data.markdownRemark,n=t.frontmatter,r=t.html;return a.a.createElement(_.a,null,a.a.createElement(i.a,{title:n.title+" - Camels and Snakes"}),a.a.createElement(b,{frontmatter:n,html:r}))}n.d(t,"default",function(){return x}),n.d(t,"pageQuery",function(){return O});var O="751203672"},196:function(e,t,n){"use strict";n.d(t,"a",function(){return o});n(29),n(30),n(13),n(49);var r=n(195),a={giant:1170,desktop:992,tablet:768,phone:376},o=Object.keys(a).reduce(function(e,t){var n=a[t]/16;return e[t]=function(){return Object(r.a)(["@media (max-width:","em){","}"],n,r.a.apply(void 0,arguments))},e},{})},197:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(66),i=n.n(o);n.d(t,"a",function(){return i.a});n(198),n(9).default.enqueue,a.a.createContext({})},198:function(e,t,n){var r;e.exports=(r=n(199))&&r.default||r},199:function(e,t,n){"use strict";n.r(t);n(23);var r=n(0),a=n.n(r),o=n(93);t.default=function(e){var t=e.location,n=e.pageResources;return n?a.a.createElement(o.a,Object.assign({location:t,pageResources:n},n.json)):null}},200:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(195),i=n(201),l=n.n(i),u=n(197),c=(n(50),n(196));function s(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n      margin-left: 16px;\n    }\n  "]);return s=function(){return e},e}var p=[{name:"Posts",route:"/"},{name:"About",route:"/about"},{name:"🤙",route:"/projects"}],d=function(){return a.a.createElement(f,null,p.map(function(e,t){return a.a.createElement(m,{key:t},a.a.createElement(u.a,{to:e.route},e.name))}))},f=o.b.ul.withConfig({displayName:"Menu__Menus",componentId:"sc-1gjq0u3-0"})(["margin:0;padding:0;display:flex;line-height:1;list-style-type:none;"]),m=o.b.li.withConfig({displayName:"Menu__Li",componentId:"sc-1gjq0u3-1"})(["& + &{margin-left:20px;","}&:last-child{transition:scale 0.2s cubic-bezier(0.23,1,0.32,1);}&:last-child:hover{transform:scale(1.2);}"],c.a.tablet(s())),y=function(e){var t=e.children;return a.a.createElement("span",{role:"img","aria-labelledby":"emoji"},t)};var g=function(e){var t,n;function r(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).state={isCollapsed:!1},t.collapseHeader=function(){window.scrollY>94?t.setState({isCollapsed:!0}):t.setState({isCollapsed:!1})},t}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var o=r.prototype;return o.componentDidMount=function(){window.addEventListener("scroll",this.collapseHeader)},o.componentWillUnmount=function(){window.removeEventListener("scroll",this.collapseHeader)},o.render=function(){var e=this.state.isCollapsed;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{style:{height:"56px"}}),a.a.createElement(v,{isCollapsed:e},a.a.createElement(h,null,a.a.createElement(w,null,a.a.createElement(b,null),a.a.createElement(d,null)))))},r}(a.a.Component),b=function(){return a.a.createElement(u.a,{to:"/"},a.a.createElement("span",null,a.a.createElement(y,null,"🐫")," and ",a.a.createElement(y,null,"🐍")))},h=o.b.div.withConfig({displayName:"Header__Wrapper",componentId:"sc-1uozftq-0"})(["width:100%;"]),v=o.b.nav.withConfig({displayName:"Header__Nav",componentId:"sc-1uozftq-1"})(["top:0;z-index:1;width:100%;position:sticky;background-color:#fff;",";"],function(e){return e.isCollapsed&&"border-bottom: 1px solid #ddd"}),w=o.b.div.withConfig({displayName:"Header__Inner",componentId:"sc-1uozftq-2"})(["display:flex;padding:16px;margin:0 auto;max-width:720px;align-items:center;justify-content:space-between;a{font-weight:bold;text-decoration:none;color:#303030;font-size:1.2em;}"]);function E(){var e=x(["\n    padding: 24px 16px;\n  "]);return E=function(){return e},e}function _(){var e=x(["\n    transform: translateY(123px);\n    ","\n  "]);return _=function(){return e},e}function x(e,t){return t||(t=e.slice(0)),e.raw=t,e}var O=function(e){var t,n;function r(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).state={isOpen:!1},t.handleOpenFooter=function(){t.setState({isOpen:!t.state.isOpen})},t}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.render=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(C,{isOpen:this.state.isOpen},a.a.createElement(k,null,a.a.createElement("p",null,"Found an error? Help me correct it by submitting issues"," ",a.a.createElement("a",{href:"https://github.com/jyhwng/jyhwng.github.io",target:"_blank",rel:"noopener noreferrer"},"here"),"."),a.a.createElement("p",null,"© 2017-2019 jyhwng"))),a.a.createElement(j,{onClick:this.handleOpenFooter}))},r}(r.Component),j=function(e){var t=e.onClick;return a.a.createElement(P,null,a.a.createElement(I,{onClick:t},a.a.createElement("svg",{viewBox:"0 0 24 24",fill:"none",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"},a.a.createElement("circle",{cx:"12",cy:"12",r:"10"}),a.a.createElement("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),a.a.createElement("line",{x1:"12",y1:"17",x2:"12",y2:"17"}))))},C=o.b.footer.withConfig({displayName:"Footer__FooterBase",componentId:"yuzjwy-0"})(["left:0;right:0;bottom:0;position:fixed;background-color:#fff;border-top:1px solid #ddd;transform:translateY(131px);"," transition:transform 350ms cubic-bezier(0.23,1,0.32,1);",";"],c.a.tablet(_(),function(e){return e.isOpen&&"\n      transform: translateY(0);\n    "}),function(e){return e.isOpen&&"\n    transform: translateY(0);\n  "}),k=o.b.div.withConfig({displayName:"Footer__Wrapper",componentId:"yuzjwy-1"})(["max-width:720px;margin:0 auto;padding:40px 0;p{margin:0;}",";"],c.a.tablet(E())),P=o.b.div.withConfig({displayName:"Footer__ButtonWrapper",componentId:"yuzjwy-2"})(["position:fixed;bottom:16px;right:16px;"]),I=o.b.a.withConfig({displayName:"Footer__Anchor",componentId:"yuzjwy-3"})(["display:block;cursor:pointer;svg{opacity:0.5;width:32px;height:32px;stroke:#303030;fill:#fff;}"]);n(203),n(204);n.d(t,"a",function(){return N});var N=function(e){var t=e.children;return a.a.createElement(a.a.Fragment,null,a.a.createElement(l.a,{title:"Camels and Snakes",meta:[{name:"jyhwng",content:"blog"}]}),a.a.createElement(g,null),a.a.createElement(S,null,t),a.a.createElement(O,null))},S=o.b.div.withConfig({displayName:"layouts__Inner",componentId:"g1jb67-0"})(["padding-top:40px;"])},202:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n(0),a=n.n(r),o=n(195),i=function(e){var t=e.children;return a.a.createElement(l,null,t)},l=o.b.div.withConfig({displayName:"Container__ContainerBase",componentId:"ovvrwj-0"})(["max-width:720px;margin:0 auto;width:100%;"])},205:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n(0),a=n.n(r),o=n(195),i=function(e){var t=e.children;return a.a.createElement(l,null,t)},l=o.b.span.withConfig({displayName:"Tag__Base",componentId:"sc-1dg6jlw-0"})(["display:inline-block;font-size:13px;background-color:#fbe134;padding:2px 4px;margin-right:8px;margin-bottom:4px;text-transform:lowercase;font-family:PT Mono;"])},225:function(e,t,n){"use strict";n(91),Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"identifierTypes",{enumerable:!0,get:function(){return r.identifierTypes}});var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(226))},226:function(e,t,n){"use strict";n(134),n(31),n(92),n(132),n(51),n(38),n(91),Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.identifierTypes=void 0;var r,a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(0)),o=(r=n(53))&&r.__esModule?r:{default:r};function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=["pathname","url","title","og:title","issue-number","issue-term"],d=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=u(this,c(t).call(this,e))).myRef=a.default.createRef(),n.state={pending:!0},n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(t,a.Component),n=t,(r=[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.repo,r=t.type,a=t.specificTerm,o=t.issueNumber,i=function(e){if(!(p.indexOf(e)<0))return"issue-number"===e?"issue-number":"issue-term";console.warn("Wrong type: "+e)}(r),l=function(e,t,n){if(!(p.indexOf(e)<0))return"pathname"===e?"pathname":"url"===e?"url":"title"===e?"title":"og:title"===e?"og:title":"issue-term"===e?t:"issue-number"===e?n:void 0;console.warn("Wrong type: "+e)}(r,a,o);if("issue-term"!==r||l)if("issue-number"===r&&(isNaN(l)||l<1))console.warn("When type is '".concat(r,"', valid 'issueNumber' prop must be provided"));else{var u=document.createElement("script");u.src="https://utteranc.es/client.js",u.async=!0,u.setAttribute("repo",n),u.setAttribute("crossorigin","anonymous"),u.setAttribute(i,l),u.onload=function(){return e.setState({pending:!1})},this.myRef.current.appendChild(u)}else console.warn("When type is '".concat(r,"', 'specificTerm' prop must be provided"))}},{key:"render",value:function(){return a.default.createElement("div",{className:"react-utterences",ref:this.myRef},this.props.debug&&a.default.createElement("pre",{style:{background:"#cccccc",padding:10}},"\nthis.props: ".concat(JSON.stringify(this.props,null,2),'\nlocation.pathname: "').concat(window.location.pathname,'"\nlocation.href: "').concat(window.location.href,'"\n          ').trim()),this.props.debug&&a.default.createElement("div",null,"👇👇If the settings are valid, the comment widget appear below👇👇"),this.state.pending&&a.default.createElement("div",null,"Loading script..."))}}])&&l(n.prototype,r),o&&l(n,o),t}();t.identifierTypes={pathname:{attrValue:"",summary:"Issue title contains page pathname"},url:{attrValue:"url",summary:"Issue title contains page URL"},title:{attrValue:"title",summary:"Issue title contains page title"},"og:title":{attrValue:"og:title",summary:"Issue title contains page og:title"},"issue-number":{attrValue:-1,summary:"Specific issue number"},"issue-term":{attrValue:"",summary:"Issue title contains specific term"}},d.propTypes={type:o.default.string.isRequired,repo:o.default.string.isRequired,specificTerm:o.default.string,issueNumber:o.default.number,hashKey:o.default.string,debug:o.default.bool};var f=d;t.default=f}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-1b0ee27dc8c6b8777267.js.map