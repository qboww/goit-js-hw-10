import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as s}from"./assets/vendor-5a8d338c.js";document.querySelector(".form").addEventListener("submit",function(i){i.preventDefault();const t=parseInt(this.elements.delay.value),o=this.elements.state.value;s.settings({position:"topRight"}),new Promise((e,n)=>{setTimeout(o==="fulfilled"?()=>e(t):()=>n(t),t)}).then(e=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{s.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
