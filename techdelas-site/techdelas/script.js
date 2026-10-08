const $=(s)=>document.querySelector(s);const $$=(s)=>document.querySelectorAll(s);

// Menu mobile
const menuToggle=$('#menuToggle'),nav=$('#nav');
menuToggle?.addEventListener('click',()=>nav.classList.toggle('open'));
$$('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Header + barra de progresso
const header=$('#header'),progress=$('#scrollProgress');
window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',scrollY>20);const h=document.documentElement;progress.style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+'%'});

// Animações ao entrar na tela
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

// Contadores
const counters=$$('.counter');const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const el=e.target,target=+el.dataset.target;let n=0;const step=Math.max(1,Math.ceil(target/50));const timer=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(timer)}el.textContent=n.toLocaleString('pt-BR')},25);countObserver.unobserve(el)}}),{threshold:.6});
counters.forEach(c=>countObserver.observe(c));

// Filtro de vagas
const search=$('#jobSearch'),level=$('#jobLevel'),type=$('#jobType'),cards=[...$$('.job-card')],empty=$('#emptyJobs');
function filterJobs(){const q=search.value.toLowerCase().trim(),l=level.value,t=type.value;let visible=0;cards.forEach(card=>{const ok=(card.dataset.search.includes(q)||!q)&&(!l||card.dataset.level===l)&&(!t||card.dataset.type===t);card.style.display=ok?'block':'none';if(ok)visible++});empty.style.display=visible?'none':'block'}
[search,level,type].forEach(el=>el.addEventListener('input',filterJobs));$('#clearFilters').addEventListener('click',()=>{search.value='';level.value='';type.value='';filterJobs()});

// Modal genérico
const modal=$('#modal'),modalContent=$('#modalContent');function openModal(html){modalContent.innerHTML=html;modal.classList.add('open');document.body.style.overflow='hidden'}function closeModal(){modal.classList.remove('open');document.body.style.overflow=''}$('#modalClose').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

$('#loginBtn').addEventListener('click',()=>openModal(`<h2>Bem-vinda de volta 💜</h2><p>Entre na sua conta TechDelas para acessar vagas, histórias e recursos da comunidade.</p><form class="modal-form" onsubmit="event.preventDefault();showToast('Login demonstrativo realizado!');closeModal()"><input type="email" placeholder="Seu e-mail" required><input type="password" placeholder="Sua senha" required><button class="btn btn-primary">Entrar</button></form>`));
$('#signupBtn').addEventListener('click',()=>openModal(`<h2>Crie seu perfil ✨</h2><p>Monte seu espaço na comunidade e comece a descobrir oportunidades.</p><form class="modal-form" onsubmit="event.preventDefault();showToast('Conta demonstrativa criada!');closeModal()"><input placeholder="Nome completo" required><input type="email" placeholder="E-mail" required><select required><option value="">Você é...</option><option>Estudante</option><option>Profissional</option><option>Recrutadora</option></select><button class="btn btn-primary">Criar minha conta</button></form>`));

// Vagas demonstrativas
$$('.apply-btn').forEach(btn=>btn.addEventListener('click',()=>{const job=btn.dataset.job;openModal(`<h2>${job}</h2><p>Esta é uma vaga demonstrativa da versão inicial do TechDelas. Aqui entrariam a descrição completa, requisitos, benefícios, empresa e botão de candidatura.</p><div class="modal-form"><button class="btn btn-primary" onclick="showToast('Candidatura demonstrativa enviada!');closeModal()">Candidatar-me</button><button class="btn btn-ghost" onclick="closeModal()">Voltar</button></div>`)}));

// Publicar vaga
$('#publishJobBtn').addEventListener('click',()=>openModal(`<h2>Publicar uma vaga</h2><p>Área destinada às empresas que querem encontrar talentos na comunidade TechDelas.</p><form class="modal-form" onsubmit="event.preventDefault();showToast('Vaga enviada para análise!');closeModal()"><input placeholder="Nome da empresa" required><input placeholder="Título da vaga" required><select required><option value="">Modelo de trabalho</option><option>Remoto</option><option>Híbrido</option><option>Presencial</option></select><textarea placeholder="Descrição da vaga" required></textarea><button class="btn btn-primary">Enviar vaga</button></form>`));

// Feed: curtidas
$$('.like-btn').forEach(btn=>btn.addEventListener('click',()=>{const span=btn.querySelector('span');let n=+span.textContent;btn.classList.toggle('liked');span.textContent=btn.classList.contains('liked')?n+1:n-1}));

// Nova história
$('#newPostBtn').addEventListener('click',()=>openModal(`<h2>Compartilhe sua história 💜</h2><p>Conte uma experiência, conquista, dica ou aprendizado para inspirar outras mulheres.</p><form class="modal-form" onsubmit="event.preventDefault();showToast('História publicada na versão demonstrativa!');closeModal()"><input placeholder="Título (opcional)"><textarea placeholder="Escreva sua história..." required></textarea><button class="btn btn-primary">Publicar história</button></form>`));
$('#joinBtn').addEventListener('click',()=>showToast('Você entrou na comunidade! (demonstração)'));

// Premium
$('#premiumBtn').addEventListener('click',()=>openModal(`<h2>TechDelas Premium ✦</h2><p>O Premium pode reunir recursos como perfil em destaque, filtros avançados de vagas, conteúdos exclusivos e maior visibilidade no feed.</p><div class="modal-form"><button class="btn btn-primary" onclick="showToast('Assinatura demonstrativa iniciada!');closeModal()">Assinar por R$ 19,90/mês</button></div>`));
$('#subscribeBtn').addEventListener('click',()=>$('#premiumBtn').click());

// Toast
let toastTimer;function showToast(msg){const toast=$('#toast');toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3000)}window.showToast=showToast;window.closeModal=closeModal;
