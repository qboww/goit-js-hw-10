import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as u,f as p}from"./assets/vendor-5a8d338c.js";u.settings({position:"topRight"});let c;const a=document.querySelector("[data-start]"),l=document.querySelector(".datetime-picker");a.addEventListener("click",function(){const t=y.selectedDates[0],e=Date.now();if(!t||t<=e){u.error({title:"Error",message:"Please select a future date and time."});return}const n=t.getTime()-e,{days:o,hours:s,minutes:r,seconds:d}=m(n);i(o,s,r,d),S(n),a.disabled=!0});const y=p("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1});function m(t){const r=Math.floor(t/864e5),d=Math.floor(t%864e5/36e5),f=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:r,hours:d,minutes:f,seconds:h}}function i(t,e,n,o){document.querySelector("[data-days]").textContent=String(t).padStart(2,"0"),document.querySelector("[data-hours]").textContent=String(e).padStart(2,"0"),document.querySelector("[data-minutes]").textContent=String(n).padStart(2,"0"),document.querySelector("[data-seconds]").textContent=String(o).padStart(2,"0")}function S(t){clearInterval(c),c=setInterval(()=>{if(t-=1e3,t<0)clearInterval(c),i(0,0,0,0),u.success({title:"Finish",message:"The countdown has finished!"}),a.classList.remove("btn-disabled"),a.disabled=!1,l.disabled=!1;else{const{days:e,hours:n,minutes:o,seconds:s}=m(t);i(e,n,o,s)}},1e3),a.disabled=!0,l.disabled=!0,a.classList.add("btn-disabled")}
//# sourceMappingURL=commonHelpers.js.map
