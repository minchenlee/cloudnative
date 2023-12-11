import {
  __publicField
} from "./chunk-TCQZMY3T.js";

// node_modules/ldrs/dist/lib/LdrsBaseElement.js
var t = class extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "_propsToUpgrade", {});
    __publicField(this, "shadow");
    __publicField(this, "template");
    __publicField(this, "defaultProps");
    __publicField(this, "isAttached", false);
    this.shadow = this.attachShadow({ mode: "open" }), this.template = document.createElement("template");
  }
  storePropsToUpgrade(t2) {
    t2.forEach((t3) => {
      this.hasOwnProperty(t3) && void 0 !== this[t3] && (this._propsToUpgrade[t3] = this[t3], delete this[t3]);
    });
  }
  upgradeStoredProps() {
    Object.entries(this._propsToUpgrade).forEach(([t2, e]) => {
      this.setAttribute(t2, e);
    });
  }
  reflect(t2) {
    t2.forEach((t3) => {
      Object.defineProperty(this, t3, { set(e) {
        "string,number".includes(typeof e) ? this.setAttribute(t3, e.toString()) : this.removeAttribute(t3);
      }, get() {
        return this.getAttribute(t3);
      } });
    });
  }
  applyDefaultProps(t2) {
    this.defaultProps = t2, Object.entries(t2).forEach(([t3, e]) => {
      this[t3] = this[t3] || e.toString();
    });
  }
};

export {
  t
};
//# sourceMappingURL=chunk-CV5XB4LK.js.map
