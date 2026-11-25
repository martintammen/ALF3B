
const initial=[{"name": "Martin Tammen", "days": ["MV", "MV", "MV", "MV", "MV", "Frei", "Frei"]}, {"name": "Werner Weber", "days": ["Frei", "Frei", "Frei", "Frei", "Frei", "Frei", "Frei"]}, {"name": "Björn Lübben", "days": ["Frei", "Frei", "Frei", "BC Rob", "Schl.Robs", "Frei", "Frei"]}, {"name": "Cristoph Dreyer", "days": ["Frei", "CC", "Schl.Robs", "BC Rob", "BC Rob", "Frei", "Frei"]}, {"name": "Jörg Kruse", "days": ["BC Rob", "BC Rob", "Frei", "Frei", "Frei", "Frei", "Frei"]}, {"name": "Jann Bontjes", "days": ["Frei", "Frei", "Frei", "Frei", "Frei", "Frei", "Frei"]}, {"name": "Stefan Südhoff", "days": ["BC Rob", "BC Rob", "BC Rob", "Frei", "Frei", "Frei", "Frei"]}, {"name": "Stephan Bruns", "days": ["BC Rob", "BC Rob", "BC Rob", "Schl.Robs", "BC Rob", "Frei", "Frei"]}, {"name": "Dennis Bartels", "days": ["Füller", "Füller", "Füller", "Füller", "Füller", "Frei", "Frei"]}, {"name": "Marcel Camp", "days": ["TG", "TG", "TG", "TG", "TG", "Frei", "Frei"]}, {"name": "Jacob Bruns", "days": ["Frei", "Frei", "Frei", "Frei", "Frei", "Frei", "Frei"]}, {"name": "Thorsten Frerichs", "days": ["Frei", "Frei", "Frei", "Frei", "Frei", "Frei", "Frei"]}, {"name": "Uwe Süssen", "days": ["BC Rob", "BC Rob", "BC Rob", "BC Rob", "Schl.Robs", "Frei", "Frei"]}, {"name": "Leon van Grieken", "days": ["Schl.Robs", "Schl.Robs", "Füller", "Füller", "Füller", "Frei", "Frei"]}];
let roster=JSON.parse(localStorage.getItem('alf3b-roster')||'null')||initial;
let role='read', phase=0;\nconst cycleStart=new Date('2026-12-14T00:00:00');\nconst today=new Date();\nconst weeks=Math.floor((today-cycleStart)/(7*24*60*60*1000));\nif(weeks>=0) phase=((weeks%3)+3)%3;
const $=s=>document.querySelector(s);
const names=['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
const areas=['Frei','MV','BC Rob','Schl.Robs','CC','Füller','TG'];
function save(){localStorage.setItem('alf3b-roster',JSON.stringify(roster));}
function render(){
 $('#role').textContent=role==='admin'?'Admin-Demo (Bearbeiten)':'Mitarbeiteransicht (Lesen)';
 $('#adminnote').textContent=role==='admin'?'Demomodus: Änderungen werden nur auf diesem Gerät gespeichert.':'Alle Mitarbeiter sehen denselben vollständigen Plan (in der späteren Serverversion).';
 document.querySelectorAll('[data-phase]').forEach(b=>b.classList.toggle('active',+b.dataset.phase===phase));
 $('#phaseLabel').textContent=['Woche 1 · Frühschicht','Woche 2 · Nachtschicht','Woche 3 · Spätschicht'][phase];
 $('#rows').innerHTML=roster.map((p,i)=>`<tr><th>${esc(p.name)}</th>${p.days.map((v,j)=>`<td>${role==='admin'?`<select data-i="${i}" data-j="${j}">${areas.map(a=>`<option ${a===v?'selected':''}>${esc(a)}</option>`).join('')}</select>`:`<span class="tag ${v==='Frei'?'off':''}">${esc(v)}</span>`}</td>`).join('')}</tr>`).join('');
 $('#rows').querySelectorAll('select').forEach(s=>s.addEventListener('change',e=>{roster[+s.dataset.i].days[+s.dataset.j]=s.value;save();render();}));
}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
document.querySelectorAll('[data-phase]').forEach(b=>b.addEventListener('click',()=>{phase=+b.dataset.phase;render()}));
$('#role').onclick=()=>{role=role==='read'?'admin':'read';render()};
$('#reset').onclick=()=>{roster=structuredClone(initial);save();render()};
$('#export').onclick=()=>{let csv=['Mitarbeiter,'+names.join(',')].concat(roster.map(p=>[p.name,...p.days].map(x=>'"'+String(x).replaceAll('"','""')+'"').join(','))).join('\n');let a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));a.download='ALF3B-Dienstplan.csv';a.click();URL.revokeObjectURL(a.href)};
render();
