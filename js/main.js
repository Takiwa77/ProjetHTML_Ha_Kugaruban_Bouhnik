'use strict';

const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));

const nav=$('#navLinks');
$('#menuBtn')?.addEventListener('click',()=>{
    nav.classList.toggle('open');
$('#menuBtn').setAttribute('aria-expanded',nav.classList.contains('open'));

}
);

$('#themeBtn')?.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');

}
);

if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark');

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('visible')
}
),{
    threshold:.12
}
);
$$('.reveal').forEach(el=>io.observe(el));

$$('[data-count]').forEach(el=>{
    let done=false;
io.observe(el);
el.addEventListener('transitionend',()=>{
    if(done)return;
done=true;
let target=+el.dataset.count,n=0,step=Math.max(1,Math.round(target/45));
let t=setInterval(()=>{
    n+=step;
if(n>=target){
    n=target;
clearInterval(t)
}
el.textContent=n+(el.dataset.suffix||'')
}
,22);

}
);

}
);

$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.filter').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
const f=btn.dataset.filter;
$$('[data-category]').forEach(card=>card.style.display=(f==='all'||card.dataset.category===f)?'block':'none')
}
));

$$('.faq button').forEach(b=>b.addEventListener('click',()=>b.classList.toggle('open')));

$('#contactForm')?.addEventListener('submit',e=>{
    e.preventDefault();
let ok=true;
$$('.error').forEach(x=>x.textContent='');
const email=$('#email');
const name=$('#name');
const msg=$('#message');
if(name.value.trim().length<2){
    $('#nameErr').textContent='Indiquez au moins 2 caractères.';
ok=false
}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
     $('#emailErr').textContent='Email invalide.';
ok=false
}
if(msg.value.trim().length<20){
    $('#msgErr').textContent='Message trop court : 20 caractères minimum.';
ok=false
}
$('#formResult').textContent=ok?'Message prêt à être envoyé. Validation JS réussie ✅':'';
if(ok)e.target.reset();

}
);

const slides=$$('.slide');
let i=0;
if(slides.length){
    setInterval(()=>{
    slides[i].style.display='none';
i=(i+1)%slides.length;
slides[i].style.display='block'
}
,3500)
}

// Carrousel enseignants
const teacherCarousel = $('.teacher-carousel');

if (teacherCarousel) {
    
  const track = $('#teacherTrack');

  const teacherSlides = $$('.teacher-slide', teacherCarousel);

  const dotsBox = $('#teacherDots');

  let teacherIndex = 0;

  let teacherTimer;

  const goTeacher = (index) => {
    
    teacherIndex = (index + teacherSlides.length) % teacherSlides.length;

    track.style.transform = `translateX(-${
    teacherIndex * 100
}
%)`;

    teacherSlides.forEach((slide, n) => slide.classList.toggle('active', n === teacherIndex));

    $$('.carousel-dots button', teacherCarousel).forEach((dot, n) => dot.classList.toggle('active', n === teacherIndex));

}
;

  teacherSlides.forEach((_, n) => {
    
    const dot = document.createElement('button');

    dot.type = 'button';

    dot.setAttribute('aria-label', `Afficher l’enseignant ${
    n + 1
}
`);

    dot.addEventListener('click', () => {
     goTeacher(n);
 restartTeacher();
 
}
);

    dotsBox.appendChild(dot);

}
);

  const restartTeacher = () => {
    
    clearInterval(teacherTimer);

    teacherTimer = setInterval(() => goTeacher(teacherIndex + 1), 5000);

}
;

  $('.carousel-btn.prev', teacherCarousel).addEventListener('click', () => {
     goTeacher(teacherIndex - 1);
 restartTeacher();
 
}
);

  $('.carousel-btn.next', teacherCarousel).addEventListener('click', () => {
     goTeacher(teacherIndex + 1);
 restartTeacher();
 
}
);

  teacherCarousel.addEventListener('mouseenter', () => clearInterval(teacherTimer));

  teacherCarousel.addEventListener('mouseleave', restartTeacher);

  goTeacher(0);

  restartTeacher();

}

// Emplois du temps dynamiques selon la catégorie de formation
const scheduleBody = document.getElementById('scheduleBody');

const scheduleTitle = document.getElementById('scheduleTitle');

const scheduleLead = document.getElementById('scheduleLead');

