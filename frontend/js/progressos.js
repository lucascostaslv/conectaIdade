const form = document.getElementById('form');
const lista = document.getElementById('lista');
const selParticipante = document.getElementById('participante');
const selOficina = document.getElementById('oficina');
const campoNota = document.getElementById('nota');
const campoObservacoes = document.getElementById('observacoes');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');
const campoEditId = document.getElementById('editId');
const filtroParticipante = document.getElementById('filtroParticipante');
const filtroOficina = document.getElementById('filtroOficina');

let mapaParticipantes = {};
let mapaOficinas = {};
let itensAtuais = [];

function preencherSelect(sel, itens, campo, rotuloVazio) {
  sel.innerHTML =
    `<option value="">${escapeHtml(rotuloVazio)}</option>` +
    itens
      .map((it) => `<option value="${it.id}">${escapeHtml(it[campo])}</option>`)
      .join('');
}

async function carregarOpcoes() {
  const [participantes, oficinas] = await Promise.all([
    apiGet('/participantes'),
    apiGet('/oficinas'),
  ]);

  mapaParticipantes = {};
  participantes.forEach((p) => {
    mapaParticipantes[p.id] = p.nome;
  });
  mapaOficinas = {};
  oficinas.forEach((o) => {
    mapaOficinas[o.id] = o.titulo;
  });

  preencherSelect(selParticipante, participantes, 'nome', 'Selecione um participante');
  preencherSelect(selOficina, oficinas, 'titulo', 'Selecione uma oficina');
  preencherSelect(filtroParticipante, participantes, 'nome', 'Todos os participantes');
  preencherSelect(filtroOficina, oficinas, 'titulo', 'Todas as oficinas');
}

async function carregar() {
  let caminho = '/progressos';
  if (filtroParticipante.value)
    caminho = `/progressos/participante/${filtroParticipante.value}`;
  else if (filtroOficina.value) caminho = `/progressos/oficina/${filtroOficina.value}`;
  try {
    itensAtuais = await apiGet(caminho);
    renderizar(itensAtuais);
  } catch (e) {
    lista.innerHTML = `<li class="vazio">${escapeHtml(e.message)}</li>`;
  }
}

function renderizar(itens) {
  if (!itens.length) {
    lista.innerHTML = '<li class="vazio">Nenhum progresso registrado.</li>';
    return;
  }
  lista.innerHTML = itens
    .map((pr) => {
      const nome = mapaParticipantes[pr.participanteId] || '#' + pr.participanteId;
      const oficina = mapaOficinas[pr.oficinaId] || '#' + pr.oficinaId;
      const detalhe = [oficina, pr.nota ? `Nota: ${pr.nota}` : '', pr.observacoes]
        .filter(Boolean)
        .join(' — ');
      return `
        <li class="item">
          <div class="item-info">
            <div class="titulo">${escapeHtml(nome)}</div>
            <div class="detalhe">${escapeHtml(detalhe)}</div>
          </div>
          <div class="item-acoes">
            <button class="btn-link editar" data-id="${pr.id}">Editar</button>
            <button class="btn-link excluir" data-id="${pr.id}">Excluir</button>
          </div>
        </li>`;
    })
    .join('');
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  limparMensagem();

  const id = campoEditId.value;
  const nota = campoNota.value.trim();
  const observacoes = campoObservacoes.value.trim();

  try {
    if (id) {
      await apiPut(`/progressos/${id}`, { nota, observacoes });
      mostrarMensagem('Progresso atualizado.', 'ok');
    } else {
      if (!selParticipante.value) return mostrarMensagem('Selecione um participante.', 'erro');
      if (!selOficina.value) return mostrarMensagem('Selecione uma oficina.', 'erro');
      const corpo = {
        participanteId: Number(selParticipante.value),
        oficinaId: Number(selOficina.value),
      };
      if (nota) corpo.nota = nota;
      if (observacoes) corpo.observacoes = observacoes;
      await apiPost('/progressos', corpo);
      mostrarMensagem('Progresso registrado.', 'ok');
    }
    resetarForm();
    carregar();
  } catch (e) {
    mostrarMensagem(e.message, 'erro');
  }
});

lista.addEventListener('click', (ev) => {
  const botao = ev.target.closest('button');
  if (!botao) return;
  const id = Number(botao.dataset.id);
  if (botao.classList.contains('excluir')) excluir(id);
  else if (botao.classList.contains('editar')) editar(id);
});

function editar(id) {
  const pr = itensAtuais.find((x) => x.id === id);
  if (!pr) return;
  campoEditId.value = pr.id;
  selParticipante.value = pr.participanteId;
  selOficina.value = pr.oficinaId;
  selParticipante.disabled = true;
  selOficina.disabled = true;
  campoNota.value = pr.nota || '';
  campoObservacoes.value = pr.observacoes || '';
  btnSalvar.textContent = 'Salvar';
  btnCancelar.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  campoNota.focus();
}

async function excluir(id) {
  if (!confirm('Excluir este registro de progresso?')) return;
  try {
    await apiDel(`/progressos/${id}`);
    mostrarMensagem('Progresso excluído.', 'ok');
    if (campoEditId.value === String(id)) resetarForm();
    carregar();
  } catch (e) {
    mostrarMensagem(e.message, 'erro');
  }
}

function resetarForm() {
  form.reset();
  campoEditId.value = '';
  selParticipante.disabled = false;
  selOficina.disabled = false;
  btnSalvar.textContent = 'Registrar progresso';
  btnCancelar.hidden = true;
}

btnCancelar.addEventListener('click', resetarForm);
filtroParticipante.addEventListener('change', () => {
  filtroOficina.value = '';
  carregar();
});
filtroOficina.addEventListener('change', () => {
  filtroParticipante.value = '';
  carregar();
});

(async function iniciar() {
  try {
    await carregarOpcoes();
    await carregar();
  } catch (e) {
    mostrarMensagem(e.message, 'erro');
  }
})();
