function t(t){return t&&t.__esModule?t.default:t}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,a=/^0o[0-7]+$/i,l=parseInt,c="object"==typeof n&&n&&n.Object===Object&&n,f="object"==typeof self&&self&&self.Object===Object&&self,u=c||f||Function("return this")(),s=Object.prototype.toString,d=Math.max,h=Math.min,v=function(){return u.Date.now()};function y(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==s.call(t)}(t))return NaN;if(y(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=y(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var n=r.test(t);return n||a.test(t)?l(t.slice(2),n?2:8):o.test(t)?NaN:+t}e=function(t,e,n){var i,o,r,a,l,c,f=0,u=!1,s=!1,w=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function m(e){var n=i,r=o;return i=o=void 0,f=e,a=t.apply(r,n)}function p(t){return f=t,l=setTimeout(x,e),u?m(t):a}function b(t){var n=t-c;return void 0===c||n>=e||n<0||s&&t-f>=r}function x(){var t=v();if(b(t))return M(t);l=setTimeout(x,function(t){var n=e-(t-c);return s?h(n,r-(t-f)):n}(t))}function M(t){return l=void 0,w&&i?m(t):(i=o=void 0,a)}function j(){var t=v(),n=b(t);if(i=arguments,o=this,c=t,n){if(void 0===l)return p(c);if(s)return l=setTimeout(x,e),m(c)}return void 0===l&&(l=setTimeout(x,e)),a}return e=g(e)||0,y(n)&&(u=!!n.leading,r=(s="maxWait"in n)?d(g(n.maxWait)||0,e):r,w="trailing"in n?!!n.trailing:w),j.cancel=function(){void 0!==l&&clearTimeout(l),f=0,i=c=o=l=void 0},j.flush=function(){return void 0===l?a:M(v())},j};const w=document.getElementById("canvas"),m=w.getContext("2d"),p=document.getElementById("ipt"),b=document.createElement("canvas"),x=b.getContext("2d"),M=t=>[t.width,t.height],j=t=>{x.font=`bold ${t}px Avenir, Helvetica Neue, Helvetica, Arial, sans-serif`};let T=["white"],E="Hello",O=[];class H{constructor(t,e,n,i){this.cw=t,this.ch=e,this.dx=n,this.dy=i,this.x=Math.random()*t,this.y=Math.random()*e,this.r=5,this.color=T[Math.floor(Math.random()*T.length)]}render(){this.x+=.07*(this.dx-this.x),this.y+=.07*(this.dy-this.y),m.fillStyle=this.color,m.beginPath(),m.arc(this.x,this.y,this.r,0,2*Math.PI,!1),m.fill()}}function I(){w.width=window.innerWidth,w.height=window.innerHeight,b.width=13*Math.floor(window.innerWidth/13),b.height=13*Math.floor(window.innerHeight/13),x.fillStyle="red",x.textBaseline="middle",x.textAlign="center",(t=>{let e=0;j(1e3);const n=b.width/x.measureText(t).width*.9*1e3,i=b.height/1e3*.45*1e3;e=Math.min(1e3,n,i),console.log(e),j(e);const[o,r]=M(b);x.clearRect(0,0,o,r),x.fillText(t,o/2,r/2)})(E);const t=(()=>{const[t,e]=M(b),n=x.getImageData(0,0,t,e).data,i=[];let o=0,r=0,a=t,l=e,c=0,f=0;for(let u=0;u<n.length;u+=52)n[u+3]>0&&(i.push(new H(t,e,o,r)),c=o>c?o:c,f=r>f?r:f,a=o<a?o:a,l=r<l?r:l),o+=13,o>=t&&(o=0,r+=13,u+=52*t);return{particles:i,w:c+a,h:f+l}})();O=t.particles}I(),p.addEventListener("keydown",(t=>{13===t.keyCode&&(E=p.value,p.value="",I())}));const N=t(e)((()=>I()),500);window.addEventListener("resize",N),function t(){m.clearRect(0,0,w.width,w.height);for(const t of O)t.render();requestAnimationFrame((()=>{t()}))}();