
(async()=>{
const root=document.getElementById('app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let D;try{D=await fetch('tcc.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()})}
catch(e){root.innerHTML='<div class="intro">Não foi possível carregar as informações do TCC.</div>';return}

const list=arr=>`<ul>${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;

root.innerHTML=`
<section class="hero">
 <div class="eyebrow">UFPR · CURSO DE BIOMEDICINA</div>
 <h1>${esc(D.title)}</h1>
 <p>${esc(D.subtitle)}</p>
</section>

<div class="repo">
 <h2>${esc(D.repository.title)}</h2>
 <p>${esc(D.repository.description)}</p>
 <a href="${esc(D.repository.url)}" target="_blank" rel="noopener">Acessar Repositório Digital da UFPR</a>
</div>

<div class="intro">${esc(D.intro)}</div>

<div class="metrics">
 ${D.highlights.map(x=>`<article class="metric"><small>${esc(x.label)}</small><strong>${esc(x.value)}</strong></article>`).join('')}
</div>

<div class="quick">
 <a href="#fluxo">Como funciona</a>
 <a href="#avaliacao">Avaliação</a>
 <a href="#documentos">Documentos</a>
 <a href="#repositorio">Repositório</a>
</div>

<section class="section" id="fluxo">
 <h2>Fluxo do TCC</h2>
 <div class="flow">${D.flow.map(x=>`<article class="step"><div class="num">${esc(x.step)}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div>
</section>

<section class="section">
 <div class="two">
  <article class="card"><h3>${esc(D.enrollment.title)}</h3>${list(D.enrollment.items)}</article>
  <article class="card" id="avaliacao"><h3>${esc(D.evaluation.title)}</h3>${list(D.evaluation.items)}</article>
 </div>
</section>

<section class="section">
 <h2>${esc(D.final_delivery.title)}</h2>
 <div class="panel">${list(D.final_delivery.items)}<p>Envio para a Coordenação: <a href="mailto:${esc(D.final_delivery.email)}">${esc(D.final_delivery.email)}</a></p></div>
</section>

${D.semester_guidance.active && D.semester_guidance.url
 ? `<section class="section"><h2>Orientações do semestre</h2><div class="panel"><a href="${esc(D.semester_guidance.url)}" target="_blank" rel="noopener">${esc(D.semester_guidance.title)}</a></div></section>`
 : `<section class="section"><h2>Orientações do semestre</h2><div class="notice">${esc(D.semester_guidance.note)}</div></section>`}

<section class="section" id="documentos">
 <h2>Documentos oficiais</h2>
 <div class="docs">${D.documents.map(d=>`<article class="doc"><span class="badge">${esc(d.type)}</span><h3>${esc(d.name)}</h3><p>${esc(d.description)}</p><a href="${esc(d.url)}" target="_blank" rel="noopener">Acessar</a></article>`).join('')}</div>
</section>

<section class="section" id="repositorio">
 <h2>Repositório Digital — TCCs de Biomedicina</h2>
 <div class="repo"><p>${esc(D.repository.description)}</p><a href="${esc(D.repository.url)}" target="_blank" rel="noopener">Consultar trabalhos</a></div>
</section>

<section class="section">
 <h2>Contato</h2>
 <div class="panel contact">Coordenação do Curso: <a href="mailto:${esc(D.contact.email)}">${esc(D.contact.email)}</a> · ${esc(D.contact.phone)}</div>
</section>`;
})();
