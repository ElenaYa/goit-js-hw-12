import{S,i as l,a as v}from"./assets/vendor-bad0427b.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const d=document.querySelector(".form"),m=document.querySelector(".gallery"),g=document.querySelector(".loader"),r=document.querySelector(".btn-load-more"),C=new S(".gallery a",{captionsData:"alt",captionDelay:250}),u=40;let n=1,f="";d.addEventListener("submit",w);r.addEventListener("click",k);async function w(s){s.preventDefault(),n=1,m.innerHTML="",f=d.search.value.trim(),r.classList.add("hide");const a=await p();a.hits.length===0?l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ef4040",messageSize:"16px",messageColor:"#fafafb"}):a.hits.length<u?l.error({position:"topRight",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#ef4040",messageSize:"16px",messageColor:"#fafafb"}):r.classList.remove("hide"),d.reset(),h(a)}async function k(){n+=1,r.classList.add("hide");const s=await p();n>=Math.ceil(s.totalHits/u)?l.error({position:"topRight",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#ef4040",messageSize:"16px",messageColor:"#fafafb"}):r.classList.remove("hide"),h(s),q()}async function p(){g.classList.remove("hide");try{return(await v.get("https://pixabay.com/api/",{params:{key:"41563330-08ed4e1341b4edecabdae7272",q:f,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:u,page:n}})).data}catch(s){console.log(s.message),l.error({position:"topRight",message:"Sorry, service unavailable.",backgroundColor:"#ef4040",messageSize:"16px",messageColor:"#fafafb"})}finally{g.classList.add("hide")}}function h(s){const a=s.hits.reduce((c,{webformatURL:i,largeImageURL:e,tags:t,likes:o,views:y,comments:b,downloads:L})=>c+`<li class='gallery-item'>
              <a class='gallery-link' href='${e}'>
                <img
                    class='gallery-image'
                    src='${i}'
                    alt='${t}'
                    width='360'
                    height='200'
                    />
              </a>
              <p class='gallery-tags'>Tags: ${t}</p>
              <ul class='gallery-statistic'>
                  <li><p class='statistic'>💗 Likes<span>${o}</span></p></li>
                  <li><p class='statistic'>👁️ Views<span>${y}</span></p></li>
                  <li><p class='statistic'>💬 Comments<span>${b}</span></p></li>
                  <li><p class='statistic'>💌 Downloads<span>${L}</span></p></li>
              </ul>
            </li>`,"");m.insertAdjacentHTML("beforeend",a),C.refresh()}function q(){const a=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