const schedules = {
    
  all: {
    
    title: 'Exemple d’emploi du temps — Tous les parcours',
    lead: 'Vue générale des matières principales du département informatique.',
    rows: [
      ['08h-10h', ['Algorithmique', 'Mme Laurent'], ['Python', 'M. Benali'], '', ['SQL', 'Mme Chen'], ['Java', 'M. Moreau']],
      ['10h-12h', ['Maths info', 'M. Dubois'], ['HTML/CSS', 'Mme Garcia'], ['Langage C', 'M. Leroy'], '', ['Projet', 'Mme Martin']],
      ['14h-17h', '', ['Projet Web', 'M. Petit'], '', ['Cybersécurité', 'M. Renaud'], ['Anglais tech', 'Mme Smith']]
    ]
  
}
,
  prepa: {
    
    title: 'Exemple d’emploi du temps — Prépa numérique',
    lead: 'La prépa insiste sur les bases scientifiques, le raisonnement et les premiers projets informatiques.',
    rows: [
      ['08h-10h', ['Mathématiques', 'M. Dubois'], ['Algorithmique', 'Mme Laurent'], ['Physique appliquée', 'M. Bernard'], ['Python débutant', 'M. Benali'], ['Anglais tech', 'Mme Smith']],
      ['10h-12h', ['Logique', 'Mme Garcia'], ['Projet découverte', 'M. Petit'], ['Architecture PC', 'M. Leroy'], '', ['Culture numérique', 'Mme Martin']],
      ['14h-17h', '', ['TP Python', 'M. Benali'], '', ['Mini-projet web', 'Mme Garcia'], ['Soutien maths', 'M. Dubois']]
    ]
  
}
,
  bachelor: {
    
    title: 'Exemple d’emploi du temps — Bachelor Informatique',
    lead: 'Le bachelor met l’accent sur le développement web, les bases de données, les systèmes et la pratique.',
    rows: [
      ['08h-10h', ['Développement web', 'Mme Garcia'], ['Base de données', 'Mme Chen'], ['Réseaux', 'M. Renaud'], ['JavaScript', 'M. Petit'], ''],
      ['10h-12h', ['UX/UI', 'Mme Martin'], ['SQL avancé', 'Mme Chen'], '', ['Linux', 'M. Leroy'], ['Projet full-stack', 'M. Moreau']],
      ['14h-17h', ['TP HTML/CSS', 'Mme Garcia'], '', ['TP réseaux', 'M. Renaud'], '', ['Sprint projet', 'M. Petit']]
    ]
  
}
,
  ingenieur: {
    
    title: 'Exemple d’emploi du temps — Cycle ingénieur',
    lead: 'Le cycle ingénieur approfondit les majeures : IA, logiciels, cybersécurité et architecture de systèmes.',
    rows: [
      ['08h-10h', ['Machine learning', 'Mme Chen'], ['Architecture logicielle', 'M. Moreau'], ['Cloud & DevOps', 'M. Petit'], ['Cybersécurité', 'M. Renaud'], ''],
      ['10h-12h', ['Statistiques', 'M. Dubois'], ['API & microservices', 'M. Moreau'], '', ['Cryptographie', 'Mme Laurent'], ['Management projet', 'Mme Martin']],
      ['14h-17h', ['Projet IA', 'Mme Chen'], '', ['CI/CD Docker', 'M. Petit'], ['CTF sécurité', 'M. Renaud'], ['Revue de sprint', 'Mme Martin']]
    ]
  
}
,
  metiers: {
    
    title: 'Exemple d’emploi du temps — Débouchés & professionnalisation',
    lead: 'Cette vue présente les activités orientées stage, alternance, CV, entretien et projet professionnel.',
    rows: [
      ['08h-10h', ['Atelier CV', 'Mme Martin'], ['Métiers DevOps', 'M. Petit'], '', ['Métiers cyber', 'M. Renaud'], ['Anglais entretien', 'Mme Smith']],
      ['10h-12h', ['Simulation entretien', 'Mme Garcia'], '', ['Projet entreprise', 'M. Moreau'], ['LinkedIn & portfolio', 'Mme Martin'], ''],
      ['14h-17h', '', ['Recherche alternance', 'Mme Martin'], ['Pitch projet', 'M. Petit'], '', ['Forum entreprises', 'Équipe pédagogique']]
    ]
  
}

}
;

function courseCell(item){
    
  if(!item) return '<td></td>';

  return `<td><div class="course">${
    item[0]
}
<span class="prof">${
    item[1]
}
</span></div></td>`;

}

function renderSchedule(key='all'){
    
  if(!scheduleBody || !schedules[key]) return;

  const data = schedules[key];

  scheduleTitle.textContent = data.title;

  scheduleLead.textContent = data.lead;

  scheduleBody.innerHTML = data.rows.map(row => `<tr><td>${
    row[0]
}
</td>${
    row.slice(1).map(courseCell).join('')
}
</tr>`).join('');

}

renderSchedule('all');

const scheduleSection = document.getElementById('scheduleSection');

const outcomesSection = document.getElementById('outcomesSection');

function switchFormationView(key){
    
  if(key === 'metiers') {
    
    if(scheduleSection) scheduleSection.hidden = true;

    if(outcomesSection) outcomesSection.hidden = false;

}
 else {
    
    if(outcomesSection) outcomesSection.hidden = true;

    if(scheduleSection) scheduleSection.hidden = false;

    renderSchedule(key || 'all');

}

}

$$('#formationFilters .filter').forEach(btn=>btn.addEventListener('click',()=>switchFormationView(btn.dataset.filter || 'all')));
