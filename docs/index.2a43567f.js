var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e){return e&&e.__esModule?e.default:e}var i={},n={},r=e.parcelRequire94c2;null==r&&((r=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return i[e]=r,t.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequire94c2=r),r.register("6KOho",(function(e,t){
/*!
 * jQuery JavaScript Library v3.6.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2022-08-26T17:52Z
 */
!function(t,i){"object"==typeof e.exports?e.exports=t.document?i(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return i(e)}:i(t)}("undefined"!=typeof window?window:e.exports,(function(e,t){var i=[],n=Object.getPrototypeOf,r=i.slice,o=i.flat?function(e){return i.flat.call(e)}:function(e){return i.concat.apply([],e)},s=i.push,a=i.indexOf,l={},c=l.toString,u=l.hasOwnProperty,h=u.toString,d=h.call(Object),p={},f=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},m=function(e){return null!=e&&e===e.window},g=e.document,_={type:!0,src:!0,nonce:!0,noModule:!0};function y(e,t,i){var n,r,o=(i=i||g).createElement("script");if(o.text=e,t)for(n in _)(r=t[n]||t.getAttribute&&t.getAttribute(n))&&o.setAttribute(n,r);i.head.appendChild(o).parentNode.removeChild(o)}function v(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[c.call(e)]||"object":typeof e}var x="3.6.1",b=function(e,t){return new b.fn.init(e,t)};function w(e){var t=!!e&&"length"in e&&e.length,i=v(e);return!f(e)&&!m(e)&&("array"===i||0===t||"number"==typeof t&&t>0&&t-1 in e)}b.fn=b.prototype={jquery:x,constructor:b,length:0,toArray:function(){return r.call(this)},get:function(e){return null==e?r.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return b.each(this,e)},map:function(e){return this.pushStack(b.map(this,(function(t,i){return e.call(t,i,t)})))},slice:function(){return this.pushStack(r.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(b.grep(this,(function(e,t){return(t+1)%2})))},odd:function(){return this.pushStack(b.grep(this,(function(e,t){return t%2})))},eq:function(e){var t=this.length,i=+e+(e<0?t:0);return this.pushStack(i>=0&&i<t?[this[i]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:i.sort,splice:i.splice},b.extend=b.fn.extend=function(){var e,t,i,n,r,o,s=arguments[0]||{},a=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[a]||{},a++),"object"==typeof s||f(s)||(s={}),a===l&&(s=this,a--);a<l;a++)if(null!=(e=arguments[a]))for(t in e)n=e[t],"__proto__"!==t&&s!==n&&(c&&n&&(b.isPlainObject(n)||(r=Array.isArray(n)))?(i=s[t],o=r&&!Array.isArray(i)?[]:r||b.isPlainObject(i)?i:{},r=!1,s[t]=b.extend(c,o,n)):void 0!==n&&(s[t]=n));return s},b.extend({expando:"jQuery"+(x+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,i;return!(!e||"[object Object]"!==c.call(e))&&(!(t=n(e))||"function"==typeof(i=u.call(t,"constructor")&&t.constructor)&&h.call(i)===d)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,i){y(e,{nonce:t&&t.nonce},i)},each:function(e,t){var i,n=0;if(w(e))for(i=e.length;n<i&&!1!==t.call(e[n],n,e[n]);n++);else for(n in e)if(!1===t.call(e[n],n,e[n]))break;return e},makeArray:function(e,t){var i=t||[];return null!=e&&(w(Object(e))?b.merge(i,"string"==typeof e?[e]:e):s.call(i,e)),i},inArray:function(e,t,i){return null==t?-1:a.call(t,e,i)},merge:function(e,t){for(var i=+t.length,n=0,r=e.length;n<i;n++)e[r++]=t[n];return e.length=r,e},grep:function(e,t,i){for(var n=[],r=0,o=e.length,s=!i;r<o;r++)!t(e[r],r)!==s&&n.push(e[r]);return n},map:function(e,t,i){var n,r,s=0,a=[];if(w(e))for(n=e.length;s<n;s++)null!=(r=t(e[s],s,i))&&a.push(r);else for(s in e)null!=(r=t(e[s],s,i))&&a.push(r);return o(a)},guid:1,support:p}),"function"==typeof Symbol&&(b.fn[Symbol.iterator]=i[Symbol.iterator]),b.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),(function(e,t){l["[object "+t+"]"]=t.toLowerCase()}));var T=
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
//# sourceMappingURL=index.2a43567f.js.map