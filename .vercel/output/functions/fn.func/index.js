globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key3, value) => key3 in obj ? __defProp(obj, key3, { enumerable: true, configurable: true, writable: true, value }) : obj[key3] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key3 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key3) && key3 !== except)
        __defProp(to, key3, { get: () => from[key3], enumerable: !(desc = __getOwnPropDesc(from, key3)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key3, value) => {
  __defNormalProp(obj, typeof key3 !== "symbol" ? key3 + "" : key3, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index2.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
function set_current_component(component10) {
  current_component = component10;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component10 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component10.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component10, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key3, context) {
  get_current_component().$$.context.set(key3, context);
  return context;
}
function getContext(key3) {
  return get_current_component().$$.context.get(key3);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i2 = pattern2.lastIndex - 1;
    const ch = str[i2];
    escaped2 += str.substring(last, i2) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i2 + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key3 in obj) {
    result[key3] = escape_attribute_value(obj[key3]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component10, name) {
  if (!component10 || !component10.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component10;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css) => css.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key3) => style_object[key3]).map((key3) => `${key3}: ${escape_attribute_value(style_object[key3])};`).join(" ");
}
var current_component, _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    _boolean_attributes = [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
var HttpError, Redirect, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} [data]
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index10 = 0;
      while (index10 < str.length) {
        var eqIdx = str.indexOf("=", index10);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index10);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index10 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key3 = str.slice(index10, eqIdx).trim();
        if (void 0 === obj[key3]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key3] = tryDecode(val, dec);
        }
        index10 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key3 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key3 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key3 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key3 === "secure") {
          cookie.secure = true;
        } else if (key3 === "httponly") {
          cookie.httpOnly = true;
        } else if (key3 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key3] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key3) {
            return key3.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// node_modules/@iconify/icons-heroicons/bars-3-solid.js
var require_bars_3_solid = __commonJS({
  "node_modules/@iconify/icons-heroicons/bars-3-solid.js"(exports) {
    var data = {
      "width": 24,
      "height": 24,
      "body": '<path fill="currentColor" fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>'
    };
    exports.__esModule = true;
    exports.default = data;
  }
});

// node_modules/web-vitals/dist/web-vitals.js
var R;
var init_web_vitals = __esm({
  "node_modules/web-vitals/dist/web-vitals.js"() {
    R = 1 / 0;
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_index2();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key3 in item) {
    const value = item[key3];
    const valueType = typeof value;
    if (key3 in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key3] = value;
      }
    } else if (valueType === typeof result[key3]) {
      result[key3] = key3 === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber2 = unitsTest.test(code);
  while (true) {
    if (isNumber2) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber2 = !isNumber2;
  }
}
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const result = {
    attributes: {
      width: width.toString(),
      height: height.toString(),
      viewBox: box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString()
    },
    body
  };
  return result;
}
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + "$3"
    );
  });
  return body;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToURL(svg) {
  return 'url("data:image/svg+xml,' + encodeSVGforURL(svg) + '")';
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const mode = props.mode || "svg";
  const componentProps = mode === "svg" ? { ...svgDefaults } : {};
  let style = typeof props.style === "string" ? props.style : "";
  for (let key3 in props) {
    const value = props[key3];
    if (value === void 0) {
      continue;
    }
    switch (key3) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key3] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key3] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key3] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key3.slice(0, 3) === "on:") {
          break;
        }
        if (defaultExtendedIconCustomisations[key3] === void 0) {
          componentProps[key3] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (mode === "svg") {
    Object.assign(componentProps, renderAttribs);
    if (style !== "") {
      componentProps.style = style;
    }
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    return {
      svg: true,
      attributes: componentProps,
      body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
    };
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  const url = svgToURL(html);
  const styles2 = {
    "--svg": url,
    "width": fixSize(renderAttribs.width),
    "height": fixSize(renderAttribs.height),
    ...commonProps,
    ...useMask ? monotoneProps : coloredProps
  };
  let customStyle = "";
  for (const key3 in styles2) {
    customStyle += key3 + ": " + styles2[key3] + ";";
  }
  componentProps.style = customStyle + style;
  return {
    svg: false,
    attributes: componentProps
  };
}
function generateIcon(props) {
  const icon = typeof props.icon === "string" ? storage[props.icon] : typeof props.icon === "object" ? { ...defaultIconProps, ...props.icon } : null;
  if (icon === null || typeof icon !== "object" || typeof icon.body !== "string") {
    return null;
  }
  return render({
    ...defaultIconProps,
    ...icon
  }, props);
}
var import_bars_3_solid, defaultIconDimensions, defaultIconTransformations, defaultIconProps, defaultIconSizeCustomisations, defaultIconCustomisations, separator, unitsSplit, unitsTest, regex, randomPrefix, counter, defaultExtendedIconCustomisations, svgDefaults, commonProps, monotoneProps, coloredProps, propsToAdd, propsToAddTo, storage, OfflineIcon, Nav, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_index2();
    import_bars_3_solid = __toESM(require_bars_3_solid(), 1);
    init_web_vitals();
    init_stores();
    defaultIconDimensions = Object.freeze(
      {
        left: 0,
        top: 0,
        width: 16,
        height: 16
      }
    );
    defaultIconTransformations = Object.freeze({
      rotate: 0,
      vFlip: false,
      hFlip: false
    });
    defaultIconProps = Object.freeze({
      ...defaultIconDimensions,
      ...defaultIconTransformations
    });
    Object.freeze({
      ...defaultIconProps,
      body: "",
      hidden: false
    });
    ({
      provider: "",
      aliases: {},
      not_found: {},
      ...defaultIconDimensions
    });
    defaultIconSizeCustomisations = Object.freeze({
      width: null,
      height: null
    });
    defaultIconCustomisations = Object.freeze({
      ...defaultIconSizeCustomisations,
      ...defaultIconTransformations
    });
    separator = /[\s,]+/;
    unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
    unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
    regex = /\sid="(\S+)"/g;
    randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
    counter = 0;
    defaultExtendedIconCustomisations = {
      ...defaultIconCustomisations,
      inline: false
    };
    svgDefaults = {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "aria-hidden": true,
      "role": "img"
    };
    commonProps = {
      display: "inline-block"
    };
    monotoneProps = {
      "background-color": "currentColor"
    };
    coloredProps = {
      "background-color": "transparent"
    };
    propsToAdd = {
      image: "var(--svg)",
      repeat: "no-repeat",
      size: "100% 100%"
    };
    propsToAddTo = {
      "-webkit-mask": monotoneProps,
      "mask": monotoneProps,
      "background": coloredProps
    };
    for (const prefix in propsToAddTo) {
      const list = propsToAddTo[prefix];
      for (const prop in propsToAdd) {
        list[prefix + "-" + prop] = propsToAdd[prop];
      }
    }
    storage = /* @__PURE__ */ Object.create(null);
    OfflineIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let data;
      {
        {
          data = generateIcon($$props);
        }
      }
      return `${data ? `${data.svg ? `<svg${spread([escape_object(data.attributes)], {})}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : `<span${spread([escape_object(data.attributes)], {})}></span>`}` : ``}`;
    });
    Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { pages } = $$props;
      if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
        $$bindings.pages(pages);
      return `<div class="navbar bg-neutral text-neutral-content shadow rounded-lg"><div class="flex-1"><a class="btn btn-ghost normal-case text-xl" href="/">Flupbot</a></div>
	<div class="flex-none lg:hidden"><label for="nav-drawer" class="btn btn-square btn-ghost">${validate_component(OfflineIcon, "Icon").$$render($$result, { icon: import_bars_3_solid.default, class: "w-7 h-7" }, {}, {})}</label></div>
	<div class="flex-none hidden lg:block"><ul class="menu menu-horizontal p-0">${each(pages, (page2) => {
        return `<li><a${add_attribute("href", page2.href, 0)}>${escape(page2.title)}</a></li>`;
      })}</ul></div></div>`;
    });
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => value);
      const pages = [
        { title: "Music", href: "/music" },
        {
          title: "Generated images",
          href: "/imagegen"
        }
      ];
      $$unsubscribe_page();
      return `${$$result.head += `<!-- HEAD_svelte-7wnsoc_START -->${$$result.title = `<title>Flupbot</title>`, ""}<!-- HEAD_svelte-7wnsoc_END -->`, ""}

<div class="h-screen drawer drawer-end"><input id="nav-drawer" type="checkbox" class="drawer-toggle">
	<div class="drawer-content flex flex-col p-4">${validate_component(Nav, "Nav").$$render($$result, { pages }, {}, {})}
		${slots.default ? slots.default({}) : ``}</div>
	<div class="drawer-side"><label for="nav-drawer" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 divide-y divide-base-content bg-base-100">${each(pages, (page2) => {
        return `<li><a${add_attribute("href", page2.href, 0)}>${escape(page2.title)}</a></li>`;
      })}</ul></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.be0b4b19.js", "_app/immutable/chunks/index.e9f39a1b.js", "_app/immutable/chunks/stores.7f7e5d1d.js", "_app/immutable/chunks/singletons.12ba4dde.js"];
    stylesheets = ["_app/immutable/assets/0.cf8a51aa.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index2();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.ee1508fe.js", "_app/immutable/chunks/index.e9f39a1b.js", "_app/immutable/chunks/stores.7f7e5d1d.js", "_app/immutable/chunks/singletons.12ba4dde.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_index2();
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<main class="flex flex-col justify-center items-center h-full"><img src="//cdn.discordapp.com/attachments/660333004861734935/1009164695149760562/nillerWavemonakS-4.gif" loading="lazy" alt="">
	<span class="text-5xl">Alo bois</span></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    imports3 = ["_app/immutable/nodes/2.9d0e7335.js", "_app/immutable/chunks/index.e9f39a1b.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/private.js
var REPLICATE_API_TOKEN;
var init_private = __esm({
  ".svelte-kit/output/server/chunks/private.js"() {
    REPLICATE_API_TOKEN = "cc9353e9a1da9dd68571e87611e19288a7121204";
  }
});

// .svelte-kit/output/server/entries/pages/imagegen/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  load: () => load
});
var load;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/imagegen/_page.server.ts.js"() {
    init_chunks();
    init_private();
    load = async () => {
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      const predictions = await response.json();
      if (predictions)
        return { predictions };
      throw error(404, "Not found");
    };
  }
});

// .svelte-kit/output/server/entries/pages/imagegen/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/imagegen/_page.svelte.js"() {
    init_index2();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let nextPage = data.predictions.next || "";
      let predictions = data.predictions.results;
      let blurEnabled = true;
      const nsfwWords = [
        "ass",
        "breast",
        "penis",
        "busty",
        "lingerie",
        "topless",
        "bikini",
        "trap",
        "femboy",
        "pussy",
        "butt",
        "busty",
        "bussy",
        "dildo",
        "anal",
        "sex",
        "futa",
        "cock",
        "dick",
        "nude",
        "bra",
        "naked",
        "nipples"
      ];
      const getInput = (input) => {
        if (input?.positive_prompt) {
          return input.positive_prompt;
        } else {
          return input?.prompt?.replace("mdjrny-v4 style", "");
        }
      };
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `


<div class="flex flex-col gap-2"><main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-5 gap-4">${each(predictions, (prediction) => {
        return `${prediction.status === "succeeded" && prediction.source === "api" && prediction.input?.max_train_steps !== 2e3 ? `<a${add_attribute("href", `/imagegen/${prediction.id}`, 0)} class="card bg-neutral shadow-xl text-neutral-content">${prediction.output.length === 1 ? `<img${add_attribute("src", prediction.output?.at(0), 0)} alt="AI Generated"${add_classes((nsfwWords.some((nw) => getInput(prediction.input)?.toLowerCase().includes(nw)) ? "blur-2xl" : "").trim())}>` : `<figure class="${[
          "flex flex-wrap",
          nsfwWords.some((nw) => getInput(prediction.input)?.toLowerCase().includes(nw)) && blurEnabled ? "blur-2xl" : ""
        ].join(" ").trim()}">${each(prediction.output, (output) => {
          return `
								<img${add_attribute("src", output, 0)} class="w-1/2" alt="AI Generated">`;
        })}
						</figure>`}
					<div class="card-body">
						<p class="text-lg">${escape(getInput(prediction.input))}</p></div>
				</a>` : ``}`;
      })}</main>
	${nextPage ? `<button class="btn">Load more</button>` : ``}</div>
<button class="fixed rounded-full bg-primary w-20 h-20 p-4 bottom-4 right-8">${`<img src="//cdn.7tv.app/emote/6346e1b78cb0dce8e422b05a/4x.webp">`}</button>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  server: () => page_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, server_id, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_page_server_ts();
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    server_id = "src/routes/imagegen/+page.server.ts";
    imports4 = ["_app/immutable/nodes/3.b7d90ab1.js", "_app/immutable/chunks/index.e9f39a1b.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/imagegen/_id_/_page.server.ts.js
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  load: () => load2
});
var load2;
var init_page_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/imagegen/_id_/_page.server.ts.js"() {
    init_chunks();
    init_private();
    load2 = async ({ params }) => {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${params.id}`, {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      const prediction = await response.json();
      if (prediction)
        return { prediction };
      throw error(404, "Not found");
    };
  }
});

// .svelte-kit/output/server/entries/pages/imagegen/_id_/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/imagegen/_id_/_page.svelte.js"() {
    init_index2();
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      console.log(data.prediction);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<main class="flex flex-col mt-5 gap-5"><div class="${[
        "flex flex-wrap m-auto place-content-center gap-4 max-w-screen-lg place-items-center",
        data.prediction.output.length > 1 ? "md:grid-cols-2" : ""
      ].join(" ").trim()}"><div class="alert shadow-lg bg-neutral max-w-lg md:max-w-5xl">${data.prediction.input?.positive_prompt ? `<span>${escape(data.prediction.input?.positive_prompt)}</span>` : `<span>${escape(data.prediction.input?.prompt?.replace("mdjrny-v4 style", ""))}</span>`}</div>
		${each(data.prediction.output, (image) => {
        return `<img${add_attribute("src", image, 0)} class="rounded-lg grow max-w-lg w-full md:w-5/12">`;
      })}</div></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  server: () => page_server_ts_exports2,
  server_id: () => server_id2,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, server_id2, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_page_server_ts2();
    index5 = 4;
    component5 = async () => component_cache5 ?? (component_cache5 = (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default);
    server_id2 = "src/routes/imagegen/[id]/+page.server.ts";
    imports5 = ["_app/immutable/nodes/4.f0b9dc4b.js", "_app/immutable/chunks/index.e9f39a1b.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// node_modules/@stencil/core/internal/app-data/index.js
var BUILD, NAMESPACE;
var init_app_data = __esm({
  "node_modules/@stencil/core/internal/app-data/index.js"() {
    BUILD = {
      allRenderFn: false,
      cmpDidLoad: true,
      cmpDidUnload: false,
      cmpDidUpdate: true,
      cmpDidRender: true,
      cmpWillLoad: true,
      cmpWillUpdate: true,
      cmpWillRender: true,
      connectedCallback: true,
      disconnectedCallback: true,
      element: true,
      event: true,
      hasRenderFn: true,
      lifecycle: true,
      hostListener: true,
      hostListenerTargetWindow: true,
      hostListenerTargetDocument: true,
      hostListenerTargetBody: true,
      hostListenerTargetParent: false,
      hostListenerTarget: true,
      member: true,
      method: true,
      mode: true,
      observeAttribute: true,
      prop: true,
      propMutable: true,
      reflect: true,
      scoped: true,
      shadowDom: true,
      slot: true,
      cssAnnotations: true,
      state: true,
      style: true,
      svg: true,
      updatable: true,
      vdomAttribute: true,
      vdomXlink: true,
      vdomClass: true,
      vdomFunctional: true,
      vdomKey: true,
      vdomListener: true,
      vdomRef: true,
      vdomPropOrAttr: true,
      vdomRender: true,
      vdomStyle: true,
      vdomText: true,
      watchCallback: true,
      taskQueue: true,
      hotModuleReplacement: false,
      isDebug: false,
      isDev: false,
      isTesting: false,
      hydrateServerSide: false,
      hydrateClientSide: false,
      lifecycleDOMEvents: false,
      lazyLoad: false,
      profile: false,
      slotRelocation: true,
      appendChildSlotFix: false,
      cloneNodeFix: false,
      hydratedAttribute: false,
      hydratedClass: true,
      safari10: false,
      scriptDataOpts: false,
      shadowDomShim: false,
      slotChildNodesFix: false,
      propBoolean: true,
      propNumber: true,
      propString: true,
      cssVarShim: false,
      constructableCSS: true,
      cmpShouldUpdate: true,
      devTools: false,
      dynamicImportShim: false,
      shadowDelegatesFocus: true,
      initializeNextTick: false,
      asyncLoading: false,
      asyncQueue: false,
      transformTagName: false,
      attachStyles: true
    };
    NAMESPACE = /* default */
    "app";
  }
});

// node_modules/@stencil/core/internal/client/shadow-css.js
var shadow_css_exports = {};
__export(shadow_css_exports, {
  scopeCss: () => scopeCss
});
var safeSelector, restoreSafeSelector, _polyfillHost, _polyfillSlotted, _polyfillHostContext, _parenSuffix, _cssColonHostRe, _cssColonHostContextRe, _cssColonSlottedRe, _polyfillHostNoCombinator, _polyfillHostNoCombinatorRe, _shadowDOMSelectorsRe, _selectorReSuffix, _polyfillHostRe, _colonHostRe, _colonSlottedRe, _colonHostContextRe, _commentRe, stripComments, _commentWithHashRe, extractCommentsWithHash, _ruleRe, _curlyRe, OPEN_CURLY, CLOSE_CURLY, BLOCK_PLACEHOLDER, processRules, escapeBlocks, insertPolyfillHostInCssText, convertColonRule, colonHostPartReplacer, convertColonHost, colonHostContextPartReplacer, convertColonSlotted, convertColonHostContext, convertShadowDOMSelectors, makeScopeMatcher, selectorNeedsScoping, applySimpleSelectorScope, applyStrictSelectorScope, scopeSelector, scopeSelectors, scopeCssText, scopeCss;
var init_shadow_css = __esm({
  "node_modules/@stencil/core/internal/client/shadow-css.js"() {
    safeSelector = (selector) => {
      const placeholders = [];
      let index10 = 0;
      let content;
      selector = selector.replace(/(\[[^\]]*\])/g, (_, keep) => {
        const replaceBy = `__ph-${index10}__`;
        placeholders.push(keep);
        index10++;
        return replaceBy;
      });
      content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (_, pseudo, exp) => {
        const replaceBy = `__ph-${index10}__`;
        placeholders.push(exp);
        index10++;
        return pseudo + replaceBy;
      });
      const ss = {
        content,
        placeholders
      };
      return ss;
    };
    restoreSafeSelector = (placeholders, content) => {
      return content.replace(/__ph-(\d+)__/g, (_, index10) => placeholders[+index10]);
    };
    _polyfillHost = "-shadowcsshost";
    _polyfillSlotted = "-shadowcssslotted";
    _polyfillHostContext = "-shadowcsscontext";
    _parenSuffix = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
    _cssColonHostRe = new RegExp("(" + _polyfillHost + _parenSuffix, "gim");
    _cssColonHostContextRe = new RegExp("(" + _polyfillHostContext + _parenSuffix, "gim");
    _cssColonSlottedRe = new RegExp("(" + _polyfillSlotted + _parenSuffix, "gim");
    _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";
    _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
    _shadowDOMSelectorsRe = [/::shadow/g, /::content/g];
    _selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$";
    _polyfillHostRe = /-shadowcsshost/gim;
    _colonHostRe = /:host/gim;
    _colonSlottedRe = /::slotted/gim;
    _colonHostContextRe = /:host-context/gim;
    _commentRe = /\/\*\s*[\s\S]*?\*\//g;
    stripComments = (input) => {
      return input.replace(_commentRe, "");
    };
    _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
    extractCommentsWithHash = (input) => {
      return input.match(_commentWithHashRe) || [];
    };
    _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
    _curlyRe = /([{}])/g;
    OPEN_CURLY = "{";
    CLOSE_CURLY = "}";
    BLOCK_PLACEHOLDER = "%BLOCK%";
    processRules = (input, ruleCallback) => {
      const inputWithEscapedBlocks = escapeBlocks(input);
      let nextBlockIndex = 0;
      return inputWithEscapedBlocks.escapedString.replace(_ruleRe, (...m) => {
        const selector = m[2];
        let content = "";
        let suffix = m[4];
        let contentPrefix = "";
        if (suffix && suffix.startsWith("{" + BLOCK_PLACEHOLDER)) {
          content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
          suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
          contentPrefix = "{";
        }
        const cssRule = {
          selector,
          content
        };
        const rule = ruleCallback(cssRule);
        return `${m[1]}${rule.selector}${m[3]}${contentPrefix}${rule.content}${suffix}`;
      });
    };
    escapeBlocks = (input) => {
      const inputParts = input.split(_curlyRe);
      const resultParts = [];
      const escapedBlocks = [];
      let bracketCount = 0;
      let currentBlockParts = [];
      for (let partIndex = 0; partIndex < inputParts.length; partIndex++) {
        const part = inputParts[partIndex];
        if (part === CLOSE_CURLY) {
          bracketCount--;
        }
        if (bracketCount > 0) {
          currentBlockParts.push(part);
        } else {
          if (currentBlockParts.length > 0) {
            escapedBlocks.push(currentBlockParts.join(""));
            resultParts.push(BLOCK_PLACEHOLDER);
            currentBlockParts = [];
          }
          resultParts.push(part);
        }
        if (part === OPEN_CURLY) {
          bracketCount++;
        }
      }
      if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(""));
        resultParts.push(BLOCK_PLACEHOLDER);
      }
      const strEscapedBlocks = {
        escapedString: resultParts.join(""),
        blocks: escapedBlocks
      };
      return strEscapedBlocks;
    };
    insertPolyfillHostInCssText = (selector) => {
      selector = selector.replace(_colonHostContextRe, _polyfillHostContext).replace(_colonHostRe, _polyfillHost).replace(_colonSlottedRe, _polyfillSlotted);
      return selector;
    };
    convertColonRule = (cssText, regExp, partReplacer) => {
      return cssText.replace(regExp, (...m) => {
        if (m[2]) {
          const parts = m[2].split(",");
          const r = [];
          for (let i2 = 0; i2 < parts.length; i2++) {
            const p = parts[i2].trim();
            if (!p)
              break;
            r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
          }
          return r.join(",");
        } else {
          return _polyfillHostNoCombinator + m[3];
        }
      });
    };
    colonHostPartReplacer = (host, part, suffix) => {
      return host + part.replace(_polyfillHost, "") + suffix;
    };
    convertColonHost = (cssText) => {
      return convertColonRule(cssText, _cssColonHostRe, colonHostPartReplacer);
    };
    colonHostContextPartReplacer = (host, part, suffix) => {
      if (part.indexOf(_polyfillHost) > -1) {
        return colonHostPartReplacer(host, part, suffix);
      } else {
        return host + part + suffix + ", " + part + " " + host + suffix;
      }
    };
    convertColonSlotted = (cssText, slotScopeId) => {
      const slotClass = "." + slotScopeId + " > ";
      const selectors = [];
      cssText = cssText.replace(_cssColonSlottedRe, (...m) => {
        if (m[2]) {
          const compound = m[2].trim();
          const suffix = m[3];
          const slottedSelector = slotClass + compound + suffix;
          let prefixSelector = "";
          for (let i2 = m[4] - 1; i2 >= 0; i2--) {
            const char = m[5][i2];
            if (char === "}" || char === ",") {
              break;
            }
            prefixSelector = char + prefixSelector;
          }
          const orgSelector = prefixSelector + slottedSelector;
          const addedSelector = `${prefixSelector.trimRight()}${slottedSelector.trim()}`;
          if (orgSelector.trim() !== addedSelector.trim()) {
            const updatedSelector = `${addedSelector}, ${orgSelector}`;
            selectors.push({
              orgSelector,
              updatedSelector
            });
          }
          return slottedSelector;
        } else {
          return _polyfillHostNoCombinator + m[3];
        }
      });
      return {
        selectors,
        cssText
      };
    };
    convertColonHostContext = (cssText) => {
      return convertColonRule(cssText, _cssColonHostContextRe, colonHostContextPartReplacer);
    };
    convertShadowDOMSelectors = (cssText) => {
      return _shadowDOMSelectorsRe.reduce((result, pattern2) => result.replace(pattern2, " "), cssText);
    };
    makeScopeMatcher = (scopeSelector2) => {
      const lre = /\[/g;
      const rre = /\]/g;
      scopeSelector2 = scopeSelector2.replace(lre, "\\[").replace(rre, "\\]");
      return new RegExp("^(" + scopeSelector2 + ")" + _selectorReSuffix, "m");
    };
    selectorNeedsScoping = (selector, scopeSelector2) => {
      const re = makeScopeMatcher(scopeSelector2);
      return !re.test(selector);
    };
    applySimpleSelectorScope = (selector, scopeSelector2, hostSelector) => {
      _polyfillHostRe.lastIndex = 0;
      if (_polyfillHostRe.test(selector)) {
        const replaceBy = `.${hostSelector}`;
        return selector.replace(_polyfillHostNoCombinatorRe, (_, selector2) => {
          return selector2.replace(/([^:]*)(:*)(.*)/, (_2, before, colon, after) => {
            return before + replaceBy + colon + after;
          });
        }).replace(_polyfillHostRe, replaceBy + " ");
      }
      return scopeSelector2 + " " + selector;
    };
    applyStrictSelectorScope = (selector, scopeSelector2, hostSelector) => {
      const isRe = /\[is=([^\]]*)\]/g;
      scopeSelector2 = scopeSelector2.replace(isRe, (_, ...parts) => parts[0]);
      const className = "." + scopeSelector2;
      const _scopeSelectorPart = (p) => {
        let scopedP = p.trim();
        if (!scopedP) {
          return "";
        }
        if (p.indexOf(_polyfillHostNoCombinator) > -1) {
          scopedP = applySimpleSelectorScope(p, scopeSelector2, hostSelector);
        } else {
          const t = p.replace(_polyfillHostRe, "");
          if (t.length > 0) {
            const matches = t.match(/([^:]*)(:*)(.*)/);
            if (matches) {
              scopedP = matches[1] + className + matches[2] + matches[3];
            }
          }
        }
        return scopedP;
      };
      const safeContent = safeSelector(selector);
      selector = safeContent.content;
      let scopedSelector = "";
      let startIndex = 0;
      let res;
      const sep = /( |>|\+|~(?!=))\s*/g;
      const hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
      let shouldScope = !hasHost;
      while ((res = sep.exec(selector)) !== null) {
        const separator2 = res[1];
        const part2 = selector.slice(startIndex, res.index).trim();
        shouldScope = shouldScope || part2.indexOf(_polyfillHostNoCombinator) > -1;
        const scopedPart = shouldScope ? _scopeSelectorPart(part2) : part2;
        scopedSelector += `${scopedPart} ${separator2} `;
        startIndex = sep.lastIndex;
      }
      const part = selector.substring(startIndex);
      shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
      scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
      return restoreSafeSelector(safeContent.placeholders, scopedSelector);
    };
    scopeSelector = (selector, scopeSelectorText, hostSelector, slotSelector) => {
      return selector.split(",").map((shallowPart) => {
        if (slotSelector && shallowPart.indexOf("." + slotSelector) > -1) {
          return shallowPart.trim();
        }
        if (selectorNeedsScoping(shallowPart, scopeSelectorText)) {
          return applyStrictSelectorScope(shallowPart, scopeSelectorText, hostSelector).trim();
        } else {
          return shallowPart.trim();
        }
      }).join(", ");
    };
    scopeSelectors = (cssText, scopeSelectorText, hostSelector, slotSelector, commentOriginalSelector) => {
      return processRules(cssText, (rule) => {
        let selector = rule.selector;
        let content = rule.content;
        if (rule.selector[0] !== "@") {
          selector = scopeSelector(rule.selector, scopeSelectorText, hostSelector, slotSelector);
        } else if (rule.selector.startsWith("@media") || rule.selector.startsWith("@supports") || rule.selector.startsWith("@page") || rule.selector.startsWith("@document")) {
          content = scopeSelectors(rule.content, scopeSelectorText, hostSelector, slotSelector);
        }
        const cssRule = {
          selector: selector.replace(/\s{2,}/g, " ").trim(),
          content
        };
        return cssRule;
      });
    };
    scopeCssText = (cssText, scopeId2, hostScopeId, slotScopeId, commentOriginalSelector) => {
      cssText = insertPolyfillHostInCssText(cssText);
      cssText = convertColonHost(cssText);
      cssText = convertColonHostContext(cssText);
      const slotted = convertColonSlotted(cssText, slotScopeId);
      cssText = slotted.cssText;
      cssText = convertShadowDOMSelectors(cssText);
      if (scopeId2) {
        cssText = scopeSelectors(cssText, scopeId2, hostScopeId, slotScopeId);
      }
      cssText = cssText.replace(/-shadowcsshost-no-combinator/g, `.${hostScopeId}`);
      cssText = cssText.replace(/>\s*\*\s+([^{, ]+)/gm, " $1 ");
      return {
        cssText: cssText.trim(),
        slottedSelectors: slotted.selectors
      };
    };
    scopeCss = (cssText, scopeId2, commentOriginalSelector) => {
      const hostScopeId = scopeId2 + "-h";
      const slotScopeId = scopeId2 + "-s";
      const commentsWithHash = extractCommentsWithHash(cssText);
      cssText = stripComments(cssText);
      const orgSelectors = [];
      if (commentOriginalSelector) {
        const processCommentedSelector = (rule) => {
          const placeholder = `/*!@___${orgSelectors.length}___*/`;
          const comment = `/*!@${rule.selector}*/`;
          orgSelectors.push({ placeholder, comment });
          rule.selector = placeholder + rule.selector;
          return rule;
        };
        cssText = processRules(cssText, (rule) => {
          if (rule.selector[0] !== "@") {
            return processCommentedSelector(rule);
          } else if (rule.selector.startsWith("@media") || rule.selector.startsWith("@supports") || rule.selector.startsWith("@page") || rule.selector.startsWith("@document")) {
            rule.content = processRules(rule.content, processCommentedSelector);
            return rule;
          }
          return rule;
        });
      }
      const scoped = scopeCssText(cssText, scopeId2, hostScopeId, slotScopeId);
      cssText = [scoped.cssText, ...commentsWithHash].join("\n");
      if (commentOriginalSelector) {
        orgSelectors.forEach(({ placeholder, comment }) => {
          cssText = cssText.replace(placeholder, comment);
        });
      }
      scoped.slottedSelectors.forEach((slottedSelector) => {
        cssText = cssText.replace(slottedSelector.orgSelector, slottedSelector.updatedSelector);
      });
      return cssText;
    };
  }
});

// node_modules/@stencil/core/internal/client/index.js
var scopeId, contentRef, hostTagName, customError, i, useNativeShadowDom, checkSlotFallbackVisibility, checkSlotRelocate, isSvgMode, renderingRef, queueCongestion, queuePending, win, CSS, doc, H, plt, supportsShadow, supportsListenerOptions, promiseResolve, supportsConstructibleStylesheets, addHostEventListeners, hostListenerProxy, getHostListenerTarget, hostListenerOpts, CONTENT_REF_ID, ORG_LOCATION_ID, SLOT_NODE_ID, TEXT_NODE_ID, HYDRATE_ID, HYDRATED_STYLE_ID, HYDRATE_CHILD_ID, XLINK_NS, createTime, uniqueTime, rootAppliedStyles, registerStyle, addStyle, attachStyles, getScopeId, computeMode, EMPTY_OBJ, SVG_NS, HTML_NS, isDef, isComplexType, h, newVNode, Host, isHost, vdomFnUtils, convertToPublic, convertToPrivate, validateInputProperties, setAccessor, parseClassListRegex, parseClassList, updateElement, createElm, putBackInOriginalLocation, addVnodes, removeVnodes, updateChildren, isSameVnode, referenceNode, parentReferenceNode, patch, updateFallbackSlotVisibility, relocateNodes, relocateSlotContent, isNodeLocatedInSlot, callNodeRefs, renderVdom, slotReferenceDebugNode, originalLocationDebugNode, getElement, createEvent, emitEvent, attachToAncestor, scheduleUpdate, dispatchHooks, updateComponent, callRender, getRenderingRef, postUpdateComponent, appDidLoad, safeCall, then, emitLifecycleEvent, addHydratedFlag, serverSideConnected, initializeClientHydrate, clientHydrate, initializeDocumentHydrate, parsePropertyValue, getValue, setValue, proxyComponent, initializeComponent, fireConnectedCallback, connectedCallback, setContentReference, disconnectedCallback, proxyCustomElement, attachShadow, Fragment, hostRefs, getHostRef, registerHost, isMemberInElement, consoleError, STENCIL_DEV_MODE, consoleDevError, consoleDevWarn, cmpModules, loadModule, styles, modeResolutionChain, queueDomReads, queueDomWrites, queueDomWritesLow, queueTask, consume, consumeTimeout, flush, nextTick, writeTask, Build;
var init_client = __esm({
  "node_modules/@stencil/core/internal/client/index.js"() {
    init_app_data();
    i = 0;
    useNativeShadowDom = false;
    checkSlotFallbackVisibility = false;
    checkSlotRelocate = false;
    isSvgMode = false;
    renderingRef = null;
    queueCongestion = 0;
    queuePending = false;
    win = typeof window !== "undefined" ? window : {};
    CSS = BUILD.cssVarShim ? win.CSS : null;
    doc = win.document || { head: {} };
    H = win.HTMLElement || class {
    };
    plt = {
      $flags$: 0,
      $resourcesUrl$: "",
      jmp: (h2) => h2(),
      raf: (h2) => requestAnimationFrame(h2),
      ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
      rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
      ce: (eventName, opts) => new CustomEvent(eventName, opts)
    };
    supportsShadow = BUILD.shadowDomShim && BUILD.shadowDom ? /* @__PURE__ */ (() => (doc.head.attachShadow + "").indexOf("[native") > -1)() : true;
    supportsListenerOptions = /* @__PURE__ */ (() => {
      let supportsListenerOptions2 = false;
      try {
        doc.addEventListener("e", null, Object.defineProperty({}, "passive", {
          get() {
            supportsListenerOptions2 = true;
          }
        }));
      } catch (e) {
      }
      return supportsListenerOptions2;
    })();
    promiseResolve = (v) => Promise.resolve(v);
    supportsConstructibleStylesheets = BUILD.constructableCSS ? /* @__PURE__ */ (() => {
      try {
        new CSSStyleSheet();
        return typeof new CSSStyleSheet().replace === "function";
      } catch (e) {
      }
      return false;
    })() : false;
    addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
      if (BUILD.hostListener && listeners) {
        if (BUILD.hostListenerTargetParent) {
          if (attachParentListeners) {
            listeners = listeners.filter(
              ([flags]) => flags & 32
              /* TargetParent */
            );
          } else {
            listeners = listeners.filter(([flags]) => !(flags & 32));
          }
        }
        listeners.map(([flags, name, method]) => {
          const target = BUILD.hostListenerTarget ? getHostListenerTarget(elm, flags) : elm;
          const handler = hostListenerProxy(hostRef, method);
          const opts = hostListenerOpts(flags);
          plt.ael(target, name, handler, opts);
          (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
        });
      }
    };
    hostListenerProxy = (hostRef, methodName) => (ev) => {
      try {
        if (BUILD.lazyLoad) {
          if (hostRef.$flags$ & 256) {
            hostRef.$lazyInstance$[methodName](ev);
          } else {
            (hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([methodName, ev]);
          }
        } else {
          hostRef.$hostElement$[methodName](ev);
        }
      } catch (e) {
        consoleError(e);
      }
    };
    getHostListenerTarget = (elm, flags) => {
      if (BUILD.hostListenerTargetDocument && flags & 4)
        return doc;
      if (BUILD.hostListenerTargetWindow && flags & 8)
        return win;
      if (BUILD.hostListenerTargetBody && flags & 16)
        return doc.body;
      if (BUILD.hostListenerTargetParent && flags & 32)
        return elm.parentElement;
      return elm;
    };
    hostListenerOpts = (flags) => supportsListenerOptions ? {
      passive: (flags & 1) !== 0,
      capture: (flags & 2) !== 0
    } : (flags & 2) !== 0;
    CONTENT_REF_ID = "r";
    ORG_LOCATION_ID = "o";
    SLOT_NODE_ID = "s";
    TEXT_NODE_ID = "t";
    HYDRATE_ID = "s-id";
    HYDRATED_STYLE_ID = "sty-id";
    HYDRATE_CHILD_ID = "c-id";
    XLINK_NS = "http://www.w3.org/1999/xlink";
    createTime = (fnName, tagName = "") => {
      if (BUILD.profile && performance.mark) {
        const key3 = `st:${fnName}:${tagName}:${i++}`;
        performance.mark(key3);
        return () => performance.measure(`[Stencil] ${fnName}() <${tagName}>`, key3);
      } else {
        return () => {
          return;
        };
      }
    };
    uniqueTime = (key3, measureText) => {
      if (BUILD.profile && performance.mark) {
        if (performance.getEntriesByName(key3).length === 0) {
          performance.mark(key3);
        }
        return () => {
          if (performance.getEntriesByName(measureText).length === 0) {
            performance.measure(measureText, key3);
          }
        };
      } else {
        return () => {
          return;
        };
      }
    };
    rootAppliedStyles = /* @__PURE__ */ new WeakMap();
    registerStyle = (scopeId2, cssText, allowCS) => {
      let style = styles.get(scopeId2);
      if (supportsConstructibleStylesheets && allowCS) {
        style = style || new CSSStyleSheet();
        style.replace(cssText);
      } else {
        style = cssText;
      }
      styles.set(scopeId2, style);
    };
    addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
      let scopeId2 = getScopeId(cmpMeta, mode);
      let style = styles.get(scopeId2);
      if (!BUILD.attachStyles) {
        return scopeId2;
      }
      styleContainerNode = styleContainerNode.nodeType === 11 ? styleContainerNode : doc;
      if (style) {
        if (typeof style === "string") {
          styleContainerNode = styleContainerNode.head || styleContainerNode;
          let appliedStyles = rootAppliedStyles.get(styleContainerNode);
          let styleElm;
          if (!appliedStyles) {
            rootAppliedStyles.set(styleContainerNode, appliedStyles = /* @__PURE__ */ new Set());
          }
          if (!appliedStyles.has(scopeId2)) {
            if (BUILD.hydrateClientSide && styleContainerNode.host && (styleElm = styleContainerNode.querySelector(`[${HYDRATED_STYLE_ID}="${scopeId2}"]`))) {
              styleElm.innerHTML = style;
            } else {
              if (BUILD.cssVarShim && plt.$cssShim$) {
                styleElm = plt.$cssShim$.createHostStyle(hostElm, scopeId2, style, !!(cmpMeta.$flags$ & 10));
                const newScopeId = styleElm["s-sc"];
                if (newScopeId) {
                  scopeId2 = newScopeId;
                  appliedStyles = null;
                }
              } else {
                styleElm = doc.createElement("style");
                styleElm.innerHTML = style;
              }
              if (BUILD.hydrateServerSide || BUILD.hotModuleReplacement) {
                styleElm.setAttribute(HYDRATED_STYLE_ID, scopeId2);
              }
              styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector("link"));
            }
            if (appliedStyles) {
              appliedStyles.add(scopeId2);
            }
          }
        } else if (BUILD.constructableCSS && !styleContainerNode.adoptedStyleSheets.includes(style)) {
          styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
        }
      }
      return scopeId2;
    };
    attachStyles = (hostRef) => {
      const cmpMeta = hostRef.$cmpMeta$;
      const elm = hostRef.$hostElement$;
      const flags = cmpMeta.$flags$;
      const endAttachStyles = createTime("attachStyles", cmpMeta.$tagName$);
      const scopeId2 = addStyle(BUILD.shadowDom && supportsShadow && elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta, hostRef.$modeName$, elm);
      if ((BUILD.shadowDom || BUILD.scoped) && BUILD.cssAnnotations && flags & 10) {
        elm["s-sc"] = scopeId2;
        elm.classList.add(scopeId2 + "-h");
        if (BUILD.scoped && flags & 2) {
          elm.classList.add(scopeId2 + "-s");
        }
      }
      endAttachStyles();
    };
    getScopeId = (cmp, mode) => "sc-" + (BUILD.mode && mode && cmp.$flags$ & 32 ? cmp.$tagName$ + "-" + mode : cmp.$tagName$);
    computeMode = (elm) => modeResolutionChain.map((h2) => h2(elm)).find((m) => !!m);
    EMPTY_OBJ = {};
    SVG_NS = "http://www.w3.org/2000/svg";
    HTML_NS = "http://www.w3.org/1999/xhtml";
    isDef = (v) => v != null;
    isComplexType = (o) => {
      o = typeof o;
      return o === "object" || o === "function";
    };
    h = (nodeName, vnodeData, ...children) => {
      let child = null;
      let key3 = null;
      let slotName = null;
      let simple = false;
      let lastSimple = false;
      let vNodeChildren = [];
      const walk = (c) => {
        for (let i2 = 0; i2 < c.length; i2++) {
          child = c[i2];
          if (Array.isArray(child)) {
            walk(child);
          } else if (child != null && typeof child !== "boolean") {
            if (simple = typeof nodeName !== "function" && !isComplexType(child)) {
              child = String(child);
            } else if (BUILD.isDev && typeof nodeName !== "function" && child.$flags$ === void 0) {
              consoleDevError(`vNode passed as children has unexpected type.
Make sure it's using the correct h() function.
Empty objects can also be the cause, look for JSX comments that became objects.`);
            }
            if (simple && lastSimple) {
              vNodeChildren[vNodeChildren.length - 1].$text$ += child;
            } else {
              vNodeChildren.push(simple ? newVNode(null, child) : child);
            }
            lastSimple = simple;
          }
        }
      };
      walk(children);
      if (vnodeData) {
        if (BUILD.isDev && nodeName === "input") {
          validateInputProperties(vnodeData);
        }
        if (BUILD.vdomKey && vnodeData.key) {
          key3 = vnodeData.key;
        }
        if (BUILD.slotRelocation && vnodeData.name) {
          slotName = vnodeData.name;
        }
        if (BUILD.vdomClass) {
          const classData = vnodeData.className || vnodeData.class;
          if (classData) {
            vnodeData.class = typeof classData !== "object" ? classData : Object.keys(classData).filter((k) => classData[k]).join(" ");
          }
        }
      }
      if (BUILD.isDev && vNodeChildren.some(isHost)) {
        consoleDevError(`The <Host> must be the single root component. Make sure:
- You are NOT using hostData() and <Host> in the same component.
- <Host> is used once, and it's the single root component of the render() function.`);
      }
      if (BUILD.vdomFunctional && typeof nodeName === "function") {
        return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
      }
      const vnode = newVNode(nodeName, null);
      vnode.$attrs$ = vnodeData;
      if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
      }
      if (BUILD.vdomKey) {
        vnode.$key$ = key3;
      }
      if (BUILD.slotRelocation) {
        vnode.$name$ = slotName;
      }
      return vnode;
    };
    newVNode = (tag, text2) => {
      const vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text2,
        $elm$: null,
        $children$: null
      };
      if (BUILD.vdomAttribute) {
        vnode.$attrs$ = null;
      }
      if (BUILD.vdomKey) {
        vnode.$key$ = null;
      }
      if (BUILD.slotRelocation) {
        vnode.$name$ = null;
      }
      return vnode;
    };
    Host = {};
    isHost = (node) => node && node.$tag$ === Host;
    vdomFnUtils = {
      forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
      map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate)
    };
    convertToPublic = (node) => ({
      vattrs: node.$attrs$,
      vchildren: node.$children$,
      vkey: node.$key$,
      vname: node.$name$,
      vtag: node.$tag$,
      vtext: node.$text$
    });
    convertToPrivate = (node) => {
      if (typeof node.vtag === "function") {
        const vnodeData = Object.assign({}, node.vattrs);
        if (node.vkey) {
          vnodeData.key = node.vkey;
        }
        if (node.vname) {
          vnodeData.name = node.vname;
        }
        return h(node.vtag, vnodeData, ...node.vchildren || []);
      }
      const vnode = newVNode(node.vtag, node.vtext);
      vnode.$attrs$ = node.vattrs;
      vnode.$children$ = node.vchildren;
      vnode.$key$ = node.vkey;
      vnode.$name$ = node.vname;
      return vnode;
    };
    validateInputProperties = (vnodeData) => {
      const props = Object.keys(vnodeData);
      const typeIndex = props.indexOf("type");
      const minIndex = props.indexOf("min");
      const maxIndex = props.indexOf("max");
      const stepIndex = props.indexOf("min");
      const value = props.indexOf("value");
      if (value === -1) {
        return;
      }
      if (value < typeIndex || value < minIndex || value < maxIndex || value < stepIndex) {
        consoleDevWarn(`The "value" prop of <input> should be set after "min", "max", "type" and "step"`);
      }
    };
    setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
      if (oldValue !== newValue) {
        let isProp = isMemberInElement(elm, memberName);
        let ln = memberName.toLowerCase();
        if (BUILD.vdomClass && memberName === "class") {
          const classList = elm.classList;
          const oldClasses = parseClassList(oldValue);
          const newClasses = parseClassList(newValue);
          classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)));
          classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
        } else if (BUILD.vdomStyle && memberName === "style") {
          if (BUILD.updatable) {
            for (const prop in oldValue) {
              if (!newValue || newValue[prop] == null) {
                if (!BUILD.hydrateServerSide && prop.includes("-")) {
                  elm.style.removeProperty(prop);
                } else {
                  elm.style[prop] = "";
                }
              }
            }
          }
          for (const prop in newValue) {
            if (!oldValue || newValue[prop] !== oldValue[prop]) {
              if (!BUILD.hydrateServerSide && prop.includes("-")) {
                elm.style.setProperty(prop, newValue[prop]);
              } else {
                elm.style[prop] = newValue[prop];
              }
            }
          }
        } else if (BUILD.vdomKey && memberName === "key")
          ;
        else if (BUILD.vdomRef && memberName === "ref") {
          if (newValue) {
            newValue(elm);
          }
        } else if (BUILD.vdomListener && (BUILD.lazyLoad ? !isProp : !elm.__lookupSetter__(memberName)) && memberName[0] === "o" && memberName[1] === "n") {
          if (memberName[2] === "-") {
            memberName = memberName.slice(3);
          } else if (isMemberInElement(win, ln)) {
            memberName = ln.slice(2);
          } else {
            memberName = ln[2] + memberName.slice(3);
          }
          if (oldValue) {
            plt.rel(elm, memberName, oldValue, false);
          }
          if (newValue) {
            plt.ael(elm, memberName, newValue, false);
          }
        } else if (BUILD.vdomPropOrAttr) {
          const isComplex = isComplexType(newValue);
          if ((isProp || isComplex && newValue !== null) && !isSvg) {
            try {
              if (!elm.tagName.includes("-")) {
                let n = newValue == null ? "" : newValue;
                if (memberName === "list") {
                  isProp = false;
                } else if (oldValue == null || elm[memberName] != n) {
                  elm[memberName] = n;
                }
              } else {
                elm[memberName] = newValue;
              }
            } catch (e) {
            }
          }
          let xlink = false;
          if (BUILD.vdomXlink) {
            if (ln !== (ln = ln.replace(/^xlink\:?/, ""))) {
              memberName = ln;
              xlink = true;
            }
          }
          if (newValue == null || newValue === false) {
            if (newValue !== false || elm.getAttribute(memberName) === "") {
              if (BUILD.vdomXlink && xlink) {
                elm.removeAttributeNS(XLINK_NS, memberName);
              } else {
                elm.removeAttribute(memberName);
              }
            }
          } else if ((!isProp || flags & 4 || isSvg) && !isComplex) {
            newValue = newValue === true ? "" : newValue;
            if (BUILD.vdomXlink && xlink) {
              elm.setAttributeNS(XLINK_NS, memberName, newValue);
            } else {
              elm.setAttribute(memberName, newValue);
            }
          }
        }
      }
    };
    parseClassListRegex = /\s/;
    parseClassList = (value) => !value ? [] : value.split(parseClassListRegex);
    updateElement = (oldVnode, newVnode, isSvgMode2, memberName) => {
      const elm = newVnode.$elm$.nodeType === 11 && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
      const oldVnodeAttrs = oldVnode && oldVnode.$attrs$ || EMPTY_OBJ;
      const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
      if (BUILD.updatable) {
        for (memberName in oldVnodeAttrs) {
          if (!(memberName in newVnodeAttrs)) {
            setAccessor(elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode2, newVnode.$flags$);
          }
        }
      }
      for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode2, newVnode.$flags$);
      }
    };
    createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
      let newVNode2 = newParentVNode.$children$[childIndex];
      let i2 = 0;
      let elm;
      let childNode;
      let oldVNode;
      if (BUILD.slotRelocation && !useNativeShadowDom) {
        checkSlotRelocate = true;
        if (newVNode2.$tag$ === "slot") {
          if (scopeId) {
            parentElm.classList.add(scopeId + "-s");
          }
          newVNode2.$flags$ |= newVNode2.$children$ ? (
            // slot element has fallback content
            2
          ) : (
            // slot element does not have fallback content
            1
          );
        }
      }
      if (BUILD.isDev && newVNode2.$elm$) {
        consoleDevError(`The JSX ${newVNode2.$text$ !== null ? `"${newVNode2.$text$}" text` : `"${newVNode2.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`);
      }
      if (BUILD.vdomText && newVNode2.$text$ !== null) {
        elm = newVNode2.$elm$ = doc.createTextNode(newVNode2.$text$);
      } else if (BUILD.slotRelocation && newVNode2.$flags$ & 1) {
        elm = newVNode2.$elm$ = BUILD.isDebug || BUILD.hydrateServerSide ? slotReferenceDebugNode(newVNode2) : doc.createTextNode("");
      } else {
        if (BUILD.svg && !isSvgMode) {
          isSvgMode = newVNode2.$tag$ === "svg";
        }
        elm = newVNode2.$elm$ = BUILD.svg ? doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, BUILD.slotRelocation && newVNode2.$flags$ & 2 ? "slot-fb" : newVNode2.$tag$) : doc.createElement(BUILD.slotRelocation && newVNode2.$flags$ & 2 ? "slot-fb" : newVNode2.$tag$);
        if (BUILD.svg && isSvgMode && newVNode2.$tag$ === "foreignObject") {
          isSvgMode = false;
        }
        if (BUILD.vdomAttribute) {
          updateElement(null, newVNode2, isSvgMode);
        }
        if ((BUILD.shadowDom || BUILD.scoped) && isDef(scopeId) && elm["s-si"] !== scopeId) {
          elm.classList.add(elm["s-si"] = scopeId);
        }
        if (newVNode2.$children$) {
          for (i2 = 0; i2 < newVNode2.$children$.length; ++i2) {
            childNode = createElm(oldParentVNode, newVNode2, i2, elm);
            if (childNode) {
              elm.appendChild(childNode);
            }
          }
        }
        if (BUILD.svg) {
          if (newVNode2.$tag$ === "svg") {
            isSvgMode = false;
          } else if (elm.tagName === "foreignObject") {
            isSvgMode = true;
          }
        }
      }
      if (BUILD.slotRelocation) {
        elm["s-hn"] = hostTagName;
        if (newVNode2.$flags$ & (2 | 1)) {
          elm["s-sr"] = true;
          elm["s-cr"] = contentRef;
          elm["s-sn"] = newVNode2.$name$ || "";
          oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
          if (oldVNode && oldVNode.$tag$ === newVNode2.$tag$ && oldParentVNode.$elm$) {
            putBackInOriginalLocation(oldParentVNode.$elm$, false);
          }
        }
      }
      return elm;
    };
    putBackInOriginalLocation = (parentElm, recursive) => {
      plt.$flags$ |= 1;
      const oldSlotChildNodes = parentElm.childNodes;
      for (let i2 = oldSlotChildNodes.length - 1; i2 >= 0; i2--) {
        const childNode = oldSlotChildNodes[i2];
        if (childNode["s-hn"] !== hostTagName && childNode["s-ol"]) {
          parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
          childNode["s-ol"].remove();
          childNode["s-ol"] = void 0;
          checkSlotRelocate = true;
        }
        if (recursive) {
          putBackInOriginalLocation(childNode, recursive);
        }
      }
      plt.$flags$ &= ~1;
    };
    addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
      let containerElm = BUILD.slotRelocation && parentElm["s-cr"] && parentElm["s-cr"].parentNode || parentElm;
      let childNode;
      if (BUILD.shadowDom && containerElm.shadowRoot && containerElm.tagName === hostTagName) {
        containerElm = containerElm.shadowRoot;
      }
      for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
          childNode = createElm(null, parentVNode, startIdx, parentElm);
          if (childNode) {
            vnodes[startIdx].$elm$ = childNode;
            containerElm.insertBefore(childNode, BUILD.slotRelocation ? referenceNode(before) : before);
          }
        }
      }
    };
    removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
      for (; startIdx <= endIdx; ++startIdx) {
        if (vnode = vnodes[startIdx]) {
          elm = vnode.$elm$;
          callNodeRefs(vnode);
          if (BUILD.slotRelocation) {
            checkSlotFallbackVisibility = true;
            if (elm["s-ol"]) {
              elm["s-ol"].remove();
            } else {
              putBackInOriginalLocation(elm, true);
            }
          }
          elm.remove();
        }
      }
    };
    updateChildren = (parentElm, oldCh, newVNode2, newCh) => {
      let oldStartIdx = 0;
      let newStartIdx = 0;
      let idxInOld = 0;
      let i2 = 0;
      let oldEndIdx = oldCh.length - 1;
      let oldStartVnode = oldCh[0];
      let oldEndVnode = oldCh[oldEndIdx];
      let newEndIdx = newCh.length - 1;
      let newStartVnode = newCh[0];
      let newEndVnode = newCh[newEndIdx];
      let node;
      let elmToMove;
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode == null) {
          newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode == null) {
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {
          patch(oldStartVnode, newStartVnode);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
          patch(oldEndVnode, newEndVnode);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
          if (BUILD.slotRelocation && (oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")) {
            putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
          }
          patch(oldStartVnode, newEndVnode);
          parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
          if (BUILD.slotRelocation && (oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")) {
            putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
          }
          patch(oldEndVnode, newStartVnode);
          parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          idxInOld = -1;
          if (BUILD.vdomKey) {
            for (i2 = oldStartIdx; i2 <= oldEndIdx; ++i2) {
              if (oldCh[i2] && oldCh[i2].$key$ !== null && oldCh[i2].$key$ === newStartVnode.$key$) {
                idxInOld = i2;
                break;
              }
            }
          }
          if (BUILD.vdomKey && idxInOld >= 0) {
            elmToMove = oldCh[idxInOld];
            if (elmToMove.$tag$ !== newStartVnode.$tag$) {
              node = createElm(oldCh && oldCh[newStartIdx], newVNode2, idxInOld, parentElm);
            } else {
              patch(elmToMove, newStartVnode);
              oldCh[idxInOld] = void 0;
              node = elmToMove.$elm$;
            }
            newStartVnode = newCh[++newStartIdx];
          } else {
            node = createElm(oldCh && oldCh[newStartIdx], newVNode2, newStartIdx, parentElm);
            newStartVnode = newCh[++newStartIdx];
          }
          if (node) {
            if (BUILD.slotRelocation) {
              parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
            } else {
              oldStartVnode.$elm$.parentNode.insertBefore(node, oldStartVnode.$elm$);
            }
          }
        }
      }
      if (oldStartIdx > oldEndIdx) {
        addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode2, newCh, newStartIdx, newEndIdx);
      } else if (BUILD.updatable && newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
      }
    };
    isSameVnode = (vnode1, vnode2) => {
      if (vnode1.$tag$ === vnode2.$tag$) {
        if (BUILD.slotRelocation && vnode1.$tag$ === "slot") {
          return vnode1.$name$ === vnode2.$name$;
        }
        if (BUILD.vdomKey) {
          return vnode1.$key$ === vnode2.$key$;
        }
        return true;
      }
      return false;
    };
    referenceNode = (node) => {
      return node && node["s-ol"] || node;
    };
    parentReferenceNode = (node) => (node["s-ol"] ? node["s-ol"] : node).parentNode;
    patch = (oldVNode, newVNode2) => {
      const elm = newVNode2.$elm$ = oldVNode.$elm$;
      const oldChildren = oldVNode.$children$;
      const newChildren = newVNode2.$children$;
      const tag = newVNode2.$tag$;
      const text2 = newVNode2.$text$;
      let defaultHolder;
      if (!BUILD.vdomText || text2 === null) {
        if (BUILD.svg) {
          isSvgMode = tag === "svg" ? true : tag === "foreignObject" ? false : isSvgMode;
        }
        if (BUILD.vdomAttribute || BUILD.reflect) {
          if (BUILD.slot && tag === "slot")
            ;
          else {
            updateElement(oldVNode, newVNode2, isSvgMode);
          }
        }
        if (BUILD.updatable && oldChildren !== null && newChildren !== null) {
          updateChildren(elm, oldChildren, newVNode2, newChildren);
        } else if (newChildren !== null) {
          if (BUILD.updatable && BUILD.vdomText && oldVNode.$text$ !== null) {
            elm.textContent = "";
          }
          addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
        } else if (BUILD.updatable && oldChildren !== null) {
          removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
        if (BUILD.svg && isSvgMode && tag === "svg") {
          isSvgMode = false;
        }
      } else if (BUILD.vdomText && BUILD.slotRelocation && (defaultHolder = elm["s-cr"])) {
        defaultHolder.parentNode.textContent = text2;
      } else if (BUILD.vdomText && oldVNode.$text$ !== text2) {
        elm.data = text2;
      }
    };
    updateFallbackSlotVisibility = (elm) => {
      let childNodes = elm.childNodes;
      let childNode;
      let i2;
      let ilen;
      let j;
      let slotNameAttr;
      let nodeType;
      for (i2 = 0, ilen = childNodes.length; i2 < ilen; i2++) {
        childNode = childNodes[i2];
        if (childNode.nodeType === 1) {
          if (childNode["s-sr"]) {
            slotNameAttr = childNode["s-sn"];
            childNode.hidden = false;
            for (j = 0; j < ilen; j++) {
              nodeType = childNodes[j].nodeType;
              if (childNodes[j]["s-hn"] !== childNode["s-hn"] || slotNameAttr !== "") {
                if (nodeType === 1 && slotNameAttr === childNodes[j].getAttribute("slot")) {
                  childNode.hidden = true;
                  break;
                }
              } else {
                if (nodeType === 1 || nodeType === 3 && childNodes[j].textContent.trim() !== "") {
                  childNode.hidden = true;
                  break;
                }
              }
            }
          }
          updateFallbackSlotVisibility(childNode);
        }
      }
    };
    relocateNodes = [];
    relocateSlotContent = (elm) => {
      let childNode;
      let node;
      let hostContentNodes;
      let slotNameAttr;
      let relocateNodeData;
      let j;
      let i2 = 0;
      let childNodes = elm.childNodes;
      let ilen = childNodes.length;
      for (; i2 < ilen; i2++) {
        childNode = childNodes[i2];
        if (childNode["s-sr"] && (node = childNode["s-cr"]) && node.parentNode) {
          hostContentNodes = node.parentNode.childNodes;
          slotNameAttr = childNode["s-sn"];
          for (j = hostContentNodes.length - 1; j >= 0; j--) {
            node = hostContentNodes[j];
            if (!node["s-cn"] && !node["s-nr"] && node["s-hn"] !== childNode["s-hn"]) {
              if (isNodeLocatedInSlot(node, slotNameAttr)) {
                relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                checkSlotFallbackVisibility = true;
                node["s-sn"] = node["s-sn"] || slotNameAttr;
                if (relocateNodeData) {
                  relocateNodeData.$slotRefNode$ = childNode;
                } else {
                  relocateNodes.push({
                    $slotRefNode$: childNode,
                    $nodeToRelocate$: node
                  });
                }
                if (node["s-sr"]) {
                  relocateNodes.map((relocateNode) => {
                    if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node["s-sn"])) {
                      relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                      if (relocateNodeData && !relocateNode.$slotRefNode$) {
                        relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                      }
                    }
                  });
                }
              } else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
                relocateNodes.push({
                  $nodeToRelocate$: node
                });
              }
            }
          }
        }
        if (childNode.nodeType === 1) {
          relocateSlotContent(childNode);
        }
      }
    };
    isNodeLocatedInSlot = (nodeToRelocate, slotNameAttr) => {
      if (nodeToRelocate.nodeType === 1) {
        if (nodeToRelocate.getAttribute("slot") === null && slotNameAttr === "") {
          return true;
        }
        if (nodeToRelocate.getAttribute("slot") === slotNameAttr) {
          return true;
        }
        return false;
      }
      if (nodeToRelocate["s-sn"] === slotNameAttr) {
        return true;
      }
      return slotNameAttr === "";
    };
    callNodeRefs = (vNode) => {
      if (BUILD.vdomRef) {
        vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
        vNode.$children$ && vNode.$children$.map(callNodeRefs);
      }
    };
    renderVdom = (hostRef, renderFnResults) => {
      const hostElm = hostRef.$hostElement$;
      const cmpMeta = hostRef.$cmpMeta$;
      const oldVNode = hostRef.$vnode$ || newVNode(null, null);
      const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
      hostTagName = hostElm.tagName;
      if (BUILD.isDev && Array.isArray(renderFnResults) && renderFnResults.some(isHost)) {
        throw new Error(`The <Host> must be the single root component.
Looks like the render() function of "${hostTagName.toLowerCase()}" is returning an array that contains the <Host>.

The render() function should look like this instead:

render() {
  // Do not return an array
  return (
    <Host>{content}</Host>
  );
}
  `);
      }
      if (BUILD.reflect && cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.map(([propName, attribute]) => rootVnode.$attrs$[attribute] = hostElm[propName]);
      }
      rootVnode.$tag$ = null;
      rootVnode.$flags$ |= 4;
      hostRef.$vnode$ = rootVnode;
      rootVnode.$elm$ = oldVNode.$elm$ = BUILD.shadowDom ? hostElm.shadowRoot || hostElm : hostElm;
      if (BUILD.scoped || BUILD.shadowDom) {
        scopeId = hostElm["s-sc"];
      }
      if (BUILD.slotRelocation) {
        contentRef = hostElm["s-cr"];
        useNativeShadowDom = supportsShadow && (cmpMeta.$flags$ & 1) !== 0;
        checkSlotFallbackVisibility = false;
      }
      patch(oldVNode, rootVnode);
      if (BUILD.slotRelocation) {
        plt.$flags$ |= 1;
        if (checkSlotRelocate) {
          relocateSlotContent(rootVnode.$elm$);
          let relocateData;
          let nodeToRelocate;
          let orgLocationNode;
          let parentNodeRef;
          let insertBeforeNode;
          let refNode;
          let i2 = 0;
          for (; i2 < relocateNodes.length; i2++) {
            relocateData = relocateNodes[i2];
            nodeToRelocate = relocateData.$nodeToRelocate$;
            if (!nodeToRelocate["s-ol"]) {
              orgLocationNode = BUILD.isDebug || BUILD.hydrateServerSide ? originalLocationDebugNode(nodeToRelocate) : doc.createTextNode("");
              orgLocationNode["s-nr"] = nodeToRelocate;
              nodeToRelocate.parentNode.insertBefore(nodeToRelocate["s-ol"] = orgLocationNode, nodeToRelocate);
            }
          }
          for (i2 = 0; i2 < relocateNodes.length; i2++) {
            relocateData = relocateNodes[i2];
            nodeToRelocate = relocateData.$nodeToRelocate$;
            if (relocateData.$slotRefNode$) {
              parentNodeRef = relocateData.$slotRefNode$.parentNode;
              insertBeforeNode = relocateData.$slotRefNode$.nextSibling;
              orgLocationNode = nodeToRelocate["s-ol"];
              while (orgLocationNode = orgLocationNode.previousSibling) {
                refNode = orgLocationNode["s-nr"];
                if (refNode && refNode["s-sn"] === nodeToRelocate["s-sn"] && parentNodeRef === refNode.parentNode) {
                  refNode = refNode.nextSibling;
                  if (!refNode || !refNode["s-nr"]) {
                    insertBeforeNode = refNode;
                    break;
                  }
                }
              }
              if (!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode || nodeToRelocate.nextSibling !== insertBeforeNode) {
                if (nodeToRelocate !== insertBeforeNode) {
                  if (!nodeToRelocate["s-hn"] && nodeToRelocate["s-ol"]) {
                    nodeToRelocate["s-hn"] = nodeToRelocate["s-ol"].parentNode.nodeName;
                  }
                  parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
                }
              }
            } else {
              if (nodeToRelocate.nodeType === 1) {
                nodeToRelocate.hidden = true;
              }
            }
          }
        }
        if (checkSlotFallbackVisibility) {
          updateFallbackSlotVisibility(rootVnode.$elm$);
        }
        plt.$flags$ &= ~1;
        relocateNodes.length = 0;
      }
    };
    slotReferenceDebugNode = (slotVNode) => doc.createComment(`<slot${slotVNode.$name$ ? ' name="' + slotVNode.$name$ + '"' : ""}> (host=${hostTagName.toLowerCase()})`);
    originalLocationDebugNode = (nodeToRelocate) => doc.createComment(`org-location for ` + (nodeToRelocate.localName ? `<${nodeToRelocate.localName}> (host=${nodeToRelocate["s-hn"]})` : `[${nodeToRelocate.textContent}]`));
    getElement = (ref) => BUILD.lazyLoad ? getHostRef(ref).$hostElement$ : ref;
    createEvent = (ref, name, flags) => {
      const elm = getElement(ref);
      return {
        emit: (detail) => {
          if (BUILD.isDev && !elm.isConnected) {
            consoleDevWarn(`The "${name}" event was emitted, but the dispatcher node is no longer connected to the dom.`);
          }
          return emitEvent(elm, name, {
            bubbles: !!(flags & 4),
            composed: !!(flags & 2),
            cancelable: !!(flags & 1),
            detail
          });
        }
      };
    };
    emitEvent = (elm, name, opts) => {
      const ev = plt.ce(name, opts);
      elm.dispatchEvent(ev);
      return ev;
    };
    attachToAncestor = (hostRef, ancestorComponent) => {
      if (BUILD.asyncLoading && ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent["s-p"]) {
        ancestorComponent["s-p"].push(new Promise((r) => hostRef.$onRenderResolve$ = r));
      }
    };
    scheduleUpdate = (hostRef, isInitialLoad) => {
      if (BUILD.taskQueue && BUILD.updatable) {
        hostRef.$flags$ |= 16;
      }
      if (BUILD.asyncLoading && hostRef.$flags$ & 4) {
        hostRef.$flags$ |= 512;
        return;
      }
      attachToAncestor(hostRef, hostRef.$ancestorComponent$);
      const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
      return BUILD.taskQueue ? writeTask(dispatch) : dispatch();
    };
    dispatchHooks = (hostRef, isInitialLoad) => {
      const elm = hostRef.$hostElement$;
      const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
      const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
      let promise;
      if (isInitialLoad) {
        if (BUILD.lazyLoad && BUILD.hostListener) {
          hostRef.$flags$ |= 256;
          if (hostRef.$queuedListeners$) {
            hostRef.$queuedListeners$.map(([methodName, event]) => safeCall(instance, methodName, event));
            hostRef.$queuedListeners$ = null;
          }
        }
        emitLifecycleEvent(elm, "componentWillLoad");
        if (BUILD.cmpWillLoad) {
          promise = safeCall(instance, "componentWillLoad");
        }
      } else {
        emitLifecycleEvent(elm, "componentWillUpdate");
        if (BUILD.cmpWillUpdate) {
          promise = safeCall(instance, "componentWillUpdate");
        }
      }
      emitLifecycleEvent(elm, "componentWillRender");
      if (BUILD.cmpWillRender) {
        promise = then(promise, () => safeCall(instance, "componentWillRender"));
      }
      endSchedule();
      return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
    };
    updateComponent = async (hostRef, instance, isInitialLoad) => {
      const elm = hostRef.$hostElement$;
      const endUpdate = createTime("update", hostRef.$cmpMeta$.$tagName$);
      const rc = elm["s-rc"];
      if (BUILD.style && isInitialLoad) {
        attachStyles(hostRef);
      }
      const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
      if (BUILD.isDev) {
        hostRef.$flags$ |= 1024;
      }
      if (BUILD.hydrateServerSide) {
        await callRender(hostRef, instance, elm);
      } else {
        callRender(hostRef, instance, elm);
      }
      if (BUILD.cssVarShim && plt.$cssShim$) {
        plt.$cssShim$.updateHost(elm);
      }
      if (BUILD.isDev) {
        hostRef.$renderCount$++;
        hostRef.$flags$ &= ~1024;
      }
      if (BUILD.hydrateServerSide) {
        try {
          serverSideConnected(elm);
          if (isInitialLoad) {
            if (hostRef.$cmpMeta$.$flags$ & 1) {
              elm["s-en"] = "";
            } else if (hostRef.$cmpMeta$.$flags$ & 2) {
              elm["s-en"] = "c";
            }
          }
        } catch (e) {
          consoleError(e, elm);
        }
      }
      if (BUILD.asyncLoading && rc) {
        rc.map((cb) => cb());
        elm["s-rc"] = void 0;
      }
      endRender();
      endUpdate();
      if (BUILD.asyncLoading) {
        const childrenPromises = elm["s-p"];
        const postUpdate = () => postUpdateComponent(hostRef);
        if (childrenPromises.length === 0) {
          postUpdate();
        } else {
          Promise.all(childrenPromises).then(postUpdate);
          hostRef.$flags$ |= 4;
          childrenPromises.length = 0;
        }
      } else {
        postUpdateComponent(hostRef);
      }
    };
    callRender = (hostRef, instance, elm) => {
      const allRenderFn = BUILD.allRenderFn ? true : false;
      const lazyLoad = BUILD.lazyLoad ? true : false;
      const taskQueue = BUILD.taskQueue ? true : false;
      const updatable = BUILD.updatable ? true : false;
      try {
        renderingRef = instance;
        instance = allRenderFn ? instance.render() : instance.render && instance.render();
        if (updatable && taskQueue) {
          hostRef.$flags$ &= ~16;
        }
        if (updatable || lazyLoad) {
          hostRef.$flags$ |= 2;
        }
        if (BUILD.hasRenderFn || BUILD.reflect) {
          if (BUILD.vdomRender || BUILD.reflect) {
            if (BUILD.hydrateServerSide) {
              return Promise.resolve(instance).then((value) => renderVdom(hostRef, value));
            } else {
              renderVdom(hostRef, instance);
            }
          } else {
            elm.textContent = instance;
          }
        }
      } catch (e) {
        consoleError(e, hostRef.$hostElement$);
      }
      renderingRef = null;
      return null;
    };
    getRenderingRef = () => renderingRef;
    postUpdateComponent = (hostRef) => {
      const tagName = hostRef.$cmpMeta$.$tagName$;
      const elm = hostRef.$hostElement$;
      const endPostUpdate = createTime("postUpdate", tagName);
      const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
      const ancestorComponent = hostRef.$ancestorComponent$;
      if (BUILD.cmpDidRender) {
        if (BUILD.isDev) {
          hostRef.$flags$ |= 1024;
        }
        safeCall(instance, "componentDidRender");
        if (BUILD.isDev) {
          hostRef.$flags$ &= ~1024;
        }
      }
      emitLifecycleEvent(elm, "componentDidRender");
      if (!(hostRef.$flags$ & 64)) {
        hostRef.$flags$ |= 64;
        if (BUILD.asyncLoading && BUILD.cssAnnotations) {
          addHydratedFlag(elm);
        }
        if (BUILD.cmpDidLoad) {
          if (BUILD.isDev) {
            hostRef.$flags$ |= 2048;
          }
          safeCall(instance, "componentDidLoad");
          if (BUILD.isDev) {
            hostRef.$flags$ &= ~2048;
          }
        }
        emitLifecycleEvent(elm, "componentDidLoad");
        endPostUpdate();
        if (BUILD.asyncLoading) {
          hostRef.$onReadyResolve$(elm);
          if (!ancestorComponent) {
            appDidLoad(tagName);
          }
        }
      } else {
        if (BUILD.cmpDidUpdate) {
          if (BUILD.isDev) {
            hostRef.$flags$ |= 1024;
          }
          safeCall(instance, "componentDidUpdate");
          if (BUILD.isDev) {
            hostRef.$flags$ &= ~1024;
          }
        }
        emitLifecycleEvent(elm, "componentDidUpdate");
        endPostUpdate();
      }
      if (BUILD.hotModuleReplacement) {
        elm["s-hmr-load"] && elm["s-hmr-load"]();
      }
      if (BUILD.method && BUILD.lazyLoad) {
        hostRef.$onInstanceResolve$(elm);
      }
      if (BUILD.asyncLoading) {
        if (hostRef.$onRenderResolve$) {
          hostRef.$onRenderResolve$();
          hostRef.$onRenderResolve$ = void 0;
        }
        if (hostRef.$flags$ & 512) {
          nextTick(() => scheduleUpdate(hostRef, false));
        }
        hostRef.$flags$ &= ~(4 | 512);
      }
    };
    appDidLoad = (who) => {
      if (BUILD.cssAnnotations) {
        addHydratedFlag(doc.documentElement);
      }
      if (BUILD.asyncQueue) {
        plt.$flags$ |= 2;
      }
      nextTick(() => emitEvent(win, "appload", { detail: { namespace: NAMESPACE } }));
      if (BUILD.profile && performance.measure) {
        performance.measure(`[Stencil] ${NAMESPACE} initial load (by ${who})`, "st:app:start");
      }
    };
    safeCall = (instance, method, arg) => {
      if (instance && instance[method]) {
        try {
          return instance[method](arg);
        } catch (e) {
          consoleError(e);
        }
      }
      return void 0;
    };
    then = (promise, thenFn) => {
      return promise && promise.then ? promise.then(thenFn) : thenFn();
    };
    emitLifecycleEvent = (elm, lifecycleName) => {
      if (BUILD.lifecycleDOMEvents) {
        emitEvent(elm, "stencil_" + lifecycleName, {
          bubbles: true,
          composed: true,
          detail: {
            namespace: NAMESPACE
          }
        });
      }
    };
    addHydratedFlag = (elm) => BUILD.hydratedClass ? elm.classList.add("hydrated") : BUILD.hydratedAttribute ? elm.setAttribute("hydrated", "") : void 0;
    serverSideConnected = (elm) => {
      const children = elm.children;
      if (children != null) {
        for (let i2 = 0, ii = children.length; i2 < ii; i2++) {
          const childElm = children[i2];
          if (typeof childElm.connectedCallback === "function") {
            childElm.connectedCallback();
          }
          serverSideConnected(childElm);
        }
      }
    };
    initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
      const endHydrate = createTime("hydrateClient", tagName);
      const shadowRoot = hostElm.shadowRoot;
      const childRenderNodes = [];
      const slotNodes = [];
      const shadowRootNodes = BUILD.shadowDom && shadowRoot ? [] : null;
      const vnode = hostRef.$vnode$ = newVNode(tagName, null);
      if (!plt.$orgLocNodes$) {
        initializeDocumentHydrate(doc.body, plt.$orgLocNodes$ = /* @__PURE__ */ new Map());
      }
      hostElm[HYDRATE_ID] = hostId;
      hostElm.removeAttribute(HYDRATE_ID);
      clientHydrate(vnode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, hostElm, hostId);
      childRenderNodes.map((c) => {
        const orgLocationId = c.$hostId$ + "." + c.$nodeId$;
        const orgLocationNode = plt.$orgLocNodes$.get(orgLocationId);
        const node = c.$elm$;
        if (orgLocationNode && supportsShadow && orgLocationNode["s-en"] === "") {
          orgLocationNode.parentNode.insertBefore(node, orgLocationNode.nextSibling);
        }
        if (!shadowRoot) {
          node["s-hn"] = tagName;
          if (orgLocationNode) {
            node["s-ol"] = orgLocationNode;
            node["s-ol"]["s-nr"] = node;
          }
        }
        plt.$orgLocNodes$.delete(orgLocationId);
      });
      if (BUILD.shadowDom && shadowRoot) {
        shadowRootNodes.map((shadowRootNode) => {
          if (shadowRootNode) {
            shadowRoot.appendChild(shadowRootNode);
          }
        });
      }
      endHydrate();
    };
    clientHydrate = (parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node, hostId) => {
      let childNodeType;
      let childIdSplt;
      let childVNode;
      let i2;
      if (node.nodeType === 1) {
        childNodeType = node.getAttribute(HYDRATE_CHILD_ID);
        if (childNodeType) {
          childIdSplt = childNodeType.split(".");
          if (childIdSplt[0] === hostId || childIdSplt[0] === "0") {
            childVNode = {
              $flags$: 0,
              $hostId$: childIdSplt[0],
              $nodeId$: childIdSplt[1],
              $depth$: childIdSplt[2],
              $index$: childIdSplt[3],
              $tag$: node.tagName.toLowerCase(),
              $elm$: node,
              $attrs$: null,
              $children$: null,
              $key$: null,
              $name$: null,
              $text$: null
            };
            childRenderNodes.push(childVNode);
            node.removeAttribute(HYDRATE_CHILD_ID);
            if (!parentVNode.$children$) {
              parentVNode.$children$ = [];
            }
            parentVNode.$children$[childVNode.$index$] = childVNode;
            parentVNode = childVNode;
            if (shadowRootNodes && childVNode.$depth$ === "0") {
              shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
            }
          }
        }
        for (i2 = node.childNodes.length - 1; i2 >= 0; i2--) {
          clientHydrate(parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node.childNodes[i2], hostId);
        }
        if (node.shadowRoot) {
          for (i2 = node.shadowRoot.childNodes.length - 1; i2 >= 0; i2--) {
            clientHydrate(parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node.shadowRoot.childNodes[i2], hostId);
          }
        }
      } else if (node.nodeType === 8) {
        childIdSplt = node.nodeValue.split(".");
        if (childIdSplt[1] === hostId || childIdSplt[1] === "0") {
          childNodeType = childIdSplt[0];
          childVNode = {
            $flags$: 0,
            $hostId$: childIdSplt[1],
            $nodeId$: childIdSplt[2],
            $depth$: childIdSplt[3],
            $index$: childIdSplt[4],
            $elm$: node,
            $attrs$: null,
            $children$: null,
            $key$: null,
            $name$: null,
            $tag$: null,
            $text$: null
          };
          if (childNodeType === TEXT_NODE_ID) {
            childVNode.$elm$ = node.nextSibling;
            if (childVNode.$elm$ && childVNode.$elm$.nodeType === 3) {
              childVNode.$text$ = childVNode.$elm$.textContent;
              childRenderNodes.push(childVNode);
              node.remove();
              if (!parentVNode.$children$) {
                parentVNode.$children$ = [];
              }
              parentVNode.$children$[childVNode.$index$] = childVNode;
              if (shadowRootNodes && childVNode.$depth$ === "0") {
                shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
              }
            }
          } else if (childVNode.$hostId$ === hostId) {
            if (childNodeType === SLOT_NODE_ID) {
              childVNode.$tag$ = "slot";
              if (childIdSplt[5]) {
                node["s-sn"] = childVNode.$name$ = childIdSplt[5];
              } else {
                node["s-sn"] = "";
              }
              node["s-sr"] = true;
              if (BUILD.shadowDom && shadowRootNodes) {
                childVNode.$elm$ = doc.createElement(childVNode.$tag$);
                if (childVNode.$name$) {
                  childVNode.$elm$.setAttribute("name", childVNode.$name$);
                }
                node.parentNode.insertBefore(childVNode.$elm$, node);
                node.remove();
                if (childVNode.$depth$ === "0") {
                  shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
                }
              }
              slotNodes.push(childVNode);
              if (!parentVNode.$children$) {
                parentVNode.$children$ = [];
              }
              parentVNode.$children$[childVNode.$index$] = childVNode;
            } else if (childNodeType === CONTENT_REF_ID) {
              if (BUILD.shadowDom && shadowRootNodes) {
                node.remove();
              } else if (BUILD.slotRelocation) {
                hostElm["s-cr"] = node;
                node["s-cn"] = true;
              }
            }
          }
        }
      } else if (parentVNode && parentVNode.$tag$ === "style") {
        const vnode = newVNode(null, node.textContent);
        vnode.$elm$ = node;
        vnode.$index$ = "0";
        parentVNode.$children$ = [vnode];
      }
    };
    initializeDocumentHydrate = (node, orgLocNodes) => {
      if (node.nodeType === 1) {
        let i2 = 0;
        for (; i2 < node.childNodes.length; i2++) {
          initializeDocumentHydrate(node.childNodes[i2], orgLocNodes);
        }
        if (node.shadowRoot) {
          for (i2 = 0; i2 < node.shadowRoot.childNodes.length; i2++) {
            initializeDocumentHydrate(node.shadowRoot.childNodes[i2], orgLocNodes);
          }
        }
      } else if (node.nodeType === 8) {
        const childIdSplt = node.nodeValue.split(".");
        if (childIdSplt[0] === ORG_LOCATION_ID) {
          orgLocNodes.set(childIdSplt[1] + "." + childIdSplt[2], node);
          node.nodeValue = "";
          node["s-en"] = childIdSplt[3];
        }
      }
    };
    parsePropertyValue = (propValue, propType) => {
      if (propValue != null && !isComplexType(propValue)) {
        if (BUILD.propBoolean && propType & 4) {
          return propValue === "false" ? false : propValue === "" || !!propValue;
        }
        if (BUILD.propNumber && propType & 2) {
          return parseFloat(propValue);
        }
        if (BUILD.propString && propType & 1) {
          return String(propValue);
        }
        return propValue;
      }
      return propValue;
    };
    getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
    setValue = (ref, propName, newVal, cmpMeta) => {
      const hostRef = getHostRef(ref);
      const elm = BUILD.lazyLoad ? hostRef.$hostElement$ : ref;
      const oldVal = hostRef.$instanceValues$.get(propName);
      const flags = hostRef.$flags$;
      const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
      newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
      if ((!BUILD.lazyLoad || !(flags & 8) || oldVal === void 0) && newVal !== oldVal) {
        hostRef.$instanceValues$.set(propName, newVal);
        if (BUILD.isDev) {
          if (hostRef.$flags$ & 1024) {
            consoleDevWarn(`The state/prop "${propName}" changed during rendering. This can potentially lead to infinite-loops and other bugs.`, "\nElement", elm, "\nNew value", newVal, "\nOld value", oldVal);
          } else if (hostRef.$flags$ & 2048) {
            consoleDevWarn(`The state/prop "${propName}" changed during "componentDidLoad()", this triggers extra re-renders, try to setup on "componentWillLoad()"`, "\nElement", elm, "\nNew value", newVal, "\nOld value", oldVal);
          }
        }
        if (!BUILD.lazyLoad || instance) {
          if (BUILD.watchCallback && cmpMeta.$watchers$ && flags & 128) {
            const watchMethods = cmpMeta.$watchers$[propName];
            if (watchMethods) {
              watchMethods.map((watchMethodName) => {
                try {
                  instance[watchMethodName](newVal, oldVal, propName);
                } catch (e) {
                  consoleError(e, elm);
                }
              });
            }
          }
          if (BUILD.updatable && (flags & (2 | 16)) === 2) {
            if (BUILD.cmpShouldUpdate && instance.componentShouldUpdate) {
              if (instance.componentShouldUpdate(newVal, oldVal, propName) === false) {
                return;
              }
            }
            scheduleUpdate(hostRef, false);
          }
        }
      }
    };
    proxyComponent = (Cstr, cmpMeta, flags) => {
      if (BUILD.member && cmpMeta.$members$) {
        if (BUILD.watchCallback && Cstr.watchers) {
          cmpMeta.$watchers$ = Cstr.watchers;
        }
        const members = Object.entries(cmpMeta.$members$);
        const prototype = Cstr.prototype;
        members.map(([memberName, [memberFlags]]) => {
          if ((BUILD.prop || BUILD.state) && (memberFlags & 31 || (!BUILD.lazyLoad || flags & 2) && memberFlags & 32)) {
            Object.defineProperty(prototype, memberName, {
              get() {
                return getValue(this, memberName);
              },
              set(newValue) {
                if (BUILD.isDev) {
                  const ref = getHostRef(this);
                  if (
                    // we are proxying the instance (not element)
                    (flags & 1) === 0 && // the element is not constructing
                    (ref.$flags$ & 8) === 0 && // the member is a prop
                    (memberFlags & 31) !== 0 && // the member is not mutable
                    (memberFlags & 1024) === 0
                  ) {
                    consoleDevWarn(`@Prop() "${memberName}" on <${cmpMeta.$tagName$}> is immutable but was modified from within the component.
More information: https://stenciljs.com/docs/properties#prop-mutability`);
                  }
                }
                setValue(this, memberName, newValue, cmpMeta);
              },
              configurable: true,
              enumerable: true
            });
          } else if (BUILD.lazyLoad && BUILD.method && flags & 1 && memberFlags & 64) {
            Object.defineProperty(prototype, memberName, {
              value(...args) {
                const ref = getHostRef(this);
                return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args));
              }
            });
          }
        });
        if (BUILD.observeAttribute && (!BUILD.lazyLoad || flags & 1)) {
          const attrNameToPropName = /* @__PURE__ */ new Map();
          prototype.attributeChangedCallback = function(attrName, _oldValue, newValue) {
            plt.jmp(() => {
              const propName = attrNameToPropName.get(attrName);
              this[propName] = newValue === null && typeof this[propName] === "boolean" ? false : newValue;
            });
          };
          Cstr.observedAttributes = members.filter(
            ([_, m]) => m[0] & 15
            /* HasAttribute */
          ).map(([propName, m]) => {
            const attrName = m[1] || propName;
            attrNameToPropName.set(attrName, propName);
            if (BUILD.reflect && m[0] & 512) {
              cmpMeta.$attrsToReflect$.push([propName, attrName]);
            }
            return attrName;
          });
        }
      }
      return Cstr;
    };
    initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
      if ((BUILD.lazyLoad || BUILD.hydrateServerSide || BUILD.style) && (hostRef.$flags$ & 32) === 0) {
        if (BUILD.lazyLoad || BUILD.hydrateClientSide) {
          hostRef.$flags$ |= 32;
          Cstr = loadModule(cmpMeta, hostRef, hmrVersionId);
          if (Cstr.then) {
            const endLoad = uniqueTime(`st:load:${cmpMeta.$tagName$}:${hostRef.$modeName$}`, `[Stencil] Load module for <${cmpMeta.$tagName$}>`);
            Cstr = await Cstr;
            endLoad();
          }
          if ((BUILD.isDev || BUILD.isDebug) && !Cstr) {
            throw new Error(`Constructor for "${cmpMeta.$tagName$}#${hostRef.$modeName$}" was not found`);
          }
          if (BUILD.member && !Cstr.isProxied) {
            if (BUILD.watchCallback) {
              cmpMeta.$watchers$ = Cstr.watchers;
            }
            proxyComponent(
              Cstr,
              cmpMeta,
              2
              /* proxyState */
            );
            Cstr.isProxied = true;
          }
          const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
          if (BUILD.member) {
            hostRef.$flags$ |= 8;
          }
          try {
            new Cstr(hostRef);
          } catch (e) {
            consoleError(e);
          }
          if (BUILD.member) {
            hostRef.$flags$ &= ~8;
          }
          if (BUILD.watchCallback) {
            hostRef.$flags$ |= 128;
          }
          endNewInstance();
          fireConnectedCallback(hostRef.$lazyInstance$);
        } else {
          Cstr = elm.constructor;
          hostRef.$flags$ |= 128 | 32;
        }
        if (BUILD.style && Cstr.style) {
          let style = Cstr.style;
          if (BUILD.mode && typeof style !== "string") {
            style = style[hostRef.$modeName$ = computeMode(elm)];
            if (BUILD.hydrateServerSide && hostRef.$modeName$) {
              elm.setAttribute("s-mode", hostRef.$modeName$);
            }
          }
          const scopeId2 = getScopeId(cmpMeta, hostRef.$modeName$);
          if (!styles.has(scopeId2)) {
            const endRegisterStyles = createTime("registerStyles", cmpMeta.$tagName$);
            if (!BUILD.hydrateServerSide && BUILD.shadowDom && BUILD.shadowDomShim && cmpMeta.$flags$ & 8) {
              style = await Promise.resolve().then(() => (init_shadow_css(), shadow_css_exports)).then((m) => m.scopeCss(style, scopeId2, false));
            }
            registerStyle(scopeId2, style, !!(cmpMeta.$flags$ & 1));
            endRegisterStyles();
          }
        }
      }
      const ancestorComponent = hostRef.$ancestorComponent$;
      const schedule = () => scheduleUpdate(hostRef, true);
      if (BUILD.asyncLoading && ancestorComponent && ancestorComponent["s-rc"]) {
        ancestorComponent["s-rc"].push(schedule);
      } else {
        schedule();
      }
    };
    fireConnectedCallback = (instance) => {
      if (BUILD.lazyLoad && BUILD.connectedCallback) {
        safeCall(instance, "connectedCallback");
      }
    };
    connectedCallback = (elm) => {
      if ((plt.$flags$ & 1) === 0) {
        const hostRef = getHostRef(elm);
        const cmpMeta = hostRef.$cmpMeta$;
        const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
        if (BUILD.hostListenerTargetParent) {
          addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, true);
        }
        if (!(hostRef.$flags$ & 1)) {
          hostRef.$flags$ |= 1;
          let hostId;
          if (BUILD.hydrateClientSide) {
            hostId = elm.getAttribute(HYDRATE_ID);
            if (hostId) {
              if (BUILD.shadowDom && supportsShadow && cmpMeta.$flags$ & 1) {
                const scopeId2 = BUILD.mode ? addStyle(elm.shadowRoot, cmpMeta, elm.getAttribute("s-mode")) : addStyle(elm.shadowRoot, cmpMeta);
                elm.classList.remove(scopeId2 + "-h", scopeId2 + "-s");
              }
              initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
            }
          }
          if (BUILD.slotRelocation && !hostId) {
            if (BUILD.hydrateServerSide || (BUILD.slot || BUILD.shadowDom) && cmpMeta.$flags$ & (4 | 8)) {
              setContentReference(elm);
            }
          }
          if (BUILD.asyncLoading) {
            let ancestorComponent = elm;
            while (ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host) {
              if (BUILD.hydrateClientSide && ancestorComponent.nodeType === 1 && ancestorComponent.hasAttribute("s-id") && ancestorComponent["s-p"] || ancestorComponent["s-p"]) {
                attachToAncestor(hostRef, hostRef.$ancestorComponent$ = ancestorComponent);
                break;
              }
            }
          }
          if (BUILD.prop && BUILD.lazyLoad && !BUILD.hydrateServerSide && cmpMeta.$members$) {
            Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
              if (memberFlags & 31 && elm.hasOwnProperty(memberName)) {
                const value = elm[memberName];
                delete elm[memberName];
                elm[memberName] = value;
              }
            });
          }
          if (BUILD.initializeNextTick) {
            nextTick(() => initializeComponent(elm, hostRef, cmpMeta));
          } else {
            initializeComponent(elm, hostRef, cmpMeta);
          }
        } else {
          addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, false);
          fireConnectedCallback(hostRef.$lazyInstance$);
        }
        endConnected();
      }
    };
    setContentReference = (elm) => {
      const contentRefElm = elm["s-cr"] = doc.createComment(BUILD.isDebug ? `content-ref (host=${elm.localName})` : "");
      contentRefElm["s-cn"] = true;
      elm.insertBefore(contentRefElm, elm.firstChild);
    };
    disconnectedCallback = (elm) => {
      if ((plt.$flags$ & 1) === 0) {
        const hostRef = getHostRef(elm);
        const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
        if (BUILD.hostListener) {
          if (hostRef.$rmListeners$) {
            hostRef.$rmListeners$.map((rmListener) => rmListener());
            hostRef.$rmListeners$ = void 0;
          }
        }
        if (BUILD.cssVarShim && plt.$cssShim$) {
          plt.$cssShim$.removeHost(elm);
        }
        if (BUILD.lazyLoad && BUILD.disconnectedCallback) {
          safeCall(instance, "disconnectedCallback");
        }
        if (BUILD.cmpDidUnload) {
          safeCall(instance, "componentDidUnload");
        }
      }
    };
    proxyCustomElement = (Cstr, compactMeta) => {
      const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1]
      };
      if (BUILD.member) {
        cmpMeta.$members$ = compactMeta[2];
      }
      if (BUILD.hostListener) {
        cmpMeta.$listeners$ = compactMeta[3];
      }
      if (BUILD.watchCallback) {
        cmpMeta.$watchers$ = Cstr.$watchers$;
      }
      if (BUILD.reflect) {
        cmpMeta.$attrsToReflect$ = [];
      }
      if (BUILD.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1) {
        cmpMeta.$flags$ |= 8;
      }
      const originalConnectedCallback = Cstr.prototype.connectedCallback;
      const originalDisconnectedCallback = Cstr.prototype.disconnectedCallback;
      Object.assign(Cstr.prototype, {
        __registerHost() {
          registerHost(this, cmpMeta);
        },
        connectedCallback() {
          connectedCallback(this);
          if (BUILD.connectedCallback && originalConnectedCallback) {
            originalConnectedCallback.call(this);
          }
        },
        disconnectedCallback() {
          disconnectedCallback(this);
          if (BUILD.disconnectedCallback && originalDisconnectedCallback) {
            originalDisconnectedCallback.call(this);
          }
        }
      });
      Cstr.is = cmpMeta.$tagName$;
      return proxyComponent(
        Cstr,
        cmpMeta,
        1 | 2
        /* proxyState */
      );
    };
    attachShadow = (el) => {
      if (supportsShadow) {
        el.attachShadow({ mode: "open" });
      } else {
        el.shadowRoot = el;
      }
    };
    Fragment = (_, children) => children;
    hostRefs = /* @__PURE__ */ new WeakMap();
    getHostRef = (ref) => hostRefs.get(ref);
    registerHost = (elm, cmpMeta) => {
      const hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $cmpMeta$: cmpMeta,
        $instanceValues$: /* @__PURE__ */ new Map()
      };
      if (BUILD.isDev) {
        hostRef.$renderCount$ = 0;
      }
      if (BUILD.method && BUILD.lazyLoad) {
        hostRef.$onInstancePromise$ = new Promise((r) => hostRef.$onInstanceResolve$ = r);
      }
      if (BUILD.asyncLoading) {
        hostRef.$onReadyPromise$ = new Promise((r) => hostRef.$onReadyResolve$ = r);
        elm["s-p"] = [];
        elm["s-rc"] = [];
      }
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, false);
      return hostRefs.set(elm, hostRef);
    };
    isMemberInElement = (elm, memberName) => memberName in elm;
    consoleError = (e, el) => (customError || console.error)(e, el);
    STENCIL_DEV_MODE = BUILD.isTesting ? ["STENCIL:"] : ["%cstencil", "color: white;background:#4c47ff;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px"];
    consoleDevError = (...m) => console.error(...STENCIL_DEV_MODE, ...m);
    consoleDevWarn = (...m) => console.warn(...STENCIL_DEV_MODE, ...m);
    cmpModules = /* @__PURE__ */ new Map();
    loadModule = (cmpMeta, hostRef, hmrVersionId) => {
      const exportName = cmpMeta.$tagName$.replace(/-/g, "_");
      const bundleId = cmpMeta.$lazyBundleId$;
      if (BUILD.isDev && typeof bundleId !== "string") {
        consoleDevError(`Trying to lazily load component <${cmpMeta.$tagName$}> with style mode "${hostRef.$modeName$}", but it does not exist.`);
        return void 0;
      }
      const module = !BUILD.hotModuleReplacement ? cmpModules.get(bundleId) : false;
      if (module) {
        return module[exportName];
      }
      return import(
        /* webpackInclude: /\.entry\.js$/ */
        /* webpackExclude: /\.system\.entry\.js$/ */
        /* webpackMode: "lazy" */
        `./${bundleId}.entry.js${BUILD.hotModuleReplacement && hmrVersionId ? "?s-hmr=" + hmrVersionId : ""}`
      ).then((importedModule) => {
        if (!BUILD.hotModuleReplacement) {
          cmpModules.set(bundleId, importedModule);
        }
        return importedModule[exportName];
      }, consoleError);
    };
    styles = /* @__PURE__ */ new Map();
    modeResolutionChain = [];
    queueDomReads = [];
    queueDomWrites = [];
    queueDomWritesLow = [];
    queueTask = (queue, write) => (cb) => {
      queue.push(cb);
      if (!queuePending) {
        queuePending = true;
        if (write && plt.$flags$ & 4) {
          nextTick(flush);
        } else {
          plt.raf(flush);
        }
      }
    };
    consume = (queue) => {
      for (let i2 = 0; i2 < queue.length; i2++) {
        try {
          queue[i2](performance.now());
        } catch (e) {
          consoleError(e);
        }
      }
      queue.length = 0;
    };
    consumeTimeout = (queue, timeout) => {
      let i2 = 0;
      let ts = 0;
      while (i2 < queue.length && (ts = performance.now()) < timeout) {
        try {
          queue[i2++](ts);
        } catch (e) {
          consoleError(e);
        }
      }
      if (i2 === queue.length) {
        queue.length = 0;
      } else if (i2 !== 0) {
        queue.splice(0, i2);
      }
    };
    flush = () => {
      if (BUILD.asyncQueue) {
        queueCongestion++;
      }
      consume(queueDomReads);
      if (BUILD.asyncQueue) {
        const timeout = (plt.$flags$ & 6) === 2 ? performance.now() + 14 * Math.ceil(queueCongestion * (1 / 10)) : Infinity;
        consumeTimeout(queueDomWrites, timeout);
        consumeTimeout(queueDomWritesLow, timeout);
        if (queueDomWrites.length > 0) {
          queueDomWritesLow.push(...queueDomWrites);
          queueDomWrites.length = 0;
        }
        if (queuePending = queueDomReads.length + queueDomWrites.length + queueDomWritesLow.length > 0) {
          plt.raf(flush);
        } else {
          queueCongestion = 0;
        }
      } else {
        consume(queueDomWrites);
        if (queuePending = queueDomReads.length > 0) {
          plt.raf(flush);
        }
      }
    };
    nextTick = (cb) => promiseResolve().then(cb);
    writeTask = /* @__PURE__ */ queueTask(queueDomWrites, true);
    Build = {
      isDev: BUILD.isDev ? true : false,
      isBrowser: true,
      isServer: false,
      isTesting: BUILD.isTesting ? true : false
    };
  }
});

// node_modules/@vime/core/dist/custom-elements/index.js
function listen(node, event, handler, options2) {
  node.addEventListener(event, handler, options2);
  return () => node.removeEventListener(event, handler, options2);
}
function fireEventAndRetry(el, event, onFail, interval = 300, maxRetries = 10) {
  let timeout;
  let attempt = 0;
  let found = false;
  function retry() {
    if (found)
      return;
    timeout = setTimeout(() => {
      if (attempt === maxRetries) {
        onFail === null || onFail === void 0 ? void 0 : onFail();
        return;
      }
      el.dispatchEvent(event);
      attempt += 1;
      retry();
    }, interval);
  }
  retry();
  return () => {
    window.clearTimeout(timeout);
    found = true;
  };
}
function wrapStencilHook(component10, lifecycle, hook) {
  const prevHook = component10[lifecycle];
  component10[lifecycle] = function() {
    hook();
    return prevHook ? prevHook.call(component10) : void 0;
  };
}
function createStencilHook(component10, onConnect, onDisconnect) {
  let hasLoaded = false;
  if (!isUndefined(onConnect)) {
    wrapStencilHook(component10, "componentWillLoad", () => {
      onConnect();
      hasLoaded = true;
    });
    wrapStencilHook(component10, "connectedCallback", () => {
      if (hasLoaded)
        onConnect();
    });
  }
  if (!isUndefined(onDisconnect)) {
    wrapStencilHook(component10, "disconnectedCallback", () => {
      onDisconnect();
    });
  }
}
function withFindPlayer(player) {
  const el = getElement(player);
  let off;
  createStencilHook(player, () => {
    off = listen(el, FIND_PLAYER_EVENT, (event) => {
      event.stopPropagation();
      event.detail(el);
    });
  }, () => {
    off === null || off === void 0 ? void 0 : off();
  });
}
function withComponentRegistry(ref, name) {
  const registryId = Symbol("vmRegistryId");
  const registrant = getRegistrant(ref);
  registrant[COMPONENT_NAME_KEY] = name !== null && name !== void 0 ? name : registrant.nodeName.toLowerCase();
  registrant[REGISTRATION_KEY] = registryId;
  const buildEvent = (eventName) => new CustomEvent(eventName, {
    bubbles: true,
    composed: true,
    detail: registrant
  });
  const registerEvent = buildEvent(REGISTER_COMPONENT_EVENT);
  createStencilHook(ref, () => {
    registrant.dispatchEvent(registerEvent);
  });
}
function withComponentRegistrar(player) {
  const el = getElement(player);
  const registry2 = /* @__PURE__ */ new Map();
  const disposal = new Disposal();
  el[REGISTRY_KEY] = registry2;
  function onDeregister(registrant) {
    delete registrant[PLAYER_KEY];
    delete registrant[REGISTRY_KEY];
    registry2.delete(registrant[REGISTRATION_KEY]);
    el.dispatchEvent(new CustomEvent(COMPONENT_DEREGISTERED_EVENT, { detail: registrant }));
  }
  function onRegister(e) {
    const ref = e.detail;
    const registrant = getRegistrant(ref);
    registrant[PLAYER_KEY] = el;
    registrant[REGISTRY_KEY] = registry2;
    registry2.set(registrant[REGISTRATION_KEY], registrant);
    el.dispatchEvent(new CustomEvent(COMPONENT_REGISTERED_EVENT, { detail: registrant }));
    createStencilHook(ref, void 0, () => onDeregister(registrant));
  }
  createStencilHook(player, () => {
    disposal.add(listen(el, REGISTER_COMPONENT_EVENT, onRegister));
  }, () => {
    registry2.clear();
    disposal.empty();
    delete player[REGISTRY_KEY];
  });
}
function isComponentRegistered(ref, name) {
  var _a2;
  const registrant = getRegistrant(ref);
  const registry2 = registrant[REGISTRY_KEY];
  return Array.from((_a2 = registry2 === null || registry2 === void 0 ? void 0 : registry2.values()) !== null && _a2 !== void 0 ? _a2 : []).some((r) => r[COMPONENT_NAME_KEY] === name);
}
function getPlayerFromRegistry(ref) {
  const registrant = getRegistrant(ref);
  return registrant[PLAYER_KEY];
}
function getComponentFromRegistry(ref, name) {
  var _a2, _b2;
  const registrant = getRegistrant(ref);
  return Array.from((_b2 = (_a2 = registrant[REGISTRY_KEY]) === null || _a2 === void 0 ? void 0 : _a2.values()) !== null && _b2 !== void 0 ? _b2 : []).filter((r) => r[COMPONENT_NAME_KEY] === name);
}
function watchComponentRegistry(ref, name, onChange) {
  var _a2;
  return __awaiter$y(this, void 0, void 0, function* () {
    const player = yield findPlayer(ref);
    const disposal = new Disposal();
    const registry2 = getRegistrant(ref)[REGISTRY_KEY];
    function listener(e) {
      if (e.detail[COMPONENT_NAME_KEY] === name)
        onChange === null || onChange === void 0 ? void 0 : onChange(getComponentFromRegistry(player, name));
    }
    Array.from((_a2 = registry2 === null || registry2 === void 0 ? void 0 : registry2.values()) !== null && _a2 !== void 0 ? _a2 : []).forEach((reg) => listener(new CustomEvent("", { detail: reg })));
    if (!isUndefined(player)) {
      disposal.add(listen(player, COMPONENT_REGISTERED_EVENT, listener));
      disposal.add(listen(player, COMPONENT_DEREGISTERED_EVENT, listener));
    }
    createStencilHook(ref, () => {
    }, () => {
      disposal.empty();
    });
    return () => {
      disposal.empty();
    };
  });
}
function firePlayerEvent(el, prop, newValue, oldValue) {
  const events = [];
  events.push(new CustomEvent(getEventName(prop), { detail: newValue }));
  if (prop === "paused" && !newValue)
    events.push(new CustomEvent("vmPlay"));
  if (prop === "seeking" && oldValue && !newValue)
    events.push(new CustomEvent("vmSeeked"));
  events.forEach((event) => {
    el.dispatchEvent(event);
  });
}
function buildProviderConnectEvent(name, host) {
  return new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: host
  });
}
function withProviderHost(connector) {
  const el = getElement(connector);
  const disposal = new Disposal();
  const cache = /* @__PURE__ */ new Map();
  connector[PROVIDER_CACHE_KEY] = cache;
  function initCache() {
    Object.keys(connector).forEach((prop) => {
      cache.set(prop, connector[prop]);
    });
  }
  function onDisconnect() {
    writeTask(() => __awaiter$w(this, void 0, void 0, function* () {
      var _a2;
      connector.ready = false;
      connector.provider = void 0;
      cache.clear();
      (_a2 = connector.onProviderDisconnect) === null || _a2 === void 0 ? void 0 : _a2.call(connector);
      el.dispatchEvent(buildProviderConnectEvent(PROVIDER_DISCONNECT_EVENT));
    }));
  }
  function onConnect(event) {
    event.stopImmediatePropagation();
    initCache();
    const hostRef = event.detail;
    const host = getElement(event.detail);
    if (connector.provider === host)
      return;
    const name = host === null || host === void 0 ? void 0 : host.nodeName.toLowerCase().replace("vm-", "");
    writeTask(() => __awaiter$w(this, void 0, void 0, function* () {
      connector.provider = host;
      connector.currentProvider = Object.values(Provider).find((provider) => name === provider);
      createStencilHook(hostRef, void 0, () => onDisconnect());
    }));
  }
  function onChange(event) {
    var _a2;
    event.stopImmediatePropagation();
    const { by, prop, value } = event.detail;
    if (!isProviderWritableProp(prop)) {
      (_a2 = connector.logger) === null || _a2 === void 0 ? void 0 : _a2.warn(`${by.nodeName} tried to change \`${prop}\` but it is readonly.`);
      return;
    }
    writeTask(() => {
      cache.set(prop, value);
      connector[prop] = value;
    });
  }
  createStencilHook(connector, () => {
    disposal.add(listen(el, PROVIDER_CONNECT_EVENT, onConnect));
    disposal.add(listen(el, PROVIDER_CHANGE_EVENT, onChange));
  }, () => {
    disposal.empty();
    cache.clear();
  });
}
function withProviderConnect(ref) {
  const connectEvent = buildProviderConnectEvent(PROVIDER_CONNECT_EVENT, ref);
  createStencilHook(ref, () => {
    getElement(ref).dispatchEvent(connectEvent);
  });
}
function update() {
  writeTask(() => {
    controls.forEach((controlsEl) => {
      const controlsHeight = parseFloat(window.getComputedStyle(controlsEl).height);
      watch$1.forEach((watchedEl) => {
        const watchedElCollisions = collisions.get(watchedEl);
        const hasCollided = isColliding(watchedEl, controlsEl);
        const willCollide = isColliding(watchedEl, controlsEl, 0, controlsHeight) || isColliding(watchedEl, controlsEl, 0, -controlsHeight);
        watchedElCollisions.set(controlsEl, hasCollided || willCollide ? controlsHeight : 0);
      });
    });
    watch$1.forEach((watchedEl) => {
      const watchedElCollisions = collisions.get(watchedEl);
      watchedEl.style.setProperty("--vm-controls-height", `${Math.max(0, Math.max(...watchedElCollisions.values()))}px`);
    });
  });
}
function registerControlsForCollisionDetection(component10) {
  const el = getElement(component10);
  function getInnerEl() {
    return el.shadowRoot.querySelector(".controls");
  }
  createStencilHook(component10, () => {
    const innerEl = getInnerEl();
    if (!isNull(innerEl)) {
      controls.add(innerEl);
      update();
    }
  }, () => {
    controls.delete(getInnerEl());
    update();
  });
  wrapStencilHook(component10, "componentDidLoad", () => {
    controls.add(getInnerEl());
    update();
  });
  wrapStencilHook(component10, "componentDidRender", update);
}
function withControlsCollisionDetection(component10) {
  const el = getElement(component10);
  createStencilHook(component10, () => {
    watch$1.add(el);
    collisions.set(el, /* @__PURE__ */ new Map());
    update();
  }, () => {
    watch$1.delete(el);
    collisions.delete(el);
  });
}
function tryParseJSON(json2) {
  if (!isString(json2))
    return void 0;
  try {
    return JSON.parse(json2);
  } catch (e) {
    return void 0;
  }
}
function mitt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i2 = n.get(t);
    i2 ? i2.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i2 = n.get(t);
    i2 && (e ? i2.splice(i2.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i2 = n.get(t);
    i2 && i2.slice().map(function(n2) {
      n2(e);
    }), (i2 = n.get("*")) && i2.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}
function withIconRegistry(component10) {
  const el = getElement(component10);
  createStencilHook(component10, () => {
    watch.add(el);
  }, () => {
    watch.delete(el);
  });
}
function registerIconLibrary(name, resolver) {
  if (!isUndefined(resolver)) {
    registry.set(name, resolver);
  }
  watch.forEach((iconEl) => {
    if (iconEl.library === name)
      iconEl.redraw();
  });
}
function deregisterIconLibrary(name) {
  registry.delete(name);
}
function unwrapSubmenu(el) {
  if (el.tagName.toLowerCase() !== "vm-submenu")
    return el;
  const submenu = el;
  return submenu.shadowRoot.querySelector("vm-menu-item");
}
function unwrapRadioGroup(el) {
  var _a2;
  if (el.tagName.toLowerCase() !== "vm-menu-radio-group")
    return el;
  const radioGroup = el;
  const slot = radioGroup.shadowRoot.querySelector("slot");
  const assignedElements = Array.from((_a2 = slot === null || slot === void 0 ? void 0 : slot.assignedElements()) !== null && _a2 !== void 0 ? _a2 : []);
  return assignedElements.filter((radio) => radio.tagName.toLowerCase() === "vm-menu-radio").map((radio) => radio.shadowRoot.querySelector("vm-menu-item"));
}
function menuItemHunter(assignedElements) {
  if (isUndefined(assignedElements))
    return [];
  const allowed = ["vm-menu-item", "vm-menu-radio-group", "vm-submenu"];
  return Array.from(assignedElements !== null && assignedElements !== void 0 ? assignedElements : []).filter((el) => allowed.includes(el.tagName.toLowerCase())).map((el) => unwrapSubmenu(el)).map((el) => unwrapRadioGroup(el)).reduce((acc, val) => acc.concat(val), []);
}
function withAutopause(player) {
  const el = getElement(player);
  createStencilHook(player, () => {
    players.add(el);
  }, () => {
    players.delete(el);
  });
}
function autopause(player) {
  const el = getElement(player);
  players.forEach((p) => {
    if (p !== el && p.autopause)
      p.paused = true;
  });
}
function withPlayerEvents(player) {
  const el = getElement(player);
  const cache = /* @__PURE__ */ new Map();
  function initCache() {
    Object.keys(initialState).forEach((prop) => {
      cache.set(prop, player[prop]);
    });
  }
  createStencilHook(player, () => {
    initCache();
  }, () => {
    cache.clear();
  });
  const { componentDidRender } = player;
  player.componentDidRender = function() {
    componentDidRender === null || componentDidRender === void 0 ? void 0 : componentDidRender();
    const props = Array.from(cache.keys());
    for (let i2 = 0; i2 < props.length; i2 += 1) {
      const prop = props[i2];
      const oldValue = cache.get(prop);
      const newValue = player[prop];
      if (oldValue !== newValue) {
        firePlayerEvent(el, prop, newValue, oldValue);
        cache.set(prop, newValue);
      }
    }
  };
}
function withPlayerScheduler(player) {
  const el = getElement(player);
  const disposal = new Disposal();
  const cache = /* @__PURE__ */ new Map();
  function initCache() {
    Object.keys(initialState).forEach((prop) => {
      cache.set(prop, player[prop]);
    });
  }
  let adapterCalls = [];
  function flushAdapterCalls() {
    return __awaiter$9(this, void 0, void 0, function* () {
      const adapter = yield player.adapter;
      if (isUndefined(adapter))
        return;
      for (let i2 = 0; i2 < adapterCalls.length; i2 += 1) {
        yield adapterCalls[i2](adapter);
      }
      adapterCalls = [];
    });
  }
  let hasMediaChanged = false;
  function onMediaChange(e) {
    e === null || e === void 0 ? void 0 : e.stopImmediatePropagation();
    if (!hasMediaChanged) {
      hasMediaChanged = true;
      return;
    }
    adapterCalls = [];
    writeTask(() => {
      Object.keys(initialState).filter(shouldPropResetOnMediaChange).forEach((prop) => {
        player[prop] = initialState[prop];
      });
    });
  }
  function onStateChange(event) {
    var _a2;
    return __awaiter$9(this, void 0, void 0, function* () {
      event.stopImmediatePropagation();
      const { by, prop, value } = event.detail;
      if (!isWritableProp(prop)) {
        (_a2 = player.logger) === null || _a2 === void 0 ? void 0 : _a2.warn(`${by.nodeName} tried to change \`${prop}\` but it is readonly.`);
        return;
      }
      if (!player.playbackStarted && immediateAdapterCall.has(prop)) {
        const adapter = yield player.adapter;
        if (prop === "paused" && !value) {
          adapter === null || adapter === void 0 ? void 0 : adapter.play();
        }
        if (prop === "currentTime") {
          adapter === null || adapter === void 0 ? void 0 : adapter.play();
          adapter === null || adapter === void 0 ? void 0 : adapter.setCurrentTime(value);
        }
      }
      writeTask(() => {
        player[prop] = value;
      });
    });
  }
  const { onProviderDisconnect } = player;
  player.onProviderDisconnect = function() {
    onMediaChange();
    if (onProviderDisconnect)
      onProviderDisconnect.call(player);
  };
  createStencilHook(player, () => {
    initCache();
    disposal.add(listen(el, LOAD_START_EVENT, onMediaChange));
    disposal.add(listen(el, STATE_CHANGE_EVENT, onStateChange));
  }, () => {
    cache.clear();
    disposal.empty();
  });
  wrapStencilHook(player, "componentWillRender", () => __awaiter$9(this, void 0, void 0, function* () {
    if (player.playbackReady && adapterCalls.length > 0)
      yield flushAdapterCalls();
  }));
  function isAdapterCallRequired(prop, value) {
    var _a2;
    return value !== ((_a2 = player[PROVIDER_CACHE_KEY]) === null || _a2 === void 0 ? void 0 : _a2.get(prop));
  }
  return function safeAdapterCall(prop, method) {
    return __awaiter$9(this, void 0, void 0, function* () {
      if (!isAdapterCallRequired(prop, player[prop]))
        return;
      const value = player[prop];
      const safeCall2 = (adapter) => __awaiter$9(this, void 0, void 0, function* () {
        var _a2;
        try {
          yield (_a2 = adapter === null || adapter === void 0 ? void 0 : adapter[method]) === null || _a2 === void 0 ? void 0 : _a2.call(adapter, value);
        } catch (e) {
          el.dispatchEvent(new CustomEvent("vmError", { detail: e }));
        }
      });
      if (player.playbackReady) {
        yield safeCall2(yield player.adapter);
      } else {
        adapterCalls.push(safeCall2);
      }
    });
  };
}
var isColliding, noop2, isNull, isUndefined, isNil, getConstructor, isObject, isNumber, isString, isBoolean, isFunction, isArray, isInstanceOf, deferredPromise, FIND_PLAYER_EVENT, findPlayer, MediaType, STATE_CHANGE_EVENT, createDispatcher, en, initialState, writableProps, isWritableProp, resetableProps, shouldPropResetOnMediaChange, ViewType, Disposal, __awaiter$y, PLAYER_KEY, COMPONENT_NAME_KEY, REGISTRY_KEY, REGISTRATION_KEY, REGISTER_COMPONENT_EVENT, COMPONENT_REGISTERED_EVENT, COMPONENT_DEREGISTERED_EVENT, getRegistrant, createDeferredPromise, openWormhole, multiverse, updateConsumer, Universe, LOAD_START_EVENT, isToggleStateEvent, hasShortenedEventName, getEventName, withPlayerContext, Provider, audioRegex, videoRegex, hlsRegex, hlsTypeRegex, dashRegex, PROVIDER_CHANGE_EVENT, createProviderDispatcher, providerWritableProps, isProviderWritableProp, __awaiter$w, PROVIDER_CACHE_KEY, PROVIDER_CONNECT_EVENT, PROVIDER_DISCONNECT_EVENT, __awaiter$v, Audio, captionControlCss, __awaiter$u, CaptionControl, watch$1, controls, collisions, captionsCss, __awaiter$t, Captions, clickToPlayCss, __awaiter$s, ClickToPlay, controlCss, __awaiter$r, Control, controlGroupCss, ControlNewLine, controlSpacerCss, ControlSpacer, debounce, controlsCss, __awaiter$q, playerRef, hideControlsTimeout, Controls, currentTimeCss, CurrentTime, _a, _b, IS_CLIENT, UA, IS_IOS, IS_ANDROID, IS_MOBILE, IS_IPHONE, IS_CHROME, onMobileChange, onTouchInputChange, canRotateScreen, canUsePiPInChrome, canUsePiPInSafari, canUsePiP, canAutoplay, isObjOrJSON, objOrParseJSON, loadImage, loadScript, decodeJSON, tryDecodeURIComponent, QUERY_STRING_REGEX, parseQueryString, serializeQueryString, preconnect, appendQueryStringToURL, appendParamsToURL, decodeQueryString, pendingSDKRequests, loadSDK, withProviderContext, dailymotionCss, __awaiter$p, videoInfoCache$1, Dailymotion, dashCss, __awaiter$o, Dash, dblClickFullscreenCss, __awaiter$n, DblClickFullscreen, defaultControlsCss, DefaultControls, defaultSettingsCss, __awaiter$m, DefaultSettings, defaultUiCss, DefaultUI, LazyLoader, embedCss, __awaiter$l, idCount$4, connected, Embed, endTimeCss, EndTime, key2, webkit, moz, ms, document$1, vendor, fscreen, __awaiter$k, FullscreenController, __awaiter$j, VideoFullscreenController, __awaiter$i, VideoPresentationController, fileCss, __awaiter$h, File, fullscreenControlCss, __awaiter$g, FullscreenControl, __awaiter$f, HLS, ICONS_BASE_CDN_URL, registry, watch, getIconLibraryResolver, __awaiter$e, iconFiles, requestIcon, iconCss, __awaiter$d, parser, Icon, IconLibrary, liveIndicatorCss, LiveIndicator, loadingScreenCss, LoadingScreen, menuCss, __awaiter$c, Menu, menuItemCss, __awaiter$b, MenuItem, MenuRadio, MenuRadioGroup, MuteControl, pipControlCss, __awaiter$a, PiPControl, PlaybackControl, Logger, players, __awaiter$9, immediateAdapterCall, playerCss, __awaiter$8, idCount$3, Player, posterCss, Poster, scrimCss, Scrim, getHours, getMinutes, getSeconds, formatTime, scrubberControlCss, __awaiter$7, ScrubberControl, settingsCss, __awaiter$6, idCount$2, Settings, settingsControlCss, __awaiter$5, idCount$1, SettingsControl, skeletonCss, Skeleton, sliderCss, Slider, spinnerCss, Spinner, __awaiter$4, idCount, Submenu, timeCss, Time, timeProgressCss, TimeProgress, tooltipCss, tooltipIdCount, Tooltip, uiCss, UI, __awaiter$3, Video, VimeoEvent, vimeoCss, __awaiter$2, videoInfoCache, Vimeo, volumeControlCss, __awaiter$1, VolumeControl, mapYouTubePlaybackQuality, youtubeCss, __awaiter, posterCache, YouTube, VmAudio, VmCaptionControl, VmCaptions, VmClickToPlay, VmControl, VmControlGroup, VmControlSpacer, VmControls, VmCurrentTime, VmDailymotion, VmDash, VmDblClickFullscreen, VmDefaultControls, VmDefaultSettings, VmDefaultUi, VmEmbed, VmEndTime, VmFile, VmFullscreenControl, VmHls, VmIcon, VmIconLibrary, VmLiveIndicator, VmLoadingScreen, VmMenu, VmMenuItem, VmMenuRadio, VmMenuRadioGroup, VmMuteControl, VmPipControl, VmPlaybackControl, VmPlayer, VmPoster, VmScrim, VmScrubberControl, VmSettings, VmSettingsControl, VmSkeleton, VmSlider, VmSpinner, VmSubmenu, VmTime, VmTimeProgress, VmTooltip, VmUi, VmVideo, VmVimeo, VmVolumeControl, VmYoutube;
var init_custom_elements = __esm({
  "node_modules/@vime/core/dist/custom-elements/index.js"() {
    init_client();
    isColliding = (a, b, translateAx = 0, translateAy = 0, translateBx = 0, translateBy = 0) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return aRect.left + translateAx < bRect.right + translateBx && aRect.right + translateAx > bRect.left + translateBx && aRect.top + translateAy < bRect.bottom + translateBy && aRect.bottom + translateAy > bRect.top + translateBy;
    };
    noop2 = (..._) => {
    };
    isNull = (value) => value === null;
    isUndefined = (value) => typeof value === "undefined";
    isNil = (value) => isNull(value) || isUndefined(value);
    getConstructor = (value) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !isNil(value) ? value.constructor : void 0
    );
    isObject = (value) => getConstructor(value) === Object;
    isNumber = (value) => getConstructor(value) === Number && !Number.isNaN(value);
    isString = (value) => getConstructor(value) === String;
    isBoolean = (value) => getConstructor(value) === Boolean;
    isFunction = (value) => getConstructor(value) === Function;
    isArray = (value) => Array.isArray(value);
    isInstanceOf = (value, constructor) => Boolean(value && constructor && value instanceof constructor);
    deferredPromise = () => {
      let resolve = noop2;
      let reject = noop2;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
    FIND_PLAYER_EVENT = "vmFindPlayer";
    findPlayer = (ref, interval = 300, maxRetries = 10) => {
      const el = isInstanceOf(ref, HTMLElement) ? ref : getElement(ref);
      const search = deferredPromise();
      let stopFiring;
      const event = new CustomEvent(FIND_PLAYER_EVENT, {
        bubbles: true,
        composed: true,
        detail: (player) => {
          search.resolve(player);
          stopFiring();
        }
      });
      stopFiring = fireEventAndRetry(el, event, () => {
        search.reject(`Could not find player for ${el.nodeName}`);
      }, interval, maxRetries);
      return search.promise;
    };
    (function(MediaType2) {
      MediaType2["Audio"] = "audio";
      MediaType2["Video"] = "video";
    })(MediaType || (MediaType = {}));
    STATE_CHANGE_EVENT = "vmStateChange";
    createDispatcher = (ref) => (prop, value) => {
      const el = isInstanceOf(ref, HTMLElement) ? ref : getElement(ref);
      const event = new CustomEvent(STATE_CHANGE_EVENT, {
        bubbles: true,
        composed: true,
        detail: { by: el, prop, value }
      });
      el.dispatchEvent(event);
    };
    en = {
      play: "Play",
      pause: "Pause",
      playback: "Playback",
      scrubber: "Scrubber",
      scrubberLabel: "{currentTime} of {duration}",
      played: "Played",
      duration: "Duration",
      buffered: "Buffered",
      close: "Close",
      currentTime: "Current time",
      live: "LIVE",
      volume: "Volume",
      mute: "Mute",
      unmute: "Unmute",
      audio: "Audio",
      default: "Default",
      captions: "Captions",
      subtitlesOrCc: "Subtitles/CC",
      enableCaptions: "Enable subtitles/captions",
      disableCaptions: "Disable subtitles/captions",
      auto: "Auto",
      fullscreen: "Fullscreen",
      enterFullscreen: "Enter fullscreen",
      exitFullscreen: "Exit fullscreen",
      settings: "Settings",
      seekForward: "Seek forward",
      seekBackward: "Seek backward",
      seekTotal: "Seek total",
      normal: "Normal",
      none: "None",
      playbackRate: "Playback Rate",
      playbackQuality: "Playback Quality",
      loop: "Loop",
      disabled: "Disabled",
      off: "Off",
      enabled: "Enabled",
      pip: "Picture-in-Picture",
      enterPiP: "Miniplayer",
      exitPiP: "Expand"
    };
    initialState = {
      theme: void 0,
      paused: true,
      playing: false,
      duration: -1,
      currentProvider: void 0,
      mediaTitle: void 0,
      currentSrc: void 0,
      currentPoster: void 0,
      textTracks: [],
      currentTextTrack: -1,
      audioTracks: [],
      currentAudioTrack: -1,
      isTextTrackVisible: true,
      shouldRenderNativeTextTracks: true,
      icons: "vime",
      currentTime: 0,
      autoplay: false,
      ready: false,
      playbackReady: false,
      loop: false,
      muted: false,
      buffered: 0,
      playbackRate: 1,
      playbackRates: [1],
      playbackQuality: void 0,
      playbackQualities: [],
      seeking: false,
      debug: false,
      playbackStarted: false,
      playbackEnded: false,
      buffering: false,
      controls: false,
      isControlsActive: false,
      volume: 50,
      isFullscreenActive: false,
      aspectRatio: "16:9",
      viewType: void 0,
      isAudioView: false,
      isVideoView: false,
      mediaType: void 0,
      isAudio: false,
      isVideo: false,
      isMobile: false,
      isTouch: false,
      isSettingsActive: false,
      isLive: false,
      isPiPActive: false,
      autopause: true,
      playsinline: false,
      language: "en",
      languages: ["en"],
      translations: { en },
      i18n: en
    };
    writableProps = /* @__PURE__ */ new Set([
      "autoplay",
      "autopause",
      "aspectRatio",
      "controls",
      "theme",
      "debug",
      "paused",
      "currentTime",
      "language",
      "loop",
      "translations",
      "playbackQuality",
      "muted",
      "playbackRate",
      "playsinline",
      "volume",
      "isSettingsActive",
      "isControlsActive",
      "shouldRenderNativeTextTracks"
    ]);
    isWritableProp = (prop) => writableProps.has(prop);
    resetableProps = /* @__PURE__ */ new Set([
      "paused",
      "currentTime",
      "duration",
      "buffered",
      "seeking",
      "playing",
      "buffering",
      "playbackReady",
      "textTracks",
      "currentTextTrack",
      "audioTracks",
      "currentAudioTrack",
      "mediaTitle",
      "currentSrc",
      "currentPoster",
      "playbackRate",
      "playbackRates",
      "playbackStarted",
      "playbackEnded",
      "playbackQuality",
      "playbackQualities",
      "mediaType"
    ]);
    shouldPropResetOnMediaChange = (prop) => resetableProps.has(prop);
    (function(ViewType2) {
      ViewType2["Audio"] = "audio";
      ViewType2["Video"] = "video";
    })(ViewType || (ViewType = {}));
    Disposal = class {
      constructor(dispose = []) {
        this.dispose = dispose;
      }
      add(callback) {
        this.dispose.push(callback);
      }
      empty() {
        this.dispose.forEach((fn) => fn());
        this.dispose = [];
      }
    };
    __awaiter$y = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    PLAYER_KEY = Symbol("vmPlayerKey");
    COMPONENT_NAME_KEY = Symbol("vmNameKey");
    REGISTRY_KEY = Symbol("vmRegistryKey");
    REGISTRATION_KEY = Symbol("vmRegistrationKey");
    REGISTER_COMPONENT_EVENT = "vmComponentRegister";
    COMPONENT_REGISTERED_EVENT = "vmComponentRegistered";
    COMPONENT_DEREGISTERED_EVENT = "vmComponentDeregistered";
    getRegistrant = (ref) => isInstanceOf(ref, HTMLElement) ? ref : getElement(ref);
    createDeferredPromise = function() {
      var resolve;
      var promise = new Promise(function(res) {
        resolve = res;
      });
      return { promise, resolve };
    };
    openWormhole = function(Component, props, isBlocking) {
      if (isBlocking === void 0) {
        isBlocking = true;
      }
      var isConstructor = Component.constructor.name === "Function";
      var Proto = isConstructor ? Component.prototype : Component;
      var componentWillLoad = Proto.componentWillLoad;
      Proto.componentWillLoad = function() {
        var _this = this;
        var el = getElement(this);
        var onOpen = createDeferredPromise();
        var event = new CustomEvent("openWormhole", {
          bubbles: true,
          composed: true,
          detail: {
            consumer: this,
            fields: props,
            updater: function(prop, value) {
              var target = prop in el ? el : _this;
              target[prop] = value;
            },
            onOpen
          }
        });
        el.dispatchEvent(event);
        var willLoad = function() {
          if (componentWillLoad) {
            return componentWillLoad.call(_this);
          }
        };
        return isBlocking ? onOpen.promise.then(function() {
          return willLoad();
        }) : willLoad();
      };
    };
    multiverse = /* @__PURE__ */ new Map();
    updateConsumer = function(_a2, state) {
      var fields = _a2.fields, updater = _a2.updater;
      fields.forEach(function(field) {
        updater(field, state[field]);
      });
    };
    Universe = {
      create: function(creator, initialState2) {
        var el = getElement(creator);
        var wormholes = /* @__PURE__ */ new Map();
        var universe = { wormholes, state: initialState2 };
        multiverse.set(creator, universe);
        var connectedCallback2 = creator.connectedCallback;
        creator.connectedCallback = function() {
          multiverse.set(creator, universe);
          if (connectedCallback2) {
            connectedCallback2.call(creator);
          }
        };
        var disconnectedCallback2 = creator.disconnectedCallback;
        creator.disconnectedCallback = function() {
          multiverse.delete(creator);
          if (disconnectedCallback2) {
            disconnectedCallback2.call(creator);
          }
        };
        el.addEventListener("openWormhole", function(event) {
          event.stopPropagation();
          var _a2 = event.detail, consumer = _a2.consumer, onOpen = _a2.onOpen;
          if (wormholes.has(consumer))
            return;
          if (typeof consumer !== "symbol") {
            var connectedCallback_1 = consumer.connectedCallback, disconnectedCallback_1 = consumer.disconnectedCallback;
            consumer.connectedCallback = function() {
              wormholes.set(consumer, event.detail);
              if (connectedCallback_1) {
                connectedCallback_1.call(consumer);
              }
            };
            consumer.disconnectedCallback = function() {
              wormholes.delete(consumer);
              if (disconnectedCallback_1) {
                disconnectedCallback_1.call(consumer);
              }
            };
          }
          wormholes.set(consumer, event.detail);
          updateConsumer(event.detail, universe.state);
          onOpen === null || onOpen === void 0 ? void 0 : onOpen.resolve(function() {
            wormholes.delete(consumer);
          });
        });
        el.addEventListener("closeWormhole", function(event) {
          var consumer = event.detail;
          wormholes.delete(consumer);
        });
      },
      Provider: function(_a2, children) {
        var state = _a2.state;
        var creator = getRenderingRef();
        if (multiverse.has(creator)) {
          var universe = multiverse.get(creator);
          universe.state = state;
          universe.wormholes.forEach(function(opening) {
            updateConsumer(opening, state);
          });
        }
        return children;
      }
    };
    LOAD_START_EVENT = "vmLoadStart";
    isToggleStateEvent = /* @__PURE__ */ new Set([
      "isFullscreenActive",
      "isControlsActive",
      "isTextTrackVisible",
      "isPiPActive",
      "isLive",
      "isTouch",
      "isAudio",
      "isVideo",
      "isAudioView",
      "isVideoView"
    ]);
    hasShortenedEventName = /* @__PURE__ */ new Set([
      "ready",
      "playbackStarted",
      "playbackEnded",
      "playbackReady"
    ]);
    getEventName = (prop) => {
      if (isToggleStateEvent.has(prop)) {
        return `vm${prop.replace("is", "").replace("Active", "")}Change`;
      }
      if (hasShortenedEventName.has(prop)) {
        return `vm${prop.charAt(0).toUpperCase()}${prop.slice(1)}`;
      }
      return `vm${prop.charAt(0).toUpperCase()}${prop.slice(1)}Change`;
    };
    withPlayerContext = (component10, props) => openWormhole(component10, props);
    (function(Provider2) {
      Provider2["Audio"] = "audio";
      Provider2["Video"] = "video";
      Provider2["HLS"] = "hls";
      Provider2["Dash"] = "dash";
      Provider2["YouTube"] = "youtube";
      Provider2["Vimeo"] = "vimeo";
      Provider2["Dailymotion"] = "dailymotion";
    })(Provider || (Provider = {}));
    audioRegex = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
    videoRegex = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i;
    hlsRegex = /\.(m3u8)($|\?)/i;
    hlsTypeRegex = /^application\/(x-mpegURL|vnd\.apple\.mpegURL)$/i;
    dashRegex = /\.(mpd)($|\?)/i;
    PROVIDER_CHANGE_EVENT = "vmProviderChange";
    createProviderDispatcher = (ref) => (prop, value) => {
      const el = isInstanceOf(ref, HTMLElement) ? ref : getElement(ref);
      const event = new CustomEvent(PROVIDER_CHANGE_EVENT, {
        bubbles: true,
        composed: true,
        detail: { by: el, prop, value }
      });
      el.dispatchEvent(event);
    };
    providerWritableProps = /* @__PURE__ */ new Set([
      "ready",
      "playing",
      "playbackReady",
      "playbackStarted",
      "playbackEnded",
      "seeking",
      "buffered",
      "buffering",
      "duration",
      "viewType",
      "mediaTitle",
      "mediaType",
      "currentSrc",
      "currentPoster",
      "playbackRates",
      "playbackQualities",
      "textTracks",
      "currentTextTrack",
      "isTextTrackVisible",
      "audioTracks",
      "currentAudioTrack",
      "isPiPActive",
      "isFullscreenActive"
    ]);
    isProviderWritableProp = (prop) => isWritableProp(prop) || providerWritableProps.has(prop);
    __awaiter$w = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    PROVIDER_CACHE_KEY = Symbol("vmProviderCache");
    PROVIDER_CONNECT_EVENT = "vmMediaProviderConnect";
    PROVIDER_DISCONNECT_EVENT = "vmMediaProviderDisconnect";
    __awaiter$v = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Audio = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        this.willAttach = false;
        this.preload = "metadata";
        withComponentRegistry(this);
        if (!this.willAttach)
          withProviderConnect(this);
      }
      /** @internal */
      getAdapter() {
        var _a2, _b2;
        return __awaiter$v(this, void 0, void 0, function* () {
          const adapter = (_b2 = yield (_a2 = this.fileProvider) === null || _a2 === void 0 ? void 0 : _a2.getAdapter()) !== null && _b2 !== void 0 ? _b2 : {};
          adapter.canPlay = (type) => __awaiter$v(this, void 0, void 0, function* () {
            return isString(type) && audioRegex.test(type);
          });
          return adapter;
        });
      }
      render() {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          h("vm-file", { noConnect: true, willAttach: this.willAttach, crossOrigin: this.crossOrigin, preload: this.preload, disableRemotePlayback: this.disableRemotePlayback, mediaTitle: this.mediaTitle, viewType: ViewType.Audio, ref: (el) => {
            this.fileProvider = el;
          } }, h("slot", null))
        );
      }
    };
    captionControlCss = ":host([hidden]){display:none}";
    __awaiter$u = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    CaptionControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.canToggleCaptionVisibility = false;
        this.showIcon = "captions-on";
        this.hideIcon = "captions-off";
        this.tooltipPosition = "top";
        this.hideTooltip = false;
        this.keys = "c";
        this.i18n = {};
        this.playbackReady = false;
        this.textTracks = [];
        this.isTextTrackVisible = false;
        withComponentRegistry(this);
        withPlayerContext(this, [
          "i18n",
          "textTracks",
          "isTextTrackVisible",
          "playbackReady"
        ]);
      }
      onTextTracksChange() {
        var _a2;
        return __awaiter$u(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canToggleCaptionVisibility = this.textTracks.length > 0 && ((_a2 = yield player === null || player === void 0 ? void 0 : player.canSetTextTrackVisibility()) !== null && _a2 !== void 0 ? _a2 : false);
        });
      }
      componentDidLoad() {
        this.onTextTracksChange();
      }
      onClick() {
        var _a2;
        const player = getPlayerFromRegistry(this);
        (_a2 = player === null || player === void 0 ? void 0 : player.setTextTrackVisibility) === null || _a2 === void 0 ? void 0 : _a2.call(player, !this.isTextTrackVisible);
      }
      render() {
        const tooltip = this.isTextTrackVisible ? this.i18n.disableCaptions : this.i18n.enableCaptions;
        const tooltipWithHint = !isUndefined(this.keys) ? `${tooltip} (${this.keys})` : tooltip;
        return h(Host, { hidden: !this.canToggleCaptionVisibility }, h("vm-control", { label: this.i18n.captions, keys: this.keys, hidden: !this.canToggleCaptionVisibility, pressed: this.isTextTrackVisible, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.isTextTrackVisible ? this.showIcon : this.hideIcon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint)));
      }
      static get watchers() {
        return {
          "textTracks": ["onTextTracksChange"],
          "playbackReady": ["onTextTracksChange"]
        };
      }
      static get style() {
        return captionControlCss;
      }
    };
    watch$1 = /* @__PURE__ */ new Set();
    controls = /* @__PURE__ */ new Set();
    collisions = /* @__PURE__ */ new Map();
    captionsCss = ":host{position:absolute;left:0;bottom:0;width:100%;pointer-events:none;z-index:var(--vm-captions-z-index)}.captions{width:100%;text-align:center;color:var(--vm-captions-text-color);font-size:var(--vm-captions-font-size);padding:$control-spacing;display:none;pointer-events:none;transition:transform 0.4s ease-in-out, opacity 0.3s ease-in-out}.captions.enabled{display:inline-block}.captions.hidden{display:none !important}.captions.inactive{opacity:0;visibility:hidden}.captions.fontMd{font-size:var(--vm-captions-font-size-medium)}.captions.fontLg{font-size:var(--vm-captions-font-size-large)}.captions.fontXl{font-size:var(--vm-captions-font-size-xlarge)}.cue{display:inline-block;background:var(--vm-captions-cue-bg-color);border-radius:var(--vm-captions-cue-border-radius);box-decoration-break:clone;line-height:185%;padding:var(--vm-captions-cue-padding);white-space:pre-wrap;pointer-events:none}.cue>div{display:inline}.cue:empty{display:none}";
    __awaiter$t = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Captions = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.sizeDisposal = new Disposal();
        this.textDisposal = new Disposal();
        this.isEnabled = false;
        this.fontSize = "sm";
        this.hidden = false;
        this.isControlsActive = false;
        this.isVideoView = false;
        this.playbackStarted = false;
        this.textTracks = [];
        this.currentTextTrack = -1;
        this.isTextTrackVisible = true;
        withComponentRegistry(this);
        withControlsCollisionDetection(this);
        withPlayerContext(this, [
          "isVideoView",
          "playbackStarted",
          "isControlsActive",
          "textTracks",
          "currentTextTrack",
          "isTextTrackVisible"
        ]);
      }
      onEnabledChange() {
        this.isEnabled = this.playbackStarted && this.isVideoView;
      }
      onTextTracksChange() {
        const textTrack = this.textTracks[this.currentTextTrack];
        const renderCues = () => {
          var _a2;
          const activeCues = Array.from((_a2 = textTrack.activeCues) !== null && _a2 !== void 0 ? _a2 : []);
          this.renderCurrentCue(activeCues[0]);
        };
        this.textDisposal.empty();
        if (!isNil(textTrack)) {
          renderCues();
          this.textDisposal.add(listen(textTrack, "cuechange", renderCues));
        }
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
        this.dispatch("shouldRenderNativeTextTracks", false);
        this.onTextTracksChange();
        this.onPlayerResize();
      }
      disconnectedCallback() {
        this.textDisposal.empty();
        this.sizeDisposal.empty();
        this.dispatch("shouldRenderNativeTextTracks", true);
      }
      onPlayerResize() {
        return __awaiter$t(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          const container = yield player.getContainer();
          const resizeObs = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width } = entry.contentRect;
            if (width >= 1360) {
              this.fontSize = "xl";
            } else if (width >= 1024) {
              this.fontSize = "lg";
            } else if (width >= 768) {
              this.fontSize = "md";
            } else {
              this.fontSize = "sm";
            }
          });
          resizeObs.observe(container);
        });
      }
      renderCurrentCue(cue) {
        if (isNil(cue)) {
          this.cue = "";
          return;
        }
        const div = document.createElement("div");
        div.append(cue.getCueAsHTML());
        this.cue = div.innerHTML.trim();
      }
      render() {
        return h("div", { style: {
          transform: `translateY(calc(${this.isControlsActive ? "var(--vm-controls-height)" : "24px"} * -1))`
        }, class: {
          captions: true,
          enabled: this.isEnabled,
          hidden: this.hidden,
          fontMd: this.fontSize === "md",
          fontLg: this.fontSize === "lg",
          fontXl: this.fontSize === "xl",
          inactive: !this.isTextTrackVisible
        } }, h("span", { class: "cue" }, this.cue));
      }
      static get watchers() {
        return {
          "isVideoView": ["onEnabledChange"],
          "playbackStarted": ["onEnabledChange"],
          "textTracks": ["onTextTracksChange"],
          "currentTextTrack": ["onTextTracksChange"]
        };
      }
      static get style() {
        return captionsCss;
      }
    };
    clickToPlayCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-click-to-play-z-index)}.clickToPlay{display:none;width:100%;height:100%;pointer-events:none}.clickToPlay.enabled{display:inline-block;pointer-events:auto}";
    __awaiter$s = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    ClickToPlay = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.useOnMobile = false;
        this.paused = true;
        this.isVideoView = false;
        this.isMobile = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["paused", "isVideoView", "isMobile"]);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
      }
      /** @internal */
      forceClick() {
        return __awaiter$s(this, void 0, void 0, function* () {
          this.onClick();
        });
      }
      onClick() {
        this.dispatch("paused", !this.paused);
      }
      render() {
        return h("div", { class: {
          clickToPlay: true,
          enabled: this.isVideoView && (!this.isMobile || this.useOnMobile)
        }, onClick: this.onClick.bind(this) });
      }
      static get style() {
        return clickToPlayCss;
      }
    };
    controlCss = "button{display:flex;align-items:center;flex-direction:row;border:var(--vm-control-border);cursor:pointer;flex-shrink:0;font-size:var(--vm-control-icon-size);color:var(--vm-control-color);background:var(--vm-control-bg, transparent);border-radius:var(--vm-control-border-radius);padding:var(--vm-control-padding);position:relative;pointer-events:auto;transition:all 0.3s ease;transform:scale(var(--vm-control-scale, 1));touch-action:manipulation;box-sizing:border-box}button.hidden{display:none}button:focus{outline:0}button.tapHighlight{background:var(--vm-control-tap-highlight)}button.notTouch:focus,button.notTouch:hover,button.notTouch[aria-expanded='true']{background:var(--vm-control-focus-bg);color:var(--vm-control-focus-color);transform:scale(calc(var(--vm-control-scale, 1) + 0.06))}";
    __awaiter$r = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Control = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmInteractionChange = createEvent(this, "vmInteractionChange", 7);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        this.keyboardDisposal = new Disposal();
        this.showTapHighlight = false;
        this.hidden = false;
        this.isTouch = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["isTouch"]);
      }
      onKeysChange() {
        return __awaiter$r(this, void 0, void 0, function* () {
          this.keyboardDisposal.empty();
          if (isUndefined(this.keys))
            return;
          const player = yield findPlayer(this);
          const codes = this.keys.split("/");
          if (isUndefined(player))
            return;
          this.keyboardDisposal.add(listen(player, "keydown", (event) => {
            if (codes.includes(event.key)) {
              this.button.click();
            }
          }));
        });
      }
      connectedCallback() {
        this.findTooltip();
        this.onKeysChange();
      }
      componentWillLoad() {
        this.findTooltip();
      }
      disconnectedCallback() {
        this.keyboardDisposal.empty();
      }
      /**
       * Focuses the control.
       */
      focusControl() {
        var _a2;
        return __awaiter$r(this, void 0, void 0, function* () {
          (_a2 = this.button) === null || _a2 === void 0 ? void 0 : _a2.focus();
        });
      }
      /**
       * Removes focus from the control.
       */
      blurControl() {
        var _a2;
        return __awaiter$r(this, void 0, void 0, function* () {
          (_a2 = this.button) === null || _a2 === void 0 ? void 0 : _a2.blur();
        });
      }
      onTouchStart() {
        this.showTapHighlight = true;
      }
      onTouchEnd() {
        setTimeout(() => {
          this.showTapHighlight = false;
        }, 100);
      }
      findTooltip() {
        const tooltip = this.host.querySelector("vm-tooltip");
        if (!isNull(tooltip))
          this.describedBy = tooltip.id;
        return tooltip;
      }
      onShowTooltip() {
        const tooltip = this.findTooltip();
        if (!isNull(tooltip))
          tooltip.active = true;
        this.vmInteractionChange.emit(true);
      }
      onHideTooltip() {
        const tooltip = this.findTooltip();
        if (!isNull(tooltip))
          tooltip.active = false;
        this.button.blur();
        this.vmInteractionChange.emit(false);
      }
      onFocus() {
        this.vmFocus.emit();
        this.onShowTooltip();
      }
      onBlur() {
        this.vmBlur.emit();
        this.onHideTooltip();
      }
      onMouseEnter() {
        this.onShowTooltip();
      }
      onMouseLeave() {
        this.onHideTooltip();
      }
      render() {
        const isMenuExpanded = this.expanded ? "true" : "false";
        const isPressed = this.pressed ? "true" : "false";
        return h("button", { class: {
          hidden: this.hidden,
          notTouch: !this.isTouch,
          tapHighlight: this.showTapHighlight
        }, id: this.identifier, type: "button", "aria-label": this.label, "aria-haspopup": !isUndefined(this.menu) ? "true" : void 0, "aria-controls": this.menu, "aria-expanded": !isUndefined(this.menu) ? isMenuExpanded : void 0, "aria-pressed": !isUndefined(this.pressed) ? isPressed : void 0, "aria-hidden": this.hidden ? "true" : "false", "aria-describedby": this.describedBy, onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this), ref: (el) => {
          this.button = el;
        } }, h("slot", null));
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "keys": ["onKeysChange"]
        };
      }
      static get style() {
        return controlCss;
      }
    };
    controlGroupCss = ":host{width:100%}.controlGroup{position:relative;width:100%;display:flex;flex-wrap:wrap;flex-direction:inherit;align-items:inherit;justify-content:inherit;box-sizing:border-box}.controlGroup.spaceTop{margin-top:var(--vm-control-group-spacing)}.controlGroup.spaceBottom{margin-bottom:var(--vm-control-group-spacing)}::slotted(*){margin-left:var(--vm-controls-spacing)}::slotted(*:first-child){margin-left:0}";
    ControlNewLine = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.space = "none";
        withComponentRegistry(this);
      }
      render() {
        return h("div", { class: {
          controlGroup: true,
          spaceTop: this.space !== "none" && this.space !== "bottom",
          spaceBottom: this.space !== "none" && this.space !== "top"
        } }, h("slot", null));
      }
      get host() {
        return this;
      }
      static get style() {
        return controlGroupCss;
      }
    };
    controlSpacerCss = ":host{flex:1}";
    ControlSpacer = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        withComponentRegistry(this);
      }
      static get style() {
        return controlSpacerCss;
      }
    };
    debounce = (func, wait = 1e3, immediate = false) => {
      let timeout;
      return function executedFunction(...args) {
        const context = this;
        const later = function delayedFunctionCall() {
          timeout = void 0;
          if (!immediate)
            func.apply(context, args);
        };
        const callNow = immediate && isUndefined(timeout);
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
          func.apply(context, args);
      };
    };
    controlsCss = ":host{position:relative;width:100%;z-index:var(--vm-controls-z-index)}:host([video]){position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.controls{display:flex;width:100%;position:absolute;flex-wrap:wrap;pointer-events:auto;box-sizing:border-box;background:var(--vm-controls-bg);padding:var(--vm-controls-padding);border-radius:var(--vm-controls-border-radius);opacity:0;visibility:hidden;transition:var(--vm-fade-transition)}.controls.audio{position:relative}.controls.hidden{display:none}.controls.active{opacity:1;visibility:visible}.controls.fullWidth{width:100%}.controls.fullHeight{height:100%}::slotted(*:not(vm-control-group)){margin-left:var(--vm-controls-spacing)}::slotted(*:not(vm-control-group):first-child){margin-left:0}";
    __awaiter$q = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    playerRef = {};
    hideControlsTimeout = {};
    Controls = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.disposal = new Disposal();
        this.isInteracting = false;
        this.hidden = false;
        this.fullWidth = false;
        this.fullHeight = false;
        this.direction = "row";
        this.align = "center";
        this.justify = "start";
        this.pin = "bottomLeft";
        this.activeDuration = 2750;
        this.waitForPlaybackStart = false;
        this.hideWhenPaused = false;
        this.hideOnMouseLeave = false;
        this.isAudioView = false;
        this.isSettingsActive = false;
        this.playbackReady = false;
        this.isControlsActive = false;
        this.paused = true;
        this.playbackStarted = false;
        withComponentRegistry(this);
        registerControlsForCollisionDetection(this);
        withPlayerContext(this, [
          "playbackReady",
          "isAudioView",
          "isControlsActive",
          "isSettingsActive",
          "paused",
          "playbackStarted"
        ]);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
        this.onControlsChange();
        this.setupPlayerListeners();
      }
      componentWillLoad() {
        this.onControlsChange();
      }
      disconnectedCallback() {
        this.disposal.empty();
        delete hideControlsTimeout[playerRef[this]];
        delete playerRef[this];
      }
      setupPlayerListeners() {
        return __awaiter$q(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          const events = ["focus", "keydown", "click", "touchstart", "mouseleave"];
          events.forEach((event) => {
            this.disposal.add(listen(player, event, this.onControlsChange.bind(this)));
          });
          this.disposal.add(listen(player, "mousemove", debounce(this.onControlsChange, 50, true).bind(this)));
          playerRef[this] = player;
        });
      }
      show() {
        this.dispatch("isControlsActive", true);
      }
      hide() {
        this.dispatch("isControlsActive", false);
      }
      hideWithDelay() {
        clearTimeout(hideControlsTimeout[playerRef[this]]);
        hideControlsTimeout[playerRef[this]] = setTimeout(() => {
          this.hide();
        }, this.activeDuration);
      }
      onControlsChange(event) {
        clearTimeout(hideControlsTimeout[playerRef[this]]);
        if (this.hidden || !this.playbackReady) {
          this.hide();
          return;
        }
        if (this.isAudioView) {
          this.show();
          return;
        }
        if (this.waitForPlaybackStart && !this.playbackStarted) {
          this.hide();
          return;
        }
        if (this.isInteracting || this.isSettingsActive) {
          this.show();
          return;
        }
        if (this.hideWhenPaused && this.paused) {
          this.hideWithDelay();
          return;
        }
        if (this.hideOnMouseLeave && !this.paused && (event === null || event === void 0 ? void 0 : event.type) === "mouseleave") {
          this.hide();
          return;
        }
        if (!this.paused) {
          this.show();
          this.hideWithDelay();
          return;
        }
        this.show();
      }
      getPosition() {
        if (this.isAudioView)
          return {};
        if (this.pin === "center") {
          return {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          };
        }
        const pos = this.pin.split(/(?=[L|R])/).map((s2) => s2.toLowerCase());
        return { [pos[0]]: 0, [pos[1]]: 0 };
      }
      onStartInteraction() {
        this.isInteracting = true;
      }
      onEndInteraction() {
        this.isInteracting = false;
      }
      render() {
        return h(Host, { video: !this.isAudioView }, h("div", { style: Object.assign(Object.assign({}, this.getPosition()), { flexDirection: this.direction, alignItems: this.align === "center" ? "center" : `flex-${this.align}`, justifyContent: this.justify }), class: {
          controls: true,
          audio: this.isAudioView,
          hidden: this.hidden,
          active: this.playbackReady && this.isControlsActive,
          fullWidth: this.isAudioView || this.fullWidth,
          fullHeight: !this.isAudioView && this.fullHeight
        }, onMouseEnter: this.onStartInteraction.bind(this), onMouseLeave: this.onEndInteraction.bind(this), onTouchStart: this.onStartInteraction.bind(this), onTouchEnd: this.onEndInteraction.bind(this) }, h("slot", null)));
      }
      static get watchers() {
        return {
          "paused": ["onControlsChange"],
          "hidden": ["onControlsChange"],
          "isAudioView": ["onControlsChange"],
          "isInteracting": ["onControlsChange"],
          "isSettingsActive": ["onControlsChange"],
          "hideWhenPaused": ["onControlsChange"],
          "hideOnMouseLeave": ["onControlsChange"],
          "playbackStarted": ["onControlsChange"],
          "waitForPlaybackStart": ["onControlsChange"],
          "playbackReady": ["onControlsChange"]
        };
      }
      static get style() {
        return controlsCss;
      }
    };
    currentTimeCss = ":host{display:flex;align-items:center;justify-content:center}";
    CurrentTime = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.currentTime = 0;
        this.i18n = {};
        this.alwaysShowHours = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["currentTime", "i18n"]);
      }
      render() {
        return h("vm-time", { label: this.i18n.currentTime, seconds: this.currentTime, alwaysShowHours: this.alwaysShowHours });
      }
      static get style() {
        return currentTimeCss;
      }
    };
    IS_CLIENT = typeof window !== "undefined";
    UA = IS_CLIENT ? (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent.toLowerCase() : "";
    IS_IOS = /iphone|ipad|ipod|ios|CriOS|FxiOS/.test(UA);
    IS_ANDROID = /android/.test(UA);
    IS_MOBILE = IS_CLIENT && (IS_IOS || IS_ANDROID);
    IS_IPHONE = IS_CLIENT && /(iPhone|iPod)/gi.test((_b = window.navigator) === null || _b === void 0 ? void 0 : _b.platform);
    /firefox/.test(UA);
    IS_CHROME = IS_CLIENT && window.chrome;
    IS_CLIENT && !IS_CHROME && (window.safari || IS_IOS || /(apple|safari)/.test(UA));
    onMobileChange = (callback) => {
      if (!IS_CLIENT || isUndefined(window.ResizeObserver)) {
        callback(IS_MOBILE);
        return noop2;
      }
      function onResize() {
        callback(window.innerWidth <= 480 || IS_MOBILE);
      }
      callback(window.innerWidth <= 480 || IS_MOBILE);
      return listen(window, "resize", onResize);
    };
    onTouchInputChange = (callback) => {
      if (!IS_CLIENT)
        return noop2;
      let lastTouchTime = 0;
      const offTouchListener = listen(document, "touchstart", () => {
        lastTouchTime = (/* @__PURE__ */ new Date()).getTime();
        callback(true);
      }, true);
      const offMouseListener = listen(document, "mousemove", () => {
        if ((/* @__PURE__ */ new Date()).getTime() - lastTouchTime < 500)
          return;
        callback(false);
      }, true);
      return () => {
        offTouchListener();
        offMouseListener();
      };
    };
    canRotateScreen = () => IS_CLIENT && window.screen.orientation && !!window.screen.orientation.lock;
    canUsePiPInChrome = () => {
      if (!IS_CLIENT)
        return false;
      const video = document.createElement("video");
      return !!document.pictureInPictureEnabled && !video.disablePictureInPicture;
    };
    canUsePiPInSafari = () => {
      if (!IS_CLIENT)
        return false;
      const video = document.createElement("video");
      return isFunction(video.webkitSupportsPresentationMode) && isFunction(video.webkitSetPresentationMode) && !IS_IPHONE;
    };
    canUsePiP = () => canUsePiPInChrome() || canUsePiPInSafari();
    canAutoplay = (muted = true, playsinline = true) => {
      if (!IS_CLIENT)
        return Promise.resolve(false);
      const video = document.createElement("video");
      if (muted) {
        video.setAttribute("muted", "");
        video.muted = true;
      }
      if (playsinline) {
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
      }
      video.setAttribute("height", "0");
      video.setAttribute("width", "0");
      video.style.position = "fixed";
      video.style.top = "0";
      video.style.width = "0";
      video.style.height = "0";
      video.style.opacity = "0";
      new Promise((resolve) => resolve(video.play())).catch(noop2);
      return Promise.resolve(!video.paused);
    };
    isObjOrJSON = (input) => !isNil(input) && (isObject(input) || isString(input) && input.startsWith("{"));
    objOrParseJSON = (input) => isObject(input) ? input : tryParseJSON(input);
    loadImage = (src, minWidth = 1) => new Promise((resolve, reject) => {
      const image = new Image();
      const handler = () => {
        delete image.onload;
        delete image.onerror;
        image.naturalWidth >= minWidth ? resolve(image) : reject(image);
      };
      Object.assign(image, { onload: handler, onerror: handler, src });
    });
    loadScript = (src, onLoad, onError = noop2) => {
      var _a2;
      const script = document.createElement("script");
      script.src = src;
      script.onload = onLoad;
      script.onerror = onError;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      (_a2 = firstScriptTag.parentNode) === null || _a2 === void 0 ? void 0 : _a2.insertBefore(script, firstScriptTag);
    };
    decodeJSON = (data) => {
      if (!isObjOrJSON(data))
        return void 0;
      return objOrParseJSON(data);
    };
    tryDecodeURIComponent = (component10, fallback = "") => {
      if (!IS_CLIENT)
        return fallback;
      try {
        return window.decodeURIComponent(component10);
      } catch (e) {
        return fallback;
      }
    };
    QUERY_STRING_REGEX = /(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;
    parseQueryString = (qs) => {
      const params = /* @__PURE__ */ Object.create(null);
      if (isUndefined(qs))
        return params;
      let match;
      while (match = QUERY_STRING_REGEX.exec(qs)) {
        const name = tryDecodeURIComponent(match[1], match[1]).replace("[]", "");
        const value = isString(match[2]) ? tryDecodeURIComponent(match[2].replace(/\+/g, " "), match[2]) : "";
        const currValue = params[name];
        if (currValue && !isArray(currValue))
          params[name] = [currValue];
        currValue ? params[name].push(value) : params[name] = value;
      }
      return params;
    };
    serializeQueryString = (params) => {
      const qs = [];
      const appendQueryParam = (param, v) => {
        qs.push(`${encodeURIComponent(param)}=${encodeURIComponent(v)}`);
      };
      Object.keys(params).forEach((param) => {
        const value = params[param];
        if (isNil(value))
          return;
        if (isArray(value)) {
          value.forEach((v) => appendQueryParam(param, v));
        } else {
          appendQueryParam(param, value);
        }
      });
      return qs.join("&");
    };
    preconnect = (url, rel = "preconnect", as) => {
      if (!IS_CLIENT)
        return false;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = url;
      if (!isUndefined(as))
        link.as = as;
      link.crossOrigin = "true";
      document.head.append(link);
      return true;
    };
    appendQueryStringToURL = (url, qs) => {
      if (isUndefined(qs) || qs.length === 0)
        return url;
      const mainAndQuery = url.split("?", 2);
      return mainAndQuery[0] + (!isUndefined(mainAndQuery[1]) ? `?${mainAndQuery[1]}&${qs}` : `?${qs}`);
    };
    appendParamsToURL = (url, params) => appendQueryStringToURL(url, isObject(params) ? serializeQueryString(params) : params);
    decodeQueryString = (qs) => {
      if (!isString(qs))
        return void 0;
      return parseQueryString(qs);
    };
    pendingSDKRequests = {};
    loadSDK = (url, sdkGlobalVar, sdkReadyVar, isLoaded = () => true, loadScriptFn = loadScript) => {
      const getGlobal = (key3) => {
        if (!isUndefined(window[key3]))
          return window[key3];
        if (window.exports && window.exports[key3])
          return window.exports[key3];
        if (window.module && window.module.exports && window.module.exports[key3]) {
          return window.module.exports[key3];
        }
        return void 0;
      };
      const existingGlobal = getGlobal(sdkGlobalVar);
      if (existingGlobal && isLoaded(existingGlobal)) {
        return Promise.resolve(existingGlobal);
      }
      return new Promise((resolve, reject) => {
        if (!isUndefined(pendingSDKRequests[url])) {
          pendingSDKRequests[url].push({ resolve, reject });
          return;
        }
        pendingSDKRequests[url] = [{ resolve, reject }];
        const onLoaded = (sdk) => {
          pendingSDKRequests[url].forEach((request) => request.resolve(sdk));
        };
        if (!isUndefined(sdkReadyVar)) {
          const previousOnReady = window[sdkReadyVar];
          window[sdkReadyVar] = function() {
            if (!isUndefined(previousOnReady))
              previousOnReady();
            onLoaded(getGlobal(sdkGlobalVar));
          };
        }
        loadScriptFn(url, () => {
          if (isUndefined(sdkReadyVar))
            onLoaded(getGlobal(sdkGlobalVar));
        }, (e) => {
          pendingSDKRequests[url].forEach((request) => {
            request.reject(e);
          });
          delete pendingSDKRequests[url];
        });
      });
    };
    withProviderContext = (provider, additionalProps = []) => withPlayerContext(provider, [
      "autoplay",
      "controls",
      "language",
      "muted",
      "logger",
      "loop",
      "aspectRatio",
      "playsinline",
      ...additionalProps
    ]);
    dailymotionCss = ":host{z-index:var(--vm-media-z-index)}";
    __awaiter$p = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    videoInfoCache$1 = /* @__PURE__ */ new Map();
    Dailymotion = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.defaultInternalState = {};
        this.internalState = {
          currentTime: 0,
          volume: 0,
          muted: false,
          isAdsPlaying: false,
          playbackReady: false
        };
        this.embedSrc = "";
        this.mediaTitle = "";
        this.shouldAutoplayQueue = false;
        this.showUpNextQueue = false;
        this.showShareButtons = false;
        this.showDailymotionLogo = false;
        this.showVideoInfo = true;
        this.language = "en";
        this.autoplay = false;
        this.controls = false;
        this.loop = false;
        this.muted = false;
        this.playsinline = false;
        withComponentRegistry(this);
        withProviderConnect(this);
        withProviderContext(this);
      }
      onVideoIdChange() {
        this.internalState = Object.assign({}, this.defaultInternalState);
        if (!this.videoId) {
          this.embedSrc = "";
          return;
        }
        this.embedSrc = `${this.getOrigin()}/embed/video/${this.videoId}?api=1`;
        this.fetchVideoInfo = this.getVideoInfo();
        this.pendingMediaTitleCall = deferredPromise();
      }
      onControlsChange() {
        if (this.internalState.playbackReady) {
          this.remoteControl("controls", this.controls);
        }
      }
      onCustomPosterChange() {
        this.dispatch("currentPoster", this.poster);
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        this.dispatch("viewType", ViewType.Video);
        this.onVideoIdChange();
        this.internalState.muted = this.muted;
        this.defaultInternalState = Object.assign({}, this.internalState);
      }
      componentWillLoad() {
        this.initialMuted = this.muted;
      }
      getOrigin() {
        return "https://www.dailymotion.com";
      }
      getPreconnections() {
        return [this.getOrigin(), "https://static1.dmcdn.net"];
      }
      remoteControl(command, arg) {
        return this.embed.postMessage({
          command,
          parameters: arg ? [arg] : []
        });
      }
      buildParams() {
        return {
          autoplay: this.autoplay,
          mute: this.initialMuted,
          controls: this.controls,
          "queue-autoplay-next": this.shouldAutoplayQueue,
          "queue-enable": this.showUpNextQueue,
          "sharing-enable": this.showShareButtons,
          syndication: this.syndication,
          "ui-highlight": this.color,
          "ui-logo": this.showDailymotionLogo,
          "ui-start-screen-info": this.showVideoInfo
        };
      }
      getVideoInfo() {
        return __awaiter$p(this, void 0, void 0, function* () {
          if (videoInfoCache$1.has(this.videoId))
            return videoInfoCache$1.get(this.videoId);
          const apiEndpoint = "https://api.dailymotion.com";
          return window.fetch(`${apiEndpoint}/video/${this.videoId}?fields=duration,thumbnail_1080_url`).then((response) => response.json()).then((data) => {
            const poster = data.thumbnail_1080_url;
            const duration = parseFloat(data.duration);
            videoInfoCache$1.set(this.videoId, { poster, duration });
            return { poster, duration };
          });
        });
      }
      onEmbedSrcChange() {
        this.vmLoadStart.emit();
        this.dispatch("viewType", ViewType.Video);
      }
      onEmbedMessage(event) {
        var _a2, _b2;
        const msg = event.detail;
        switch (msg.event) {
          case "playback_ready":
            this.onControlsChange();
            this.dispatch("currentSrc", this.embedSrc);
            this.dispatch("mediaType", MediaType.Video);
            Promise.all([
              this.fetchVideoInfo,
              (_a2 = this.pendingMediaTitleCall) === null || _a2 === void 0 ? void 0 : _a2.promise
            ]).then(([info, mediaTitle]) => {
              var _a3, _b3;
              this.dispatch("duration", (_a3 = info === null || info === void 0 ? void 0 : info.duration) !== null && _a3 !== void 0 ? _a3 : -1);
              this.dispatch("currentPoster", (_b3 = this.poster) !== null && _b3 !== void 0 ? _b3 : info === null || info === void 0 ? void 0 : info.poster);
              this.dispatch("mediaTitle", mediaTitle);
              this.dispatch("playbackReady", true);
            });
            break;
          case "videochange":
            (_b2 = this.pendingMediaTitleCall) === null || _b2 === void 0 ? void 0 : _b2.resolve(msg.title);
            break;
          case "start":
            this.dispatch("paused", false);
            this.dispatch("playbackStarted", true);
            this.dispatch("buffering", true);
            break;
          case "video_start":
            this.remoteControl("muted", this.internalState.muted);
            this.remoteControl("volume", this.internalState.volume);
            if (this.internalState.currentTime > 0) {
              this.remoteControl("seek", this.internalState.currentTime);
            }
            break;
          case "play":
            this.dispatch("paused", false);
            break;
          case "pause":
            this.dispatch("paused", true);
            this.dispatch("playing", false);
            this.dispatch("buffering", false);
            break;
          case "playing":
            this.dispatch("playing", true);
            this.dispatch("buffering", false);
            break;
          case "video_end":
            if (this.loop) {
              setTimeout(() => {
                this.remoteControl(
                  "play"
                  /* Play */
                );
              }, 300);
            } else {
              this.dispatch("playbackEnded", true);
            }
            break;
          case "timeupdate":
            this.dispatch("currentTime", parseFloat(msg.time));
            break;
          case "volumechange":
            this.dispatch("muted", msg.muted === "true");
            this.dispatch("volume", Math.floor(parseFloat(msg.volume) * 100));
            break;
          case "seeking":
            this.dispatch("currentTime", parseFloat(msg.time));
            this.dispatch("seeking", true);
            break;
          case "seeked":
            this.dispatch("currentTime", parseFloat(msg.time));
            this.dispatch("seeking", false);
            break;
          case "waiting":
            this.dispatch("buffering", true);
            break;
          case "progress":
            this.dispatch("buffered", parseFloat(msg.time));
            break;
          case "durationchange":
            this.dispatch("duration", parseFloat(msg.duration));
            break;
          case "qualitiesavailable":
            this.dispatch("playbackQualities", msg.qualities.map((q) => `${q}p`));
            break;
          case "qualitychange":
            this.dispatch("playbackQuality", `${msg.quality}p`);
            break;
          case "fullscreenchange":
            this.dispatch("isFullscreenActive", msg.fullscreen === "true");
            break;
          case "error":
            this.vmError.emit(msg.error);
            break;
        }
      }
      /** @internal */
      getAdapter() {
        return __awaiter$p(this, void 0, void 0, function* () {
          const canPlayRegex = /(?:dai\.ly|dailymotion|dailymotion\.com)\/(?:video\/|embed\/|)(?:video\/|)((?:\w)+)/;
          return {
            getInternalPlayer: () => __awaiter$p(this, void 0, void 0, function* () {
              return this.embed;
            }),
            play: () => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl(
                "play"
                /* Play */
              );
            }),
            pause: () => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl(
                "pause"
                /* Pause */
              );
            }),
            canPlay: (type) => __awaiter$p(this, void 0, void 0, function* () {
              return isString(type) && canPlayRegex.test(type);
            }),
            setCurrentTime: (time) => __awaiter$p(this, void 0, void 0, function* () {
              if (time !== this.internalState.currentTime) {
                this.internalState.currentTime = time;
                this.remoteControl("seek", time);
              }
            }),
            setMuted: (muted) => __awaiter$p(this, void 0, void 0, function* () {
              this.internalState.muted = muted;
              this.remoteControl("muted", muted);
            }),
            setVolume: (volume) => __awaiter$p(this, void 0, void 0, function* () {
              this.internalState.volume = volume / 100;
              this.dispatch("volume", volume);
              this.remoteControl("volume", volume / 100);
            }),
            canSetPlaybackQuality: () => __awaiter$p(this, void 0, void 0, function* () {
              return true;
            }),
            setPlaybackQuality: (quality) => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl("quality", quality.slice(0, -1));
            }),
            canSetFullscreen: () => __awaiter$p(this, void 0, void 0, function* () {
              return true;
            }),
            enterFullscreen: () => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl("fullscreen", true);
            }),
            exitFullscreen: () => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl("fullscreen", false);
            })
          };
        });
      }
      render() {
        return h("vm-embed", { embedSrc: this.embedSrc, mediaTitle: this.mediaTitle, origin: this.getOrigin(), params: this.buildParams(), decoder: decodeQueryString, preconnections: this.getPreconnections(), onVmEmbedMessage: this.onEmbedMessage.bind(this), onVmEmbedSrcChange: this.onEmbedSrcChange.bind(this), ref: (el) => {
          this.embed = el;
        } });
      }
      static get watchers() {
        return {
          "videoId": ["onVideoIdChange"],
          "controls": ["onControlsChange"],
          "poster": ["onCustomPosterChange"]
        };
      }
      static get style() {
        return dailymotionCss;
      }
    };
    dashCss = ":host{z-index:var(--vm-media-z-index)}";
    __awaiter$o = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Dash = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.textTracksDisposal = new Disposal();
        this.hasAttached = false;
        this.version = "latest";
        this.config = {};
        this.autoplay = false;
        this.preload = "metadata";
        this.enableTextTracksByDefault = true;
        this.shouldRenderNativeTextTracks = true;
        this.isTextTrackVisible = true;
        this.currentTextTrack = -1;
        withComponentRegistry(this);
        withProviderConnect(this);
        withPlayerContext(this, [
          "autoplay",
          "shouldRenderNativeTextTracks",
          "isTextTrackVisible",
          "currentTextTrack"
        ]);
      }
      onSrcChange() {
        var _a2;
        if (!this.hasAttached)
          return;
        this.vmLoadStart.emit();
        (_a2 = this.dash) === null || _a2 === void 0 ? void 0 : _a2.attachSource(this.src);
      }
      onShouldRenderNativeTextTracks() {
        var _a2;
        if (this.shouldRenderNativeTextTracks) {
          this.textTracksDisposal.empty();
        } else {
          this.hideCurrentTextTrack();
        }
        (_a2 = this.dash) === null || _a2 === void 0 ? void 0 : _a2.enableForcedTextStreaming(!this.shouldRenderNativeTextTracks);
      }
      onTextTrackChange() {
        var _a2, _b2;
        if (!this.shouldRenderNativeTextTracks || isUndefined(this.dash))
          return;
        this.dash.setTextTrack(!this.isTextTrackVisible ? -1 : this.currentTextTrack);
        if (!this.isTextTrackVisible) {
          const track = Array.from((_b2 = (_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.textTracks) !== null && _b2 !== void 0 ? _b2 : [])[this.currentTextTrack];
          if ((track === null || track === void 0 ? void 0 : track.mode) === "hidden")
            this.dispatch("currentTextTrack", -1);
        }
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        if (this.mediaEl)
          this.setupDash();
      }
      disconnectedCallback() {
        this.textTracksDisposal.empty();
        this.destroyDash();
      }
      setupDash() {
        return __awaiter$o(this, void 0, void 0, function* () {
          try {
            const url = this.libSrc || `https://cdn.jsdelivr.net/npm/dashjs@${this.version}/dist/dash.all.min.js`;
            const DashSDK = yield loadSDK(url, "dashjs");
            this.dash = DashSDK.MediaPlayer(this.config).create();
            this.dash.initialize(this.mediaEl, null, this.autoplay);
            this.dash.setTextDefaultEnabled(this.enableTextTracksByDefault);
            this.dash.enableForcedTextStreaming(!this.shouldRenderNativeTextTracks);
            this.dash.on(DashSDK.MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
              this.dispatch("mediaType", MediaType.Video);
              this.dispatch("currentSrc", this.src);
              this.dispatchLevels();
              this.listenToTextTracksForChanges();
              this.dispatch("playbackReady", true);
            });
            this.dash.on(DashSDK.MediaPlayer.events.TRACK_CHANGE_RENDERED, () => {
              if (!this.shouldRenderNativeTextTracks)
                this.hideCurrentTextTrack();
            });
            this.dash.on(DashSDK.MediaPlayer.events.ERROR, (e) => {
              this.vmError.emit(e);
            });
            this.hasAttached = true;
          } catch (e) {
            this.vmError.emit(e);
          }
        });
      }
      destroyDash() {
        var _a2;
        return __awaiter$o(this, void 0, void 0, function* () {
          (_a2 = this.dash) === null || _a2 === void 0 ? void 0 : _a2.reset();
          this.hasAttached = false;
        });
      }
      onMediaElChange(event) {
        return __awaiter$o(this, void 0, void 0, function* () {
          this.destroyDash();
          if (isUndefined(event.detail))
            return;
          this.mediaEl = event.detail;
          yield this.setupDash();
        });
      }
      levelToPlaybackQuality(level) {
        return level === -1 ? "Auto" : `${level.height}p`;
      }
      findLevelIndexFromQuality(quality) {
        return this.dash.getBitrateInfoListFor("video").findIndex((level) => this.levelToPlaybackQuality(level) === quality);
      }
      dispatchLevels() {
        try {
          const levels = this.dash.getBitrateInfoListFor("video");
          if ((levels === null || levels === void 0 ? void 0 : levels.length) > 0) {
            this.dispatch("playbackQualities", [
              "Auto",
              ...levels.map(this.levelToPlaybackQuality)
            ]);
            this.dispatch("playbackQuality", "Auto");
          }
        } catch (e) {
          this.vmError.emit(e);
        }
      }
      listenToTextTracksForChanges() {
        var _a2, _b2, _c;
        this.textTracksDisposal.empty();
        if (isUndefined(this.mediaEl) || this.shouldRenderNativeTextTracks)
          return;
        const currentTrack = (_c = ((_b2 = (_a2 = this.dash) === null || _a2 === void 0 ? void 0 : _a2.getCurrentTrackFor("text")) === null || _b2 === void 0 ? void 0 : _b2.index) - 1) !== null && _c !== void 0 ? _c : -1;
        this.currentTextTrack = currentTrack;
        this.dispatch("currentTextTrack", currentTrack);
        this.textTracksDisposal.add(listen(this.mediaEl.textTracks, "change", this.onTextTracksChange.bind(this)));
      }
      getTextTracks() {
        var _a2, _b2;
        return Array.from((_b2 = (_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.textTracks) !== null && _b2 !== void 0 ? _b2 : []);
      }
      hideCurrentTextTrack() {
        const textTracks = this.getTextTracks();
        if (textTracks[this.currentTextTrack] && this.isTextTrackVisible) {
          textTracks[this.currentTextTrack].mode = "hidden";
        }
      }
      onTextTracksChange() {
        this.hideCurrentTextTrack();
        this.dispatch("textTracks", this.getTextTracks());
        this.dispatch("isTextTrackVisible", this.isTextTrackVisible);
        this.dispatch("currentTextTrack", this.currentTextTrack);
      }
      /** @internal */
      getAdapter() {
        var _a2, _b2;
        return __awaiter$o(this, void 0, void 0, function* () {
          const adapter = (_b2 = yield (_a2 = this.videoProvider) === null || _a2 === void 0 ? void 0 : _a2.getAdapter()) !== null && _b2 !== void 0 ? _b2 : {};
          const canVideoProviderPlay = adapter.canPlay;
          return Object.assign(Object.assign({}, adapter), { getInternalPlayer: () => __awaiter$o(this, void 0, void 0, function* () {
            return this.dash;
          }), canPlay: (type) => __awaiter$o(this, void 0, void 0, function* () {
            var _c;
            return isString(type) && dashRegex.test(type) || ((_c = canVideoProviderPlay === null || canVideoProviderPlay === void 0 ? void 0 : canVideoProviderPlay(type)) !== null && _c !== void 0 ? _c : false);
          }), canSetPlaybackQuality: () => __awaiter$o(this, void 0, void 0, function* () {
            var _d, _e;
            try {
              return ((_e = (_d = this.dash) === null || _d === void 0 ? void 0 : _d.getBitrateInfoListFor("video")) === null || _e === void 0 ? void 0 : _e.length) > 0;
            } catch (e) {
              this.vmError.emit(e);
              return false;
            }
          }), setPlaybackQuality: (quality) => __awaiter$o(this, void 0, void 0, function* () {
            if (!isUndefined(this.dash)) {
              const index10 = this.findLevelIndexFromQuality(quality);
              this.dash.updateSettings({
                streaming: {
                  abr: {
                    autoSwitchBitrate: {
                      video: index10 === -1
                    }
                  }
                }
              });
              if (index10 >= 0)
                this.dash.setQualityFor("video", index10);
              this.dispatch("playbackQuality", quality);
            }
          }), setCurrentTextTrack: (trackId) => __awaiter$o(this, void 0, void 0, function* () {
            var _f;
            if (this.shouldRenderNativeTextTracks) {
              adapter.setCurrentTextTrack(trackId);
            } else {
              this.currentTextTrack = trackId;
              (_f = this.dash) === null || _f === void 0 ? void 0 : _f.setTextTrack(trackId);
              this.onTextTracksChange();
            }
          }), setTextTrackVisibility: (isVisible) => __awaiter$o(this, void 0, void 0, function* () {
            var _g;
            if (this.shouldRenderNativeTextTracks) {
              adapter.setTextTrackVisibility(isVisible);
            } else {
              this.isTextTrackVisible = isVisible;
              (_g = this.dash) === null || _g === void 0 ? void 0 : _g.enableText(isVisible);
              this.onTextTracksChange();
            }
          }) });
        });
      }
      render() {
        return h("vm-video", { willAttach: true, crossOrigin: this.crossOrigin, preload: this.preload, poster: this.poster, controlsList: this.controlsList, autoPiP: this.autoPiP, disablePiP: this.disablePiP, hasCustomTextManager: !this.shouldRenderNativeTextTracks, disableRemotePlayback: this.disableRemotePlayback, mediaTitle: this.mediaTitle, ref: (el) => {
          this.videoProvider = el;
        } });
      }
      static get watchers() {
        return {
          "src": ["onSrcChange"],
          "hasAttached": ["onSrcChange"],
          "shouldRenderNativeTextTracks": ["onShouldRenderNativeTextTracks"],
          "isTextTrackVisible": ["onTextTrackChange"],
          "currentTextTrack": ["onTextTrackChange"]
        };
      }
      static get style() {
        return dashCss;
      }
    };
    dblClickFullscreenCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-dbl-click-fullscreen-z-index)}.dblClickFullscreen{display:none;width:100%;height:100%;pointer-events:none}.dblClickFullscreen.enabled{display:inline-block;pointer-events:auto}";
    __awaiter$n = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    DblClickFullscreen = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.canSetFullscreen = false;
        this.useOnMobile = false;
        this.isFullscreenActive = true;
        this.isVideoView = false;
        this.playbackReady = false;
        this.isMobile = false;
        this.clicks = 0;
        withComponentRegistry(this);
        withPlayerContext(this, [
          "playbackReady",
          "isFullscreenActive",
          "isVideoView",
          "isMobile"
        ]);
      }
      onPlaybackReadyChange() {
        return __awaiter$n(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          this.canSetFullscreen = yield player.canSetFullscreen();
        });
      }
      onTriggerClickToPlay() {
        return __awaiter$n(this, void 0, void 0, function* () {
          const [clickToPlay] = getComponentFromRegistry(this, "vm-click-to-play");
          yield clickToPlay === null || clickToPlay === void 0 ? void 0 : clickToPlay.forceClick();
        });
      }
      onToggleFullscreen() {
        return __awaiter$n(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          this.isFullscreenActive ? player.exitFullscreen() : player.enterFullscreen();
        });
      }
      onClick() {
        this.clicks += 1;
        if (this.clicks === 1) {
          setTimeout(() => {
            if (this.clicks === 1) {
              this.onTriggerClickToPlay();
            } else {
              this.onToggleFullscreen();
            }
            this.clicks = 0;
          }, 300);
        }
      }
      render() {
        return h("div", { class: {
          dblClickFullscreen: true,
          enabled: this.playbackReady && this.canSetFullscreen && this.isVideoView && (!this.isMobile || this.useOnMobile)
        }, onClick: this.onClick.bind(this) });
      }
      static get watchers() {
        return {
          "playbackReady": ["onPlaybackReadyChange"]
        };
      }
      static get style() {
        return dblClickFullscreenCss;
      }
    };
    defaultControlsCss = ":host{display:contents;pointer-events:none;z-index:var(--vm-controls-z-index)}";
    DefaultControls = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.activeDuration = 2750;
        this.waitForPlaybackStart = false;
        this.hideWhenPaused = false;
        this.hideOnMouseLeave = false;
        this.isMobile = false;
        this.isLive = false;
        this.isAudioView = false;
        this.isVideoView = false;
        withComponentRegistry(this);
        withPlayerContext(this, [
          "theme",
          "isMobile",
          "isAudioView",
          "isVideoView",
          "isLive"
        ]);
      }
      buildAudioControls() {
        return h("vm-controls", { fullWidth: true }, h("vm-playback-control", { tooltipDirection: "right" }), h("vm-volume-control", null), !this.isLive && h("vm-current-time", null), this.isLive && h("vm-control-spacer", null), !this.isLive && h("vm-scrubber-control", null), this.isLive && h("vm-live-indicator", null), !this.isLive && h("vm-end-time", null), !this.isLive && h("vm-settings-control", { tooltipDirection: "left" }), h("div", { style: { marginLeft: "0", paddingRight: "2px" } }));
      }
      buildMobileVideoControls() {
        return h(Fragment, null, h("vm-scrim", { gradient: "up" }), h("vm-controls", { pin: "topLeft", fullWidth: true, activeDuration: this.activeDuration, waitForPlaybackStart: this.waitForPlaybackStart, hideWhenPaused: this.hideWhenPaused }, h("vm-control-spacer", null), h("vm-volume-control", null), !this.isLive && h("vm-caption-control", null), !this.isLive && h("vm-settings-control", null), this.isLive && h("vm-fullscreen-control", null)), h("vm-controls", { pin: "center", justify: "center", activeDuration: this.activeDuration, waitForPlaybackStart: this.waitForPlaybackStart, hideWhenPaused: this.hideWhenPaused }, h("vm-playback-control", { style: { "--vm-control-scale": "1.3" } })), !this.isLive && h("vm-controls", { pin: "bottomLeft", fullWidth: true, activeDuration: this.activeDuration, waitForPlaybackStart: this.waitForPlaybackStart, hideWhenPaused: this.hideWhenPaused }, h("vm-control-group", null, h("vm-current-time", null), h("vm-control-spacer", null), h("vm-end-time", null), h("vm-fullscreen-control", null)), h("vm-control-group", { space: "top" }, h("vm-scrubber-control", null))));
      }
      buildDesktopVideoControls() {
        return h(Fragment, null, this.theme !== "light" && h("vm-scrim", { gradient: "up" }), h("vm-controls", { fullWidth: true, pin: "bottomRight", activeDuration: this.activeDuration, waitForPlaybackStart: this.waitForPlaybackStart, hideWhenPaused: this.hideWhenPaused, hideOnMouseLeave: this.hideOnMouseLeave }, !this.isLive && h("vm-control-group", null, h("vm-scrubber-control", null)), h("vm-control-group", { space: this.isLive ? "none" : "top" }, h("vm-playback-control", { tooltipDirection: "right" }), h("vm-volume-control", null), !this.isLive && h("vm-time-progress", null), h("vm-control-spacer", null), !this.isLive && h("vm-caption-control", null), this.isLive && h("vm-live-indicator", null), h("vm-pip-control", null), !this.isLive && h("vm-settings-control", null), h("vm-fullscreen-control", { tooltipDirection: "left" }))));
      }
      render() {
        if (this.isAudioView)
          return this.buildAudioControls();
        if (this.isVideoView && this.isMobile)
          return this.buildMobileVideoControls();
        if (this.isVideoView)
          return this.buildDesktopVideoControls();
        return null;
      }
      static get style() {
        return defaultControlsCss;
      }
    };
    defaultSettingsCss = ":host{z-index:var(--vm-menu-z-index)}";
    __awaiter$m = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    DefaultSettings = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.textTracksDisposal = new Disposal();
        this.canSetPlaybackRate = false;
        this.canSetPlaybackQuality = false;
        this.canSetTextTrack = false;
        this.canSetAudioTrack = false;
        this.pin = "bottomRight";
        this.i18n = {};
        this.playbackReady = false;
        this.playbackRate = 1;
        this.playbackRates = [1];
        this.isVideoView = false;
        this.playbackQualities = [];
        this.textTracks = [];
        this.currentTextTrack = -1;
        this.audioTracks = [];
        this.currentAudioTrack = -1;
        this.isTextTrackVisible = true;
        withComponentRegistry(this);
        withPlayerContext(this, [
          "i18n",
          "playbackReady",
          "playbackRate",
          "playbackRates",
          "playbackQuality",
          "playbackQualities",
          "isVideoView",
          "textTracks",
          "currentTextTrack",
          "isTextTrackVisible",
          "audioTracks",
          "currentAudioTrack"
        ]);
      }
      onPlaybackReady() {
        return __awaiter$m(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          this.canSetPlaybackQuality = yield player.canSetPlaybackQuality();
          this.canSetPlaybackRate = yield player.canSetPlaybackRate();
        });
      }
      onAudioTracksChange() {
        var _a2;
        return __awaiter$m(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canSetAudioTrack = (_a2 = yield player === null || player === void 0 ? void 0 : player.canSetAudioTrack()) !== null && _a2 !== void 0 ? _a2 : false;
        });
      }
      onTextTracksChange() {
        var _a2;
        return __awaiter$m(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canSetTextTrack = (_a2 = yield player === null || player === void 0 ? void 0 : player.canSetTextTrack()) !== null && _a2 !== void 0 ? _a2 : false;
        });
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
      }
      componentDidLoad() {
        this.onTextTracksChange();
      }
      disconnectedCallback() {
        this.textTracksDisposal.empty();
      }
      onPlaybackRateSelect(event) {
        const radio = event.target;
        this.dispatch("playbackRate", parseFloat(radio.value));
      }
      buildPlaybackRateSubmenu() {
        if (this.playbackRates.length <= 1 || !this.canSetPlaybackRate) {
          return h("vm-menu-item", { label: this.i18n.playbackRate, hint: this.i18n.normal });
        }
        const formatRate = (rate) => rate === 1 ? this.i18n.normal : `${rate}`;
        return h("vm-submenu", { label: this.i18n.playbackRate, hint: formatRate(this.playbackRate) }, h("vm-menu-radio-group", { value: `${this.playbackRate}`, onVmCheck: this.onPlaybackRateSelect.bind(this) }, this.playbackRates.map((rate) => h("vm-menu-radio", { label: formatRate(rate), value: `${rate}` }))));
      }
      onPlaybackQualitySelect(event) {
        const radio = event.target;
        this.dispatch("playbackQuality", radio.value);
      }
      buildPlaybackQualitySubmenu() {
        var _a2;
        if (this.playbackQualities.length <= 1 || !this.canSetPlaybackQuality) {
          return h("vm-menu-item", { label: this.i18n.playbackQuality, hint: (_a2 = this.playbackQuality) !== null && _a2 !== void 0 ? _a2 : this.i18n.auto });
        }
        const getBadge = (quality) => {
          const verticalPixels = parseInt(quality.slice(0, -1), 10);
          if (verticalPixels >= 2160)
            return "UHD";
          if (verticalPixels >= 1080)
            return "HD";
          return void 0;
        };
        return h("vm-submenu", { label: this.i18n.playbackQuality, hint: this.playbackQuality }, h("vm-menu-radio-group", { value: this.playbackQuality, onVmCheck: this.onPlaybackQualitySelect.bind(this) }, this.playbackQualities.map((quality) => h("vm-menu-radio", { label: quality, value: quality, badge: getBadge(quality) }))));
      }
      onTextTrackSelect(event) {
        const radio = event.target;
        const trackId = parseInt(radio.value, 10);
        const player = getPlayerFromRegistry(this);
        if (trackId === -1) {
          player === null || player === void 0 ? void 0 : player.setTextTrackVisibility(false);
          return;
        }
        player === null || player === void 0 ? void 0 : player.setTextTrackVisibility(true);
        player === null || player === void 0 ? void 0 : player.setCurrentTextTrack(trackId);
      }
      buildTextTracksSubmenu() {
        var _a2, _b2, _c;
        if (this.textTracks.length <= 1 || !this.canSetTextTrack) {
          return h("vm-menu-item", { label: this.i18n.subtitlesOrCc, hint: (_b2 = (_a2 = this.textTracks[this.currentTextTrack]) === null || _a2 === void 0 ? void 0 : _a2.label) !== null && _b2 !== void 0 ? _b2 : this.i18n.none });
        }
        return h("vm-submenu", { label: this.i18n.subtitlesOrCc, hint: this.isTextTrackVisible ? (_c = this.textTracks[this.currentTextTrack]) === null || _c === void 0 ? void 0 : _c.label : this.i18n.off }, h("vm-menu-radio-group", { value: `${!this.isTextTrackVisible ? -1 : this.currentTextTrack}`, onVmCheck: this.onTextTrackSelect.bind(this) }, [h("vm-menu-radio", { label: this.i18n.off, value: "-1" })].concat(this.textTracks.map((track, i2) => h("vm-menu-radio", { label: track.label, value: `${i2}` })))));
      }
      onAudioTrackSelect(event) {
        const radio = event.target;
        const trackId = parseInt(radio.value, 10);
        const player = getPlayerFromRegistry(this);
        player === null || player === void 0 ? void 0 : player.setCurrentAudioTrack(trackId);
      }
      buildAudioTracksMenu() {
        var _a2, _b2, _c;
        if (this.audioTracks.length <= 1 || !this.canSetAudioTrack) {
          return h("vm-menu-item", { label: this.i18n.audio, hint: (_b2 = (_a2 = this.audioTracks[this.currentAudioTrack]) === null || _a2 === void 0 ? void 0 : _a2.label) !== null && _b2 !== void 0 ? _b2 : this.i18n.default });
        }
        return h("vm-submenu", { label: this.i18n.audio, hint: (_c = this.audioTracks[this.currentAudioTrack]) === null || _c === void 0 ? void 0 : _c.label }, h("vm-menu-radio-group", { value: `${this.currentAudioTrack}`, onVmCheck: this.onAudioTrackSelect.bind(this) }, this.audioTracks.map((track, i2) => h("vm-menu-radio", { label: track.label, value: `${i2}` }))));
      }
      render() {
        return h("vm-settings", { pin: this.pin }, this.buildAudioTracksMenu(), this.buildPlaybackRateSubmenu(), this.buildPlaybackQualitySubmenu(), this.isVideoView && this.buildTextTracksSubmenu(), h("slot", null));
      }
      static get watchers() {
        return {
          "playbackReady": ["onPlaybackReady", "onAudioTracksChange", "onTextTracksChange"],
          "audioTracks": ["onAudioTracksChange"],
          "textTracks": ["onTextTracksChange"]
        };
      }
      static get style() {
        return defaultSettingsCss;
      }
    };
    defaultUiCss = ":host{display:contents;pointer-events:none}";
    DefaultUI = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.noClickToPlay = false;
        this.noDblClickFullscreen = false;
        this.noCaptions = false;
        this.noPoster = false;
        this.noSpinner = false;
        this.noControls = false;
        this.noSettings = false;
        this.noLoadingScreen = false;
        withComponentRegistry(this);
      }
      render() {
        return h("vm-ui", null, !this.noClickToPlay && h("vm-click-to-play", null), !this.noDblClickFullscreen && h("vm-dbl-click-fullscreen", null), !this.noCaptions && h("vm-captions", null), !this.noPoster && h("vm-poster", null), !this.noSpinner && h("vm-spinner", null), !this.noLoadingScreen && h("vm-loading-screen", null), !this.noControls && h("vm-default-controls", null), !this.noSettings && h("vm-default-settings", null), h("slot", null));
      }
      static get style() {
        return defaultUiCss;
      }
    };
    LazyLoader = class {
      constructor(el, attributes, onLoad) {
        var _a2;
        this.el = el;
        this.attributes = attributes;
        this.onLoad = onLoad;
        this.hasLoaded = false;
        if (isNil(this.el))
          return;
        this.intersectionObs = this.canObserveIntersection() ? new IntersectionObserver(this.onIntersection.bind(this)) : void 0;
        this.mutationObs = this.canObserveMutations() ? new MutationObserver(this.onMutation.bind(this)) : void 0;
        (_a2 = this.mutationObs) === null || _a2 === void 0 ? void 0 : _a2.observe(this.el, {
          childList: true,
          subtree: true,
          attributeFilter: this.attributes
        });
        this.lazyLoad();
      }
      didLoad() {
        return this.hasLoaded;
      }
      destroy() {
        var _a2, _b2;
        (_a2 = this.intersectionObs) === null || _a2 === void 0 ? void 0 : _a2.disconnect();
        (_b2 = this.mutationObs) === null || _b2 === void 0 ? void 0 : _b2.disconnect();
      }
      canObserveIntersection() {
        return IS_CLIENT && window.IntersectionObserver;
      }
      canObserveMutations() {
        return IS_CLIENT && window.MutationObserver;
      }
      lazyLoad() {
        var _a2;
        if (this.canObserveIntersection()) {
          (_a2 = this.intersectionObs) === null || _a2 === void 0 ? void 0 : _a2.observe(this.el);
        } else {
          this.load();
        }
      }
      onIntersection(entries) {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            this.load();
            this.intersectionObs.unobserve(entry.target);
          }
        });
      }
      onMutation() {
        if (this.hasLoaded)
          this.load();
      }
      getLazyElements() {
        const root = !isNil(this.el.shadowRoot) ? this.el.shadowRoot : this.el;
        return root.querySelectorAll(".lazy");
      }
      load() {
        window.requestAnimationFrame(() => {
          this.getLazyElements().forEach(this.loadEl.bind(this));
        });
      }
      loadEl(el) {
        var _a2, _b2;
        (_a2 = this.intersectionObs) === null || _a2 === void 0 ? void 0 : _a2.unobserve(el);
        this.hasLoaded = true;
        (_b2 = this.onLoad) === null || _b2 === void 0 ? void 0 : _b2.call(this, el);
      }
    };
    embedCss = ":host{z-index:var(--vm-media-z-index)}iframe{position:absolute;top:0;left:0;border:0;width:100%;height:100%;user-select:none}";
    __awaiter$l = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    idCount$4 = 0;
    connected = /* @__PURE__ */ new Set();
    Embed = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmEmbedSrcChange = createEvent(this, "vmEmbedSrcChange", 3);
        this.vmEmbedMessage = createEvent(this, "vmEmbedMessage", 3);
        this.vmEmbedLoaded = createEvent(this, "vmEmbedLoaded", 3);
        this.srcWithParams = "";
        this.hasEnteredViewport = false;
        this.embedSrc = "";
        this.mediaTitle = "";
        this.params = "";
        this.preconnections = [];
        withComponentRegistry(this);
      }
      onEmbedSrcChange() {
        this.srcWithParams = isString(this.embedSrc) && this.embedSrc.length > 0 ? appendParamsToURL(this.embedSrc, this.params) : void 0;
      }
      srcWithParamsChange() {
        if (isUndefined(this.srcWithParams)) {
          this.vmEmbedSrcChange.emit(this.srcWithParams);
          return;
        }
        if (!this.hasEnteredViewport && !connected.has(this.embedSrc)) {
          if (preconnect(this.srcWithParams))
            connected.add(this.embedSrc);
        }
        this.vmEmbedSrcChange.emit(this.srcWithParams);
      }
      preconnectionsChange() {
        if (this.hasEnteredViewport) {
          return;
        }
        this.preconnections.filter((connection) => !connected.has(connection)).forEach((connection) => {
          if (preconnect(connection))
            connected.add(connection);
        });
      }
      connectedCallback() {
        this.lazyLoader = new LazyLoader(this.host, ["data-src"], (el) => {
          const src = el.getAttribute("data-src");
          el.removeAttribute("src");
          if (!isNull(src))
            el.setAttribute("src", src);
        });
        this.onEmbedSrcChange();
        this.genIframeId();
      }
      disconnectedCallback() {
        this.lazyLoader.destroy();
      }
      onWindowMessage(e) {
        var _a2, _b2, _c;
        const originMatches = e.source === ((_a2 = this.iframe) === null || _a2 === void 0 ? void 0 : _a2.contentWindow) && (!isString(this.origin) || this.origin === e.origin);
        if (!originMatches)
          return;
        const message = (_c = (_b2 = this.decoder) === null || _b2 === void 0 ? void 0 : _b2.call(this, e.data)) !== null && _c !== void 0 ? _c : e.data;
        if (message)
          this.vmEmbedMessage.emit(message);
      }
      /**
       * Posts a message to the embedded media player.
       */
      postMessage(message, target) {
        var _a2, _b2;
        return __awaiter$l(this, void 0, void 0, function* () {
          (_b2 = (_a2 = this.iframe) === null || _a2 === void 0 ? void 0 : _a2.contentWindow) === null || _b2 === void 0 ? void 0 : _b2.postMessage(JSON.stringify(message), target !== null && target !== void 0 ? target : "*");
        });
      }
      onLoad() {
        this.vmEmbedLoaded.emit();
      }
      genIframeId() {
        idCount$4 += 1;
        this.id = `vm-iframe-${idCount$4}`;
      }
      render() {
        return h("iframe", { id: this.id, class: "lazy", title: this.mediaTitle, "data-src": this.srcWithParams, allowFullScreen: true, allow: "autoplay; encrypted-media; picture-in-picture;", onLoad: this.onLoad.bind(this), ref: (el) => {
          this.iframe = el;
        } });
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "embedSrc": ["onEmbedSrcChange"],
          "params": ["onEmbedSrcChange"],
          "srcWithParams": ["srcWithParamsChange"],
          "preconnections": ["preconnectionsChange"]
        };
      }
      static get style() {
        return embedCss;
      }
    };
    endTimeCss = ":host{display:flex;align-items:center;justify-content:center}";
    EndTime = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.duration = -1;
        this.i18n = {};
        this.alwaysShowHours = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["duration", "i18n"]);
      }
      render() {
        return h("vm-time", { label: this.i18n.duration, seconds: Math.max(0, this.duration), alwaysShowHours: this.alwaysShowHours });
      }
      static get style() {
        return endTimeCss;
      }
    };
    key2 = {
      fullscreenEnabled: 0,
      fullscreenElement: 1,
      requestFullscreen: 2,
      exitFullscreen: 3,
      fullscreenchange: 4,
      fullscreenerror: 5,
      fullscreen: 6
    };
    webkit = [
      "webkitFullscreenEnabled",
      "webkitFullscreenElement",
      "webkitRequestFullscreen",
      "webkitExitFullscreen",
      "webkitfullscreenchange",
      "webkitfullscreenerror",
      "-webkit-full-screen"
    ];
    moz = [
      "mozFullScreenEnabled",
      "mozFullScreenElement",
      "mozRequestFullScreen",
      "mozCancelFullScreen",
      "mozfullscreenchange",
      "mozfullscreenerror",
      "-moz-full-screen"
    ];
    ms = [
      "msFullscreenEnabled",
      "msFullscreenElement",
      "msRequestFullscreen",
      "msExitFullscreen",
      "MSFullscreenChange",
      "MSFullscreenError",
      "-ms-fullscreen"
    ];
    document$1 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
    vendor = "fullscreenEnabled" in document$1 && Object.keys(key2) || webkit[0] in document$1 && webkit || moz[0] in document$1 && moz || ms[0] in document$1 && ms || [];
    fscreen = {
      requestFullscreen: function(element) {
        return element[vendor[key2.requestFullscreen]]();
      },
      requestFullscreenFunction: function(element) {
        return element[vendor[key2.requestFullscreen]];
      },
      get exitFullscreen() {
        return document$1[vendor[key2.exitFullscreen]].bind(document$1);
      },
      get fullscreenPseudoClass() {
        return ":" + vendor[key2.fullscreen];
      },
      addEventListener: function(type, handler, options2) {
        return document$1.addEventListener(vendor[key2[type]], handler, options2);
      },
      removeEventListener: function(type, handler, options2) {
        return document$1.removeEventListener(vendor[key2[type]], handler, options2);
      },
      get fullscreenEnabled() {
        return Boolean(document$1[vendor[key2.fullscreenEnabled]]);
      },
      set fullscreenEnabled(val) {
      },
      get fullscreenElement() {
        return document$1[vendor[key2.fullscreenElement]];
      },
      set fullscreenElement(val) {
      },
      get onfullscreenchange() {
        return document$1[("on" + vendor[key2.fullscreenchange]).toLowerCase()];
      },
      set onfullscreenchange(handler) {
        return document$1[("on" + vendor[key2.fullscreenchange]).toLowerCase()] = handler;
      },
      get onfullscreenerror() {
        return document$1[("on" + vendor[key2.fullscreenerror]).toLowerCase()];
      },
      set onfullscreenerror(handler) {
        return document$1[("on" + vendor[key2.fullscreenerror]).toLowerCase()] = handler;
      }
    };
    __awaiter$k = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    FullscreenController = class {
      constructor(host) {
        this.host = host;
        this.disposal = new Disposal();
        this.emitter = mitt();
      }
      /**
       * Whether fullscreen mode can be requested, generally is an API available to do so.
       */
      get isSupported() {
        return this.isSupportedNatively;
      }
      /**
       * Whether the native Fullscreen API is enabled/available.
       */
      get isSupportedNatively() {
        return fscreen.fullscreenEnabled;
      }
      /**
       * Whether the host element is in fullscreen mode.
       */
      get isFullscreen() {
        return this.isNativeFullscreen;
      }
      /**
       * Whether the host element is in fullscreen mode via the native Fullscreen API.
       */
      get isNativeFullscreen() {
        if (fscreen.fullscreenElement === this.host)
          return true;
        try {
          return this.host.matches(
            // Property `fullscreenPseudoClass` is missing from `@types/fscreen`.
            fscreen.fullscreenPseudoClass
          );
        } catch (error2) {
          return false;
        }
      }
      on(type, handler) {
        this.emitter.on(type, handler);
      }
      off(type, handler) {
        this.emitter.off(type, handler);
      }
      /**
       * Dispose of any event listeners and exit fullscreen (if active).
       */
      destroy() {
        return __awaiter$k(this, void 0, void 0, function* () {
          if (this.isFullscreen)
            yield this.exitFullscreen();
          this.disposal.empty();
          this.emitter.all.clear();
        });
      }
      addFullscreenChangeEventListener(handler) {
        if (!this.isSupported)
          return noop2;
        return listen(fscreen, "fullscreenchange", handler);
      }
      addFullscreenErrorEventListener(handler) {
        if (!this.isSupported)
          return noop2;
        return listen(fscreen, "fullscreenerror", handler);
      }
      requestFullscreen() {
        return __awaiter$k(this, void 0, void 0, function* () {
          if (this.isFullscreen)
            return;
          this.throwIfNoFullscreenSupport();
          this.disposal.add(this.addFullscreenChangeEventListener(this.handleFullscreenChange.bind(this)));
          this.disposal.add(this.addFullscreenErrorEventListener(this.handleFullscreenError.bind(this)));
          return this.makeEnterFullscreenRequest();
        });
      }
      makeEnterFullscreenRequest() {
        return __awaiter$k(this, void 0, void 0, function* () {
          return fscreen.requestFullscreen(this.host);
        });
      }
      handleFullscreenChange() {
        if (!this.isFullscreen)
          this.disposal.empty();
        this.emitter.emit("change", this.isFullscreen);
      }
      handleFullscreenError(event) {
        this.emitter.emit("error", event);
      }
      exitFullscreen() {
        return __awaiter$k(this, void 0, void 0, function* () {
          if (!this.isFullscreen)
            return;
          this.throwIfNoFullscreenSupport();
          return this.makeExitFullscreenRequest();
        });
      }
      makeExitFullscreenRequest() {
        return __awaiter$k(this, void 0, void 0, function* () {
          return fscreen.exitFullscreen();
        });
      }
      throwIfNoFullscreenSupport() {
        if (this.isSupported)
          return;
        throw Error("Fullscreen API is not enabled or supported in this environment.");
      }
    };
    __awaiter$j = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    VideoFullscreenController = class extends FullscreenController {
      constructor(host, presentationController) {
        super(host);
        this.host = host;
        this.presentationController = presentationController;
      }
      get isFullscreen() {
        return this.presentationController.isFullscreenMode;
      }
      /**
       * Whether a fallback fullscreen API is available on Safari using presentation modes. This
       * is only used on iOS where the native fullscreen API is not available.
       *
       * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode
       */
      get isSupported() {
        return this.presentationController.isSupported;
      }
      makeEnterFullscreenRequest() {
        return __awaiter$j(this, void 0, void 0, function* () {
          return this.presentationController.setPresentationMode("fullscreen");
        });
      }
      makeExitFullscreenRequest() {
        return __awaiter$j(this, void 0, void 0, function* () {
          return this.presentationController.setPresentationMode("inline");
        });
      }
      addFullscreenChangeEventListener() {
        if (!this.isSupported)
          return noop2;
        this.presentationController.on("change", this.handlePresentationModeChange.bind(this));
        return () => {
          this.presentationController.off("change", this.handlePresentationModeChange.bind(this));
        };
      }
      handlePresentationModeChange() {
        this.handleFullscreenChange();
      }
      addFullscreenErrorEventListener() {
        return noop2;
      }
    };
    __awaiter$i = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    VideoPresentationController = class {
      constructor(host) {
        this.host = host;
        this.disposal = new Disposal();
        this.emitter = mitt();
        const disconnectedCallback2 = host.disconnectedCallback;
        host.disconnectedCallback = () => __awaiter$i(this, void 0, void 0, function* () {
          yield this.destroy();
          disconnectedCallback2 === null || disconnectedCallback2 === void 0 ? void 0 : disconnectedCallback2.call(host);
        });
      }
      get videoElement() {
        var _a2;
        if (((_a2 = this.host.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.tagName.toLowerCase()) === "video") {
          return this.host.mediaEl;
        }
        return void 0;
      }
      /**
       * The current presentation mode, possible values include `inline`, `picture-in-picture` and
       * `fullscreen`. Only available in Safari.
       *
       * @default undefined
       * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode
       */
      get presentationMode() {
        var _a2;
        return (_a2 = this.videoElement) === null || _a2 === void 0 ? void 0 : _a2.webkitPresentationMode;
      }
      /**
       * Whether the current `presentationMode` is `inline`.
       */
      get isInlineMode() {
        return this.presentationMode === "inline";
      }
      /**
       * Whether the current `presentationMode` is `picture-in-picture`.
       */
      get isPictureInPictureMode() {
        return this.presentationMode === "inline";
      }
      /**
       * Whether the current `presentationMode` is `fullscreen`.
       */
      get isFullscreenMode() {
        return this.presentationMode === "fullscreen";
      }
      /**
       * Whether the presentation mode API is available.
       *
       * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1628805-webkitsupportsfullscreen
       */
      get isSupported() {
        var _a2, _b2, _c;
        return IS_IOS && isFunction((_a2 = this.videoElement) === null || _a2 === void 0 ? void 0 : _a2.webkitSetPresentationMode) && ((_c = (_b2 = this.videoElement) === null || _b2 === void 0 ? void 0 : _b2.webkitSupportsFullscreen) !== null && _c !== void 0 ? _c : false);
      }
      setPresentationMode(mode) {
        var _a2, _b2;
        (_b2 = (_a2 = this.videoElement) === null || _a2 === void 0 ? void 0 : _a2.webkitSetPresentationMode) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, mode);
      }
      on(type, handler) {
        this.emitter.on(type, handler);
      }
      off(type, handler) {
        this.emitter.off(type, handler);
      }
      destroy() {
        this.setPresentationMode("inline");
        this.disposal.empty();
      }
      addPresentationModeChangeEventListener() {
        if (!this.isSupported || isNil(this.videoElement))
          return noop2;
        return listen(this.videoElement, "webkitpresentationmodechanged", this.handlePresentationModeChange.bind(this));
      }
      handlePresentationModeChange() {
        this.emitter.emit("change", this.presentationMode);
      }
    };
    fileCss = "audio.sc-vm-file,video.sc-vm-file{border-radius:inherit;vertical-align:middle;width:100%;outline:0}video.sc-vm-file{position:absolute;top:0;left:0;border:0;height:100%;user-select:none}";
    __awaiter$h = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    File = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.vmMediaElChange = createEvent(this, "vmMediaElChange", 7);
        this.vmSrcSetChange = createEvent(this, "vmSrcSetChange", 7);
        this.textTracksDisposal = new Disposal();
        this.wasPausedBeforeSeeking = true;
        this.currentSrcSet = [];
        this.mediaQueryDisposal = new Disposal();
        this.willAttach = false;
        this.preload = "metadata";
        this.playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
        this.language = "en";
        this.autoplay = false;
        this.controls = false;
        this.loop = false;
        this.muted = false;
        this.playsinline = false;
        this.noConnect = false;
        this.paused = true;
        this.currentTime = 0;
        this.volume = 0;
        this.playbackReady = false;
        this.playbackStarted = false;
        this.presentationController = new VideoPresentationController(this);
        this.fullscreenController = new VideoFullscreenController(this, this.presentationController);
        this.currentTextTrack = -1;
        this.hasCustomTextManager = false;
        this.isTextTrackVisible = true;
        this.shouldRenderNativeTextTracks = true;
        withComponentRegistry(this);
        withProviderConnect(this);
        withProviderContext(this, [
          "playbackReady",
          "playbackStarted",
          "currentTime",
          "volume",
          "paused",
          "currentTextTrack",
          "isTextTrackVisible",
          "shouldRenderNativeTextTracks"
        ]);
        watchComponentRegistry(this, "vm-poster", (regs) => {
          [this.vmPoster] = regs;
        });
      }
      onMediaTitleChange() {
        this.dispatch("mediaTitle", this.mediaTitle);
      }
      onPosterChange() {
        var _a2;
        if (!this.playbackStarted)
          (_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.load();
      }
      onViewTypeChange() {
        this.dispatch("viewType", this.viewType);
      }
      connectedCallback() {
        this.initLazyLoader();
        this.dispatch = createProviderDispatcher(this);
        this.onViewTypeChange();
        this.onPosterChange();
        this.onMediaTitleChange();
        this.addPresentationControllerListeners();
      }
      componentDidRender() {
        if (this.prevMediaEl !== this.mediaEl) {
          this.prevMediaEl = this.mediaEl;
          this.vmMediaElChange.emit(this.mediaEl);
          this.presentationController.addPresentationModeChangeEventListener();
        }
      }
      componentDidLoad() {
        this.onViewTypeChange();
      }
      disconnectedCallback() {
        var _a2;
        this.mediaQueryDisposal.empty();
        this.textTracksDisposal.empty();
        this.cancelTimeUpdates();
        (_a2 = this.lazyLoader) === null || _a2 === void 0 ? void 0 : _a2.destroy();
        this.wasPausedBeforeSeeking = true;
      }
      initLazyLoader() {
        this.lazyLoader = new LazyLoader(this.host, ["data-src", "data-poster"], () => {
          if (isNil(this.mediaEl))
            return;
          const poster = this.mediaEl.getAttribute("data-poster");
          if (!isNull(poster))
            this.mediaEl.setAttribute("poster", poster);
          this.refresh();
          this.didSrcSetChange();
        });
      }
      refresh() {
        if (isNil(this.mediaEl))
          return;
        const { children } = this.mediaEl;
        for (let i2 = 0; i2 <= children.length - 1; i2 += 1) {
          const child = children[i2];
          const src = child.getAttribute("data-src") || child.getAttribute("src") || child.getAttribute("data-vs");
          child.removeAttribute("src");
          if (isNull(src))
            continue;
          child.setAttribute("data-vs", src);
          child.setAttribute("src", src);
        }
      }
      didSrcSetChange() {
        if (isNil(this.mediaEl))
          return;
        const sources = Array.from(this.mediaEl.querySelectorAll("source"));
        const srcSet = sources.map((source) => {
          var _a2;
          return {
            src: source.getAttribute("data-vs"),
            media: (_a2 = source.getAttribute("data-media")) !== null && _a2 !== void 0 ? _a2 : void 0,
            ref: source
          };
        });
        const didChange = this.currentSrcSet.length !== srcSet.length || srcSet.some((resource, i2) => this.currentSrcSet[i2].src !== resource.src);
        if (didChange) {
          this.currentSrcSet = srcSet;
          this.onSrcSetChange();
        }
      }
      onSrcSetChange() {
        var _a2;
        this.textTracksDisposal.empty();
        this.mediaQueryDisposal.empty();
        this.vmLoadStart.emit();
        this.vmSrcSetChange.emit(this.currentSrcSet);
        if (!this.willAttach)
          (_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.load();
      }
      hasCustomPoster() {
        return !IS_IOS && !isUndefined(this.vmPoster);
      }
      cancelTimeUpdates() {
        if (isNumber(this.timeRAF))
          window.cancelAnimationFrame(this.timeRAF);
        this.timeRAF = void 0;
      }
      requestTimeUpdates() {
        var _a2, _b2;
        this.dispatch("currentTime", (_b2 = (_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.currentTime) !== null && _b2 !== void 0 ? _b2 : 0);
        this.timeRAF = window.requestAnimationFrame(() => {
          this.requestTimeUpdates();
        });
      }
      getMediaType() {
        const { currentSrc } = this.mediaEl;
        if (audioRegex.test(currentSrc))
          return MediaType.Audio;
        if (videoRegex.test(currentSrc) || hlsRegex.test(currentSrc))
          return MediaType.Video;
        return void 0;
      }
      onLoadedMetadata() {
        this.mediaEl.volume = this.volume / 100;
        this.listenToTextTracksForChanges();
        this.onTextTracksChange();
        this.onProgress();
        this.dispatch("currentPoster", this.poster);
        this.dispatch("duration", this.mediaEl.duration);
        this.dispatch("playbackRates", this.playbackRates);
        if (!this.willAttach) {
          this.dispatch("currentSrc", this.mediaEl.currentSrc);
          this.dispatch("mediaType", this.getMediaType());
          this.dispatch("playbackReady", true);
        }
      }
      onProgress() {
        const { buffered, duration } = this.mediaEl;
        const end = buffered.length === 0 ? 0 : buffered.end(buffered.length - 1);
        this.dispatch("buffered", end > duration ? duration : end);
      }
      onPlay() {
        this.requestTimeUpdates();
        this.dispatch("paused", false);
        if (!this.playbackStarted)
          this.dispatch("playbackStarted", true);
      }
      onPause() {
        this.cancelTimeUpdates();
        this.dispatch("paused", true);
        this.dispatch("buffering", false);
      }
      onPlaying() {
        this.dispatch("playing", true);
        this.dispatch("buffering", false);
      }
      onSeeking() {
        if (!this.wasPausedBeforeSeeking)
          this.wasPausedBeforeSeeking = this.mediaEl.paused;
        this.dispatch("currentTime", this.mediaEl.currentTime);
        this.dispatch("seeking", true);
      }
      onSeeked() {
        if (this.currentTime === 0 && !this.playbackStarted)
          return;
        this.dispatch("seeking", false);
        if (!this.playbackStarted || !this.wasPausedBeforeSeeking)
          this.attemptToPlay();
        this.wasPausedBeforeSeeking = true;
      }
      onRateChange() {
        this.dispatch("playbackRate", this.mediaEl.playbackRate);
      }
      onVolumeChange() {
        this.dispatch("muted", this.mediaEl.muted);
        this.dispatch("volume", this.mediaEl.volume * 100);
      }
      onDurationChange() {
        this.dispatch("duration", this.mediaEl.duration);
      }
      onWaiting() {
        this.dispatch("buffering", true);
      }
      onSuspend() {
        this.dispatch("buffering", false);
      }
      onEnded() {
        if (!this.loop)
          this.dispatch("playbackEnded", true);
      }
      onError() {
        this.vmError.emit(this.mediaEl.error);
      }
      attemptToPlay() {
        var _a2;
        try {
          (_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.play();
        } catch (e) {
          this.vmError.emit(e);
        }
      }
      togglePiPInChrome(toggle) {
        var _a2;
        return toggle ? (_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.requestPictureInPicture() : document.exitPictureInPicture();
      }
      togglePiPInSafari(toggle) {
        var _a2, _b2;
        const mode = toggle ? "picture-in-picture" : "inline";
        if (!((_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.webkitSupportsPresentationMode(mode))) {
          throw new Error("PiP API is not available.");
        }
        return (_b2 = this.mediaEl) === null || _b2 === void 0 ? void 0 : _b2.webkitSetPresentationMode(mode);
      }
      togglePiP(toggle) {
        return __awaiter$h(this, void 0, void 0, function* () {
          if (canUsePiPInChrome())
            return this.togglePiPInChrome(toggle);
          if (canUsePiPInSafari())
            return this.togglePiPInSafari(toggle);
          throw new Error("PiP API is not available.");
        });
      }
      onEnterPiP() {
        this.dispatch("isPiPActive", true);
      }
      onLeavePiP() {
        this.dispatch("isPiPActive", false);
      }
      addPresentationControllerListeners() {
        this.presentationController.on("change", (mode) => {
          this.dispatch(
            "isPiPActive",
            mode === "picture-in-picture"
            /* PiP */
          );
          this.dispatch(
            "isFullscreenActive",
            mode === "fullscreen"
            /* Fullscreen */
          );
        });
      }
      /** @internal */
      getAdapter() {
        return __awaiter$h(this, void 0, void 0, function* () {
          return {
            getInternalPlayer: () => __awaiter$h(this, void 0, void 0, function* () {
              return this.mediaEl;
            }),
            play: () => __awaiter$h(this, void 0, void 0, function* () {
              var _a2;
              return (_a2 = this.mediaEl) === null || _a2 === void 0 ? void 0 : _a2.play();
            }),
            pause: () => __awaiter$h(this, void 0, void 0, function* () {
              var _b2;
              return (_b2 = this.mediaEl) === null || _b2 === void 0 ? void 0 : _b2.pause();
            }),
            canPlay: (type) => __awaiter$h(this, void 0, void 0, function* () {
              return isString(type) && (audioRegex.test(type) || videoRegex.test(type));
            }),
            setCurrentTime: (time) => __awaiter$h(this, void 0, void 0, function* () {
              if (this.mediaEl)
                this.mediaEl.currentTime = time;
            }),
            setMuted: (muted) => __awaiter$h(this, void 0, void 0, function* () {
              if (this.mediaEl)
                this.mediaEl.muted = muted;
            }),
            setVolume: (volume) => __awaiter$h(this, void 0, void 0, function* () {
              if (this.mediaEl)
                this.mediaEl.volume = volume / 100;
            }),
            canSetPlaybackRate: () => __awaiter$h(this, void 0, void 0, function* () {
              return true;
            }),
            setPlaybackRate: (rate) => __awaiter$h(this, void 0, void 0, function* () {
              if (this.mediaEl)
                this.mediaEl.playbackRate = rate;
            }),
            canSetPiP: () => __awaiter$h(this, void 0, void 0, function* () {
              return canUsePiP();
            }),
            enterPiP: () => this.togglePiP(true),
            exitPiP: () => this.togglePiP(false),
            canSetFullscreen: () => __awaiter$h(this, void 0, void 0, function* () {
              return this.fullscreenController.isSupported;
            }),
            enterFullscreen: () => this.fullscreenController.requestFullscreen(),
            exitFullscreen: () => this.fullscreenController.exitFullscreen(),
            setCurrentTextTrack: (trackId) => __awaiter$h(this, void 0, void 0, function* () {
              if (trackId !== this.currentTextTrack)
                this.toggleTextTrackModes(trackId);
            }),
            setTextTrackVisibility: (isVisible) => __awaiter$h(this, void 0, void 0, function* () {
              this.isTextTrackVisible = isVisible;
              this.toggleTextTrackModes(this.currentTextTrack);
            })
          };
        });
      }
      onHasCustomTextManagerChange() {
        if (this.hasCustomTextManager) {
          this.textTracksDisposal.empty();
        } else if (this.playbackReady) {
          this.listenToTextTracksForChanges();
        }
      }
      onShouldRenderNativeTextTracksChange() {
        if (this.hasCustomTextManager)
          return;
        this.toggleTextTrackModes(this.currentTextTrack);
      }
      onProviderConnect(event) {
        if (this.noConnect)
          event.stopImmediatePropagation();
      }
      onProviderDisconnect(event) {
        if (this.noConnect)
          event.stopImmediatePropagation();
      }
      getFilteredTextTracks() {
        const tracks = [];
        const textTrackList = Array.from(this.mediaEl.textTracks);
        for (let i2 = 0; i2 < textTrackList.length; i2 += 1) {
          const track = textTrackList[i2];
          if ((track.kind === "subtitles" || track.kind === "captions") && track.label) {
            tracks.push(textTrackList[i2]);
          }
        }
        return tracks;
      }
      listenToTextTracksForChanges() {
        if (this.hasCustomTextManager)
          return;
        this.textTracksDisposal.empty();
        if (isUndefined(this.mediaEl))
          return;
        this.textTracksDisposal.add(listen(this.mediaEl.textTracks, "change", this.onTextTracksChange.bind(this)));
      }
      onTextTracksChange() {
        var _a2;
        const tracks = this.getFilteredTextTracks();
        let trackId = -1;
        for (let id = 0; id < tracks.length; id += 1) {
          if (tracks[id].mode === "hidden") {
            trackId = id;
          } else if (tracks[id].mode === "showing") {
            trackId = id;
            break;
          }
        }
        if (!this.shouldRenderNativeTextTracks && ((_a2 = tracks[trackId]) === null || _a2 === void 0 ? void 0 : _a2.mode) === "showing") {
          tracks[trackId].mode = "hidden";
          return;
        }
        if (this.shouldRenderNativeTextTracks) {
          this.isTextTrackVisible = trackId !== -1 && tracks[trackId].mode === "showing";
          this.dispatch("isTextTrackVisible", this.isTextTrackVisible);
        }
        this.dispatch("textTracks", tracks);
        this.dispatch("currentTextTrack", this.shouldRenderNativeTextTracks && !this.isTextTrackVisible ? -1 : trackId);
      }
      toggleTextTrackModes(newTrackId) {
        if (isNil(this.mediaEl))
          return;
        const { textTracks } = this.mediaEl;
        if (newTrackId === -1) {
          Array.from(textTracks).forEach((track) => {
            track.mode = "disabled";
          });
        } else {
          const oldTrack = textTracks[this.currentTextTrack];
          if (oldTrack)
            oldTrack.mode = "disabled";
        }
        const nextTrack = textTracks[newTrackId];
        if (nextTrack) {
          nextTrack.mode = this.isTextTrackVisible && this.shouldRenderNativeTextTracks ? "showing" : "hidden";
        }
        this.dispatch("currentTextTrack", this.shouldRenderNativeTextTracks && !this.isTextTrackVisible ? -1 : newTrackId);
        this.dispatch("isTextTrackVisible", this.isTextTrackVisible);
      }
      render() {
        const mediaProps = {
          autoplay: this.autoplay,
          muted: this.muted,
          playsinline: this.playsinline,
          playsInline: this.playsinline,
          "x5-playsinline": this.playsinline,
          "webkit-playsinline": this.playsinline,
          controls: this.controls,
          crossorigin: this.crossOrigin === "" ? "anonymous" : this.crossOrigin,
          controlslist: this.controlsList,
          "data-poster": !this.hasCustomPoster() ? this.poster : void 0,
          loop: this.loop,
          preload: this.preload,
          disablePictureInPicture: this.disablePiP,
          autoPictureInPicture: this.autoPiP,
          disableRemotePlayback: this.disableRemotePlayback,
          "x-webkit-airplay": this.disableRemotePlayback ? "deny" : "allow",
          ref: (el) => {
            this.mediaEl = el;
          },
          onLoadedMetadata: this.onLoadedMetadata.bind(this),
          onProgress: this.onProgress.bind(this),
          onPlay: this.onPlay.bind(this),
          onPause: this.onPause.bind(this),
          onPlaying: this.onPlaying.bind(this),
          onSeeking: this.onSeeking.bind(this),
          onSeeked: this.onSeeked.bind(this),
          onRateChange: this.onRateChange.bind(this),
          onVolumeChange: this.onVolumeChange.bind(this),
          onDurationChange: this.onDurationChange.bind(this),
          onWaiting: this.onWaiting.bind(this),
          onSuspend: this.onSuspend.bind(this),
          onEnded: this.onEnded.bind(this),
          onError: this.onError.bind(this)
        };
        const audio = h("audio", Object.assign({ class: "lazy" }, mediaProps), h("slot", null), "Your browser does not support the", h("code", null, "audio"), "element.");
        const video = h("video", Object.assign({ class: "lazy" }, mediaProps, {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onenterpictureinpicture: this.onEnterPiP.bind(this),
          onleavepictureinpicture: this.onLeavePiP.bind(this)
        }), h("slot", null), "Your browser does not support the", h("code", null, "video"), "element.");
        return this.viewType === ViewType.Audio ? audio : video;
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "mediaTitle": ["onMediaTitleChange"],
          "poster": ["onPosterChange"],
          "viewType": ["onViewTypeChange"],
          "hasCustomTextManager": ["onHasCustomTextManagerChange"],
          "shouldRenderNativeTextTracks": ["onShouldRenderNativeTextTracksChange"]
        };
      }
      static get style() {
        return fileCss;
      }
    };
    fullscreenControlCss = ":host([hidden]){display:none}";
    __awaiter$g = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    FullscreenControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.canSetFullscreen = false;
        this.enterIcon = "fullscreen-enter";
        this.exitIcon = "fullscreen-exit";
        this.tooltipPosition = "top";
        this.hideTooltip = false;
        this.keys = "f";
        this.isFullscreenActive = false;
        this.i18n = {};
        this.playbackReady = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["isFullscreenActive", "playbackReady", "i18n"]);
      }
      onPlaybackReadyChange() {
        var _a2;
        return __awaiter$g(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canSetFullscreen = (_a2 = yield player === null || player === void 0 ? void 0 : player.canSetFullscreen()) !== null && _a2 !== void 0 ? _a2 : false;
        });
      }
      componentDidLoad() {
        this.onPlaybackReadyChange();
      }
      onClick() {
        const player = getPlayerFromRegistry(this);
        !this.isFullscreenActive ? player === null || player === void 0 ? void 0 : player.enterFullscreen() : player === null || player === void 0 ? void 0 : player.exitFullscreen();
      }
      render() {
        const tooltip = this.isFullscreenActive ? this.i18n.exitFullscreen : this.i18n.enterFullscreen;
        const tooltipWithHint = !isUndefined(this.keys) ? `${tooltip} (${this.keys})` : tooltip;
        return h(Host, { hidden: !this.canSetFullscreen }, h("vm-control", { label: this.i18n.fullscreen, keys: this.keys, pressed: this.isFullscreenActive, hidden: !this.canSetFullscreen, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.isFullscreenActive ? this.exitIcon : this.enterIcon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint)));
      }
      static get watchers() {
        return {
          "playbackReady": ["onPlaybackReadyChange"]
        };
      }
      static get style() {
        return fullscreenControlCss;
      }
    };
    __awaiter$f = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    HLS = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.hasAttached = false;
        this.version = "latest";
        this.preload = "metadata";
        this.playbackReady = false;
        withComponentRegistry(this);
        withProviderConnect(this);
        withPlayerContext(this, ["playbackReady"]);
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        if (this.mediaEl)
          this.setupHls();
      }
      disconnectedCallback() {
        this.destroyHls();
      }
      get src() {
        if (isNil(this.videoProvider))
          return void 0;
        const sources = this.videoProvider.querySelectorAll("source");
        const currSource = Array.from(sources).find((source) => hlsRegex.test(source.src) || hlsTypeRegex.test(source.type));
        return currSource === null || currSource === void 0 ? void 0 : currSource.src;
      }
      setupHls() {
        return __awaiter$f(this, void 0, void 0, function* () {
          if (!isUndefined(this.hls))
            return;
          try {
            const url = this.libSrc || `https://cdn.jsdelivr.net/npm/hls.js@${this.version}/dist/hls.min.js`;
            const Hls2 = yield loadSDK(url, "Hls");
            if (!Hls2.isSupported()) {
              this.vmError.emit("hls.js is not supported");
              return;
            }
            this.hls = new Hls2(this.config);
            this.hls.on(Hls2.Events.MEDIA_ATTACHED, () => {
              this.hasAttached = true;
              this.onSrcChange();
            });
            this.hls.on(Hls2.Events.AUDIO_TRACKS_UPDATED, () => {
              this.dispatch("audioTracks", this.hls.audioTracks);
              this.dispatch("currentAudioTrack", this.hls.audioTrack);
            });
            this.hls.on(Hls2.Events.AUDIO_TRACK_SWITCHED, () => {
              this.dispatch("currentAudioTrack", this.hls.audioTrack);
            });
            this.hls.on(Hls2.Events.ERROR, (event, data) => {
              if (data.fatal) {
                switch (data.type) {
                  case Hls2.ErrorTypes.NETWORK_ERROR:
                    this.hls.startLoad();
                    break;
                  case Hls2.ErrorTypes.MEDIA_ERROR:
                    this.hls.recoverMediaError();
                    break;
                  default:
                    this.destroyHls();
                    break;
                }
              }
              this.vmError.emit({ event, data });
            });
            this.hls.on(Hls2.Events.MANIFEST_PARSED, () => {
              this.dispatch("mediaType", MediaType.Video);
              this.dispatch("currentSrc", this.src);
              this.dispatchLevels();
            });
            this.hls.on(Hls2.Events.LEVEL_LOADED, (_, data) => {
              if (!this.playbackReady) {
                this.dispatch("duration", data.details.totalduration);
                this.dispatch("playbackReady", true);
              }
            });
            this.hls.attachMedia(this.mediaEl);
          } catch (e) {
            this.vmError.emit(e);
          }
        });
      }
      dispatchLevels() {
        if (!this.hls.levels || this.hls.levels.length === 0)
          return;
        this.dispatch("playbackQualities", [
          "Auto",
          ...this.hls.levels.map(this.levelToPlaybackQuality)
        ]);
        this.dispatch("playbackQuality", "Auto");
      }
      levelToPlaybackQuality(level) {
        return level === -1 ? "Auto" : `${level.height}p`;
      }
      findLevelIndexFromQuality(quality) {
        return this.hls.levels.findIndex((level) => this.levelToPlaybackQuality(level) === quality);
      }
      destroyHls() {
        var _a2;
        (_a2 = this.hls) === null || _a2 === void 0 ? void 0 : _a2.destroy();
        this.hasAttached = false;
      }
      onMediaElChange(event) {
        return __awaiter$f(this, void 0, void 0, function* () {
          this.destroyHls();
          if (isUndefined(event.detail))
            return;
          this.mediaEl = event.detail;
          setTimeout(() => __awaiter$f(this, void 0, void 0, function* () {
            yield this.setupHls();
          }), 50);
        });
      }
      onSrcChange() {
        var _a2;
        return __awaiter$f(this, void 0, void 0, function* () {
          if (this.hasAttached && this.hls.url !== this.src) {
            this.vmLoadStart.emit();
            (_a2 = this.hls) === null || _a2 === void 0 ? void 0 : _a2.loadSource(this.src);
          }
        });
      }
      /** @internal */
      getAdapter() {
        var _a2, _b2;
        return __awaiter$f(this, void 0, void 0, function* () {
          const adapter = (_b2 = yield (_a2 = this.videoProvider) === null || _a2 === void 0 ? void 0 : _a2.getAdapter()) !== null && _b2 !== void 0 ? _b2 : {};
          const canVideoProviderPlay = adapter.canPlay;
          return Object.assign(Object.assign({}, adapter), { getInternalPlayer: () => __awaiter$f(this, void 0, void 0, function* () {
            return this.hls;
          }), canPlay: (type) => __awaiter$f(this, void 0, void 0, function* () {
            var _c;
            return isString(type) && hlsRegex.test(type) || ((_c = canVideoProviderPlay === null || canVideoProviderPlay === void 0 ? void 0 : canVideoProviderPlay(type)) !== null && _c !== void 0 ? _c : false);
          }), canSetPlaybackQuality: () => __awaiter$f(this, void 0, void 0, function* () {
            var _d, _e;
            return ((_e = (_d = this.hls) === null || _d === void 0 ? void 0 : _d.levels) === null || _e === void 0 ? void 0 : _e.length) > 0;
          }), setPlaybackQuality: (quality) => __awaiter$f(this, void 0, void 0, function* () {
            if (!isUndefined(this.hls)) {
              this.hls.currentLevel = this.findLevelIndexFromQuality(quality);
              this.dispatch("playbackQuality", quality);
            }
          }), setCurrentAudioTrack: (trackId) => __awaiter$f(this, void 0, void 0, function* () {
            if (!isUndefined(this.hls)) {
              this.hls.audioTrack = trackId;
            }
          }) });
        });
      }
      render() {
        return h("vm-video", { willAttach: true, crossOrigin: this.crossOrigin, preload: this.preload, poster: this.poster, controlsList: this.controlsList, autoPiP: this.autoPiP, disablePiP: this.disablePiP, disableRemotePlayback: this.disableRemotePlayback, mediaTitle: this.mediaTitle, ref: (el) => {
          this.videoProvider = el;
        } }, h("slot", null));
      }
    };
    ICONS_BASE_CDN_URL = "https://cdn.jsdelivr.net/npm/@vime/core@latest/icons";
    registry = new Map(Object.entries({
      vime: (iconName) => `${ICONS_BASE_CDN_URL}/vime/vm-${iconName}.svg`,
      material: (iconName) => `${ICONS_BASE_CDN_URL}/material/md-${iconName}.svg`
    }));
    watch = /* @__PURE__ */ new Set();
    getIconLibraryResolver = (name) => registry.get(name);
    __awaiter$e = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    iconFiles = /* @__PURE__ */ new Map();
    requestIcon = (url) => {
      if (iconFiles.has(url))
        return iconFiles.get(url);
      const request = fetch(url).then((response) => __awaiter$e(void 0, void 0, void 0, function* () {
        if (response.ok) {
          const div = document.createElement("div");
          div.innerHTML = yield response.text();
          const svg = div.firstElementChild;
          return {
            ok: response.ok,
            status: response.status,
            svg: svg && svg.tagName.toLowerCase() === "svg" ? svg.outerHTML : ""
          };
        }
        return {
          ok: response.ok,
          status: response.status
        };
      }));
      iconFiles.set(url, request);
      return request;
    };
    iconCss = ":host{display:inline-block;width:1em;height:1em;contain:strict;box-sizing:content-box !important}.icon,svg{display:block;height:100%;width:100%;transition:var(--vm-icon-transition);transform:var(--vm-icon-transform);fill:var(--vm-icon-fill, currentColor);stroke:var(--vm-icon-stroke)}";
    __awaiter$d = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    parser = new DOMParser();
    Icon = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoad = createEvent(this, "vmLoad", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.icons = "material";
        withComponentRegistry(this);
        withIconRegistry(this);
      }
      handleChange() {
        this.setIcon();
      }
      connectedCallback() {
        withPlayerContext(this, ["icons"]);
      }
      componentDidLoad() {
        this.setIcon();
      }
      /**
       * @internal Fetches the icon and redraws it. Used to handle library registrations.
       */
      redraw() {
        return __awaiter$d(this, void 0, void 0, function* () {
          this.setIcon();
        });
      }
      getLabel() {
        let label = "";
        if (this.label) {
          label = this.label;
        } else if (this.name) {
          label = this.name.replace(/-/g, " ");
        } else if (this.src) {
          label = this.src.replace(/.*\//, "").replace(/-/g, " ").replace(/\.svg/i, "");
        }
        return label;
      }
      setIcon() {
        var _a2;
        return __awaiter$d(this, void 0, void 0, function* () {
          const resolver = getIconLibraryResolver((_a2 = this.library) !== null && _a2 !== void 0 ? _a2 : this.icons);
          let url = this.src;
          if (this.name && resolver) {
            url = resolver(this.name);
          }
          if (url) {
            try {
              const file = yield requestIcon(url);
              if (file.ok) {
                const doc2 = parser.parseFromString(file.svg, "text/html");
                const svg = doc2.body.querySelector("svg");
                if (svg) {
                  this.svg = svg.outerHTML;
                  this.vmLoad.emit();
                } else {
                  this.svg = "";
                  this.vmError.emit({ status: file.status });
                }
              }
            } catch (_b2) {
              this.vmError.emit();
            }
          }
        });
      }
      render() {
        return h("div", { class: "icon", role: "img", "aria-label": this.getLabel(), innerHTML: this.svg });
      }
      static get watchers() {
        return {
          "name": ["handleChange"],
          "src": ["handleChange"],
          "library": ["handleChange"],
          "icons": ["handleChange"]
        };
      }
      static get style() {
        return iconCss;
      }
    };
    IconLibrary = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.icons = "material";
        withComponentRegistry(this);
        withPlayerContext(this, ["icons"]);
      }
      handleUpdate() {
        this.register();
      }
      connectedCallback() {
        this.register();
      }
      disconnectedCallback() {
        if (!isUndefined(this.name))
          deregisterIconLibrary(this.name);
      }
      register() {
        var _a2;
        registerIconLibrary((_a2 = this.name) !== null && _a2 !== void 0 ? _a2 : this.icons, this.name ? this.resolver : void 0);
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "name": ["handleUpdate"],
          "resolver": ["handleUpdate"],
          "icons": ["handleUpdate"]
        };
      }
    };
    liveIndicatorCss = ".liveIndicator{display:flex;align-items:center;font-size:13px;font-weight:bold;letter-spacing:0.6px;color:var(--vm-control-color)}.liveIndicator.hidden{display:none}.indicator{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;background-color:var(--vm-live-indicator-color, red)}";
    LiveIndicator = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.isLive = false;
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ["isLive", "i18n"]);
      }
      render() {
        return h("div", { class: {
          liveIndicator: true,
          hidden: !this.isLive
        } }, h("div", { class: "indicator" }), this.i18n.live);
      }
      static get style() {
        return liveIndicatorCss;
      }
    };
    loadingScreenCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-loading-screen-z-index);display:flex;align-items:center;justify-content:center}.loadingScreen{opacity:100;transition:var(--vm-fade-transition)}.loadingScreen.inactive{opacity:0}.dotPulse{position:relative;left:-9999px;width:var(--vm-loading-screen-dot-size);height:var(--vm-loading-screen-dot-size);border-radius:calc(var(--vm-loading-screen-dot-size) / 2);background-color:var(--vm-loading-screen-dot-color);color:var(--vm-loading-screen-dot-color);box-shadow:9999px 0 0 calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n    var(--vm-loading-screen-dot-color);animation:dotPulse var(--vm-loading-screen-pulse-duration) infinite linear;animation-delay:calc(var(--vm-loading-screen-pulse-duration) / 6)}.dotPulse::before,.dotPulse::after{content:'';display:inline-block;position:absolute;top:0;width:var(--vm-loading-screen-dot-size);height:var(--vm-loading-screen-dot-size);border-radius:calc(var(--vm-loading-screen-dot-size) / 2);background-color:var(--vm-loading-screen-dot-color);color:var(--vm-loading-screen-dot-color)}.dotPulse::before{box-shadow:9984px 0 0 calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n    var(--vm-loading-screen-dot-color);animation:dotPulseBefore var(--vm-loading-screen-pulse-duration) infinite\n    linear;animation-delay:0s}.dotPulse::after{box-shadow:10014px 0 0 calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n    var(--vm-loading-screen-dot-color);animation:dotPulseAfter var(--vm-loading-screen-pulse-duration) infinite\n    linear;animation-delay:calc(var(--vm-loading-screen-pulse-duration) / 3)}@keyframes dotPulseBefore{0%{box-shadow:9984px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}30%{box-shadow:9984px 0 0 2px var(--vm-loading-screen-dot-color)}60%,100%{box-shadow:9984px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}}@keyframes dotPulse{0%{box-shadow:9999px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}30%{box-shadow:9999px 0 0 2px var(--vm-loading-screen-dot-color)}60%,100%{box-shadow:9999px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}}@keyframes dotPulseAfter{0%{box-shadow:10014px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}30%{box-shadow:10014px 0 0 2px var(--vm-loading-screen-dot-color)}60%,100%{box-shadow:10014px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}}";
    LoadingScreen = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.playbackReady = false;
        this.hideDots = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["playbackReady"]);
      }
      render() {
        return h("div", { class: {
          loadingScreen: true,
          inactive: this.playbackReady
        } }, h("slot", null), !this.hideDots && h("div", { class: "dotPulse" }));
      }
      static get style() {
        return loadingScreenCss;
      }
    };
    menuCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:var(--vm-menu-z-index)}:host([active]){pointer-events:auto;z-index:calc(var(--vm-menu-z-index) + 1)}.menu{position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;transition:var(--vm-menu-transition)}.menu.slideIn{transform:translateX(0)}.menu[aria-hidden='true'].slideInFromLeft{transform:translateX(-100%)}.menu[aria-hidden='true'].slideInFromRight{transform:translateX(100%)}.container{display:flex;flex-direction:column;position:relative;text-align:left;width:100%;height:100%;color:var(--vm-menu-color);background:var(--vm-menu-bg);font-size:var(--vm-menu-font-size);font-weight:var(--vm-menu-font-weight)}.menu:focus{outline:0}";
    __awaiter$c = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Menu = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmOpen = createEvent(this, "vmOpen", 7);
        this.vmClose = createEvent(this, "vmClose", 7);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        this.vmActiveSubmenuChange = createEvent(this, "vmActiveSubmenuChange", 7);
        this.vmActiveMenuItemChange = createEvent(this, "vmActiveMenuItemChange", 7);
        this.vmMenuHeightChange = createEvent(this, "vmMenuHeightChange", 3);
        this.hasDisconnected = false;
        this.active = false;
        withComponentRegistry(this);
      }
      onActiveMenuitemChange() {
        this.vmActiveMenuItemChange.emit(this.activeMenuItem);
      }
      onActiveSubmenuChange() {
        this.vmActiveSubmenuChange.emit(this.activeSubmenu);
      }
      onActiveChange() {
        var _a2;
        if (this.hasDisconnected)
          return;
        this.active ? this.vmOpen.emit(this.host) : this.vmClose.emit(this.host);
        if (((_a2 = this.controller) === null || _a2 === void 0 ? void 0 : _a2.tagName.toLowerCase()) === "vm-menu-item") {
          this.controller.expanded = true;
        }
      }
      connectedCallback() {
        this.hasDisconnected = false;
      }
      componentDidRender() {
        writeTask(() => {
          if (!this.hasDisconnected)
            this.calculateHeight();
        });
      }
      disconnectedCallback() {
        this.controller = void 0;
        this.hasDisconnected = true;
      }
      /**
       * Focuses the menu.
       */
      focusMenu() {
        var _a2;
        return __awaiter$c(this, void 0, void 0, function* () {
          (_a2 = this.menu) === null || _a2 === void 0 ? void 0 : _a2.focus();
        });
      }
      /**
       * Removes focus from the menu.
       */
      blurMenu() {
        var _a2;
        return __awaiter$c(this, void 0, void 0, function* () {
          (_a2 = this.menu) === null || _a2 === void 0 ? void 0 : _a2.blur();
        });
      }
      /**
       * Returns the currently focused menu item.
       */
      getActiveMenuItem() {
        return __awaiter$c(this, void 0, void 0, function* () {
          return this.activeMenuItem;
        });
      }
      /**
       * Sets the currently focused menu item.
       */
      setActiveMenuItem(item) {
        return __awaiter$c(this, void 0, void 0, function* () {
          item === null || item === void 0 ? void 0 : item.focusItem();
          this.activeMenuItem = item;
        });
      }
      /**
       * Calculates the height of the settings menu based on its children.
       */
      calculateHeight() {
        var _a2, _b2;
        return __awaiter$c(this, void 0, void 0, function* () {
          let height = 0;
          if (this.activeSubmenu) {
            const submenu = yield this.activeSubmenu.getMenu();
            height = (_a2 = yield submenu === null || submenu === void 0 ? void 0 : submenu.calculateHeight()) !== null && _a2 !== void 0 ? _a2 : 0;
            height += yield this.activeSubmenu.getControllerHeight();
          } else {
            const children = ((_b2 = this.container) === null || _b2 === void 0 ? void 0 : _b2.firstChild).assignedElements({ flatten: true });
            children === null || children === void 0 ? void 0 : children.forEach((child) => {
              height += parseFloat(window.getComputedStyle(child).height);
            });
          }
          this.vmMenuHeightChange.emit(height);
          return height;
        });
      }
      onOpenSubmenu(event) {
        event.stopPropagation();
        if (!isUndefined(this.activeSubmenu))
          this.activeSubmenu.active = false;
        this.activeSubmenu = event.detail;
        this.getChildren().forEach((child) => {
          if (child !== this.activeSubmenu) {
            child.style.opacity = "0";
            child.style.visibility = "hidden";
          }
        });
        writeTask(() => {
          this.activeSubmenu.active = true;
        });
      }
      onCloseSubmenu(event) {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        if (!isUndefined(this.activeSubmenu))
          this.activeSubmenu.active = false;
        this.getChildren().forEach((child) => {
          if (child !== this.activeSubmenu) {
            child.style.opacity = "";
            child.style.visibility = "";
          }
        });
        writeTask(() => {
          this.activeSubmenu = void 0;
        });
      }
      onWindowClick() {
        this.onCloseSubmenu();
        this.onClose();
      }
      onWindowKeyDown(event) {
        if (this.active && event.key === "Escape") {
          this.onCloseSubmenu();
          this.onClose();
          this.focusController();
        }
      }
      getChildren() {
        var _a2;
        const assignedElements = (_a2 = this.host.shadowRoot.querySelector("slot")) === null || _a2 === void 0 ? void 0 : _a2.assignedElements({ flatten: true });
        return assignedElements !== null && assignedElements !== void 0 ? assignedElements : [];
      }
      getMenuItems() {
        var _a2;
        const assignedElements = (_a2 = this.host.shadowRoot.querySelector("slot")) === null || _a2 === void 0 ? void 0 : _a2.assignedElements({ flatten: true });
        return menuItemHunter(assignedElements);
      }
      focusController() {
        var _a2, _b2, _c, _d, _e;
        if (!isUndefined((_a2 = this.controller) === null || _a2 === void 0 ? void 0 : _a2.focusItem)) {
          (_b2 = this.controller) === null || _b2 === void 0 ? void 0 : _b2.focusItem();
        } else if (!isUndefined((_c = this.controller) === null || _c === void 0 ? void 0 : _c.focusControl)) {
          (_d = this.controller) === null || _d === void 0 ? void 0 : _d.focusControl();
        } else {
          (_e = this.controller) === null || _e === void 0 ? void 0 : _e.focus();
        }
      }
      triggerMenuItem() {
        var _a2;
        if (isUndefined(this.activeMenuItem))
          return;
        this.activeMenuItem.click();
        (_a2 = this.activeMenuItem.menu) === null || _a2 === void 0 ? void 0 : _a2.focusMenu();
      }
      onClose() {
        this.activeMenuItem = void 0;
        this.active = false;
      }
      onClick(event) {
        event.stopPropagation();
      }
      onFocus() {
        var _a2;
        this.active = true;
        [this.activeMenuItem] = this.getMenuItems();
        (_a2 = this.activeMenuItem) === null || _a2 === void 0 ? void 0 : _a2.focusItem();
        this.vmFocus.emit();
      }
      onBlur() {
        this.vmBlur.emit();
      }
      foucsMenuItem(items, index10) {
        if (index10 < 0)
          index10 = items.length - 1;
        if (index10 > items.length - 1)
          index10 = 0;
        this.activeMenuItem = items[index10];
        this.activeMenuItem.focusItem();
      }
      onKeyDown(event) {
        if (!this.active)
          return;
        event.preventDefault();
        event.stopPropagation();
        const items = this.getMenuItems();
        let index10 = items.findIndex((item) => item === this.activeMenuItem);
        switch (event.key) {
          case "Escape":
            this.onClose();
            this.focusController();
            break;
          case "ArrowDown":
          case "Tab":
            this.foucsMenuItem(items, index10 += 1);
            break;
          case "ArrowUp":
            this.foucsMenuItem(items, index10 -= 1);
            break;
          case "ArrowLeft":
            this.onClose();
            this.focusController();
            break;
          case "ArrowRight":
          case "Enter":
          case " ":
            this.triggerMenuItem();
            break;
          case "Home":
          case "PageUp":
            this.foucsMenuItem(items, 0);
            break;
          case "End":
          case "PageDown":
            this.foucsMenuItem(items, items.length - 1);
            break;
        }
      }
      render() {
        var _a2, _b2, _c;
        return h("div", { id: this.identifier, class: {
          menu: true,
          slideIn: !isUndefined(this.slideInDirection),
          slideInFromLeft: this.slideInDirection === "left",
          slideInFromRight: this.slideInDirection === "right"
        }, role: "menu", tabindex: "-1", "aria-labelledby": (_b2 = (_a2 = this.controller) === null || _a2 === void 0 ? void 0 : _a2.identifier) !== null && _b2 !== void 0 ? _b2 : (_c = this.controller) === null || _c === void 0 ? void 0 : _c.id, "aria-hidden": !this.active ? "true" : "false", onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onClick: this.onClick.bind(this), onKeyDown: this.onKeyDown.bind(this), ref: (el) => {
          this.menu = el;
        } }, h("div", { class: "container", ref: (el) => {
          this.container = el;
        } }, h("slot", null)));
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "activeMenuItem": ["onActiveMenuitemChange"],
          "activeSubmenu": ["onActiveSubmenuChange"],
          "active": ["onActiveChange"]
        };
      }
      static get style() {
        return menuCss;
      }
    };
    menuItemCss = ":host{display:block}.menuItem{display:flex;position:relative;align-items:center;flex-direction:row;cursor:pointer;color:var(--vm-menu-color);background:var(--vm-menu-bg);font-size:var(--vm-menu-font-size);font-weight:var(--vm-menu-font-weight);padding:var(--vm-menu-item-padding);touch-action:manipulation;box-sizing:border-box}.menuItem:focus{outline:0}.menuItem.hidden{display:none}.menuItem.tapHighlight{background:var(--vm-menu-item-tap-highlight)}.menuItem.showDivider{border-bottom:0.5px solid var(--vm-menu-item-divider-color)}.menuItem.notTouch:hover,.menuItem.notTouch:focus{outline:0;color:var(--vm-menu-item-focus-color);background-color:var(--vm-menu-item-focus-bg)}.menuItem[aria-expanded='true']{position:absolute;z-index:2;top:0;width:100%}.menuItem[aria-hidden='true']{display:none}.menuItem[aria-checked='true'] vm-icon{opacity:1;visibility:visible}vm-icon{display:inline-block}vm-icon{fill:currentColor;pointer-events:none;font-size:var(--vm-menu-item-check-icon-size);margin-right:10px;opacity:0;visibility:hidden;transition:var(--vm-fade-transition)}.hint{display:inline-block;margin-left:auto;overflow:hidden;pointer-events:none;margin-right:6px;font-size:var(--vm-menu-item-hint-font-size);opacity:var(--vm-menu-item-hint-opacity);color:var(--vm-menu-item-hint-color)}.badge{display:inline-block;line-height:1;overflow:hidden;pointer-events:none;margin-left:6px;color:var(--vm-menu-item-badge-color);background:var(--vm-menu-item-badge-bg);font-size:var(--vm-menu-item-badge-font-size)}.spacer{flex:1}.arrow{color:var(--vm-menu-item-arrow-color);border:2px solid;padding:2px;display:inline-block;border-width:0 2px 2px 0}.arrow.left{margin-right:6px;transform:rotate(135deg)}.arrow.right{transform:rotate(-45deg);opacity:0.38}";
    __awaiter$b = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    MenuItem = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        this.showTapHighlight = false;
        this.hidden = false;
        this.checkIcon = "check";
        this.isTouch = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["isTouch"]);
      }
      /**
       * Focuses the menu item.
       */
      focusItem() {
        var _a2;
        return __awaiter$b(this, void 0, void 0, function* () {
          (_a2 = this.menuItem) === null || _a2 === void 0 ? void 0 : _a2.focus();
        });
      }
      /**
       * Removes focus from the menu item.
       */
      blurItem() {
        var _a2;
        return __awaiter$b(this, void 0, void 0, function* () {
          (_a2 = this.menuItem) === null || _a2 === void 0 ? void 0 : _a2.blur();
        });
      }
      /**
       * Returns the height of the menu item.
       */
      getHeight() {
        return __awaiter$b(this, void 0, void 0, function* () {
          return parseFloat(this.menuItem ? window.getComputedStyle(this.menuItem).height : "0");
        });
      }
      onClick() {
        if (!isNil(this.menu))
          this.menu.active = !this.expanded;
      }
      onFocus() {
        this.vmFocus.emit();
      }
      onBlur() {
        this.vmBlur.emit();
      }
      onTouchStart() {
        this.showTapHighlight = true;
      }
      onTouchEnd() {
        setTimeout(() => {
          this.showTapHighlight = false;
        }, 100);
      }
      onMouseLeave() {
        var _a2;
        (_a2 = this.menuItem) === null || _a2 === void 0 ? void 0 : _a2.blur();
      }
      render() {
        var _a2, _b2, _c, _d;
        const isCheckedDefined = !isUndefined(this.checked);
        const isMenuDefined = !isUndefined(this.menu);
        const hasExpanded = this.expanded ? "true" : "false";
        const isChecked = this.checked ? "true" : "false";
        const showCheckedIcon = isCheckedDefined && !isUndefined(this.checkIcon);
        const showLeftNavArrow = isMenuDefined && this.expanded;
        const showRightNavArrow = isMenuDefined && !this.expanded;
        const showHint = !isUndefined(this.hint) && !isCheckedDefined && (!isMenuDefined || !this.expanded);
        const showBadge = !isUndefined(this.badge) && !showHint && !showRightNavArrow;
        const hasSpacer = showHint || showRightNavArrow;
        return h("div", { class: {
          menuItem: true,
          notTouch: !this.isTouch,
          tapHighlight: this.showTapHighlight,
          showDivider: isMenuDefined && ((_a2 = this.expanded) !== null && _a2 !== void 0 ? _a2 : false)
        }, id: this.identifier, role: isCheckedDefined ? "menuitemradio" : "menuitem", tabindex: "0", "aria-label": this.label, "aria-hidden": this.hidden ? "true" : "false", "aria-haspopup": isMenuDefined ? "true" : void 0, "aria-controls": (_c = (_b2 = this.menu) === null || _b2 === void 0 ? void 0 : _b2.identifier) !== null && _c !== void 0 ? _c : (_d = this.menu) === null || _d === void 0 ? void 0 : _d.id, "aria-expanded": isMenuDefined ? hasExpanded : void 0, "aria-checked": isCheckedDefined ? isChecked : void 0, onClick: this.onClick.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this), onMouseLeave: this.onMouseLeave.bind(this), ref: (el) => {
          this.menuItem = el;
        } }, showCheckedIcon && h("vm-icon", { name: this.checkIcon, library: this.icons }), showLeftNavArrow && h("span", { class: "arrow left" }), this.label, hasSpacer && h("span", { class: "spacer" }), showHint && h("span", { class: "hint" }, this.hint), showBadge && h("span", { class: "badge" }, this.badge), showRightNavArrow && h("span", { class: "arrow right" }));
      }
      get host() {
        return this;
      }
      static get style() {
        return menuItemCss;
      }
    };
    MenuRadio = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmCheck = createEvent(this, "vmCheck", 7);
        this.checked = false;
        this.checkIcon = "check";
        withComponentRegistry(this);
      }
      onClick() {
        this.checked = true;
        this.vmCheck.emit();
      }
      render() {
        return h("vm-menu-item", { label: this.label, checked: this.checked, badge: this.badge, checkIcon: this.checkIcon, icons: this.icons, onClick: this.onClick.bind(this) });
      }
    };
    MenuRadioGroup = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmCheck = createEvent(this, "vmCheck", 7);
        withComponentRegistry(this);
      }
      onValueChange() {
        var _a2;
        (_a2 = this.findRadios()) === null || _a2 === void 0 ? void 0 : _a2.forEach((radio) => {
          radio.checked = radio.value === this.value;
        });
      }
      connectedCallback() {
        this.onValueChange();
      }
      componentDidLoad() {
        this.onValueChange();
      }
      onSelectionChange(event) {
        const radio = event.target;
        this.value = radio.value;
      }
      findRadios() {
        var _a2;
        return (_a2 = this.host.shadowRoot.querySelector("slot")) === null || _a2 === void 0 ? void 0 : _a2.assignedElements();
      }
      render() {
        return h("slot", null);
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "value": ["onValueChange"]
        };
      }
    };
    MuteControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        this.lowVolumeIcon = "volume-low";
        this.highVolumeIcon = "volume-high";
        this.mutedIcon = "volume-mute";
        this.tooltipPosition = "top";
        this.hideTooltip = false;
        this.keys = "m";
        this.volume = 50;
        this.muted = false;
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ["muted", "volume", "i18n"]);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
      }
      getIcon() {
        const volumeIcon = this.volume < 50 ? this.lowVolumeIcon : this.highVolumeIcon;
        return this.muted || this.volume === 0 ? this.mutedIcon : volumeIcon;
      }
      onClick() {
        this.dispatch("muted", !this.muted);
      }
      render() {
        const tooltip = this.muted ? this.i18n.unmute : this.i18n.mute;
        const tooltipWithHint = !isUndefined(this.keys) ? `${tooltip} (${this.keys})` : tooltip;
        return h("vm-control", { label: this.i18n.mute, pressed: this.muted, keys: this.keys, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.getIcon(), library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint));
      }
    };
    pipControlCss = ":host([hidden]){display:none}";
    __awaiter$a = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    PiPControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.canSetPiP = false;
        this.enterIcon = "pip-enter";
        this.exitIcon = "pip-exit";
        this.tooltipPosition = "top";
        this.hideTooltip = false;
        this.keys = "p";
        this.isPiPActive = false;
        this.i18n = {};
        this.playbackReady = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["isPiPActive", "playbackReady", "i18n"]);
      }
      onPlaybackReadyChange() {
        var _a2;
        return __awaiter$a(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canSetPiP = (_a2 = yield player === null || player === void 0 ? void 0 : player.canSetPiP()) !== null && _a2 !== void 0 ? _a2 : false;
        });
      }
      componentDidLoad() {
        this.onPlaybackReadyChange();
      }
      onClick() {
        const player = getPlayerFromRegistry(this);
        !this.isPiPActive ? player === null || player === void 0 ? void 0 : player.enterPiP() : player === null || player === void 0 ? void 0 : player.exitPiP();
      }
      render() {
        const tooltip = this.isPiPActive ? this.i18n.exitPiP : this.i18n.enterPiP;
        const tooltipWithHint = !isUndefined(this.keys) ? `${tooltip} (${this.keys})` : tooltip;
        return h(Host, { hidden: !this.canSetPiP }, h("vm-control", { label: this.i18n.pip, keys: this.keys, pressed: this.isPiPActive, hidden: !this.canSetPiP, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.isPiPActive ? this.exitIcon : this.enterIcon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint)));
      }
      static get watchers() {
        return {
          "playbackReady": ["onPlaybackReadyChange"]
        };
      }
      static get style() {
        return pipControlCss;
      }
    };
    PlaybackControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.playIcon = "play";
        this.pauseIcon = "pause";
        this.tooltipPosition = "top";
        this.hideTooltip = false;
        this.keys = "k";
        this.paused = true;
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ["paused", "i18n"]);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
      }
      onClick() {
        this.dispatch("paused", !this.paused);
      }
      render() {
        const tooltip = this.paused ? this.i18n.play : this.i18n.pause;
        const tooltipWithHint = !isUndefined(this.keys) ? `${tooltip} (${this.keys})` : tooltip;
        return h("vm-control", { label: this.i18n.playback, keys: this.keys, pressed: !this.paused, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.paused ? this.playIcon : this.pauseIcon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint));
      }
    };
    Logger = class {
      constructor() {
        this.silent = false;
      }
      log(...args) {
        if (!this.silent && !isUndefined(console))
          console.log("[Vime tip]:", ...args);
      }
      warn(...args) {
        if (!this.silent && !isUndefined(console))
          console.error("[Vime warn]:", ...args);
      }
    };
    players = /* @__PURE__ */ new Set();
    __awaiter$9 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    immediateAdapterCall = /* @__PURE__ */ new Set(["currentTime", "paused"]);
    playerCss = ".player{box-sizing:border-box;direction:ltr;font-family:var(--vm-player-font-family);-moz-osx-font-smoothing:auto;-webkit-font-smoothing:subpixel-antialiased;-webkit-tap-highlight-color:transparent;font-variant-numeric:tabular-nums;font-weight:500;line-height:1.7;width:100%;display:block;max-width:100%;min-width:275px;min-height:40px;position:relative;text-shadow:none;outline:0;transition:box-shadow 0.3s ease;box-shadow:var(--vm-player-box-shadow);border-radius:var(--vm-player-border-radius)}.player.idle{cursor:none}.player.audio{background-color:transparent !important}.player.video{height:0;overflow:hidden;background-color:var(--vm-player-bg, #000)}.player.fullscreen{margin:0;border-radius:0;width:100%;height:100%;padding-bottom:0 !important}.blocker{position:absolute;top:0;left:0;width:100%;height:100%;display:inline-block;z-index:var(--vm-blocker-z-index)}";
    __awaiter$8 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    idCount$3 = 0;
    Player = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmThemeChange = createEvent(this, "vmThemeChange", 7);
        this.vmPausedChange = createEvent(this, "vmPausedChange", 7);
        this.vmPlay = createEvent(this, "vmPlay", 7);
        this.vmPlayingChange = createEvent(this, "vmPlayingChange", 7);
        this.vmSeekingChange = createEvent(this, "vmSeekingChange", 7);
        this.vmSeeked = createEvent(this, "vmSeeked", 7);
        this.vmBufferingChange = createEvent(this, "vmBufferingChange", 7);
        this.vmDurationChange = createEvent(this, "vmDurationChange", 7);
        this.vmCurrentTimeChange = createEvent(this, "vmCurrentTimeChange", 7);
        this.vmReady = createEvent(this, "vmReady", 7);
        this.vmPlaybackReady = createEvent(this, "vmPlaybackReady", 7);
        this.vmPlaybackStarted = createEvent(this, "vmPlaybackStarted", 7);
        this.vmPlaybackEnded = createEvent(this, "vmPlaybackEnded", 7);
        this.vmBufferedChange = createEvent(this, "vmBufferedChange", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmCurrentProviderChange = createEvent(this, "vmCurrentProviderChange", 7);
        this.vmCurrentSrcChange = createEvent(this, "vmCurrentSrcChange", 7);
        this.vmCurrentPosterChange = createEvent(this, "vmCurrentPosterChange", 7);
        this.vmMediaTitleChange = createEvent(this, "vmMediaTitleChange", 7);
        this.vmControlsChange = createEvent(this, "vmControlsChange", 7);
        this.vmPlaybackRateChange = createEvent(this, "vmPlaybackRateChange", 7);
        this.vmPlaybackRatesChange = createEvent(this, "vmPlaybackRatesChange", 7);
        this.vmPlaybackQualityChange = createEvent(this, "vmPlaybackQualityChange", 7);
        this.vmPlaybackQualitiesChange = createEvent(this, "vmPlaybackQualitiesChange", 7);
        this.vmMutedChange = createEvent(this, "vmMutedChange", 7);
        this.vmVolumeChange = createEvent(this, "vmVolumeChange", 7);
        this.vmViewTypeChange = createEvent(this, "vmViewTypeChange", 7);
        this.vmMediaTypeChange = createEvent(this, "vmMediaTypeChange", 7);
        this.vmLiveChange = createEvent(this, "vmLiveChange", 7);
        this.vmTouchChange = createEvent(this, "vmTouchChange", 7);
        this.vmLanguageChange = createEvent(this, "vmLanguageChange", 7);
        this.vmI18nChange = createEvent(this, "vmI18nChange", 7);
        this.vmTranslationsChange = createEvent(this, "vmTranslationsChange", 7);
        this.vmLanguagesChange = createEvent(this, "vmLanguagesChange", 7);
        this.vmFullscreenChange = createEvent(this, "vmFullscreenChange", 7);
        this.vmPiPChange = createEvent(this, "vmPiPChange", 7);
        this.vmTextTracksChange = createEvent(this, "vmTextTracksChange", 7);
        this.vmCurrentTextTrackChange = createEvent(this, "vmCurrentTextTrackChange", 7);
        this.vmTextTrackVisibleChange = createEvent(this, "vmTextTrackVisibleChange", 7);
        this.vmAudioTracksChange = createEvent(this, "vmAudioTracksChange", 7);
        this.vmCurrentAudioTrackChange = createEvent(this, "vmCurrentAudioTrackChange", 7);
        this.disposal = new Disposal();
        this.logger = new Logger();
        this.icons = "vime";
        this.paused = true;
        this.playing = false;
        this.duration = -1;
        this.currentTime = 0;
        this.autoplay = false;
        this.ready = false;
        this.playbackReady = false;
        this.loop = false;
        this.muted = false;
        this.buffered = 0;
        this.playbackRate = 1;
        this.lastRateCheck = 1;
        this.playbackRates = [1];
        this.playbackQualities = [];
        this.seeking = false;
        this.debug = false;
        this.playbackStarted = false;
        this.playbackEnded = false;
        this.buffering = false;
        this.controls = false;
        this.isControlsActive = false;
        this.isSettingsActive = false;
        this.volume = 50;
        this.isFullscreenActive = false;
        this.aspectRatio = "16:9";
        this.isAudioView = false;
        this.isVideoView = false;
        this.isAudio = false;
        this.isVideo = false;
        this.isLive = false;
        this.isMobile = false;
        this.isTouch = false;
        this.isPiPActive = false;
        this.textTracks = [];
        this.currentTextTrack = -1;
        this.isTextTrackVisible = true;
        this.shouldRenderNativeTextTracks = true;
        this.audioTracks = [];
        this.currentAudioTrack = -1;
        this.autopause = true;
        this.playsinline = false;
        this.language = "en";
        this.translations = { en };
        this.languages = ["en"];
        this.i18n = en;
        withFindPlayer(this);
        withComponentRegistrar(this);
        withAutopause(this);
        withProviderHost(this);
        withPlayerEvents(this);
        this.safeAdapterCall = withPlayerScheduler(this);
      }
      get adapter() {
        var _a2;
        return (_a2 = this.provider) === null || _a2 === void 0 ? void 0 : _a2.getAdapter();
      }
      onContainerChange() {
        var _a2;
        (_a2 = this.fullscreenController) === null || _a2 === void 0 ? void 0 : _a2.destroy();
        if (isUndefined(this.container))
          return;
        this.fullscreenController = new FullscreenController(this.container);
        this.fullscreenController.on("change", (isActive) => {
          this.isFullscreenActive = isActive;
          if (isActive)
            this.rotateDevice();
        });
        this.fullscreenController.on("error", (error2) => {
          this.vmError.emit(error2);
        });
      }
      onPausedChange() {
        if (this.paused) {
          this.playing = false;
        } else {
          autopause(this);
        }
        this.safeAdapterCall("paused", !this.paused ? "play" : "pause");
      }
      onDurationChange() {
        this.isLive = this.duration === Infinity;
      }
      onCurrentTimeChange() {
        const duration = this.playbackReady ? this.duration : Infinity;
        this.currentTime = Math.max(0, Math.min(this.currentTime, duration));
        this.safeAdapterCall("currentTime", "setCurrentTime");
      }
      onPlaybackReadyChange() {
        if (!this.ready)
          this.ready = true;
      }
      onMutedChange() {
        this.safeAdapterCall("muted", "setMuted");
      }
      onPlaybackRateChange(newRate, prevRate) {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (newRate === this.lastRateCheck)
            return;
          if (!(yield (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.canSetPlaybackRate) === null || _b2 === void 0 ? void 0 : _b2.call(_a2))) {
            this.logger.log("provider cannot change `playbackRate`.");
            this.lastRateCheck = prevRate;
            this.playbackRate = prevRate;
            return;
          }
          if (!this.playbackRates.includes(newRate)) {
            this.logger.log(`invalid \`playbackRate\` of ${newRate}, valid values are [${this.playbackRates.join(", ")}]`);
            this.lastRateCheck = prevRate;
            this.playbackRate = prevRate;
            return;
          }
          this.lastRateCheck = newRate;
          this.safeAdapterCall("playbackRate", "setPlaybackRate");
        });
      }
      onPlaybackQualityChange(newQuality, prevQuality) {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (isUndefined(newQuality) || newQuality === this.lastQualityCheck)
            return;
          if (!(yield (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.canSetPlaybackQuality) === null || _b2 === void 0 ? void 0 : _b2.call(_a2))) {
            this.logger.log("provider cannot change `playbackQuality`.");
            this.lastQualityCheck = prevQuality;
            this.playbackQuality = prevQuality;
            return;
          }
          if (!this.playbackQualities.includes(newQuality)) {
            this.logger.log(`invalid \`playbackQuality\` of ${newQuality}, valid values are [${this.playbackQualities.join(", ")}]`);
            this.lastQualityCheck = prevQuality;
            this.playbackQuality = prevQuality;
            return;
          }
          this.lastQualityCheck = newQuality;
          this.safeAdapterCall("playbackQuality", "setPlaybackQuality");
        });
      }
      onDebugChange() {
        this.logger.silent = !this.debug;
      }
      onVolumeChange() {
        return __awaiter$8(this, void 0, void 0, function* () {
          this.volume = Math.max(0, Math.min(this.volume, 100));
          this.safeAdapterCall("volume", "setVolume");
        });
      }
      onViewTypeChange() {
        this.isAudioView = this.viewType === ViewType.Audio;
        this.isVideoView = this.viewType === ViewType.Video;
      }
      onMediaTypeChange() {
        this.isAudio = this.mediaType === MediaType.Audio;
        this.isVideo = this.mediaType === MediaType.Video;
      }
      onLanguageChange(_, prevLanguage) {
        if (!this.languages.includes(this.language)) {
          this.logger.log(`invalid \`language\` of ${this.language}, valid values are [${this.languages.join(", ")}]`);
          this.language = prevLanguage;
          return;
        }
        this.i18n = this.translations[this.language];
      }
      onTranslationsChange() {
        Object.assign(this.translations, { en });
        this.languages = Object.keys(this.translations);
        this.i18n = this.translations[this.language];
      }
      onError(event) {
        this.logger.warn(event.detail);
      }
      /**
       * ------------------------------------------------------
       * Methods
       * ------------------------------------------------------
       */
      /** @inheritDoc */
      getProvider() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return this.provider;
        });
      }
      /** @internal */
      getAdapter() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return this.adapter;
        });
      }
      /** @inheritDoc */
      play() {
        var _a2;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.play();
        });
      }
      /** @inheritDoc */
      pause() {
        var _a2;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.pause();
        });
      }
      /** @inheritDoc */
      canPlay(type) {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.canPlay(type)) !== null && _b2 !== void 0 ? _b2 : false;
        });
      }
      /** @inheritDoc */
      canAutoplay() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return canAutoplay();
        });
      }
      /** @inheritDoc */
      canMutedAutoplay() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return canAutoplay(true);
        });
      }
      /** @inheritDoc */
      canSetPlaybackRate() {
        var _a2, _b2, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_c = (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.canSetPlaybackRate) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)) !== null && _c !== void 0 ? _c : false;
        });
      }
      /** @inheritDoc */
      canSetPlaybackQuality() {
        var _a2, _b2, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_c = (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.canSetPlaybackQuality) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)) !== null && _c !== void 0 ? _c : false;
        });
      }
      /** @inheritDoc */
      canSetFullscreen() {
        var _a2, _b2, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          return this.fullscreenController.isSupported || ((_c = (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.canSetFullscreen) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)) !== null && _c !== void 0 ? _c : false);
        });
      }
      /** @inheritDoc */
      enterFullscreen(options2) {
        var _a2, _b2, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (!this.isVideoView) {
            throw Error("Cannot enter fullscreen on an audio player view.");
          }
          if (this.fullscreenController.isSupported) {
            return this.fullscreenController.requestFullscreen();
          }
          const adapter = yield this.adapter;
          const canProviderSetFullscreen = (_b2 = yield (_a2 = adapter === null || adapter === void 0 ? void 0 : adapter.canSetFullscreen) === null || _a2 === void 0 ? void 0 : _a2.call(adapter)) !== null && _b2 !== void 0 ? _b2 : false;
          if (canProviderSetFullscreen) {
            return (_c = adapter === null || adapter === void 0 ? void 0 : adapter.enterFullscreen) === null || _c === void 0 ? void 0 : _c.call(adapter, options2);
          }
          throw Error("Fullscreen API is not available.");
        });
      }
      /** @inheritDoc */
      exitFullscreen() {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (this.fullscreenController.isSupported) {
            return this.fullscreenController.exitFullscreen();
          }
          return (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.exitFullscreen) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
        });
      }
      /** @inheritDoc */
      canSetPiP() {
        var _a2, _b2, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_c = (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.canSetPiP) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)) !== null && _c !== void 0 ? _c : false;
        });
      }
      /** @inheritDoc */
      enterPiP() {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (!this.isVideoView)
            throw Error("Cannot enter PiP mode on an audio player view.");
          if (!(yield this.canSetPiP()))
            throw Error("Picture-in-Picture API is not available.");
          return (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.enterPiP) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
        });
      }
      /** @inheritDoc */
      exitPiP() {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.exitPiP) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
        });
      }
      /** @inheritDoc */
      canSetAudioTrack() {
        var _a2;
        return __awaiter$8(this, void 0, void 0, function* () {
          return !isUndefined((_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.setCurrentAudioTrack);
        });
      }
      /** @inheritDoc */
      setCurrentAudioTrack(trackId) {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.setCurrentAudioTrack) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, trackId);
        });
      }
      /** @inheritDoc */
      canSetTextTrack() {
        var _a2;
        return __awaiter$8(this, void 0, void 0, function* () {
          return !isUndefined((_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.setCurrentTextTrack);
        });
      }
      /** @inheritDoc */
      setCurrentTextTrack(trackId) {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.setCurrentTextTrack) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, trackId);
        });
      }
      /** @inheritDoc */
      canSetTextTrackVisibility() {
        var _a2;
        return __awaiter$8(this, void 0, void 0, function* () {
          return !isUndefined((_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.setTextTrackVisibility);
        });
      }
      /** @inheritDoc */
      setTextTrackVisibility(isVisible) {
        var _a2, _b2;
        return __awaiter$8(this, void 0, void 0, function* () {
          (_b2 = (_a2 = yield this.adapter) === null || _a2 === void 0 ? void 0 : _a2.setTextTrackVisibility) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, isVisible);
        });
      }
      /** @inheritDoc */
      extendLanguage(language, translation) {
        var _a2;
        return __awaiter$8(this, void 0, void 0, function* () {
          const translations = Object.assign(Object.assign({}, this.translations), { [language]: Object.assign(Object.assign({}, (_a2 = this.translations[language]) !== null && _a2 !== void 0 ? _a2 : {}), translation) });
          this.translations = translations;
        });
      }
      connectedCallback() {
        this.onPausedChange();
        this.onCurrentTimeChange();
        this.onVolumeChange();
        this.onMutedChange();
        this.onDebugChange();
        this.onContainerChange();
        this.onTranslationsChange();
        this.onLanguageChange(this.language, initialState.language);
        this.disposal.add(onMobileChange((isMobile) => {
          this.isMobile = isMobile;
        }));
        this.disposal.add(onTouchInputChange((isTouch) => {
          this.isTouch = isTouch;
        }));
      }
      componentWillLoad() {
        Universe.create(this, this.getPlayerState());
      }
      disconnectedCallback() {
        var _a2;
        (_a2 = this.fullscreenController) === null || _a2 === void 0 ? void 0 : _a2.destroy();
        this.disposal.empty();
      }
      rotateDevice() {
        return __awaiter$8(this, void 0, void 0, function* () {
          if (!this.isMobile || !canRotateScreen())
            return;
          try {
            if (this.isFullscreenActive) {
              yield window.screen.orientation.lock("landscape");
            } else {
              yield window.screen.orientation.unlock();
            }
          } catch (err) {
            this.vmError.emit(err);
          }
        });
      }
      getPlayerState() {
        const state = {};
        const props = Object.keys(initialState);
        for (let i2 = 0; i2 < props.length; i2 += 1) {
          state[props[i2]] = this[props[i2]];
        }
        return state;
      }
      calcAspectRatio() {
        const [width, height] = /\d{1,2}:\d{1,2}/.test(this.aspectRatio) ? this.aspectRatio.split(":") : [16, 9];
        return 100 / Number(width) * Number(height);
      }
      /**
       * Returns the inner container.
       */
      getContainer() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return this.container;
        });
      }
      /** @internal Exposed for E2E testing. */
      callAdapter(method, value) {
        return __awaiter$8(this, void 0, void 0, function* () {
          return (yield this.adapter)[method](value);
        });
      }
      hasCustomControls() {
        return isComponentRegistered(this, "vm-controls");
      }
      genId() {
        var _a2;
        const id = (_a2 = this.host) === null || _a2 === void 0 ? void 0 : _a2.id;
        if (isString(id) && id.length > 0)
          return id;
        idCount$3 += 1;
        return `vm-player-${idCount$3}`;
      }
      render() {
        const label = `${this.isAudioView ? "Audio Player" : "Video Player"}${!isUndefined(this.mediaTitle) ? ` - ${this.mediaTitle}` : ""}`;
        const canShowCustomUI = !IS_IOS || !this.isVideoView || this.playsinline && !this.isFullscreenActive;
        if (!canShowCustomUI) {
          this.controls = true;
        }
        const isIdle = canShowCustomUI && this.hasCustomControls() && this.isVideoView && !this.paused && !this.isControlsActive;
        const isBlockerVisible = !this.controls && canShowCustomUI && this.isVideoView;
        return h(Host, { id: this.genId(), idle: isIdle, mobile: this.isMobile, touch: this.isTouch, live: this.isLive, audio: this.isAudioView, video: this.isVideoView, pip: this.isPiPActive, fullscreen: this.isFullscreenActive }, h("div", { "aria-label": label, "aria-hidden": !this.ready ? "true" : "false", "aria-busy": !this.playbackReady ? "true" : "false", class: {
          player: true,
          idle: isIdle,
          audio: this.isAudioView,
          video: this.isVideoView,
          fullscreen: this.isFullscreenActive
        }, style: {
          paddingBottom: this.isVideoView ? `${this.calcAspectRatio()}%` : void 0
        }, ref: (el) => {
          writeTask(() => {
            this.container = el;
          });
        } }, isBlockerVisible && h("div", { class: "blocker" }), h(Universe.Provider, { state: this.getPlayerState() }, h("slot", null))));
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "container": ["onContainerChange"],
          "paused": ["onPausedChange"],
          "duration": ["onDurationChange"],
          "currentTime": ["onCurrentTimeChange"],
          "playbackReady": ["onPlaybackReadyChange"],
          "muted": ["onMutedChange"],
          "playbackRate": ["onPlaybackRateChange"],
          "playbackQuality": ["onPlaybackQualityChange"],
          "debug": ["onDebugChange"],
          "volume": ["onVolumeChange"],
          "viewType": ["onViewTypeChange"],
          "isAudioView": ["onViewTypeChange"],
          "isVideoView": ["onViewTypeChange"],
          "mediaType": ["onMediaTypeChange"],
          "language": ["onLanguageChange"],
          "translations": ["onTranslationsChange"]
        };
      }
      static get style() {
        return playerCss;
      }
    };
    posterCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-poster-z-index)}.poster{width:100%;height:100%;background:#000;opacity:0;visibility:hidden;pointer-events:none;transition:var(--vm-fade-transition)}.poster.hidden{display:none}.poster.active{opacity:1;visibility:visible}img{width:100%;height:100%;pointer-events:none}";
    Poster = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoaded = createEvent(this, "vmLoaded", 3);
        this.vmWillShow = createEvent(this, "vmWillShow", 3);
        this.vmWillHide = createEvent(this, "vmWillHide", 3);
        this.isHidden = true;
        this.isActive = false;
        this.hasLoaded = false;
        this.fit = "cover";
        this.isVideoView = false;
        this.playbackStarted = false;
        this.currentTime = 0;
        withComponentRegistry(this);
        withPlayerContext(this, [
          "mediaTitle",
          "currentPoster",
          "playbackStarted",
          "currentTime",
          "isVideoView"
        ]);
      }
      onCurrentPosterChange() {
        var _a2;
        this.hasLoaded = false;
        (_a2 = this.lazyLoader) === null || _a2 === void 0 ? void 0 : _a2.onMutation();
      }
      connectedCallback() {
        this.lazyLoader = new LazyLoader(this.host, ["data-src", "src"], (el) => {
          const src = el.getAttribute("data-src");
          el.removeAttribute("src");
          if (!isNull(src)) {
            el.setAttribute("src", src);
          }
        });
        this.onEnabledChange();
        this.onActiveChange();
      }
      disconnectedCallback() {
        this.lazyLoader.destroy();
      }
      onVisibilityChange() {
        !this.isHidden && this.isActive ? this.vmWillShow.emit() : this.vmWillHide.emit();
      }
      onEnabledChange() {
        this.isHidden = !this.isVideoView;
        this.onVisibilityChange();
      }
      onActiveChange() {
        this.isActive = !this.playbackStarted || this.currentTime <= 0.1;
        this.onVisibilityChange();
      }
      onPosterLoad() {
        this.vmLoaded.emit();
        this.hasLoaded = true;
      }
      render() {
        return h("div", { class: {
          poster: true,
          hidden: this.isHidden,
          active: this.isActive && this.hasLoaded
        } }, h("img", { class: "lazy", "data-src": this.currentPoster, alt: !isUndefined(this.mediaTitle) ? `${this.mediaTitle} Poster` : "Media Poster", style: { objectFit: this.fit }, onLoad: this.onPosterLoad.bind(this) }));
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "currentPoster": ["onCurrentPosterChange"],
          "isVideoView": ["onEnabledChange"],
          "currentTime": ["onActiveChange"],
          "playbackStarted": ["onActiveChange"]
        };
      }
      static get style() {
        return posterCss;
      }
    };
    scrimCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-scrim-z-index)}.scrim{position:absolute;width:100%;background:var(--vm-scrim-bg);display:inline-block;opacity:0;visibility:hidden;transition:var(--vm-fade-transition)}.scrim.gradient{height:258px;background:none;background-position:bottom;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAECCAYAAAA/9r2TAAABKklEQVQ4T2XI50cFABiF8dvee++67b33uM17b1MkkSSSSBJJJIkkkkQSSSKJ9Efmeb8cr86HH88JBP4thkfEkiKOFPGkSCCNRE8SKZJJkUIaqZ40UqSTIoMUmaSR5ckmRQ4pckkjz5NPigJSFJKiiDSKPSWkKCVFGWmUeypIUUmKKlJUk0aNJ0iKWlLUkUa9p4EUjaRoIkUzabR4WknRRop20ujwdJKiixTdpOghjV5PHyn6STFAGoOeIVIMk2KEFKOkMeYZJ8UEKUKkMemZIsU0KWZIMUsac54wKSKkiJLGvGeBFIukWCLFMrkCq7AG67ABm7AF27ADu7AH+3AAh3AEx3ACp3AG53ABl3AF13ADt3AH9/AAj/AEz/ACr/AG7/ABn/AF3/ADv39LujSyJPVJ0QAAAABJRU5ErkJggg==')}.scrim.gradientUp{top:unset;bottom:0}.scrim.gradientDown{transform:rotate(180deg)}.scrim.hidden{display:none}.scrim.active{opacity:1;visibility:visible}";
    Scrim = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.isVideoView = false;
        this.isControlsActive = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["isVideoView", "isControlsActive"]);
      }
      render() {
        return h("div", { class: {
          scrim: true,
          gradient: !isUndefined(this.gradient),
          gradientUp: this.gradient === "up",
          gradientDown: this.gradient === "down",
          hidden: !this.isVideoView,
          active: this.isControlsActive
        } });
      }
      static get style() {
        return scrimCss;
      }
    };
    getHours = (value) => Math.trunc(value / 60 / 60 % 60);
    getMinutes = (value) => Math.trunc(value / 60 % 60);
    getSeconds = (value) => Math.trunc(value % 60);
    formatTime = (seconds = 0, alwaysShowHours = false) => {
      const format = (value) => `0${value}`.slice(-2);
      const hours = getHours(seconds);
      const mins = getMinutes(seconds);
      const secs = getSeconds(seconds);
      return `${alwaysShowHours || hours > 0 ? `${hours}:` : ""}${format(mins)}:${format(secs)}`;
    };
    scrubberControlCss = ":host{--vm-tooltip-spacing:var(--vm-scrubber-tooltip-spacing);flex:1;position:relative;cursor:pointer;pointer-events:auto;box-sizing:border-box;left:calc(var(--vm-slider-thumb-width) / 2);margin-right:var(--vm-slider-thumb-width);margin-bottom:var(--vm-slider-track-height)}@keyframes progress{to{background-position:var(--vm-scrubber-loading-stripe-size) 0}}.scrubber{position:relative;width:100%}vm-slider,progress{margin-left:calc(calc(var(--vm-slider-thumb-width) / 2) * -1);margin-right:calc(calc(var(--vm-slider-thumb-width) / 2) * -1);width:calc(100% + var(--vm-slider-thumb-width));height:var(--vm-slider-track-height)}vm-slider:hover,progress:hover{cursor:pointer}vm-slider{position:absolute;top:0;left:0;z-index:3}progress{-webkit-appearance:none;background:transparent;border:0;border-radius:100px;position:absolute;left:0;top:50%;padding:0;color:var(--vm-scrubber-buffered-bg);height:var(--vm-slider-track-height)}progress::-webkit-progress-bar{background:transparent}progress::-webkit-progress-value{background:currentColor;border-radius:100px;min-width:var(--vm-slider-track-height);transition:width 0.2s ease}progress::-moz-progress-bar{background:currentColor;border-radius:100px;min-width:var(--vm-slider-track-height);transition:width 0.2s ease}progress::-ms-fill{border-radius:100px;transition:width 0.2s ease}progress.loading{animation:progress 1s linear infinite;background-image:linear-gradient(\n    -45deg,\n    var(--vm-scrubber-loading-stripe-color) 25%,\n    transparent 25%,\n    transparent 50%,\n    var(--vm-scrubber-loading-stripe-color) 50%,\n    var(--vm-scrubber-loading-stripe-color) 75%,\n    transparent 75%,\n    transparent\n  );background-repeat:repeat-x;background-size:var(--vm-scrubber-loading-stripe-size)\n    var(--vm-scrubber-loading-stripe-size);color:transparent;background-color:transparent}";
    __awaiter$7 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    ScrubberControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.keyboardDisposal = new Disposal();
        this.timestamp = "";
        this.endTime = 0;
        this.alwaysShowHours = false;
        this.hideTooltip = false;
        this.currentTime = 0;
        this.duration = -1;
        this.noKeyboard = false;
        this.buffering = false;
        this.buffered = 0;
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, [
          "i18n",
          "currentTime",
          "duration",
          "buffering",
          "buffered"
        ]);
      }
      onNoKeyboardChange() {
        return __awaiter$7(this, void 0, void 0, function* () {
          this.keyboardDisposal.empty();
          if (this.noKeyboard)
            return;
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          const onKeyDown = (event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
              return;
            event.preventDefault();
            const isLeftArrow = event.key === "ArrowLeft";
            const seekTo = isLeftArrow ? Math.max(0, this.currentTime - 5) : Math.min(this.duration, this.currentTime + 5);
            this.dispatch("currentTime", seekTo);
          };
          this.keyboardDisposal.add(listen(player, "keydown", onKeyDown));
        });
      }
      onDurationChange() {
        this.endTime = Math.max(0, this.duration);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
        this.timestamp = formatTime(this.currentTime, this.alwaysShowHours);
        this.onNoKeyboardChange();
      }
      disconnectedCallback() {
        this.keyboardDisposal.empty();
      }
      setTooltipPosition(value) {
        var _a2, _b2;
        const tooltipRect = (_b2 = (_a2 = this.tooltip.shadowRoot) === null || _a2 === void 0 ? void 0 : _a2.querySelector(".tooltip")) === null || _b2 === void 0 ? void 0 : _b2.getBoundingClientRect();
        const bounds = this.slider.getBoundingClientRect();
        const thumbWidth = parseFloat(window.getComputedStyle(this.slider).getPropertyValue("--vm-slider-thumb-width"));
        const leftLimit = tooltipRect.width / 2 - thumbWidth / 2;
        const rightLimit = bounds.width - tooltipRect.width / 2 - thumbWidth / 2;
        const xPos = Math.max(leftLimit, Math.min(value, rightLimit));
        this.tooltip.style = `--vm-tooltip-left: ${xPos}px`;
      }
      onSeek(event) {
        this.dispatch("currentTime", event.detail);
      }
      onSeeking(event) {
        if (this.duration < 0 || this.tooltip.hidden)
          return;
        if (event.type === "mouseleave") {
          this.getSliderInput().blur();
          this.tooltip.active = false;
          return;
        }
        const rect = this.host.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, 100 / rect.width * (event.pageX - rect.left)));
        this.timestamp = formatTime(this.duration / 100 * percent, this.alwaysShowHours);
        this.setTooltipPosition(percent / 100 * rect.width);
        if (!this.tooltip.active) {
          this.getSliderInput().focus();
          this.tooltip.active = true;
        }
      }
      getSliderInput() {
        var _a2;
        return (_a2 = this.slider.shadowRoot) === null || _a2 === void 0 ? void 0 : _a2.querySelector("input");
      }
      render() {
        const sliderValueText = this.i18n.scrubberLabel.replace(/{currentTime}/, formatTime(this.currentTime)).replace(/{duration}/, formatTime(this.endTime));
        return h("div", { class: "scrubber", onMouseEnter: this.onSeeking.bind(this), onMouseLeave: this.onSeeking.bind(this), onMouseMove: this.onSeeking.bind(this), onTouchMove: () => {
          this.getSliderInput().focus();
        }, onTouchEnd: () => {
          this.getSliderInput().blur();
        } }, h("vm-slider", { step: 0.01, max: this.endTime, value: this.currentTime, label: this.i18n.scrubber, valueText: sliderValueText, onVmValueChange: this.onSeek.bind(this), ref: (el) => {
          this.slider = el;
        } }), h("progress", {
          class: {
            loading: this.buffering
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          min: 0,
          max: this.endTime,
          value: this.buffered,
          "aria-label": this.i18n.buffered,
          "aria-valuemin": "0",
          "aria-valuemax": this.endTime,
          "aria-valuenow": this.buffered,
          "aria-valuetext": `${(this.endTime > 0 ? this.buffered / this.endTime : 0).toFixed(0)}%`
        }, "% buffered"), h("vm-tooltip", { hidden: this.hideTooltip, ref: (el) => {
          this.tooltip = el;
        } }, this.timestamp));
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "noKeyboard": ["onNoKeyboardChange"],
          "duration": ["onDurationChange"]
        };
      }
      static get style() {
        return scrubberControlCss;
      }
    };
    settingsCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-menu-z-index)}.settings{position:absolute;opacity:0;pointer-events:none;overflow-x:hidden;overflow-y:auto;background-color:var(--vm-menu-bg);max-height:var(--vm-settings-max-height);border-radius:var(--vm-settings-border-radius);padding:var(--vm-settings-padding);box-shadow:var(--vm-settings-shadow);box-sizing:border-box;scrollbar-width:thin;scroll-behavior:smooth;scrollbar-color:var(--vm-settings-scroll-thumb-color)\n    var(--vm-settings-scroll-track-color);transform:translateY(8px);transition:var(--vm-settings-transition)}.container{display:block;width:var(--vm-settings-width);height:100%;position:relative;transition:width 0.25s ease-in, height 0.25s ease-in}.settings.hydrated{visibility:hidden !important}.settings::-webkit-scrollbar{width:var(--vm-settings-scroll-width)}.settings::-webkit-scrollbar-track{background:var(--vm-settings-scroll-track-color)}.settings::-webkit-scrollbar-thumb{border-radius:var(--vm-settings-scroll-width);background-color:var(--vm-settings-scroll-thumb-color);border:2px solid var(--vm-menu-bg)}.settings.active{transform:translateY(0);opacity:1;pointer-events:auto;visibility:visible !important}.settings.mobile{position:fixed;top:auto !important;left:0 !important;right:0 !important;bottom:0 !important;width:100%;min-height:56px;max-height:50%;border-radius:0;z-index:2147483647;transform:translateY(100%)}.settings.mobile.active{transform:translateY(0)}.settings.mobile>vm-menu{height:100% !important;overflow:auto !important}";
    __awaiter$6 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    idCount$2 = 0;
    Settings = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.disposal = new Disposal();
        this.menuHeight = 0;
        this.pin = "bottomRight";
        this.active = false;
        this.isMobile = false;
        this.isAudioView = false;
        withComponentRegistry(this);
        withControlsCollisionDetection(this);
        withPlayerContext(this, ["isMobile", "isAudioView"]);
      }
      onActiveChange() {
        this.dispatch("isSettingsActive", this.active);
        if (isUndefined(this.controller))
          return;
        this.controller.expanded = this.active;
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
        idCount$2 += 1;
        this.id = `vm-settings-${idCount$2}`;
      }
      disconnectedCallback() {
        this.disposal.empty();
      }
      /**
       * Sets the controller responsible for opening/closing this settings menu.
       */
      setController(controller) {
        return __awaiter$6(this, void 0, void 0, function* () {
          this.controller = controller;
          this.controller.menu = this.id;
          this.disposal.empty();
          this.disposal.add(listen(this.controller, "click", () => {
            this.active = !this.active;
          }));
          this.disposal.add(listen(this.controller, "keydown", (event) => {
            if (event.key !== "Enter")
              return;
            if (!this.active)
              this.menu.focusMenu();
          }));
        });
      }
      getPosition() {
        if (this.isAudioView) {
          return {
            right: "0",
            bottom: "calc(var(--vm-controls-height, 0) + 4px)"
          };
        }
        const pos = this.pin.split(/(?=[L|R])/).map((s2) => s2.toLowerCase());
        return {
          [pos.includes("top") ? "top" : "bottom"]: "var(--vm-controls-height, 0)",
          [pos.includes("left") ? "left" : "right"]: "8px"
        };
      }
      onOpen(event) {
        var _a2;
        if (((_a2 = event.detail) === null || _a2 === void 0 ? void 0 : _a2.identifier) !== this.id)
          return;
        this.active = true;
      }
      onClose(event) {
        var _a2;
        if (((_a2 = event.detail) === null || _a2 === void 0 ? void 0 : _a2.identifier) !== this.id)
          return;
        this.active = false;
      }
      onHeightChange(event) {
        this.menuHeight = event.detail;
      }
      render() {
        return h("div", { style: Object.assign({}, this.getPosition()), class: {
          settings: true,
          active: this.active,
          mobile: this.isMobile
        } }, h("div", { class: "container", style: { height: `${this.menuHeight}px` } }, h("vm-menu", { identifier: this.id, active: this.active, controller: this.controller, onVmOpen: this.onOpen.bind(this), onVmClose: this.onClose.bind(this), onVmMenuHeightChange: this.onHeightChange.bind(this), ref: (el) => {
          this.menu = el;
        } }, h("slot", null))));
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "active": ["onActiveChange"]
        };
      }
      static get style() {
        return settingsCss;
      }
    };
    settingsControlCss = ".settingsControl.hidden{display:none}.settingsControl{--vm-icon-transition:transform 0.3s ease}.settingsControl.active{--vm-icon-transform:rotate(90deg)}";
    __awaiter$5 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    idCount$1 = 0;
    SettingsControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.icon = "settings";
        this.tooltipPosition = "top";
        this.expanded = false;
        this.i18n = {};
        this.hideTooltip = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["i18n"]);
      }
      onComponentsChange() {
        if (!isUndefined(this.vmSettings)) {
          this.vmSettings.setController(this.host);
        }
      }
      connectedCallback() {
        idCount$1 += 1;
        this.id = `vm-settings-control-${idCount$1}`;
        watchComponentRegistry(this, "vm-settings", (regs) => {
          [this.vmSettings] = regs;
        });
      }
      /**
       * Focuses the control.
       */
      focusControl() {
        var _a2;
        return __awaiter$5(this, void 0, void 0, function* () {
          (_a2 = this.control) === null || _a2 === void 0 ? void 0 : _a2.focusControl();
        });
      }
      /**
       * Removes focus from the control.
       */
      blurControl() {
        var _a2;
        return __awaiter$5(this, void 0, void 0, function* () {
          (_a2 = this.control) === null || _a2 === void 0 ? void 0 : _a2.blurControl();
        });
      }
      render() {
        const hasSettings = !isUndefined(this.menu);
        return h("div", { class: {
          settingsControl: true,
          hidden: !hasSettings,
          active: hasSettings && this.expanded
        } }, h("vm-control", { identifier: this.id, menu: this.menu, hidden: !hasSettings, expanded: this.expanded, label: this.i18n.settings, ref: (control) => {
          this.control = control;
        } }, h("vm-icon", { name: this.icon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip || this.expanded, position: this.tooltipPosition, direction: this.tooltipDirection }, this.i18n.settings)));
      }
      get host() {
        return this;
      }
      static get watchers() {
        return {
          "vmSettings": ["onComponentsChange"]
        };
      }
      static get style() {
        return settingsControlCss;
      }
    };
    skeletonCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-skeleton-z-index)}@keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}.skeleton{width:100%;height:100%;display:flex;min-height:1rem;pointer-events:auto}.sheen.hidden{opacity:0;visibility:hidden;transition:var(--vm-fade-transition);pointer-events:none}.indicator{flex:1 1 auto;background:var(--vm-skeleton-color)}.skeleton.sheen .indicator{background:linear-gradient(\n    270deg,\n    var(--vm-skeleton-sheen-color),\n    var(--vm-skeleton-color),\n    var(--vm-skeleton-color),\n    var(--vm-skeleton-sheen-color)\n  );background-size:400% 100%;background-size:400% 100%;animation:sheen 8s ease-in-out infinite}";
    Skeleton = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.hidden = false;
        this.effect = "sheen";
        this.ready = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["ready"]);
      }
      onReadyChange() {
        if (!this.ready) {
          this.hidden = false;
        } else {
          setTimeout(() => {
            this.hidden = true;
          }, 500);
        }
      }
      render() {
        return h("div", { class: {
          skeleton: true,
          hidden: this.hidden,
          sheen: this.effect === "sheen"
        } }, h("div", { class: "indicator" }));
      }
      static get watchers() {
        return {
          "ready": ["onReadyChange"]
        };
      }
      static get style() {
        return skeletonCss;
      }
    };
    sliderCss = ":host{width:100%}.slider{width:100%}input{width:100%;-webkit-appearance:none;background:transparent;border:0;outline:0;cursor:pointer;box-sizing:border-box;border-radius:calc(var(--vm-slider-thumb-height) * 2);user-select:none;-webkit-user-select:none;touch-action:manipulation;color:var(--vm-slider-value-color);display:block;height:var(--vm-slider-track-height);margin:0;padding:0;transition:box-shadow 0.3s ease}input::-webkit-slider-runnable-track{background:transparent;border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none;background-image:linear-gradient(\n    to right,\n    currentColor var(--vm-value, 0%),\n    transparent var(--vm-value, 0%)\n  );background-color:var(--vm-slider-track-color)}input::-webkit-slider-thumb{opacity:0;background:var(--vm-slider-thumb-bg);border:0;border-radius:100%;position:relative;transition:all 0.2s ease;width:var(--vm-slider-thumb-width);height:var(--vm-slider-thumb-height);box-shadow:var(--vm-slider-thumb-shadow);-webkit-appearance:none;margin-top:calc(\n    0px -\n      calc(\n        calc(var(--vm-slider-thumb-height) - var(--vm-slider-track-height)) / 2\n      )\n  )}input::-moz-range-track{background:transparent;border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none;background-color:var(--vm-slider-track-color)}input::-moz-range-thumb{opacity:0;background:var(--vm-slider-thumb-bg);border:0;border-radius:100%;position:relative;transition:all 0.2s ease;width:var(--vm-slider-thumb-width);height:var(--vm-slider-thumb-height);box-shadow:var(--vm-slider-thumb-shadow)}input::-moz-range-progress{background:currentColor;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height)}input::-ms-track{border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none;color:transparent;background-color:var(--vm-slider-track-color)}input::-ms-fill-upper{background:transparent;border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none}input::-ms-fill-lower{border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none;background:currentColor}input::-ms-thumb{opacity:0;background:var(--vm-slider-thumb-bg);border:0;border-radius:100%;position:relative;transition:all 0.2s ease;width:var(--vm-slider-thumb-width);height:var(--vm-slider-thumb-height);box-shadow:var(--vm-slider-thumb-shadow);margin-top:0}input::-ms-tooltip{display:none}input:hover::-webkit-slider-runnable-track{height:var(--vm-slider-track-focused-height)}input:hover::-moz-range-track{height:var(--vm-slider-track-focused-height)}input:hover::-ms-track{height:var(--vm-slider-track-focused-height)}input:hover::-ms-fill-upper{height:var(--vm-slider-track-focused-height)}input:hover::-ms-fill-lower{height:var(--vm-slider-track-focused-height)}input:hover::-webkit-slider-thumb{opacity:1}input:hover::-moz-range-thumb{opacity:1}input:hover::-ms-thumb{opacity:1}input:focus{outline:0}input:focus::-webkit-slider-runnable-track{outline:0;height:var(--vm-slider-track-focused-height)}input:focus::-moz-range-track{outline:0;height:var(--vm-slider-track-focused-height)}input:focus::-ms-track{outline:0;height:var(--vm-slider-track-focused-height)}input::-moz-focus-outer{border:0}";
    Slider = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmValueChange = createEvent(this, "vmValueChange", 7);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        this.step = 1;
        this.min = 0;
        this.max = 10;
        this.value = 5;
        withComponentRegistry(this);
      }
      getPercentage() {
        return `${this.value / this.max * 100}%`;
      }
      onValueChange(event) {
        var _a2;
        const value = parseFloat((_a2 = event.target) === null || _a2 === void 0 ? void 0 : _a2.value);
        this.vmValueChange.emit(value);
      }
      calcTouchedValue(event) {
        const input = event.target;
        const touch = event.changedTouches[0];
        const min = parseFloat(input.getAttribute("min"));
        const max = parseFloat(input.getAttribute("max"));
        const step = parseFloat(input.getAttribute("step"));
        const delta = max - min;
        let percent;
        const clientRect = input.getBoundingClientRect();
        const sliderThumbWidth = parseFloat(window.getComputedStyle(this.host).getPropertyValue("--vm-slider-thumb-width"));
        const thumbWidth = 100 / clientRect.width * (sliderThumbWidth / 2) / 100;
        percent = 100 / clientRect.width * (touch.clientX - clientRect.left);
        percent = Math.max(0, Math.min(percent, 100));
        if (percent < 50) {
          percent -= (100 - percent * 2) * thumbWidth;
        } else if (percent > 50) {
          percent += (percent - 50) * 2 * thumbWidth;
        }
        const position = delta * (percent / 100);
        if (step >= 1) {
          return min + Math.round(position / step) * step;
        }
        return min + parseFloat(position.toFixed(2));
      }
      /**
       * Basically input[range="type"] on touch devices sucks (particularly iOS), so this helps make it
       * better.
       *
       * @see https://github.com/sampotts/rangetouch
       */
      onTouch(event) {
        const input = event.target;
        if (input.disabled)
          return;
        event.preventDefault();
        this.value = this.calcTouchedValue(event);
        this.vmValueChange.emit(this.value);
        input.dispatchEvent(new window.Event(event.type === "touchend" ? "change" : "input", {
          bubbles: true
        }));
      }
      render() {
        var _a2;
        return h("div", { class: "slider", style: {
          "--vm-value": this.getPercentage()
        } }, h("input", { type: "range", step: this.step, min: this.min, max: this.max, value: this.value, autocomplete: "off", "aria-label": this.label, "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.value, "aria-valuetext": (_a2 = this.valueText) !== null && _a2 !== void 0 ? _a2 : this.getPercentage(), "aria-orientation": "horizontal", onInput: this.onValueChange.bind(this), onFocus: () => {
          this.vmFocus.emit();
        }, onBlur: () => {
          this.vmBlur.emit();
        }, onTouchStart: this.onTouch.bind(this), onTouchMove: this.onTouch.bind(this), onTouchEnd: this.onTouch.bind(this) }));
      }
      get host() {
        return this;
      }
      static get style() {
        return sliderCss;
      }
    };
    spinnerCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-spinner-z-index)}.spinner{width:100%;height:100%;display:flex;justify-content:center;align-items:center;opacity:0;visibility:hidden;pointer-events:none;transition:var(--vm-fade-transition)}.spinner.hidden{display:none}.spinner.active{opacity:1;visibility:visible}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.spin{background:transparent;margin:60px auto;font-size:10px;position:relative;text-indent:-9999em;pointer-events:none;border-top:var(--vm-spinner-thickness) solid var(--vm-spinner-fill-color);border-left:var(--vm-spinner-thickness) solid var(--vm-spinner-fill-color);border-right:var(--vm-spinner-thickness) solid var(--vm-spinner-track-color);border-bottom:var(--vm-spinner-thickness) solid var(--vm-spinner-track-color);transform:translateZ(0)}.spin.active{animation:spin var(--vm-spinner-spin-duration) infinite\n    var(--vm-spinner-spin-timing-func)}.spin,.spin::after{border-radius:50%;width:var(--vm-spinner-width);height:var(--vm-spinner-height)}";
    Spinner = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmWillShow = createEvent(this, "vmWillShow", 3);
        this.vmWillHide = createEvent(this, "vmWillHide", 3);
        this.blacklist = [Provider.YouTube];
        this.isHidden = true;
        this.isActive = false;
        this.isVideoView = false;
        this.showWhenMediaLoading = false;
        this.playbackReady = false;
        this.buffering = false;
        withComponentRegistry(this);
        withPlayerContext(this, [
          "isVideoView",
          "buffering",
          "playbackReady",
          "currentProvider"
        ]);
      }
      onVideoViewChange() {
        this.isHidden = !this.isVideoView;
        this.onVisiblityChange();
      }
      onActiveChange() {
        this.isActive = this.buffering || this.showWhenMediaLoading && !this.playbackReady;
        this.onVisiblityChange();
      }
      onVisiblityChange() {
        !this.isHidden && this.isActive ? this.vmWillShow.emit() : this.vmWillHide.emit();
      }
      render() {
        return h("div", { class: {
          spinner: true,
          hidden: this.isHidden || this.blacklist.includes(this.currentProvider),
          active: this.isActive
        } }, h("div", { class: {
          spin: true,
          active: this.isActive
        } }, "Loading..."));
      }
      static get watchers() {
        return {
          "isVideoView": ["onVideoViewChange"],
          "buffering": ["onActiveChange"],
          "playbackReady": ["onActiveChange"]
        };
      }
      static get style() {
        return spinnerCss;
      }
    };
    __awaiter$4 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    idCount = 0;
    Submenu = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmOpenSubmenu = createEvent(this, "vmOpenSubmenu", 7);
        this.vmCloseSubmenu = createEvent(this, "vmCloseSubmenu", 7);
        this.slideInDirection = "right";
        this.active = false;
        withComponentRegistry(this);
      }
      connectedCallback() {
        this.genId();
      }
      /**
       * Returns the controller (`vm-menu-item`) for this submenu.
       */
      getController() {
        return __awaiter$4(this, void 0, void 0, function* () {
          return this.controller;
        });
      }
      /**
       * Returns the menu (`vm-menu`) for this submenu.
       */
      getMenu() {
        return __awaiter$4(this, void 0, void 0, function* () {
          return this.menu;
        });
      }
      /**
       * Returns the height of the submenu controller.
       */
      getControllerHeight() {
        var _a2, _b2;
        return __awaiter$4(this, void 0, void 0, function* () {
          return (_b2 = (_a2 = this.controller) === null || _a2 === void 0 ? void 0 : _a2.getHeight()) !== null && _b2 !== void 0 ? _b2 : 0;
        });
      }
      getControllerHeightSync() {
        var _a2;
        const el = (_a2 = this.controller) === null || _a2 === void 0 ? void 0 : _a2.shadowRoot.querySelector("[role='menuitem']");
        return el ? parseFloat(window.getComputedStyle(el).height) : 0;
      }
      onMenuOpen() {
        this.active = true;
        this.vmOpenSubmenu.emit(this.host);
      }
      onMenuClose() {
        this.active = false;
        this.vmCloseSubmenu.emit(this.host);
      }
      genId() {
        idCount += 1;
        this.id = `vm-submenu-${idCount}`;
      }
      getControllerId() {
        return `${this.id}-controller`;
      }
      render() {
        return h("div", null, h("vm-menu-item", { identifier: this.getControllerId(), menu: this.menu, label: this.label, hint: this.hint, expanded: this.active, ref: (el) => {
          writeTask(() => {
            this.controller = el;
          });
        } }), h("vm-menu", { identifier: this.id, controller: this.controller, active: this.active, slideInDirection: this.slideInDirection, onVmOpen: this.onMenuOpen.bind(this), onVmClose: this.onMenuClose.bind(this), ref: (el) => {
          writeTask(() => {
            this.menu = el;
          });
        }, style: { top: `${this.getControllerHeightSync() + 1}px` } }, h("slot", null)));
      }
      get host() {
        return this;
      }
    };
    timeCss = ".time{display:flex;align-items:center;color:var(--vm-time-color);font-size:var(--vm-time-font-size);font-weight:var(--vm-time-font-weight)}";
    Time = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.seconds = 0;
        this.alwaysShowHours = false;
        withComponentRegistry(this);
      }
      render() {
        return h("div", { class: "time", "aria-label": this.label }, formatTime(Math.max(0, this.seconds), this.alwaysShowHours));
      }
      static get style() {
        return timeCss;
      }
    };
    timeProgressCss = ".timeProgress{display:flex;width:100%;height:100%;align-items:center;color:var(--vm-time-color)}.separator{margin:0 4px}";
    TimeProgress = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.separator = "/";
        this.alwaysShowHours = false;
        withComponentRegistry(this);
      }
      render() {
        return h("div", { class: "timeProgress" }, h("vm-current-time", { alwaysShowHours: this.alwaysShowHours }), h("span", { class: "separator" }, this.separator), h("vm-end-time", { alwaysShowHours: this.alwaysShowHours }));
      }
      static get style() {
        return timeProgressCss;
      }
    };
    tooltipCss = ":host{display:contents;z-index:var(--vm-tooltip-z-index)}.tooltip{left:var(--vm-tooltip-left, 50%);transform:translateX(-50%);line-height:1.3;pointer-events:none;position:absolute;opacity:0;white-space:nowrap;visibility:hidden;background:var(--vm-tooltip-bg);border-radius:var(--vm-tooltip-border-radius);box-sizing:border-box;box-shadow:var(--vm-tooltip-box-shadow);color:var(--vm-tooltip-color);font-size:var(--vm-tooltip-font-size);padding:var(--vm-tooltip-padding);transition:opacity var(--vm-tooltip-fade-duration)\n    var(--vm-tooltip-fade-timing-func)}.tooltip[aria-hidden='false']{opacity:1;visibility:visible}.tooltip.hidden{display:none}.tooltip.onTop{bottom:100%;margin-bottom:var(--vm-tooltip-spacing)}.tooltip.onBottom{top:100%;margin-top:var(--vm-tooltip-spacing)}.tooltip.growLeft{left:auto;right:0;transform:none}.tooltip.growRight{left:0;transform:none}";
    tooltipIdCount = 0;
    Tooltip = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.hasLoaded = false;
        this.hidden = false;
        this.active = false;
        this.position = "top";
        this.isTouch = false;
        this.isMobile = false;
        withComponentRegistry(this);
        withPlayerContext(this, ["isTouch", "isMobile"]);
      }
      componentDidLoad() {
        this.hasLoaded = true;
      }
      getId() {
        const id = this.host.id;
        if (isString(id) && id.length > 0)
          return id;
        tooltipIdCount += 1;
        return `vm-tooltip-${tooltipIdCount}`;
      }
      render() {
        return h("div", { id: this.getId(), role: "tooltip", "aria-hidden": !this.active || this.isTouch || this.isMobile ? "true" : "false", class: {
          tooltip: true,
          hidden: !this.hasLoaded || this.hidden,
          onTop: this.position === "top",
          onBottom: this.position === "bottom",
          growLeft: this.direction === "left",
          growRight: this.direction === "right"
        } }, h("slot", null));
      }
      get host() {
        return this;
      }
      static get style() {
        return tooltipCss;
      }
    };
    uiCss = ":host{z-index:var(--vm-ui-z-index)}.ui{width:100%;pointer-events:none}.ui.hidden{display:none}.ui.video{position:absolute;top:0;left:0;height:100%}";
    UI = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.isVideoView = false;
        this.playsinline = false;
        this.isFullscreenActive = false;
        withComponentRegistry(this);
        withPlayerContext(this, [
          "isVideoView",
          "playsinline",
          "isFullscreenActive"
        ]);
      }
      render() {
        const canShowCustomUI = !IS_IOS || !this.isVideoView || this.playsinline && !this.isFullscreenActive;
        return h("div", { class: {
          ui: true,
          hidden: !canShowCustomUI,
          video: this.isVideoView
        } }, canShowCustomUI && h("slot", null));
      }
      static get style() {
        return uiCss;
      }
    };
    __awaiter$3 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Video = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        this.willAttach = false;
        this.hasCustomTextManager = false;
        this.preload = "metadata";
        withComponentRegistry(this);
        withProviderConnect(this);
      }
      onProviderConnect(event) {
        if (this.willAttach)
          event.stopImmediatePropagation();
      }
      onProviderDisconnect(event) {
        if (this.willAttach)
          event.stopImmediatePropagation();
      }
      /** @internal */
      getAdapter() {
        var _a2;
        return __awaiter$3(this, void 0, void 0, function* () {
          return (_a2 = this.fileProvider) === null || _a2 === void 0 ? void 0 : _a2.getAdapter();
        });
      }
      render() {
        return h("vm-file", { noConnect: true, willAttach: this.willAttach, crossOrigin: this.crossOrigin, poster: this.poster, preload: this.preload, controlsList: this.controlsList, autoPiP: this.autoPiP, disablePiP: this.disablePiP, disableRemotePlayback: this.disableRemotePlayback, hasCustomTextManager: this.hasCustomTextManager, mediaTitle: this.mediaTitle, viewType: ViewType.Video, ref: (el) => {
          this.fileProvider = el;
        } }, h("slot", null));
      }
    };
    (function(VimeoEvent2) {
      VimeoEvent2["Play"] = "play";
      VimeoEvent2["Pause"] = "pause";
      VimeoEvent2["Seeking"] = "seeking";
      VimeoEvent2["Seeked"] = "seeked";
      VimeoEvent2["TimeUpdate"] = "timeupdate";
      VimeoEvent2["VolumeChange"] = "volumechange";
      VimeoEvent2["DurationChange"] = "durationchange";
      VimeoEvent2["FullscreenChange"] = "fullscreenchange";
      VimeoEvent2["CueChange"] = "cuechange";
      VimeoEvent2["Progress"] = "progress";
      VimeoEvent2["Error"] = "error";
      VimeoEvent2["PlaybackRateChange"] = "playbackratechange";
      VimeoEvent2["Loaded"] = "loaded";
      VimeoEvent2["BufferStart"] = "bufferstart";
      VimeoEvent2["BufferEnd"] = "bufferend";
      VimeoEvent2["TextTrackChange"] = "texttrackchange";
      VimeoEvent2["Waiting"] = "waiting";
      VimeoEvent2["Ended"] = "ended";
    })(VimeoEvent || (VimeoEvent = {}));
    vimeoCss = ":host{z-index:var(--vm-media-z-index)}vm-embed{position:absolute;top:0;left:0;width:100%;height:100%}vm-embed.hideControls{display:block;width:100%;height:auto;position:relative}";
    __awaiter$2 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    videoInfoCache = /* @__PURE__ */ new Map();
    Vimeo = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.defaultInternalState = {};
        this.volume = 50;
        this.hasLoaded = false;
        this.internalState = {
          paused: true,
          playing: false,
          seeking: false,
          currentTime: 0,
          buffered: 0,
          playbackStarted: false,
          playRequest: false
        };
        this.embedSrc = "";
        this.mediaTitle = "";
        this.byline = true;
        this.portrait = true;
        this.noAutoAspectRatio = false;
        this.cookies = true;
        this.language = "en";
        this.aspectRatio = "16:9";
        this.autoplay = false;
        this.controls = false;
        this.loop = false;
        this.muted = false;
        this.playsinline = false;
        withComponentRegistry(this);
        withProviderConnect(this);
        withProviderContext(this);
      }
      onVideoIdChange() {
        this.cancelTimeUpdates();
        if (!this.videoId) {
          this.embedSrc = "";
          return;
        }
        this.embedSrc = `${this.getOrigin()}/video/${this.videoId}`;
        this.pendingDurationCall = deferredPromise();
        this.pendingMediaTitleCall = deferredPromise();
        this.fetchVideoInfo = this.getVideoInfo();
      }
      onCustomPosterChange() {
        this.dispatch("currentPoster", this.poster);
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        this.dispatch("viewType", ViewType.Video);
        this.onVideoIdChange();
        this.defaultInternalState = Object.assign({}, this.internalState);
      }
      componentWillLoad() {
        this.initialMuted = this.muted;
      }
      disconnectedCallback() {
        this.cancelTimeUpdates();
        this.pendingPlayRequest = void 0;
      }
      getOrigin() {
        return "https://player.vimeo.com";
      }
      getPreconnections() {
        return [
          this.getOrigin(),
          "https://i.vimeocdn.com",
          "https://f.vimeocdn.com",
          "https://fresnel.vimeocdn.com"
        ];
      }
      remoteControl(command, arg) {
        return this.embed.postMessage({
          method: command,
          value: arg
        });
      }
      buildParams() {
        return {
          byline: this.byline,
          color: this.color,
          portrait: this.portrait,
          autopause: false,
          transparent: false,
          autoplay: this.autoplay,
          muted: this.initialMuted,
          playsinline: this.playsinline,
          dnt: !this.cookies
        };
      }
      getVideoInfo() {
        return __awaiter$2(this, void 0, void 0, function* () {
          if (videoInfoCache.has(this.videoId))
            return videoInfoCache.get(this.videoId);
          return window.fetch(`https://vimeo.com/api/oembed.json?url=${this.embedSrc}`).then((response) => response.json()).then((data) => {
            var _a2;
            const thumnailRegex = /vimeocdn.com\/video\/(.*)?_/;
            const thumbnailId = (_a2 = data === null || data === void 0 ? void 0 : data.thumbnail_url) === null || _a2 === void 0 ? void 0 : _a2.match(thumnailRegex)[1];
            const poster = `https://i.vimeocdn.com/video/${thumbnailId}_1920x1080.jpg`;
            const info = { poster, width: data === null || data === void 0 ? void 0 : data.width, height: data === null || data === void 0 ? void 0 : data.height };
            videoInfoCache.set(this.videoId, info);
            return info;
          });
        });
      }
      onTimeChange(time) {
        if (this.internalState.currentTime === time)
          return;
        this.dispatch("currentTime", time);
        if (Math.abs(this.internalState.currentTime - time) > 1.5) {
          this.internalState.seeking = true;
          this.dispatch("seeking", true);
          if (this.internalState.playing && this.internalState.buffered < time) {
            this.dispatch("buffering", true);
          }
          window.clearTimeout(this.pendingPlayRequest);
          if (!this.internalState.paused) {
            this.internalState.playRequest = true;
          }
          this.remoteControl(
            this.internalState.playbackStarted ? "pause" : "play"
            /* Play */
          );
        }
        this.internalState.currentTime = time;
      }
      cancelTimeUpdates() {
        if (isNumber(this.timeRAF))
          window.cancelAnimationFrame(this.timeRAF);
      }
      requestTimeUpdates() {
        this.remoteControl(
          "getCurrentTime"
          /* GetCurrentTime */
        );
        this.timeRAF = window.requestAnimationFrame(() => {
          this.requestTimeUpdates();
        });
      }
      onSeeked() {
        if (!this.internalState.seeking)
          return;
        this.dispatch("seeking", false);
        this.internalState.seeking = false;
        if (this.internalState.playRequest) {
          window.setTimeout(() => {
            this.remoteControl(
              "play"
              /* Play */
            );
          }, 150);
        }
      }
      onVimeoMethod(method, arg) {
        var _a2, _b2;
        switch (method) {
          case "getCurrentTime":
            if (!this.internalState.seeking)
              this.onTimeChange(arg);
            break;
          case "getDuration":
            (_a2 = this.pendingDurationCall) === null || _a2 === void 0 ? void 0 : _a2.resolve(arg);
            break;
          case "getVideoTitle":
            (_b2 = this.pendingMediaTitleCall) === null || _b2 === void 0 ? void 0 : _b2.resolve(arg);
            break;
        }
      }
      onLoaded() {
        var _a2, _b2;
        if (this.hasLoaded)
          return;
        this.pendingPlayRequest = void 0;
        this.internalState = Object.assign({}, this.defaultInternalState);
        this.dispatch("currentSrc", this.embedSrc);
        this.dispatch("mediaType", MediaType.Video);
        this.remoteControl(
          "getDuration"
          /* GetDuration */
        );
        this.remoteControl(
          "getVideoTitle"
          /* GetVideoTitle */
        );
        Promise.all([
          this.fetchVideoInfo,
          (_a2 = this.pendingDurationCall) === null || _a2 === void 0 ? void 0 : _a2.promise,
          (_b2 = this.pendingMediaTitleCall) === null || _b2 === void 0 ? void 0 : _b2.promise
        ]).then(([info, duration, mediaTitle]) => {
          var _a3, _b3, _c;
          this.requestTimeUpdates();
          this.dispatch("aspectRatio", `${(_a3 = info === null || info === void 0 ? void 0 : info.width) !== null && _a3 !== void 0 ? _a3 : 16}:${(_b3 = info === null || info === void 0 ? void 0 : info.height) !== null && _b3 !== void 0 ? _b3 : 9}`);
          this.dispatch("currentPoster", (_c = this.poster) !== null && _c !== void 0 ? _c : info === null || info === void 0 ? void 0 : info.poster);
          this.dispatch("duration", duration !== null && duration !== void 0 ? duration : -1);
          this.dispatch("mediaTitle", mediaTitle);
          this.dispatch("playbackReady", true);
        });
        this.hasLoaded = true;
      }
      onVimeoEvent(event, payload) {
        switch (event) {
          case "ready":
            Object.values(VimeoEvent).forEach((e) => {
              this.remoteControl("addEventListener", e);
            });
            break;
          case "loaded":
            this.onLoaded();
            break;
          case "play":
            this.onLoaded();
            this.internalState.paused = false;
            this.dispatch("paused", false);
            break;
          case "playProgress":
            if (!this.internalState.playing) {
              this.dispatch("playing", true);
              this.internalState.playing = true;
              this.internalState.playbackStarted = true;
              this.pendingPlayRequest = window.setTimeout(() => {
                this.internalState.playRequest = false;
                this.pendingPlayRequest = void 0;
              }, 1e3);
            }
            this.dispatch("buffering", false);
            this.onSeeked();
            break;
          case "pause":
            this.internalState.paused = true;
            this.internalState.playing = false;
            this.dispatch("paused", true);
            this.dispatch("buffering", false);
            break;
          case "loadProgress":
            this.internalState.buffered = payload.seconds;
            this.dispatch("buffered", payload.seconds);
            break;
          case "bufferstart":
            this.dispatch("buffering", true);
            if (this.internalState.paused) {
              this.internalState.paused = false;
              this.dispatch("paused", false);
              this.dispatch("playbackStarted", true);
            }
            break;
          case "bufferend":
            this.dispatch("buffering", false);
            if (this.internalState.paused)
              this.onSeeked();
            break;
          case "volumechange":
            if (payload.volume > 0) {
              const newVolume = Math.floor(payload.volume * 100);
              this.dispatch("muted", false);
              if (this.volume !== newVolume) {
                this.volume = newVolume;
                this.dispatch("volume", this.volume);
              }
            } else {
              this.dispatch("muted", true);
            }
            break;
          case "durationchange":
            this.dispatch("duration", payload.duration);
            break;
          case "playbackratechange":
            this.dispatch("playbackRate", payload.playbackRate);
            break;
          case "fullscreenchange":
            this.dispatch("isFullscreenActive", payload.fullscreen);
            break;
          case "finish":
            if (this.loop) {
              this.remoteControl("setCurrentTime", 0);
              setTimeout(() => {
                this.remoteControl(
                  "play"
                  /* Play */
                );
              }, 200);
            } else {
              this.dispatch("playbackEnded", true);
            }
            break;
          case "error":
            this.vmError.emit(payload);
            break;
        }
      }
      onEmbedSrcChange() {
        this.hasLoaded = false;
        this.vmLoadStart.emit();
        this.dispatch("viewType", ViewType.Video);
      }
      onEmbedMessage(event) {
        const message = event.detail;
        if (!isUndefined(message.event))
          this.onVimeoEvent(message.event, message.data);
        if (!isUndefined(message.method))
          this.onVimeoMethod(message.method, message.value);
      }
      adjustPosition() {
        if (this.controls) {
          return {};
        }
        const [aw, ah] = this.aspectRatio.split(":").map((r) => parseInt(r, 10));
        const height = 240;
        const padding = 100 / aw * ah;
        const offset = (height - padding) / (height / 50);
        return {
          paddingBottom: `${height}%`,
          transform: `translateY(-${offset + 0.02}%)`
        };
      }
      /** @internal */
      getAdapter() {
        return __awaiter$2(this, void 0, void 0, function* () {
          const canPlayRegex = /vimeo(?:\.com|)\/([0-9]{9,})/;
          const fileRegex = /vimeo\.com\/external\/[0-9]+\..+/;
          return {
            getInternalPlayer: () => __awaiter$2(this, void 0, void 0, function* () {
              return this.embed;
            }),
            play: () => __awaiter$2(this, void 0, void 0, function* () {
              this.remoteControl(
                "play"
                /* Play */
              );
            }),
            pause: () => __awaiter$2(this, void 0, void 0, function* () {
              this.remoteControl(
                "pause"
                /* Pause */
              );
            }),
            canPlay: (type) => __awaiter$2(this, void 0, void 0, function* () {
              return isString(type) && !fileRegex.test(type) && canPlayRegex.test(type);
            }),
            setCurrentTime: (time) => __awaiter$2(this, void 0, void 0, function* () {
              if (time !== this.internalState.currentTime) {
                this.remoteControl("setCurrentTime", time);
              }
            }),
            setMuted: (muted) => __awaiter$2(this, void 0, void 0, function* () {
              if (!muted)
                this.volume = this.volume > 0 ? this.volume : 30;
              this.remoteControl("setVolume", muted ? 0 : this.volume / 100);
            }),
            setVolume: (volume) => __awaiter$2(this, void 0, void 0, function* () {
              if (!this.muted) {
                this.remoteControl("setVolume", volume / 100);
              } else {
                this.dispatch("volume", volume);
              }
            }),
            // @TODO how to check if Vimeo pro?
            canSetPlaybackRate: () => __awaiter$2(this, void 0, void 0, function* () {
              return false;
            }),
            setPlaybackRate: (rate) => __awaiter$2(this, void 0, void 0, function* () {
              this.remoteControl("setPlaybackRate", rate);
            })
          };
        });
      }
      render() {
        return h("vm-embed", { class: { hideControls: !this.controls }, style: this.adjustPosition(), embedSrc: this.embedSrc, mediaTitle: this.mediaTitle, origin: this.getOrigin(), params: this.buildParams(), decoder: decodeJSON, preconnections: this.getPreconnections(), onVmEmbedMessage: this.onEmbedMessage.bind(this), onVmEmbedSrcChange: this.onEmbedSrcChange.bind(this), ref: (el) => {
          this.embed = el;
        } });
      }
      static get watchers() {
        return {
          "videoId": ["onVideoIdChange"],
          "poster": ["onCustomPosterChange"]
        };
      }
      static get style() {
        return vimeoCss;
      }
    };
    volumeControlCss = ".volumeControl{align-items:center;display:flex;position:relative;pointer-events:auto;box-sizing:border-box}vm-slider{width:75px;height:100%;margin:0;max-width:0;position:relative;z-index:3;transition:margin 0.2s cubic-bezier(0.4, 0, 1, 1),\n    max-width 0.2s cubic-bezier(0.4, 0, 1, 1);margin-left:calc(var(--vm-control-spacing) / 2) !important;visibility:hidden}vm-slider:hover{cursor:pointer}vm-slider.hidden{display:none}vm-slider.active{max-width:75px;visibility:visible;margin:0 calc(var(--vm-control-spacing) / 2)}";
    __awaiter$1 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    VolumeControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.keyboardDisposal = new Disposal();
        this.prevMuted = false;
        this.currentVolume = 50;
        this.isSliderActive = false;
        this.lowVolumeIcon = "volume-low";
        this.highVolumeIcon = "volume-high";
        this.mutedIcon = "volume-mute";
        this.tooltipPosition = "top";
        this.hideTooltip = false;
        this.muteKeys = "m";
        this.noKeyboard = false;
        this.muted = false;
        this.volume = 50;
        this.isMobile = false;
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ["volume", "muted", "isMobile", "i18n"]);
      }
      onNoKeyboardChange() {
        return __awaiter$1(this, void 0, void 0, function* () {
          this.keyboardDisposal.empty();
          if (this.noKeyboard)
            return;
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          this.keyboardDisposal.add(listen(player, "keydown", (event) => {
            if (event.key !== "ArrowUp" && event.key !== "ArrowDown")
              return;
            const isUpArrow = event.key === "ArrowUp";
            const newVolume = isUpArrow ? Math.min(100, this.volume + 5) : Math.max(0, this.volume - 5);
            this.dispatch("volume", parseInt(`${newVolume}`, 10));
          }));
        });
      }
      onPlayerVolumeChange() {
        this.currentVolume = this.muted ? 0 : this.volume;
        if (!this.muted && this.prevMuted && this.volume === 0) {
          this.dispatch("volume", 30);
        }
        this.prevMuted = this.muted;
      }
      connectedCallback() {
        this.prevMuted = this.muted;
        this.dispatch = createDispatcher(this);
        this.onNoKeyboardChange();
      }
      disconnectedCallback() {
        this.keyboardDisposal.empty();
      }
      onShowSlider() {
        clearTimeout(this.hideSliderTimeout);
        this.isSliderActive = true;
      }
      onHideSlider() {
        this.hideSliderTimeout = setTimeout(() => {
          this.isSliderActive = false;
        }, 100);
      }
      onVolumeChange(event) {
        const newVolume = event.detail;
        this.currentVolume = newVolume;
        this.dispatch("volume", newVolume);
        this.dispatch("muted", newVolume === 0);
      }
      onKeyDown(event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
          return;
        event.stopPropagation();
      }
      render() {
        return h("div", { class: "volumeControl", onMouseEnter: this.onShowSlider.bind(this), onMouseLeave: this.onHideSlider.bind(this) }, h("vm-mute-control", { keys: this.muteKeys, lowVolumeIcon: this.lowVolumeIcon, highVolumeIcon: this.highVolumeIcon, mutedIcon: this.mutedIcon, icons: this.icons, tooltipPosition: this.tooltipPosition, tooltipDirection: this.tooltipDirection, hideTooltip: this.hideTooltip, onVmFocus: this.onShowSlider.bind(this), onVmBlur: this.onHideSlider.bind(this) }), h("vm-slider", { class: {
          hidden: this.isMobile,
          active: this.isSliderActive
        }, step: 5, max: 100, value: this.currentVolume, label: this.i18n.volume, onKeyDown: this.onKeyDown.bind(this), onVmFocus: this.onShowSlider.bind(this), onVmBlur: this.onHideSlider.bind(this), onVmValueChange: this.onVolumeChange.bind(this) }));
      }
      static get watchers() {
        return {
          "noKeyboard": ["onNoKeyboardChange"],
          "muted": ["onPlayerVolumeChange"],
          "volume": ["onPlayerVolumeChange"]
        };
      }
      static get style() {
        return volumeControlCss;
      }
    };
    mapYouTubePlaybackQuality = (quality) => {
      switch (quality) {
        case "unknown":
          return void 0;
        case "tiny":
          return "144p";
        case "small":
          return "240p";
        case "medium":
          return "360p";
        case "large":
          return "480p";
        case "hd720":
          return "720p";
        case "hd1080":
          return "1080p";
        case "highres":
          return "1440p";
        case "max":
          return "2160p";
        default:
          return void 0;
      }
    };
    youtubeCss = ":host{z-index:var(--vm-media-z-index)}";
    __awaiter = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    posterCache = /* @__PURE__ */ new Map();
    YouTube = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.defaultInternalState = {};
        this.internalState = {
          paused: true,
          duration: 0,
          seeking: false,
          playbackReady: false,
          playbackStarted: false,
          currentTime: 0,
          lastTimeUpdate: 0,
          playbackRate: 1,
          state: -1
        };
        this.embedSrc = "";
        this.mediaTitle = "";
        this.cookies = false;
        this.showFullscreenControl = true;
        this.language = "en";
        this.autoplay = false;
        this.controls = false;
        this.loop = false;
        this.muted = false;
        this.playsinline = false;
        withComponentRegistry(this);
        withProviderConnect(this);
        withProviderContext(this);
      }
      onVideoIdChange() {
        if (!this.videoId) {
          this.embedSrc = "";
          return;
        }
        this.embedSrc = `${this.getOrigin()}/embed/${this.videoId}`;
        this.fetchPosterURL = this.findPosterURL();
      }
      onCustomPosterChange() {
        this.dispatch("currentPoster", this.poster);
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        this.dispatch("viewType", ViewType.Video);
        this.onVideoIdChange();
        this.defaultInternalState = Object.assign({}, this.internalState);
      }
      componentWillLoad() {
        this.initialMuted = this.muted;
      }
      /** @internal */
      getAdapter() {
        return __awaiter(this, void 0, void 0, function* () {
          const canPlayRegex = /(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/;
          return {
            getInternalPlayer: () => __awaiter(this, void 0, void 0, function* () {
              return this.embed;
            }),
            play: () => __awaiter(this, void 0, void 0, function* () {
              this.remoteControl(
                "playVideo"
                /* Play */
              );
            }),
            pause: () => __awaiter(this, void 0, void 0, function* () {
              this.remoteControl(
                "pauseVideo"
                /* Pause */
              );
            }),
            canPlay: (type) => __awaiter(this, void 0, void 0, function* () {
              return isString(type) && canPlayRegex.test(type);
            }),
            setCurrentTime: (time) => __awaiter(this, void 0, void 0, function* () {
              if (time !== this.internalState.currentTime) {
                this.remoteControl("seekTo", time);
              }
            }),
            setMuted: (muted) => __awaiter(this, void 0, void 0, function* () {
              muted ? this.remoteControl(
                "mute"
                /* Mute */
              ) : this.remoteControl(
                "unMute"
                /* Unmute */
              );
            }),
            setVolume: (volume) => __awaiter(this, void 0, void 0, function* () {
              this.remoteControl("setVolume", volume);
            }),
            canSetPlaybackRate: () => __awaiter(this, void 0, void 0, function* () {
              return true;
            }),
            setPlaybackRate: (rate) => __awaiter(this, void 0, void 0, function* () {
              this.remoteControl("setPlaybackRate", rate);
            })
          };
        });
      }
      getOrigin() {
        return !this.cookies ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
      }
      getPreconnections() {
        return [
          this.getOrigin(),
          "https://www.google.com",
          "https://googleads.g.doubleclick.net",
          "https://static.doubleclick.net",
          "https://s.ytimg.com",
          "https://i.ytimg.com"
        ];
      }
      remoteControl(command, arg) {
        return this.embed.postMessage({
          event: "command",
          func: command,
          args: arg ? [arg] : void 0
        });
      }
      buildParams() {
        return {
          enablejsapi: 1,
          cc_lang_pref: this.language,
          hl: this.language,
          fs: this.showFullscreenControl ? 1 : 0,
          controls: this.controls ? 1 : 0,
          disablekb: !this.controls ? 1 : 0,
          iv_load_policy: this.controls ? 1 : 3,
          mute: this.initialMuted ? 1 : 0,
          playsinline: this.playsinline ? 1 : 0,
          autoplay: this.autoplay ? 1 : 0
        };
      }
      onEmbedSrcChange() {
        this.vmLoadStart.emit();
        this.dispatch("viewType", ViewType.Video);
      }
      onEmbedLoaded() {
        window.setTimeout(() => this.embed.postMessage({ event: "listening" }), 100);
      }
      findPosterURL() {
        return __awaiter(this, void 0, void 0, function* () {
          if (posterCache.has(this.videoId))
            return posterCache.get(this.videoId);
          const posterURL = (quality) => `https://i.ytimg.com/vi/${this.videoId}/${quality}.jpg`;
          return loadImage(posterURL("maxresdefault"), 121).catch(() => loadImage(posterURL("sddefault"), 121)).catch(() => loadImage(posterURL("hqdefault"), 121)).then((img) => {
            const poster = img.src;
            posterCache.set(this.videoId, poster);
            return poster;
          });
        });
      }
      onCued() {
        if (this.internalState.playbackReady)
          return;
        this.internalState = Object.assign({}, this.defaultInternalState);
        this.dispatch("currentSrc", this.embedSrc);
        this.dispatch("mediaType", MediaType.Video);
        this.fetchPosterURL.then((poster) => {
          var _a2;
          this.dispatch("currentPoster", (_a2 = this.poster) !== null && _a2 !== void 0 ? _a2 : poster);
          this.dispatch("playbackReady", true);
        });
        this.internalState.playbackReady = true;
      }
      onPlayerStateChange(state) {
        if (this.internalState.playbackReady && state === -1) {
          this.internalState.paused = true;
          this.internalState.playbackStarted = false;
          this.dispatch("buffering", false);
          this.dispatch("paused", true);
          this.dispatch("playbackStarted", false);
          return;
        }
        const isPlaying = state === 1;
        const isBuffering = state === 3;
        this.dispatch("buffering", isBuffering);
        if (this.internalState.paused && (isBuffering || isPlaying)) {
          this.internalState.paused = false;
          this.dispatch("paused", false);
          if (!this.internalState.playbackStarted) {
            this.dispatch("playbackStarted", true);
            this.internalState.playbackStarted = true;
          }
        }
        switch (state) {
          case 5:
            this.onCued();
            break;
          case 1:
            this.onCued();
            this.dispatch("playing", true);
            break;
          case 2:
            this.internalState.paused = true;
            this.dispatch("paused", true);
            break;
          case 0:
            if (this.loop) {
              window.setTimeout(() => {
                this.remoteControl(
                  "playVideo"
                  /* Play */
                );
              }, 150);
            } else {
              this.dispatch("playbackEnded", true);
              this.internalState.paused = true;
              this.dispatch("paused", true);
            }
            break;
        }
        this.internalState.state = state;
      }
      calcCurrentTime(time) {
        let currentTime = time;
        if (this.internalState.state === 0) {
          return this.internalState.duration;
        }
        if (this.internalState.state === 1) {
          const elapsedTime = (Date.now() / 1e3 - this.defaultInternalState.lastTimeUpdate) * this.internalState.playbackRate;
          if (elapsedTime > 0)
            currentTime += Math.min(elapsedTime, 1);
        }
        return currentTime;
      }
      onTimeChange(time) {
        const currentTime = this.calcCurrentTime(time);
        this.dispatch("currentTime", currentTime);
        if (Math.abs(this.internalState.currentTime - currentTime) > 1.5) {
          this.internalState.seeking = true;
          this.dispatch("seeking", true);
        }
        this.internalState.currentTime = currentTime;
      }
      onBufferedChange(buffered) {
        this.dispatch("buffered", buffered);
        if (this.internalState.seeking && buffered > this.internalState.currentTime) {
          window.setTimeout(() => {
            this.internalState.seeking = false;
            this.dispatch("seeking", false);
          }, this.internalState.paused ? 100 : 0);
        }
      }
      onEmbedMessage(event) {
        const message = event.detail;
        const { info } = message;
        if (!info)
          return;
        if (isObject(info.videoData))
          this.dispatch("mediaTitle", info.videoData.title);
        if (isNumber(info.duration)) {
          this.internalState.duration = info.duration;
          this.dispatch("duration", info.duration);
        }
        if (isArray(info.availablePlaybackRates)) {
          this.dispatch("playbackRates", info.availablePlaybackRates);
        }
        if (isNumber(info.playbackRate)) {
          this.internalState.playbackRate = info.playbackRate;
          this.dispatch("playbackRate", info.playbackRate);
        }
        if (isNumber(info.currentTime))
          this.onTimeChange(info.currentTime);
        if (isNumber(info.currentTimeLastUpdated)) {
          this.internalState.lastTimeUpdate = info.currentTimeLastUpdated;
        }
        if (isNumber(info.videoLoadedFraction)) {
          this.onBufferedChange(info.videoLoadedFraction * this.internalState.duration);
        }
        if (isNumber(info.volume))
          this.dispatch("volume", info.volume);
        if (isBoolean(info.muted))
          this.dispatch("muted", info.muted);
        if (isArray(info.availableQualityLevels)) {
          this.dispatch("playbackQualities", info.availableQualityLevels.map((q) => mapYouTubePlaybackQuality(q)));
        }
        if (isString(info.playbackQuality)) {
          this.dispatch("playbackQuality", mapYouTubePlaybackQuality(info.playbackQuality));
        }
        if (isNumber(info.playerState))
          this.onPlayerStateChange(info.playerState);
      }
      render() {
        return h("vm-embed", { embedSrc: this.embedSrc, mediaTitle: this.mediaTitle, origin: this.getOrigin(), params: this.buildParams(), decoder: decodeJSON, preconnections: this.getPreconnections(), onVmEmbedLoaded: this.onEmbedLoaded.bind(this), onVmEmbedMessage: this.onEmbedMessage.bind(this), onVmEmbedSrcChange: this.onEmbedSrcChange.bind(this), ref: (el) => {
          this.embed = el;
        } });
      }
      static get watchers() {
        return {
          "cookies": ["onVideoIdChange"],
          "videoId": ["onVideoIdChange"],
          "poster": ["onCustomPosterChange"]
        };
      }
      static get style() {
        return youtubeCss;
      }
    };
    VmAudio = /* @__PURE__ */ proxyCustomElement(Audio, [4, "vm-audio", { "willAttach": [4, "will-attach"], "crossOrigin": [1, "cross-origin"], "preload": [1], "disableRemotePlayback": [4, "disable-remote-playback"], "mediaTitle": [1, "media-title"] }]);
    VmCaptionControl = /* @__PURE__ */ proxyCustomElement(CaptionControl, [1, "vm-caption-control", { "showIcon": [1, "show-icon"], "hideIcon": [1, "hide-icon"], "tooltipPosition": [1, "tooltip-position"], "tooltipDirection": [1, "tooltip-direction"], "hideTooltip": [4, "hide-tooltip"], "icons": [1], "keys": [1], "i18n": [16], "playbackReady": [4, "playback-ready"], "textTracks": [16], "isTextTrackVisible": [4, "is-text-track-visible"], "canToggleCaptionVisibility": [32] }]);
    VmCaptions = /* @__PURE__ */ proxyCustomElement(Captions, [1, "vm-captions", { "hidden": [4], "isControlsActive": [4, "is-controls-active"], "isVideoView": [4, "is-video-view"], "playbackStarted": [4, "playback-started"], "textTracks": [16], "currentTextTrack": [2, "current-text-track"], "isTextTrackVisible": [4, "is-text-track-visible"], "isEnabled": [32], "cue": [32], "fontSize": [32] }]);
    VmClickToPlay = /* @__PURE__ */ proxyCustomElement(ClickToPlay, [1, "vm-click-to-play", { "useOnMobile": [4, "use-on-mobile"], "paused": [4], "isVideoView": [4, "is-video-view"], "isMobile": [4, "is-mobile"] }]);
    VmControl = /* @__PURE__ */ proxyCustomElement(Control, [1, "vm-control", { "keys": [1], "identifier": [1], "hidden": [4], "label": [1], "menu": [1], "expanded": [4], "pressed": [4], "isTouch": [4, "is-touch"], "describedBy": [32], "showTapHighlight": [32] }]);
    VmControlGroup = /* @__PURE__ */ proxyCustomElement(ControlNewLine, [1, "vm-control-group", { "space": [1] }]);
    VmControlSpacer = /* @__PURE__ */ proxyCustomElement(ControlSpacer, [1, "vm-control-spacer"]);
    VmControls = /* @__PURE__ */ proxyCustomElement(Controls, [1, "vm-controls", { "hidden": [4], "fullWidth": [4, "full-width"], "fullHeight": [4, "full-height"], "direction": [1], "align": [1], "justify": [1], "pin": [513], "activeDuration": [2, "active-duration"], "waitForPlaybackStart": [4, "wait-for-playback-start"], "hideWhenPaused": [4, "hide-when-paused"], "hideOnMouseLeave": [4, "hide-on-mouse-leave"], "isAudioView": [4, "is-audio-view"], "isSettingsActive": [4, "is-settings-active"], "playbackReady": [4, "playback-ready"], "isControlsActive": [4, "is-controls-active"], "paused": [4], "playbackStarted": [4, "playback-started"], "isInteracting": [32] }]);
    VmCurrentTime = /* @__PURE__ */ proxyCustomElement(CurrentTime, [1, "vm-current-time", { "currentTime": [2, "current-time"], "i18n": [16], "alwaysShowHours": [4, "always-show-hours"] }]);
    VmDailymotion = /* @__PURE__ */ proxyCustomElement(Dailymotion, [1, "vm-dailymotion", { "videoId": [1, "video-id"], "shouldAutoplayQueue": [4, "should-autoplay-queue"], "showUpNextQueue": [4, "show-up-next-queue"], "showShareButtons": [4, "show-share-buttons"], "color": [1], "syndication": [1], "showDailymotionLogo": [4, "show-dailymotion-logo"], "showVideoInfo": [4, "show-video-info"], "language": [1], "autoplay": [4], "controls": [4], "poster": [1], "logger": [16], "loop": [4], "muted": [4], "playsinline": [4], "embedSrc": [32], "mediaTitle": [32] }]);
    VmDash = /* @__PURE__ */ proxyCustomElement(Dash, [1, "vm-dash", { "src": [1], "version": [1], "libSrc": [1, "lib-src"], "config": [16], "autoplay": [4], "crossOrigin": [1, "cross-origin"], "preload": [1], "poster": [1], "controlsList": [1, "controls-list"], "autoPiP": [4, "auto-pip"], "disablePiP": [4, "disable-pip"], "disableRemotePlayback": [4, "disable-remote-playback"], "mediaTitle": [1, "media-title"], "enableTextTracksByDefault": [4, "enable-text-tracks-by-default"], "shouldRenderNativeTextTracks": [4, "should-render-native-text-tracks"], "isTextTrackVisible": [4, "is-text-track-visible"], "currentTextTrack": [2, "current-text-track"], "hasAttached": [32] }, [[0, "vmMediaElChange", "onMediaElChange"]]]);
    VmDblClickFullscreen = /* @__PURE__ */ proxyCustomElement(DblClickFullscreen, [1, "vm-dbl-click-fullscreen", { "useOnMobile": [4, "use-on-mobile"], "isFullscreenActive": [4, "is-fullscreen-active"], "isVideoView": [4, "is-video-view"], "playbackReady": [4, "playback-ready"], "isMobile": [4, "is-mobile"], "canSetFullscreen": [32] }]);
    VmDefaultControls = /* @__PURE__ */ proxyCustomElement(DefaultControls, [1, "vm-default-controls", { "activeDuration": [2, "active-duration"], "waitForPlaybackStart": [4, "wait-for-playback-start"], "hideWhenPaused": [4, "hide-when-paused"], "hideOnMouseLeave": [4, "hide-on-mouse-leave"], "theme": [1], "isMobile": [4, "is-mobile"], "isLive": [4, "is-live"], "isAudioView": [4, "is-audio-view"], "isVideoView": [4, "is-video-view"] }]);
    VmDefaultSettings = /* @__PURE__ */ proxyCustomElement(DefaultSettings, [1, "vm-default-settings", { "pin": [513], "i18n": [16], "playbackReady": [4, "playback-ready"], "playbackRate": [2, "playback-rate"], "playbackRates": [16], "isVideoView": [4, "is-video-view"], "playbackQuality": [1, "playback-quality"], "playbackQualities": [16], "textTracks": [16], "currentTextTrack": [2, "current-text-track"], "audioTracks": [16], "currentAudioTrack": [2, "current-audio-track"], "isTextTrackVisible": [4, "is-text-track-visible"], "canSetPlaybackRate": [32], "canSetPlaybackQuality": [32], "canSetTextTrack": [32], "canSetAudioTrack": [32] }]);
    VmDefaultUi = /* @__PURE__ */ proxyCustomElement(DefaultUI, [1, "vm-default-ui", { "noClickToPlay": [4, "no-click-to-play"], "noDblClickFullscreen": [4, "no-dbl-click-fullscreen"], "noCaptions": [4, "no-captions"], "noPoster": [4, "no-poster"], "noSpinner": [4, "no-spinner"], "noControls": [4, "no-controls"], "noSettings": [4, "no-settings"], "noLoadingScreen": [4, "no-loading-screen"] }]);
    VmEmbed = /* @__PURE__ */ proxyCustomElement(Embed, [1, "vm-embed", { "embedSrc": [1, "embed-src"], "mediaTitle": [1, "media-title"], "params": [1], "origin": [1], "preconnections": [16], "decoder": [16], "srcWithParams": [32], "hasEnteredViewport": [32] }, [[8, "message", "onWindowMessage"]]]);
    VmEndTime = /* @__PURE__ */ proxyCustomElement(EndTime, [1, "vm-end-time", { "duration": [2], "i18n": [16], "alwaysShowHours": [4, "always-show-hours"] }]);
    VmFile = /* @__PURE__ */ proxyCustomElement(File, [6, "vm-file", { "willAttach": [4, "will-attach"], "crossOrigin": [1, "cross-origin"], "preload": [1], "poster": [1], "mediaTitle": [1, "media-title"], "controlsList": [1, "controls-list"], "autoPiP": [4, "auto-pip"], "disablePiP": [4, "disable-pip"], "disableRemotePlayback": [4, "disable-remote-playback"], "viewType": [1, "view-type"], "playbackRates": [16], "language": [1], "autoplay": [4], "controls": [4], "logger": [16], "loop": [4], "muted": [4], "playsinline": [4], "noConnect": [4, "no-connect"], "paused": [4], "currentTime": [2, "current-time"], "volume": [2], "playbackReady": [4, "playback-ready"], "playbackStarted": [4, "playback-started"], "currentTextTrack": [2, "current-text-track"], "hasCustomTextManager": [4, "has-custom-text-manager"], "isTextTrackVisible": [4, "is-text-track-visible"], "shouldRenderNativeTextTracks": [4, "should-render-native-text-tracks"], "vmPoster": [32] }, [[0, "vmMediaProviderConnect", "onProviderConnect"], [0, "vmMediaProviderDisconnect", "onProviderDisconnect"]]]);
    VmFullscreenControl = /* @__PURE__ */ proxyCustomElement(FullscreenControl, [1, "vm-fullscreen-control", { "enterIcon": [1, "enter-icon"], "exitIcon": [1, "exit-icon"], "icons": [1], "tooltipPosition": [1, "tooltip-position"], "tooltipDirection": [1, "tooltip-direction"], "hideTooltip": [4, "hide-tooltip"], "keys": [1], "isFullscreenActive": [4, "is-fullscreen-active"], "i18n": [16], "playbackReady": [4, "playback-ready"], "canSetFullscreen": [32] }]);
    VmHls = /* @__PURE__ */ proxyCustomElement(HLS, [4, "vm-hls", { "version": [1], "libSrc": [1, "lib-src"], "config": [8], "crossOrigin": [1, "cross-origin"], "preload": [1], "poster": [1], "controlsList": [1, "controls-list"], "autoPiP": [4, "auto-pip"], "disablePiP": [4, "disable-pip"], "disableRemotePlayback": [4, "disable-remote-playback"], "playbackReady": [4, "playback-ready"], "mediaTitle": [1, "media-title"], "hasAttached": [32] }, [[0, "vmMediaElChange", "onMediaElChange"], [0, "vmSrcSetChange", "onSrcChange"]]]);
    VmIcon = /* @__PURE__ */ proxyCustomElement(Icon, [1, "vm-icon", { "name": [1], "src": [1], "label": [1], "library": [1], "icons": [1], "svg": [32] }]);
    VmIconLibrary = /* @__PURE__ */ proxyCustomElement(IconLibrary, [1, "vm-icon-library", { "name": [1], "resolver": [16], "icons": [1] }]);
    VmLiveIndicator = /* @__PURE__ */ proxyCustomElement(LiveIndicator, [1, "vm-live-indicator", { "isLive": [4, "is-live"], "i18n": [16] }]);
    VmLoadingScreen = /* @__PURE__ */ proxyCustomElement(LoadingScreen, [1, "vm-loading-screen", { "playbackReady": [4, "playback-ready"], "hideDots": [4, "hide-dots"] }]);
    VmMenu = /* @__PURE__ */ proxyCustomElement(Menu, [1, "vm-menu", { "active": [1540], "identifier": [1], "controller": [16], "slideInDirection": [1, "slide-in-direction"], "activeMenuItem": [32], "activeSubmenu": [32] }, [[0, "vmOpenSubmenu", "onOpenSubmenu"], [0, "vmCloseSubmenu", "onCloseSubmenu"], [8, "click", "onWindowClick"], [8, "keydown", "onWindowKeyDown"]]]);
    VmMenuItem = /* @__PURE__ */ proxyCustomElement(MenuItem, [1, "vm-menu-item", { "identifier": [1], "hidden": [4], "label": [1], "menu": [16], "expanded": [4], "checked": [4], "hint": [1], "badge": [1], "checkIcon": [1, "check-icon"], "icons": [1], "isTouch": [4, "is-touch"], "showTapHighlight": [32] }]);
    VmMenuRadio = /* @__PURE__ */ proxyCustomElement(MenuRadio, [1, "vm-menu-radio", { "label": [1], "value": [1], "checked": [1028], "badge": [1], "checkIcon": [1, "check-icon"], "icons": [1] }]);
    VmMenuRadioGroup = /* @__PURE__ */ proxyCustomElement(MenuRadioGroup, [1, "vm-menu-radio-group", { "value": [1025] }, [[0, "vmCheck", "onSelectionChange"]]]);
    VmMuteControl = /* @__PURE__ */ proxyCustomElement(MuteControl, [1, "vm-mute-control", { "lowVolumeIcon": [1, "low-volume-icon"], "highVolumeIcon": [1, "high-volume-icon"], "mutedIcon": [1, "muted-icon"], "icons": [1], "tooltipPosition": [1, "tooltip-position"], "tooltipDirection": [1, "tooltip-direction"], "hideTooltip": [4, "hide-tooltip"], "keys": [1], "volume": [2], "muted": [4], "i18n": [16] }]);
    VmPipControl = /* @__PURE__ */ proxyCustomElement(PiPControl, [1, "vm-pip-control", { "enterIcon": [1, "enter-icon"], "exitIcon": [1, "exit-icon"], "icons": [1], "tooltipPosition": [1, "tooltip-position"], "tooltipDirection": [1, "tooltip-direction"], "hideTooltip": [4, "hide-tooltip"], "keys": [1], "isPiPActive": [4, "is-pi-p-active"], "i18n": [16], "playbackReady": [4, "playback-ready"], "canSetPiP": [32] }]);
    VmPlaybackControl = /* @__PURE__ */ proxyCustomElement(PlaybackControl, [1, "vm-playback-control", { "playIcon": [1, "play-icon"], "pauseIcon": [1, "pause-icon"], "icons": [1], "tooltipPosition": [1, "tooltip-position"], "tooltipDirection": [1, "tooltip-direction"], "hideTooltip": [4, "hide-tooltip"], "keys": [1], "paused": [4], "i18n": [16] }]);
    VmPlayer = /* @__PURE__ */ proxyCustomElement(Player, [1, "vm-player", { "logger": [16], "theme": [513], "icons": [513], "paused": [1028], "playing": [1028], "duration": [1026], "mediaTitle": [1025, "media-title"], "currentProvider": [1025, "current-provider"], "currentSrc": [1025, "current-src"], "currentPoster": [1025, "current-poster"], "currentTime": [1026, "current-time"], "autoplay": [4], "ready": [1540], "playbackReady": [1028, "playback-ready"], "loop": [4], "muted": [1028], "buffered": [1026], "playbackRate": [1026, "playback-rate"], "playbackRates": [1040], "playbackQuality": [1025, "playback-quality"], "playbackQualities": [1040], "seeking": [1028], "debug": [4], "playbackStarted": [1028, "playback-started"], "playbackEnded": [1028, "playback-ended"], "buffering": [1028], "controls": [4], "isControlsActive": [4, "is-controls-active"], "isSettingsActive": [1028, "is-settings-active"], "volume": [1026], "isFullscreenActive": [1028, "is-fullscreen-active"], "aspectRatio": [1025, "aspect-ratio"], "viewType": [1025, "view-type"], "isAudioView": [1028, "is-audio-view"], "isVideoView": [1028, "is-video-view"], "mediaType": [1025, "media-type"], "isAudio": [1028, "is-audio"], "isVideo": [1028, "is-video"], "isLive": [1028, "is-live"], "isMobile": [1028, "is-mobile"], "isTouch": [1028, "is-touch"], "isPiPActive": [1028, "is-pi-p-active"], "textTracks": [16], "currentTextTrack": [2, "current-text-track"], "isTextTrackVisible": [4, "is-text-track-visible"], "shouldRenderNativeTextTracks": [4, "should-render-native-text-tracks"], "audioTracks": [16], "currentAudioTrack": [2, "current-audio-track"], "autopause": [4], "playsinline": [4], "language": [1025], "translations": [1040], "languages": [1040], "i18n": [1040], "container": [32] }, [[0, "vmError", "onError"]]]);
    VmPoster = /* @__PURE__ */ proxyCustomElement(Poster, [1, "vm-poster", { "fit": [1], "isVideoView": [4, "is-video-view"], "currentPoster": [1, "current-poster"], "mediaTitle": [1, "media-title"], "playbackStarted": [4, "playback-started"], "currentTime": [2, "current-time"], "isHidden": [32], "isActive": [32], "hasLoaded": [32] }]);
    VmScrim = /* @__PURE__ */ proxyCustomElement(Scrim, [1, "vm-scrim", { "gradient": [1], "isVideoView": [4, "is-video-view"], "isControlsActive": [4, "is-controls-active"] }]);
    VmScrubberControl = /* @__PURE__ */ proxyCustomElement(ScrubberControl, [1, "vm-scrubber-control", { "alwaysShowHours": [4, "always-show-hours"], "hideTooltip": [4, "hide-tooltip"], "currentTime": [2, "current-time"], "duration": [2], "noKeyboard": [4, "no-keyboard"], "buffering": [4], "buffered": [2], "i18n": [16], "timestamp": [32], "endTime": [32] }]);
    VmSettings = /* @__PURE__ */ proxyCustomElement(Settings, [1, "vm-settings", { "pin": [513], "active": [1540], "isMobile": [4, "is-mobile"], "isAudioView": [4, "is-audio-view"], "menuHeight": [32] }]);
    VmSettingsControl = /* @__PURE__ */ proxyCustomElement(SettingsControl, [1, "vm-settings-control", { "icon": [1], "icons": [1], "tooltipPosition": [1, "tooltip-position"], "tooltipDirection": [1, "tooltip-direction"], "menu": [1], "expanded": [4], "i18n": [16], "hideTooltip": [4, "hide-tooltip"], "vmSettings": [32] }]);
    VmSkeleton = /* @__PURE__ */ proxyCustomElement(Skeleton, [1, "vm-skeleton", { "effect": [1], "ready": [4], "hidden": [32] }]);
    VmSlider = /* @__PURE__ */ proxyCustomElement(Slider, [1, "vm-slider", { "step": [2], "min": [2], "max": [2], "value": [2], "valueText": [1, "value-text"], "label": [1] }]);
    VmSpinner = /* @__PURE__ */ proxyCustomElement(Spinner, [1, "vm-spinner", { "isVideoView": [4, "is-video-view"], "currentProvider": [1, "current-provider"], "showWhenMediaLoading": [4, "show-when-media-loading"], "playbackReady": [4, "playback-ready"], "buffering": [4], "isHidden": [32], "isActive": [32] }]);
    VmSubmenu = /* @__PURE__ */ proxyCustomElement(Submenu, [1, "vm-submenu", { "label": [1], "hint": [1], "slideInDirection": [1, "slide-in-direction"], "active": [1540], "menu": [32], "controller": [32] }]);
    VmTime = /* @__PURE__ */ proxyCustomElement(Time, [1, "vm-time", { "label": [1], "seconds": [2], "alwaysShowHours": [4, "always-show-hours"] }]);
    VmTimeProgress = /* @__PURE__ */ proxyCustomElement(TimeProgress, [1, "vm-time-progress", { "separator": [1], "alwaysShowHours": [4, "always-show-hours"] }]);
    VmTooltip = /* @__PURE__ */ proxyCustomElement(Tooltip, [1, "vm-tooltip", { "hidden": [4], "active": [4], "position": [1], "direction": [1], "isTouch": [4, "is-touch"], "isMobile": [4, "is-mobile"] }]);
    VmUi = /* @__PURE__ */ proxyCustomElement(UI, [1, "vm-ui", { "isVideoView": [4, "is-video-view"], "playsinline": [4], "isFullscreenActive": [4, "is-fullscreen-active"] }]);
    VmVideo = /* @__PURE__ */ proxyCustomElement(Video, [4, "vm-video", { "willAttach": [4, "will-attach"], "hasCustomTextManager": [4, "has-custom-text-manager"], "crossOrigin": [1, "cross-origin"], "preload": [1], "poster": [1], "controlsList": [1, "controls-list"], "autoPiP": [4, "auto-pip"], "disablePiP": [4, "disable-pip"], "disableRemotePlayback": [4, "disable-remote-playback"], "mediaTitle": [1, "media-title"] }, [[0, "vmMediaProviderConnect", "onProviderConnect"], [0, "vmMediaProviderDisconnect", "onProviderDisconnect"]]]);
    VmVimeo = /* @__PURE__ */ proxyCustomElement(Vimeo, [1, "vm-vimeo", { "videoId": [1, "video-id"], "byline": [4], "color": [1], "portrait": [4], "noAutoAspectRatio": [4, "no-auto-aspect-ratio"], "poster": [1], "cookies": [4], "language": [1], "aspectRatio": [1, "aspect-ratio"], "autoplay": [4], "controls": [4], "logger": [16], "loop": [4], "muted": [4], "playsinline": [4], "embedSrc": [32], "mediaTitle": [32] }]);
    VmVolumeControl = /* @__PURE__ */ proxyCustomElement(VolumeControl, [1, "vm-volume-control", { "lowVolumeIcon": [1, "low-volume-icon"], "highVolumeIcon": [1, "high-volume-icon"], "mutedIcon": [1, "muted-icon"], "icons": [1], "tooltipPosition": [1, "tooltip-position"], "tooltipDirection": [1, "tooltip-direction"], "hideTooltip": [4, "hide-tooltip"], "muteKeys": [1, "mute-keys"], "noKeyboard": [4, "no-keyboard"], "muted": [4], "volume": [2], "isMobile": [4, "is-mobile"], "i18n": [16], "currentVolume": [32], "isSliderActive": [32] }]);
    VmYoutube = /* @__PURE__ */ proxyCustomElement(YouTube, [1, "vm-youtube", { "cookies": [4], "videoId": [1, "video-id"], "showFullscreenControl": [4, "show-fullscreen-control"], "poster": [1], "language": [1], "autoplay": [4], "controls": [4], "logger": [16], "loop": [4], "muted": [4], "playsinline": [4], "embedSrc": [32], "mediaTitle": [32] }]);
  }
});

// .svelte-kit/output/server/entries/pages/kick/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var define$1, DefaultUi$1, Hls$1, Player$1, DefaultUi, Hls, Player2, define, Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/kick/_page.svelte.js"() {
    init_index2();
    init_custom_elements();
    define$1 = (tagName, clazz) => {
      const isClient = typeof window !== "undefined";
      if (isClient && !customElements.get(tagName))
        customElements.define(tagName, clazz);
    };
    define$1("vm-audio", VmAudio);
    define$1("vm-file", VmFile);
    define$1("vm-caption-control", VmCaptionControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-captions", VmCaptions);
    define$1("vm-click-to-play", VmClickToPlay);
    define$1("vm-control", VmControl);
    define$1("vm-control-group", VmControlGroup);
    define$1("vm-control-spacer", VmControlSpacer);
    define$1("vm-controls", VmControls);
    define$1("vm-current-time", VmCurrentTime);
    define$1("vm-time", VmTime);
    define$1("vm-dailymotion", VmDailymotion);
    define$1("vm-embed", VmEmbed);
    define$1("vm-dash", VmDash);
    define$1("vm-file", VmFile);
    define$1("vm-video", VmVideo);
    define$1("vm-dbl-click-fullscreen", VmDblClickFullscreen);
    define$1("vm-default-controls", VmDefaultControls);
    define$1("vm-caption-control", VmCaptionControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-control-group", VmControlGroup);
    define$1("vm-control-spacer", VmControlSpacer);
    define$1("vm-controls", VmControls);
    define$1("vm-current-time", VmCurrentTime);
    define$1("vm-time", VmTime);
    define$1("vm-end-time", VmEndTime);
    define$1("vm-fullscreen-control", VmFullscreenControl);
    define$1("vm-live-indicator", VmLiveIndicator);
    define$1("vm-mute-control", VmMuteControl);
    define$1("vm-pip-control", VmPipControl);
    define$1("vm-playback-control", VmPlaybackControl);
    define$1("vm-scrim", VmScrim);
    define$1("vm-scrubber-control", VmScrubberControl);
    define$1("vm-slider", VmSlider);
    define$1("vm-settings-control", VmSettingsControl);
    define$1("vm-time-progress", VmTimeProgress);
    define$1("vm-volume-control", VmVolumeControl);
    define$1("vm-default-settings", VmDefaultSettings);
    define$1("vm-icon", VmIcon);
    define$1("vm-menu", VmMenu);
    define$1("vm-menu-item", VmMenuItem);
    define$1("vm-menu-radio", VmMenuRadio);
    define$1("vm-menu-radio-group", VmMenuRadioGroup);
    define$1("vm-settings", VmSettings);
    define$1("vm-submenu", VmSubmenu);
    define$1("vm-default-ui", VmDefaultUi);
    define$1("vm-caption-control", VmCaptionControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-captions", VmCaptions);
    define$1("vm-click-to-play", VmClickToPlay);
    define$1("vm-control-group", VmControlGroup);
    define$1("vm-control-spacer", VmControlSpacer);
    define$1("vm-controls", VmControls);
    define$1("vm-current-time", VmCurrentTime);
    define$1("vm-time", VmTime);
    define$1("vm-dbl-click-fullscreen", VmDblClickFullscreen);
    define$1("vm-default-controls", VmDefaultControls);
    define$1("vm-end-time", VmEndTime);
    define$1("vm-fullscreen-control", VmFullscreenControl);
    define$1("vm-live-indicator", VmLiveIndicator);
    define$1("vm-mute-control", VmMuteControl);
    define$1("vm-pip-control", VmPipControl);
    define$1("vm-playback-control", VmPlaybackControl);
    define$1("vm-scrim", VmScrim);
    define$1("vm-scrubber-control", VmScrubberControl);
    define$1("vm-slider", VmSlider);
    define$1("vm-settings-control", VmSettingsControl);
    define$1("vm-time-progress", VmTimeProgress);
    define$1("vm-volume-control", VmVolumeControl);
    define$1("vm-default-settings", VmDefaultSettings);
    define$1("vm-menu", VmMenu);
    define$1("vm-menu-item", VmMenuItem);
    define$1("vm-menu-radio", VmMenuRadio);
    define$1("vm-menu-radio-group", VmMenuRadioGroup);
    define$1("vm-settings", VmSettings);
    define$1("vm-submenu", VmSubmenu);
    define$1("vm-loading-screen", VmLoadingScreen);
    define$1("vm-poster", VmPoster);
    define$1("vm-spinner", VmSpinner);
    define$1("vm-ui", VmUi);
    DefaultUi$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let __ref;
      createEventDispatcher();
      let { class: className = "" } = $$props;
      let { style = "" } = $$props;
      let { noClickToPlay = false } = $$props;
      let { noDblClickFullscreen = false } = $$props;
      let { noCaptions = false } = $$props;
      let { noPoster = false } = $$props;
      let { noSpinner = false } = $$props;
      let { noControls = false } = $$props;
      let { noSettings = false } = $$props;
      let { noLoadingScreen = false } = $$props;
      const ref = () => __ref;
      const getWebComponent = () => __ref;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.style === void 0 && $$bindings.style && style !== void 0)
        $$bindings.style(style);
      if ($$props.noClickToPlay === void 0 && $$bindings.noClickToPlay && noClickToPlay !== void 0)
        $$bindings.noClickToPlay(noClickToPlay);
      if ($$props.noDblClickFullscreen === void 0 && $$bindings.noDblClickFullscreen && noDblClickFullscreen !== void 0)
        $$bindings.noDblClickFullscreen(noDblClickFullscreen);
      if ($$props.noCaptions === void 0 && $$bindings.noCaptions && noCaptions !== void 0)
        $$bindings.noCaptions(noCaptions);
      if ($$props.noPoster === void 0 && $$bindings.noPoster && noPoster !== void 0)
        $$bindings.noPoster(noPoster);
      if ($$props.noSpinner === void 0 && $$bindings.noSpinner && noSpinner !== void 0)
        $$bindings.noSpinner(noSpinner);
      if ($$props.noControls === void 0 && $$bindings.noControls && noControls !== void 0)
        $$bindings.noControls(noControls);
      if ($$props.noSettings === void 0 && $$bindings.noSettings && noSettings !== void 0)
        $$bindings.noSettings(noSettings);
      if ($$props.noLoadingScreen === void 0 && $$bindings.noLoadingScreen && noLoadingScreen !== void 0)
        $$bindings.noLoadingScreen(noLoadingScreen);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      if ($$props.getWebComponent === void 0 && $$bindings.getWebComponent && getWebComponent !== void 0)
        $$bindings.getWebComponent(getWebComponent);
      return `<vm-default-ui${add_attribute("class", className, 0)}${add_attribute("style", style, 0)}${add_attribute("no-click-to-play", noClickToPlay, 0)}${add_attribute("no-dbl-click-fullscreen", noDblClickFullscreen, 0)}${add_attribute("no-captions", noCaptions, 0)}${add_attribute("no-poster", noPoster, 0)}${add_attribute("no-spinner", noSpinner, 0)}${add_attribute("no-controls", noControls, 0)}${add_attribute("no-settings", noSettings, 0)}${add_attribute("no-loading-screen", noLoadingScreen, 0)}${add_attribute("this", __ref, 0)}>${slots.default ? slots.default({}) : ``}</vm-default-ui>`;
    });
    define$1("vm-embed", VmEmbed);
    define$1("vm-end-time", VmEndTime);
    define$1("vm-time", VmTime);
    define$1("vm-file", VmFile);
    define$1("vm-fullscreen-control", VmFullscreenControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-hls", VmHls);
    define$1("vm-file", VmFile);
    define$1("vm-video", VmVideo);
    Hls$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let __ref;
      createEventDispatcher();
      let { class: className = "" } = $$props;
      let { style = "" } = $$props;
      let { version = "latest" } = $$props;
      let { libSrc = void 0 } = $$props;
      let { config = void 0 } = $$props;
      let { crossOrigin = void 0 } = $$props;
      let { preload = "metadata" } = $$props;
      let { poster = void 0 } = $$props;
      let { controlsList = void 0 } = $$props;
      let { autoPiP = void 0 } = $$props;
      let { disablePiP = void 0 } = $$props;
      let { disableRemotePlayback = void 0 } = $$props;
      let { playbackReady = false } = $$props;
      let { mediaTitle = void 0 } = $$props;
      const getAdapter = (...args) => __ref.getAdapter(...args);
      const ref = () => __ref;
      const getWebComponent = () => __ref;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.style === void 0 && $$bindings.style && style !== void 0)
        $$bindings.style(style);
      if ($$props.version === void 0 && $$bindings.version && version !== void 0)
        $$bindings.version(version);
      if ($$props.libSrc === void 0 && $$bindings.libSrc && libSrc !== void 0)
        $$bindings.libSrc(libSrc);
      if ($$props.config === void 0 && $$bindings.config && config !== void 0)
        $$bindings.config(config);
      if ($$props.crossOrigin === void 0 && $$bindings.crossOrigin && crossOrigin !== void 0)
        $$bindings.crossOrigin(crossOrigin);
      if ($$props.preload === void 0 && $$bindings.preload && preload !== void 0)
        $$bindings.preload(preload);
      if ($$props.poster === void 0 && $$bindings.poster && poster !== void 0)
        $$bindings.poster(poster);
      if ($$props.controlsList === void 0 && $$bindings.controlsList && controlsList !== void 0)
        $$bindings.controlsList(controlsList);
      if ($$props.autoPiP === void 0 && $$bindings.autoPiP && autoPiP !== void 0)
        $$bindings.autoPiP(autoPiP);
      if ($$props.disablePiP === void 0 && $$bindings.disablePiP && disablePiP !== void 0)
        $$bindings.disablePiP(disablePiP);
      if ($$props.disableRemotePlayback === void 0 && $$bindings.disableRemotePlayback && disableRemotePlayback !== void 0)
        $$bindings.disableRemotePlayback(disableRemotePlayback);
      if ($$props.playbackReady === void 0 && $$bindings.playbackReady && playbackReady !== void 0)
        $$bindings.playbackReady(playbackReady);
      if ($$props.mediaTitle === void 0 && $$bindings.mediaTitle && mediaTitle !== void 0)
        $$bindings.mediaTitle(mediaTitle);
      if ($$props.getAdapter === void 0 && $$bindings.getAdapter && getAdapter !== void 0)
        $$bindings.getAdapter(getAdapter);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      if ($$props.getWebComponent === void 0 && $$bindings.getWebComponent && getWebComponent !== void 0)
        $$bindings.getWebComponent(getWebComponent);
      return `<vm-hls${add_attribute("class", className, 0)}${add_attribute("style", style, 0)}${add_attribute("version", version, 0)}${add_attribute("lib-src", libSrc, 0)}${add_attribute("config", config, 0)}${add_attribute("cross-origin", crossOrigin, 0)}${add_attribute("preload", preload, 0)}${add_attribute("poster", poster, 0)}${add_attribute("controls-list", controlsList, 0)}${add_attribute("auto-pip", autoPiP, 0)}${add_attribute("disable-pip", disablePiP, 0)}${add_attribute("disable-remote-playback", disableRemotePlayback, 0)}${add_attribute("playback-ready", playbackReady, 0)}${add_attribute("media-title", mediaTitle, 0)}${add_attribute("this", __ref, 0)}>${slots.default ? slots.default({}) : ``}</vm-hls>`;
    });
    define$1("vm-icon", VmIcon);
    define$1("vm-icon-library", VmIconLibrary);
    define$1("vm-live-indicator", VmLiveIndicator);
    define$1("vm-loading-screen", VmLoadingScreen);
    define$1("vm-menu", VmMenu);
    define$1("vm-menu-item", VmMenuItem);
    define$1("vm-icon", VmIcon);
    define$1("vm-menu-radio", VmMenuRadio);
    define$1("vm-icon", VmIcon);
    define$1("vm-menu-item", VmMenuItem);
    define$1("vm-menu-radio-group", VmMenuRadioGroup);
    define$1("vm-mute-control", VmMuteControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-pip-control", VmPipControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-playback-control", VmPlaybackControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-player", VmPlayer);
    Player$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let __ref;
      createEventDispatcher();
      let { class: className = "" } = $$props;
      let { style = "" } = $$props;
      let { logger = void 0 } = $$props;
      let { theme = void 0 } = $$props;
      let { icons = "vime" } = $$props;
      let { paused = true } = $$props;
      let { playing = false } = $$props;
      let { duration = -1 } = $$props;
      let { mediaTitle = void 0 } = $$props;
      let { currentProvider = void 0 } = $$props;
      let { currentSrc = void 0 } = $$props;
      let { currentPoster = void 0 } = $$props;
      let { currentTime = 0 } = $$props;
      let { autoplay = false } = $$props;
      let { ready = false } = $$props;
      let { playbackReady = false } = $$props;
      let { loop = false } = $$props;
      let { muted = false } = $$props;
      let { buffered = 0 } = $$props;
      let { playbackRate = 1 } = $$props;
      let { playbackRates = [1] } = $$props;
      let { playbackQuality = void 0 } = $$props;
      let { playbackQualities = [] } = $$props;
      let { seeking = false } = $$props;
      let { debug = false } = $$props;
      let { playbackStarted = false } = $$props;
      let { playbackEnded = false } = $$props;
      let { buffering = false } = $$props;
      let { controls: controls2 = false } = $$props;
      let { isControlsActive = false } = $$props;
      let { isSettingsActive = false } = $$props;
      let { volume = 50 } = $$props;
      let { isFullscreenActive = false } = $$props;
      let { aspectRatio = "16:9" } = $$props;
      let { viewType = void 0 } = $$props;
      let { isAudioView = false } = $$props;
      let { isVideoView = false } = $$props;
      let { mediaType = void 0 } = $$props;
      let { isAudio = false } = $$props;
      let { isVideo = false } = $$props;
      let { isLive = false } = $$props;
      let { isMobile = false } = $$props;
      let { isTouch = false } = $$props;
      let { isPiPActive = false } = $$props;
      let { textTracks = [] } = $$props;
      let { currentTextTrack = -1 } = $$props;
      let { isTextTrackVisible = true } = $$props;
      let { shouldRenderNativeTextTracks = true } = $$props;
      let { audioTracks = [] } = $$props;
      let { currentAudioTrack = -1 } = $$props;
      let { autopause: autopause2 = true } = $$props;
      let { playsinline = false } = $$props;
      let { language = "en" } = $$props;
      let { translations = void 0 } = $$props;
      let { languages = ["en"] } = $$props;
      let { i18n = void 0 } = $$props;
      const getProvider = (...args) => __ref.getProvider(...args);
      const getAdapter = (...args) => __ref.getAdapter(...args);
      const play = (...args) => __ref.play(...args);
      const pause = (...args) => __ref.pause(...args);
      const canPlay = (...args) => __ref.canPlay(...args);
      const canAutoplay2 = (...args) => __ref.canAutoplay(...args);
      const canMutedAutoplay = (...args) => __ref.canMutedAutoplay(...args);
      const canSetPlaybackRate = (...args) => __ref.canSetPlaybackRate(...args);
      const canSetPlaybackQuality = (...args) => __ref.canSetPlaybackQuality(...args);
      const canSetFullscreen = (...args) => __ref.canSetFullscreen(...args);
      const enterFullscreen = (...args) => __ref.enterFullscreen(...args);
      const exitFullscreen = (...args) => __ref.exitFullscreen(...args);
      const canSetPiP = (...args) => __ref.canSetPiP(...args);
      const enterPiP = (...args) => __ref.enterPiP(...args);
      const exitPiP = (...args) => __ref.exitPiP(...args);
      const canSetAudioTrack = (...args) => __ref.canSetAudioTrack(...args);
      const setCurrentAudioTrack = (...args) => __ref.setCurrentAudioTrack(...args);
      const canSetTextTrack = (...args) => __ref.canSetTextTrack(...args);
      const setCurrentTextTrack = (...args) => __ref.setCurrentTextTrack(...args);
      const canSetTextTrackVisibility = (...args) => __ref.canSetTextTrackVisibility(...args);
      const setTextTrackVisibility = (...args) => __ref.setTextTrackVisibility(...args);
      const extendLanguage = (...args) => __ref.extendLanguage(...args);
      const getContainer = (...args) => __ref.getContainer(...args);
      const callAdapter = (...args) => __ref.callAdapter(...args);
      const ref = () => __ref;
      const getWebComponent = () => __ref;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.style === void 0 && $$bindings.style && style !== void 0)
        $$bindings.style(style);
      if ($$props.logger === void 0 && $$bindings.logger && logger !== void 0)
        $$bindings.logger(logger);
      if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
        $$bindings.theme(theme);
      if ($$props.icons === void 0 && $$bindings.icons && icons !== void 0)
        $$bindings.icons(icons);
      if ($$props.paused === void 0 && $$bindings.paused && paused !== void 0)
        $$bindings.paused(paused);
      if ($$props.playing === void 0 && $$bindings.playing && playing !== void 0)
        $$bindings.playing(playing);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
        $$bindings.duration(duration);
      if ($$props.mediaTitle === void 0 && $$bindings.mediaTitle && mediaTitle !== void 0)
        $$bindings.mediaTitle(mediaTitle);
      if ($$props.currentProvider === void 0 && $$bindings.currentProvider && currentProvider !== void 0)
        $$bindings.currentProvider(currentProvider);
      if ($$props.currentSrc === void 0 && $$bindings.currentSrc && currentSrc !== void 0)
        $$bindings.currentSrc(currentSrc);
      if ($$props.currentPoster === void 0 && $$bindings.currentPoster && currentPoster !== void 0)
        $$bindings.currentPoster(currentPoster);
      if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0)
        $$bindings.currentTime(currentTime);
      if ($$props.autoplay === void 0 && $$bindings.autoplay && autoplay !== void 0)
        $$bindings.autoplay(autoplay);
      if ($$props.ready === void 0 && $$bindings.ready && ready !== void 0)
        $$bindings.ready(ready);
      if ($$props.playbackReady === void 0 && $$bindings.playbackReady && playbackReady !== void 0)
        $$bindings.playbackReady(playbackReady);
      if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
        $$bindings.loop(loop);
      if ($$props.muted === void 0 && $$bindings.muted && muted !== void 0)
        $$bindings.muted(muted);
      if ($$props.buffered === void 0 && $$bindings.buffered && buffered !== void 0)
        $$bindings.buffered(buffered);
      if ($$props.playbackRate === void 0 && $$bindings.playbackRate && playbackRate !== void 0)
        $$bindings.playbackRate(playbackRate);
      if ($$props.playbackRates === void 0 && $$bindings.playbackRates && playbackRates !== void 0)
        $$bindings.playbackRates(playbackRates);
      if ($$props.playbackQuality === void 0 && $$bindings.playbackQuality && playbackQuality !== void 0)
        $$bindings.playbackQuality(playbackQuality);
      if ($$props.playbackQualities === void 0 && $$bindings.playbackQualities && playbackQualities !== void 0)
        $$bindings.playbackQualities(playbackQualities);
      if ($$props.seeking === void 0 && $$bindings.seeking && seeking !== void 0)
        $$bindings.seeking(seeking);
      if ($$props.debug === void 0 && $$bindings.debug && debug !== void 0)
        $$bindings.debug(debug);
      if ($$props.playbackStarted === void 0 && $$bindings.playbackStarted && playbackStarted !== void 0)
        $$bindings.playbackStarted(playbackStarted);
      if ($$props.playbackEnded === void 0 && $$bindings.playbackEnded && playbackEnded !== void 0)
        $$bindings.playbackEnded(playbackEnded);
      if ($$props.buffering === void 0 && $$bindings.buffering && buffering !== void 0)
        $$bindings.buffering(buffering);
      if ($$props.controls === void 0 && $$bindings.controls && controls2 !== void 0)
        $$bindings.controls(controls2);
      if ($$props.isControlsActive === void 0 && $$bindings.isControlsActive && isControlsActive !== void 0)
        $$bindings.isControlsActive(isControlsActive);
      if ($$props.isSettingsActive === void 0 && $$bindings.isSettingsActive && isSettingsActive !== void 0)
        $$bindings.isSettingsActive(isSettingsActive);
      if ($$props.volume === void 0 && $$bindings.volume && volume !== void 0)
        $$bindings.volume(volume);
      if ($$props.isFullscreenActive === void 0 && $$bindings.isFullscreenActive && isFullscreenActive !== void 0)
        $$bindings.isFullscreenActive(isFullscreenActive);
      if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0)
        $$bindings.aspectRatio(aspectRatio);
      if ($$props.viewType === void 0 && $$bindings.viewType && viewType !== void 0)
        $$bindings.viewType(viewType);
      if ($$props.isAudioView === void 0 && $$bindings.isAudioView && isAudioView !== void 0)
        $$bindings.isAudioView(isAudioView);
      if ($$props.isVideoView === void 0 && $$bindings.isVideoView && isVideoView !== void 0)
        $$bindings.isVideoView(isVideoView);
      if ($$props.mediaType === void 0 && $$bindings.mediaType && mediaType !== void 0)
        $$bindings.mediaType(mediaType);
      if ($$props.isAudio === void 0 && $$bindings.isAudio && isAudio !== void 0)
        $$bindings.isAudio(isAudio);
      if ($$props.isVideo === void 0 && $$bindings.isVideo && isVideo !== void 0)
        $$bindings.isVideo(isVideo);
      if ($$props.isLive === void 0 && $$bindings.isLive && isLive !== void 0)
        $$bindings.isLive(isLive);
      if ($$props.isMobile === void 0 && $$bindings.isMobile && isMobile !== void 0)
        $$bindings.isMobile(isMobile);
      if ($$props.isTouch === void 0 && $$bindings.isTouch && isTouch !== void 0)
        $$bindings.isTouch(isTouch);
      if ($$props.isPiPActive === void 0 && $$bindings.isPiPActive && isPiPActive !== void 0)
        $$bindings.isPiPActive(isPiPActive);
      if ($$props.textTracks === void 0 && $$bindings.textTracks && textTracks !== void 0)
        $$bindings.textTracks(textTracks);
      if ($$props.currentTextTrack === void 0 && $$bindings.currentTextTrack && currentTextTrack !== void 0)
        $$bindings.currentTextTrack(currentTextTrack);
      if ($$props.isTextTrackVisible === void 0 && $$bindings.isTextTrackVisible && isTextTrackVisible !== void 0)
        $$bindings.isTextTrackVisible(isTextTrackVisible);
      if ($$props.shouldRenderNativeTextTracks === void 0 && $$bindings.shouldRenderNativeTextTracks && shouldRenderNativeTextTracks !== void 0)
        $$bindings.shouldRenderNativeTextTracks(shouldRenderNativeTextTracks);
      if ($$props.audioTracks === void 0 && $$bindings.audioTracks && audioTracks !== void 0)
        $$bindings.audioTracks(audioTracks);
      if ($$props.currentAudioTrack === void 0 && $$bindings.currentAudioTrack && currentAudioTrack !== void 0)
        $$bindings.currentAudioTrack(currentAudioTrack);
      if ($$props.autopause === void 0 && $$bindings.autopause && autopause2 !== void 0)
        $$bindings.autopause(autopause2);
      if ($$props.playsinline === void 0 && $$bindings.playsinline && playsinline !== void 0)
        $$bindings.playsinline(playsinline);
      if ($$props.language === void 0 && $$bindings.language && language !== void 0)
        $$bindings.language(language);
      if ($$props.translations === void 0 && $$bindings.translations && translations !== void 0)
        $$bindings.translations(translations);
      if ($$props.languages === void 0 && $$bindings.languages && languages !== void 0)
        $$bindings.languages(languages);
      if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
        $$bindings.i18n(i18n);
      if ($$props.getProvider === void 0 && $$bindings.getProvider && getProvider !== void 0)
        $$bindings.getProvider(getProvider);
      if ($$props.getAdapter === void 0 && $$bindings.getAdapter && getAdapter !== void 0)
        $$bindings.getAdapter(getAdapter);
      if ($$props.play === void 0 && $$bindings.play && play !== void 0)
        $$bindings.play(play);
      if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
        $$bindings.pause(pause);
      if ($$props.canPlay === void 0 && $$bindings.canPlay && canPlay !== void 0)
        $$bindings.canPlay(canPlay);
      if ($$props.canAutoplay === void 0 && $$bindings.canAutoplay && canAutoplay2 !== void 0)
        $$bindings.canAutoplay(canAutoplay2);
      if ($$props.canMutedAutoplay === void 0 && $$bindings.canMutedAutoplay && canMutedAutoplay !== void 0)
        $$bindings.canMutedAutoplay(canMutedAutoplay);
      if ($$props.canSetPlaybackRate === void 0 && $$bindings.canSetPlaybackRate && canSetPlaybackRate !== void 0)
        $$bindings.canSetPlaybackRate(canSetPlaybackRate);
      if ($$props.canSetPlaybackQuality === void 0 && $$bindings.canSetPlaybackQuality && canSetPlaybackQuality !== void 0)
        $$bindings.canSetPlaybackQuality(canSetPlaybackQuality);
      if ($$props.canSetFullscreen === void 0 && $$bindings.canSetFullscreen && canSetFullscreen !== void 0)
        $$bindings.canSetFullscreen(canSetFullscreen);
      if ($$props.enterFullscreen === void 0 && $$bindings.enterFullscreen && enterFullscreen !== void 0)
        $$bindings.enterFullscreen(enterFullscreen);
      if ($$props.exitFullscreen === void 0 && $$bindings.exitFullscreen && exitFullscreen !== void 0)
        $$bindings.exitFullscreen(exitFullscreen);
      if ($$props.canSetPiP === void 0 && $$bindings.canSetPiP && canSetPiP !== void 0)
        $$bindings.canSetPiP(canSetPiP);
      if ($$props.enterPiP === void 0 && $$bindings.enterPiP && enterPiP !== void 0)
        $$bindings.enterPiP(enterPiP);
      if ($$props.exitPiP === void 0 && $$bindings.exitPiP && exitPiP !== void 0)
        $$bindings.exitPiP(exitPiP);
      if ($$props.canSetAudioTrack === void 0 && $$bindings.canSetAudioTrack && canSetAudioTrack !== void 0)
        $$bindings.canSetAudioTrack(canSetAudioTrack);
      if ($$props.setCurrentAudioTrack === void 0 && $$bindings.setCurrentAudioTrack && setCurrentAudioTrack !== void 0)
        $$bindings.setCurrentAudioTrack(setCurrentAudioTrack);
      if ($$props.canSetTextTrack === void 0 && $$bindings.canSetTextTrack && canSetTextTrack !== void 0)
        $$bindings.canSetTextTrack(canSetTextTrack);
      if ($$props.setCurrentTextTrack === void 0 && $$bindings.setCurrentTextTrack && setCurrentTextTrack !== void 0)
        $$bindings.setCurrentTextTrack(setCurrentTextTrack);
      if ($$props.canSetTextTrackVisibility === void 0 && $$bindings.canSetTextTrackVisibility && canSetTextTrackVisibility !== void 0)
        $$bindings.canSetTextTrackVisibility(canSetTextTrackVisibility);
      if ($$props.setTextTrackVisibility === void 0 && $$bindings.setTextTrackVisibility && setTextTrackVisibility !== void 0)
        $$bindings.setTextTrackVisibility(setTextTrackVisibility);
      if ($$props.extendLanguage === void 0 && $$bindings.extendLanguage && extendLanguage !== void 0)
        $$bindings.extendLanguage(extendLanguage);
      if ($$props.getContainer === void 0 && $$bindings.getContainer && getContainer !== void 0)
        $$bindings.getContainer(getContainer);
      if ($$props.callAdapter === void 0 && $$bindings.callAdapter && callAdapter !== void 0)
        $$bindings.callAdapter(callAdapter);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      if ($$props.getWebComponent === void 0 && $$bindings.getWebComponent && getWebComponent !== void 0)
        $$bindings.getWebComponent(getWebComponent);
      return `<vm-player${add_attribute("class", className, 0)}${add_attribute("style", style, 0)}${add_attribute("theme", theme, 0)}${add_attribute("icons", icons, 0)}${add_attribute("paused", paused, 0)}${add_attribute("playing", playing, 0)}${add_attribute("duration", duration, 0)}${add_attribute("media-title", mediaTitle, 0)}${add_attribute("current-provider", currentProvider, 0)}${add_attribute("current-src", currentSrc, 0)}${add_attribute("current-poster", currentPoster, 0)}${add_attribute("current-time", currentTime, 0)} ${autoplay ? "autoplay" : ""}${add_attribute("ready", ready, 0)}${add_attribute("playback-ready", playbackReady, 0)} ${loop ? "loop" : ""} ${muted ? "muted" : ""}${add_attribute("buffered", buffered, 0)}${add_attribute("playback-rate", playbackRate, 0)}${add_attribute("playback-quality", playbackQuality, 0)}${add_attribute("seeking", seeking, 0)}${add_attribute("debug", debug, 0)}${add_attribute("playback-started", playbackStarted, 0)}${add_attribute("playback-ended", playbackEnded, 0)}${add_attribute("buffering", buffering, 0)} ${controls2 ? "controls" : ""}${add_attribute("is-controls-active", isControlsActive, 0)}${add_attribute("is-settings-active", isSettingsActive, 0)}${add_attribute("volume", volume, 0)}${add_attribute("is-fullscreen-active", isFullscreenActive, 0)}${add_attribute("aspect-ratio", aspectRatio, 0)}${add_attribute("view-type", viewType, 0)}${add_attribute("is-audio-view", isAudioView, 0)}${add_attribute("is-video-view", isVideoView, 0)}${add_attribute("media-type", mediaType, 0)}${add_attribute("is-audio", isAudio, 0)}${add_attribute("is-video", isVideo, 0)}${add_attribute("is-live", isLive, 0)}${add_attribute("is-mobile", isMobile, 0)}${add_attribute("is-touch", isTouch, 0)}${add_attribute("is-pi-p-active", isPiPActive, 0)}${add_attribute("current-text-track", currentTextTrack, 0)}${add_attribute("is-text-track-visible", isTextTrackVisible, 0)}${add_attribute("should-render-native-text-tracks", shouldRenderNativeTextTracks, 0)}${add_attribute("current-audio-track", currentAudioTrack, 0)}${add_attribute("autopause", autopause2, 0)} ${playsinline ? "playsinline" : ""}${add_attribute("language", language, 0)}${add_attribute("this", __ref, 0)}>${slots.default ? slots.default({}) : ``}</vm-player>`;
    });
    define$1("vm-poster", VmPoster);
    define$1("vm-scrim", VmScrim);
    define$1("vm-scrubber-control", VmScrubberControl);
    define$1("vm-slider", VmSlider);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-settings", VmSettings);
    define$1("vm-menu", VmMenu);
    define$1("vm-settings-control", VmSettingsControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-skeleton", VmSkeleton);
    define$1("vm-slider", VmSlider);
    define$1("vm-spinner", VmSpinner);
    define$1("vm-submenu", VmSubmenu);
    define$1("vm-icon", VmIcon);
    define$1("vm-menu", VmMenu);
    define$1("vm-menu-item", VmMenuItem);
    define$1("vm-time", VmTime);
    define$1("vm-time-progress", VmTimeProgress);
    define$1("vm-current-time", VmCurrentTime);
    define$1("vm-time", VmTime);
    define$1("vm-end-time", VmEndTime);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-ui", VmUi);
    define$1("vm-video", VmVideo);
    define$1("vm-file", VmFile);
    define$1("vm-vimeo", VmVimeo);
    define$1("vm-embed", VmEmbed);
    define$1("vm-volume-control", VmVolumeControl);
    define$1("vm-control", VmControl);
    define$1("vm-icon", VmIcon);
    define$1("vm-mute-control", VmMuteControl);
    define$1("vm-tooltip", VmTooltip);
    define$1("vm-slider", VmSlider);
    define$1("vm-youtube", VmYoutube);
    define$1("vm-embed", VmEmbed);
    DefaultUi = DefaultUi$1;
    Hls = Hls$1;
    Player2 = Player$1;
    define = (tagName, clazz) => {
      const isClient = typeof window !== "undefined";
      if (isClient && !customElements.get(tagName))
        customElements.define(tagName, clazz);
    };
    define("vm-audio", VmAudio);
    define("vm-file", VmFile);
    define("vm-caption-control", VmCaptionControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-tooltip", VmTooltip);
    define("vm-captions", VmCaptions);
    define("vm-click-to-play", VmClickToPlay);
    define("vm-control", VmControl);
    define("vm-control-group", VmControlGroup);
    define("vm-control-spacer", VmControlSpacer);
    define("vm-controls", VmControls);
    define("vm-current-time", VmCurrentTime);
    define("vm-time", VmTime);
    define("vm-dailymotion", VmDailymotion);
    define("vm-embed", VmEmbed);
    define("vm-dash", VmDash);
    define("vm-file", VmFile);
    define("vm-video", VmVideo);
    define("vm-dbl-click-fullscreen", VmDblClickFullscreen);
    define("vm-default-controls", VmDefaultControls);
    define("vm-caption-control", VmCaptionControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-tooltip", VmTooltip);
    define("vm-control-group", VmControlGroup);
    define("vm-control-spacer", VmControlSpacer);
    define("vm-controls", VmControls);
    define("vm-current-time", VmCurrentTime);
    define("vm-time", VmTime);
    define("vm-end-time", VmEndTime);
    define("vm-fullscreen-control", VmFullscreenControl);
    define("vm-live-indicator", VmLiveIndicator);
    define("vm-mute-control", VmMuteControl);
    define("vm-pip-control", VmPipControl);
    define("vm-playback-control", VmPlaybackControl);
    define("vm-scrim", VmScrim);
    define("vm-scrubber-control", VmScrubberControl);
    define("vm-slider", VmSlider);
    define("vm-settings-control", VmSettingsControl);
    define("vm-time-progress", VmTimeProgress);
    define("vm-volume-control", VmVolumeControl);
    define("vm-default-settings", VmDefaultSettings);
    define("vm-icon", VmIcon);
    define("vm-menu", VmMenu);
    define("vm-menu-item", VmMenuItem);
    define("vm-menu-radio", VmMenuRadio);
    define("vm-menu-radio-group", VmMenuRadioGroup);
    define("vm-settings", VmSettings);
    define("vm-submenu", VmSubmenu);
    define("vm-default-ui", VmDefaultUi);
    define("vm-caption-control", VmCaptionControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-tooltip", VmTooltip);
    define("vm-captions", VmCaptions);
    define("vm-click-to-play", VmClickToPlay);
    define("vm-control-group", VmControlGroup);
    define("vm-control-spacer", VmControlSpacer);
    define("vm-controls", VmControls);
    define("vm-current-time", VmCurrentTime);
    define("vm-time", VmTime);
    define("vm-dbl-click-fullscreen", VmDblClickFullscreen);
    define("vm-default-controls", VmDefaultControls);
    define("vm-end-time", VmEndTime);
    define("vm-fullscreen-control", VmFullscreenControl);
    define("vm-live-indicator", VmLiveIndicator);
    define("vm-mute-control", VmMuteControl);
    define("vm-pip-control", VmPipControl);
    define("vm-playback-control", VmPlaybackControl);
    define("vm-scrim", VmScrim);
    define("vm-scrubber-control", VmScrubberControl);
    define("vm-slider", VmSlider);
    define("vm-settings-control", VmSettingsControl);
    define("vm-time-progress", VmTimeProgress);
    define("vm-volume-control", VmVolumeControl);
    define("vm-default-settings", VmDefaultSettings);
    define("vm-menu", VmMenu);
    define("vm-menu-item", VmMenuItem);
    define("vm-menu-radio", VmMenuRadio);
    define("vm-menu-radio-group", VmMenuRadioGroup);
    define("vm-settings", VmSettings);
    define("vm-submenu", VmSubmenu);
    define("vm-loading-screen", VmLoadingScreen);
    define("vm-poster", VmPoster);
    define("vm-spinner", VmSpinner);
    define("vm-ui", VmUi);
    define("vm-embed", VmEmbed);
    define("vm-end-time", VmEndTime);
    define("vm-time", VmTime);
    define("vm-file", VmFile);
    define("vm-fullscreen-control", VmFullscreenControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-tooltip", VmTooltip);
    define("vm-hls", VmHls);
    define("vm-file", VmFile);
    define("vm-video", VmVideo);
    define("vm-icon", VmIcon);
    define("vm-icon-library", VmIconLibrary);
    define("vm-live-indicator", VmLiveIndicator);
    define("vm-loading-screen", VmLoadingScreen);
    define("vm-menu", VmMenu);
    define("vm-menu-item", VmMenuItem);
    define("vm-icon", VmIcon);
    define("vm-menu-radio", VmMenuRadio);
    define("vm-icon", VmIcon);
    define("vm-menu-item", VmMenuItem);
    define("vm-menu-radio-group", VmMenuRadioGroup);
    define("vm-mute-control", VmMuteControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-tooltip", VmTooltip);
    define("vm-pip-control", VmPipControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-tooltip", VmTooltip);
    define("vm-playback-control", VmPlaybackControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-tooltip", VmTooltip);
    define("vm-player", VmPlayer);
    define("vm-poster", VmPoster);
    define("vm-scrim", VmScrim);
    define("vm-scrubber-control", VmScrubberControl);
    define("vm-slider", VmSlider);
    define("vm-tooltip", VmTooltip);
    define("vm-settings", VmSettings);
    define("vm-menu", VmMenu);
    define("vm-settings-control", VmSettingsControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-tooltip", VmTooltip);
    define("vm-skeleton", VmSkeleton);
    define("vm-slider", VmSlider);
    define("vm-spinner", VmSpinner);
    define("vm-submenu", VmSubmenu);
    define("vm-icon", VmIcon);
    define("vm-menu", VmMenu);
    define("vm-menu-item", VmMenuItem);
    define("vm-time", VmTime);
    define("vm-time-progress", VmTimeProgress);
    define("vm-current-time", VmCurrentTime);
    define("vm-time", VmTime);
    define("vm-end-time", VmEndTime);
    define("vm-tooltip", VmTooltip);
    define("vm-ui", VmUi);
    define("vm-video", VmVideo);
    define("vm-file", VmFile);
    define("vm-vimeo", VmVimeo);
    define("vm-embed", VmEmbed);
    define("vm-volume-control", VmVolumeControl);
    define("vm-control", VmControl);
    define("vm-icon", VmIcon);
    define("vm-mute-control", VmMuteControl);
    define("vm-tooltip", VmTooltip);
    define("vm-slider", VmSlider);
    define("vm-youtube", VmYoutube);
    define("vm-embed", VmEmbed);
    globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-1asz6g5_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css"><!-- HEAD_svelte-1asz6g5_END -->`, ""}

${validate_component(Player2, "Player").$$render(
        $$result,
        {
          theme: "dark",
          style: "--vm-player-theme: #e86c8b;"
        },
        {},
        {
          default: () => {
            return `${validate_component(Hls, "Hls").$$render(
              $$result,
              {
                crossOrigin: true,
                poster: "https://media.vimejs.com/poster.png"
              },
              {},
              {
                default: () => {
                  return `<source data-src="https://video-weaver.cph01.hls.live-video.net/v1/playlist/CswFsUFQfex2-yLzYe_YmJn9n_ZZHYhi1Fk3UTlyA-IbnpFAL1Y8BWOelnGCn0-OFO8Nd43x6SSZIy6VhwhSd3xhsnMnOtuQn2BO_jkhdEeKE3QPwKSoaY0WaOQjfPwf4u4DTVzrJ6yjybCX9mo4DZozkFpVVYZ3sls7hFR0XlF9Af-IJIf7H8mgSwPAgcMqT3ydXCaJeI-n9QCb4SxB3V5Y50x58_3BVy6sEWBld8gSlv74nQRurwRYa3HVxvX0mmrag2Q-jBnoc3rredbDS-xTbohWchrsnKEPiawwh4Q2LUWeYFUI-9QqQ5D1K7d1aJSLCtoO8DZsqdwu6nKKv1OZBnnTJnlr-SSa9rmxlzRYI_sVOfgE2xz68Hp7kagHJlTLwuhfdVPI4Gxi-yJJAeHhAV-UGQ6hdutplAHCfnVSJYBd2w4CcMMXW2Ijij1UY0vHw7lbMIGeGCovyAwNMFBDY7EvTkIAEnuPI2HjVJBKrb4ABNO-4SDciWZUDKhm_pg8vcnPhiGc75MAOCGc6Snyb8sgC_foy13r5h-ddg3MYhedL24TWVVXfJuzECTZshkxm8L_vnXZCZh4D_uSnImeL4VCWA2y1mmipQVy7IAyNLiqC0G3Dp2TxqZtdIgFHmYytPJ4fb2sBZDjvOCAPkdkFmYtCT00hEd25hN0GOjSKZgerct9K1ryxFxBg2qoxUdkP-zqwWC3pp7rFADi6hgVtPg52Sw6lP681yKAjYu21T-srWSSBQY5NWzwX_6lfek_3BR8PZurtRKhOVmBUvXECcZXW-qKfo_vdUAX4yoYc24iRSUIN1I0tmOT6YrokrzxPQdI3DqqxSMYJz-TBCkm6DG7NeqKQqEHfTKrSdeokwl_wQhnXqao3MFy1eIPVSHvr8rP62EOoDl13Fs1A1MREm9RCd0OgI6z7WcjA4w55h7XqP5B_1TSmoUVbRgaDDmZQJkGmHd77_ARsyABKgl1cy1lYXN0LTIwwgc.m3u8" type="application/x-mpegURL">`;
                }
              }
            )}

	${validate_component(DefaultUi, "DefaultUi").$$render($$result, {}, {}, {})}`;
          }
        }
      )}`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => component_cache6 ?? (component_cache6 = (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default);
    imports6 = ["_app/immutable/nodes/5.afd56ccf.js", "_app/immutable/chunks/index.e9f39a1b.js"];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/logs/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
var Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/logs/_page.svelte.js"() {
    init_index2();
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<main class="flex flex-col justify-center items-center h-full"><img src="//cdn.7tv.app/emote/60ae2440aee2aa553892c5f5/4x.webp" loading="lazy" alt="">
	<span class="text-xl">Logs coming soon</span></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    index7 = 6;
    component7 = async () => component_cache7 ?? (component_cache7 = (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default);
    imports7 = ["_app/immutable/nodes/6.ab449c4e.js", "_app/immutable/chunks/index.e9f39a1b.js"];
    stylesheets7 = [];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/music/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
var Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/music/_page.svelte.js"() {
    init_index2();
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<main class="flex flex-col justify-center items-center h-full"><img src="//static-cdn.jtvnw.net/emoticons/v2/emotesv2_e5a46ab9c8854c3fa42641788b2f5cd8/animated/light/3.0" loading="lazy" alt="">
	<span class="text-xl">Work in progress</span></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component_cache8, component8, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    index8 = 7;
    component8 = async () => component_cache8 ?? (component_cache8 = (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default);
    imports8 = ["_app/immutable/nodes/7.a7d36ba5.js", "_app/immutable/chunks/index.e9f39a1b.js"];
    stylesheets8 = [];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/secret/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => Page7
});
var Page7;
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/secret/_page.svelte.js"() {
    init_index2();
    Page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<main class="flex flex-col justify-center items-center h-full"><img src="//cdn.7tv.app/emote/611d96fea56203a1c89f8069/4x.webp" loading="lazy" alt="">
	<span class="text-xl">Nothing to see here</span></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    index9 = 8;
    component9 = async () => component_cache9 ?? (component_cache9 = (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default);
    imports9 = ["_app/immutable/nodes/8.7800604f.js", "_app/immutable/chunks/index.e9f39a1b.js"];
    stylesheets9 = [];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/entries/endpoints/api/predictions/_server.ts.js
var server_ts_exports = {};
__export(server_ts_exports, {
  GET: () => GET
});
var GET;
var init_server_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/predictions/_server.ts.js"() {
    init_chunks();
    init_private();
    GET = async ({ params, url }) => {
      const response = await fetch(
        `https://api.replicate.com/v1/predictions?cursor=${url.searchParams.get("cursor")}`,
        {
          headers: {
            Authorization: `Token ${REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
      const predictions = await response.json();
      return json(predictions);
    };
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_index2();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `


${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n	<meta charset="utf-8" />\n	<link rel="icon" href="' + assets2 + '/out-2.png" />\n	<meta name="viewport" content="width=device-width" />\n	' + head + "\n</head>\n\n<body>\n	<div>" + body + "</div>\n</body>\n\n</html>",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "14t2av0"
};
function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_chunks();

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i2 = 0; i2 < len; i2 += 1) {
    const char = str[i2];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i2) + replacement;
      last_pos = i2 + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i2) => {
            keys.push(`[${i2}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key3, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key3) ? stringify_primitive(key3) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key3 in thing) {
            keys.push(`.${key3}`);
            walk(thing[key3]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i2) => {
    names.set(entry[0], get_name(i2));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i2) => i2 in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key3) => `${safe_key(key3)}:${stringify2(thing[key3])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i2) => {
            statements.push(`${name}[${i2}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key3) => {
            statements.push(
              `${name}${safe_prop(key3)}=${stringify2(thing[key3])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key3) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key3) ? key3 : escape_unsafe_chars(JSON.stringify(key3));
}
function safe_prop(key3) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key3) ? `.${key3}` : `[${escape_unsafe_chars(JSON.stringify(key3))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key3 in reducers) {
    custom.push({ key: key3, fn: reducers[key3] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index11 = p++;
    indexes.set(thing, index11);
    for (const { key: key3, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index11] = `["${key3}",${flatten(value2)}]`;
        return index11;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i2 = 0; i2 < thing.length; i2 += 1) {
            if (i2 > 0)
              str += ",";
            if (i2 in thing) {
              keys.push(`[${i2}]`);
              str += flatten(thing[i2]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key3, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key3) ? stringify_primitive2(key3) : "..."})`
            );
            str += `,${flatten(key3)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key3 in thing) {
              keys.push(`.${key3}`);
              str += `,${stringify_string(key3)},${flatten(thing[key3])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key3 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key3}`);
              str += `${stringify_string(key3)}:${flatten(thing[key3])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index11] = str;
    return index11;
  }
  const index10 = flatten(value);
  if (index10 < 0)
    return `${index10}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_index2();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD"
]);
var PAGE_METHODS = /* @__PURE__ */ new Set(["GET", "POST", "HEAD"]);
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i: i2 });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i2 = 0; i2 < params.length; i2 += 1) {
    const param = params[i2];
    let value = values[i2 - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i2 - buffered, i2 + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i2 + 1];
      const next_value = values[i2 + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = Array.from(ENDPOINT_METHODS).filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.has(method) && !PAGE_METHODS.has(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key22 in params) {
    params[key22] = decodeURIComponent(params[key22]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key22 in object) {
    if (typeof object[key22]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key22) => {
        uses.params.add(key22);
        return target[
          /** @type {string} */
          key22
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key22) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key22
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key22, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key22 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key22 === "text") {
          return text2;
        }
        if (key22 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key22, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key22) => {
        const lower = key22.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i2 = value.length;
      while (i2)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i2 = buffer.length;
      while (i2)
        hash2 = hash2 * 33 ^ buffer[--i2];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key22, value] of fetched.response.headers) {
    if (filter(key22, value)) {
      headers[key22] = value;
    }
    if (key22 === "cache-control")
      cache_control = value;
    else if (key22 === "age")
      age = value;
    else if (key22 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i2 = 0; i2 < array2.length; i2 += 16) {
    const w = array2.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars2[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars2[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars2[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key22 in directives) {
      if (is_meta && (key22 === "frame-ancestors" || key22 === "report-uri" || key22 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key22]
      );
      if (!value)
        continue;
      const directive = [key22];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets10 = new Set(client.stylesheets);
  const fonts10 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      data2 = { ...data2, ...branch[i2].data };
      props[`data_${i2}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets10.add(url);
      for (const url of node.fonts)
        fonts10.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets10) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts10) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i2) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i2; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i2) => {
      if (!invalidated[i2]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i2) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i2 + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key22 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key22 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key22 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key22}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i2) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i2; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i2) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i2; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i2],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      if (node) {
        try {
          const server_data = await server_promises[i2];
          const data = await load_promises[i2];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i2--) {
            if (page2.errors[i2]) {
              const index10 = (
                /** @type {number} */
                page2.errors[i2]
              );
              const node2 = await manifest2._.nodes[index10]();
              let j = i2;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      set_internal(name, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return (0, import_cookie.serialize)(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key22 in new_cookies) {
      const cookie = new_cookies[key22];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name] = {
      name,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key22 in module) {
      if (key22[0] === "_" || expected.has(key22))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key22, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key22}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key22, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key22)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key22)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key22)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key22)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key22)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key22}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key22 in new_headers) {
        const lower = key22.toLowerCase();
        const value = new_headers[key22];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key22}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key22 in headers) {
          const value = headers[key22];
          response2.headers.set(
            key22,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key22 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key22);
          if (value)
            headers2.set(key22, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/fn/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["beemo-data.zip", "favicon.png", "out-2.png"]),
    mimeTypes: { ".zip": "application/zip", ".png": "image/png" },
    _: {
      client: { "start": "_app/immutable/entry/start.8c8fd59e.js", "app": "_app/immutable/entry/app.d94c0b18.js", "imports": ["_app/immutable/entry/start.8c8fd59e.js", "_app/immutable/chunks/index.e9f39a1b.js", "_app/immutable/chunks/singletons.12ba4dde.js", "_app/immutable/entry/app.d94c0b18.js", "_app/immutable/chunks/index.e9f39a1b.js"], "stylesheets": [], "fonts": [] },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/api/predictions",
          pattern: /^\/api\/predictions\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts(), server_ts_exports)))
        },
        {
          id: "/imagegen",
          pattern: /^\/imagegen\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/imagegen/[id]",
          pattern: /^\/imagegen\/([^/]+?)\/?$/,
          params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/kick",
          pattern: /^\/kick\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/logs",
          pattern: /^\/logs\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        },
        {
          id: "/music",
          pattern: /^\/music\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 7 },
          endpoint: null
        },
        {
          id: "/secret",
          pattern: /^\/secret\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 8 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      }
    }
  };
})();

// .svelte-kit/vercel-tmp/fn/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  )
});
var edge_default = async (request, context) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@stencil/core/internal/client/shadow-css.js:
  (**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *
   * This file is a port of shadowCSS from webcomponents.js to TypeScript.
   * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
   * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
   *)
*/
//# sourceMappingURL=index.js.map
