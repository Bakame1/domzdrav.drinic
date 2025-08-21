
(function(){
  const doc = document.documentElement;
  const buttons = document.querySelectorAll('[data-setlang]');
  const set = (lang)=>{ doc.setAttribute('data-lang', lang); localStorage.setItem('lang', lang);
    buttons.forEach(b=>b.setAttribute('aria-pressed', String(b.dataset.setlang===lang))); };
  const saved = localStorage.getItem('lang');
  if(saved) set(saved);
  buttons.forEach(b=> b.addEventListener('click', ()=> set(b.dataset.setlang)) );
  const y=document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
})();