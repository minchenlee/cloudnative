import {
  t
} from "./chunk-CV5XB4LK.js";
import {
  __publicField
} from "./chunk-TCQZMY3T.js";

// node_modules/ldrs/dist/elements/ring.js
var e = ":host{align-items:center;display:inline-flex;flex-shrink:0;height:var(--uib-size);justify-content:center;width:var(--uib-size)}:host([hidden]){display:none}.container{animation:rotate var(--uib-speed) linear infinite;height:var(--uib-size);overflow:visible;transform-origin:center;width:var(--uib-size);will-change:transform}.car{stroke:var(--uib-color);stroke-dasharray:1,200;stroke-dashoffset:0;stroke-linecap:round;animation:stretch calc(var(--uib-speed)*.75) ease-in-out infinite;will-change:stroke-dasharray,stroke-dashoffset}.car,.track{fill:none;transition:stroke .5s ease}.track{stroke:var(--uib-color);opacity:var(--uib-bg-opacity)}@keyframes rotate{to{transform:rotate(1turn)}}@keyframes stretch{0%{stroke-dasharray:0,150;stroke-dashoffset:0}50%{stroke-dasharray:75,150;stroke-dashoffset:-25}to{stroke-dashoffset:-99}}";
var s = class extends t {
  constructor() {
    super();
    __publicField(this, "_attributes", ["size", "color", "speed", "stroke", "bg-opacity"]);
    __publicField(this, "size");
    __publicField(this, "color");
    __publicField(this, "speed");
    __publicField(this, "stroke");
    __publicField(this, "bg-opacity");
    this.storePropsToUpgrade(this._attributes), this.reflect(this._attributes);
  }
  static get observedAttributes() {
    return ["size", "color", "stroke", "speed", "bg-opacity"];
  }
  connectedCallback() {
    this.upgradeStoredProps(), this.applyDefaultProps({ size: 40, color: "black", stroke: 5, speed: 2, "bg-opacity": 0 });
    const t2 = parseInt(this.size), s2 = parseInt(this.stroke), i2 = t2 / 2, r = Math.max(0, t2 / 2 - s2 / 2);
    this.template.innerHTML = `
      <svg
        class="container"
        viewBox="0 0 ${this.size} ${this.size}"
        height="${this.size}"
        width="${this.size}"
      >
        <circle 
          class="track"
          cx="${i2}" 
          cy="${i2}" 
          r="${r}" 
          pathlength="100" 
          stroke-width="${this.stroke}px" 
          fill="none" 
        />
        <circle 
          class="car"
          cx="${i2}" 
          cy="${i2}" 
          r="${r}" 
          pathlength="100" 
          stroke-width="${this.stroke}px" 
          fill="none" 
        />
      </svg>
      <style>
        :host{
          --uib-size: ${this.size}px;
          --uib-color: ${this.color};
          --uib-speed: ${this.speed}s;
          --uib-bg-opacity: ${this["bg-opacity"]};
        }
        ${e}
      </style>
    `, this.shadow.replaceChildren(this.template.content.cloneNode(true));
  }
  attributeChangedCallback() {
    const t2 = this.shadow.querySelector("style"), s2 = this.shadow.querySelector("svg"), i2 = this.shadow.querySelectorAll("circle");
    if (!t2)
      return;
    const r = parseInt(this.size), o = parseInt(this.stroke), n = String(r / 2), a = String(Math.max(0, r / 2 - o / 2));
    s2.setAttribute("height", this.stroke), s2.setAttribute("width", this.stroke), s2.setAttribute("viewBox", `0 0 ${r} ${r}`), i2.forEach((t3) => {
      t3.setAttribute("cx", n), t3.setAttribute("cy", n), t3.setAttribute("r", a), t3.setAttribute("stroke-width", this.stroke);
    }), t2.innerHTML = `
      :host{
        --uib-size: ${r}px;
        --uib-color: ${this.color};
        --uib-speed: ${this.speed}s;
        --uib-bg-opacity: ${this["bg-opacity"]};
      }
      ${e}
    `;
  }
};
var i = { register: (t2 = "l-ring") => {
  customElements.get(t2) || customElements.define(t2, class extends s {
  });
}, element: s };

// node_modules/ldrs/dist/auto/ring.js
i.register();
//# sourceMappingURL=ldrs_ring.js.map
