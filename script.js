let current='hero';let checked=0;
function showStage(next){document.querySelector('[data-stage="'+current+'"]')?.classList.remove('is-active');document.querySelector('[data-stage="'+next+'"]')?.classList.add('is-active');current=next;}
document.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>showStage(btn.dataset.next)));
const rows=[...document.querySelectorAll('.check-row')];
rows.forEach((row,index)=>row.addEventListener('click',()=>{
  if(index!==checked)return;
  row.classList.remove('is-ready');
  row.classList.add('is-done');
  row.disabled=true;
  row.querySelector('em').textContent='✓';
  checked++;
  if(checked<rows.length){
    rows[checked].disabled=false;
    rows[checked].classList.add('is-ready');
  }else{
    document.querySelector('[data-stage="inspection"] .next-link').hidden=false;
  }
}));
document.querySelector('.restart').addEventListener('click',()=>{
  checked=0;
  rows.forEach((row,index)=>{
    row.classList.remove('is-done','is-ready');
    row.disabled=index!==0;
    row.querySelector('em').textContent='□';
  });
  rows[0].classList.add('is-ready');
  document.querySelector('[data-stage="inspection"] .next-link').hidden=true;
  showStage('hero');
});