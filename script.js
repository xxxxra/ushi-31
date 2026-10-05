const stages = ['hero','inspection','facts','finale'];
const labels = {hero:'SEALED',inspection:'INSPECTION',facts:'SPECIFICATION',finale:'APPROVED'};
let current='hero';
let checked=0;

function showStage(next){
  document.querySelector(`[data-stage="${current}"]`)?.classList.remove('is-active');
  document.querySelector(`[data-stage="${next}"]`)?.classList.add('is-active');
  current=next;
  document.getElementById('stageLabel').textContent=labels[next];
  document.querySelectorAll('.progress i').forEach((el,i)=>el.classList.toggle('active',i===stages.indexOf(next)));
}

document.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>showStage(btn.dataset.next)));

const rows=[...document.querySelectorAll('.check-row')];
rows.forEach((row,index)=>{
  row.addEventListener('click',()=>{
    if(index!==checked) return;
    row.classList.remove('is-ready');
    row.classList.add('is-done');
    row.disabled=true;
    row.querySelector('.result').textContent='DONE';
    checked++;
    if(checked<rows.length){
      const next=rows[checked];
      next.disabled=false;
      next.classList.add('is-ready');
      next.querySelector('.result').textContent='CHECK';
    }else{
      document.querySelector('[data-stage="inspection"] .paper-link').hidden=false;
    }
  });
});

document.querySelector('.restart').addEventListener('click',()=>{
  checked=0;
  rows.forEach((row,index)=>{
    row.classList.remove('is-done','is-ready');
    row.disabled=index!==0;
    row.querySelector('.result').textContent=index===0?'CHECK':'—';
  });
  rows[0].classList.add('is-ready');
  document.querySelector('[data-stage="inspection"] .paper-link').hidden=true;
  showStage('hero');
});