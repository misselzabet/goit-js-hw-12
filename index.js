import{a as y}from"./assets/vendor-CNNbG8jS.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const h="47057239-824e754b75c5fca36ae14ba66",g="https://pixabay.com/api/";async function d(r,o=1){const n={key:h,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};try{return(await y.get(g,{params:n})).data}catch(e){throw console.error("Error fetching images:",e),e}}function u(r){const o=document.querySelector(".gallery"),c=r.map(({webformatURL:n,largeImageURL:e,tags:t,likes:s=0,views:f=0,comments:m=0,downloads:p=0})=>`
        <div class="photo-card">
          <a href="${e}" target="_blank" rel="noopener noreferrer">
            <img src="${n}" alt="${t}" loading="lazy" />
          </a>
         <div class="info">
          <p class="info-item"><b>Likes:</b> ${s}</p>
          <p class="info-item"><b>Views:</b> ${f}</p>
          <p class="info-item"><b>Comments:</b> ${m}</p>
          <p class="info-item"><b>Downloads:</b> ${p}</p>
        </div>
      </div>
      `).join("");o.insertAdjacentHTML("beforeend",c)}function b(){const r=document.querySelector(".gallery");r.innerHTML=""}const L=document.querySelector("#search-form"),l=document.querySelector(".load-more");let a=1,i="";L.addEventListener("submit",v);l.addEventListener("click",P);async function v(r){if(r.preventDefault(),console.log("Форма надіслана"),b(),i=r.currentTarget.elements.query.value.trim(),!!i){a=1;try{const o=await d(i,a);if(o.hits.length===0){alert("No images found. Please try a different query."),l.classList.add("hidden");return}u(o.hits),l.classList.remove("hidden")}catch(o){console.error(o)}}}async function P(){a+=1;try{const r=await d(i,a);u(r.hits),(r.hits.length<15||r.totalHits<=a*15)&&(l.classList.add("hidden"),alert("We're sorry, but you've reached the end of search results."))}catch(r){console.error(r)}}
//# sourceMappingURL=index.js.map
