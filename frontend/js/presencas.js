const form = document.getElementById('form');
const lista = document.getElementById('lista');
const selParticipante = document.getElementById('participante');
const selOficina = document.getElementById('oficina');
const campoData = document.getElementById('data');
const selPresente = document.getElementById('presente');
const filtroOficina = document.getElementById('filtroOficina');
const filtroParticipante = document.getElementById('filtroParticipante');

let mapaParticipantes = {};
let mapaOficinas = {};

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
  let caminho = '/presencas';
  if (filtroOficina.value) caminho = `/presencas/oficina/${filtroOficina.value}`;
  else if (filtroParticipante.value)
    caminho = `/presencas/participante/${filtroParticipante.value}`;
  try {
    const itens = await apiGet(caminho);
    renderizar(itens);
  } catch (e) {
    lista.innerHTML = `<li class="vazio">${escapeHtml(e.message)}</li>`;
  }
}

function renderizar(itens) {
  if (!itens.length) {
    lista.innerHTML = '<li class="vazio">Nenhuma presença registrada.</li>';
    return;
  }
  lista.innerHTML = itens
    .map((pr) => {
      const nome = mapaParticipantes[pr.participanteId] || '#' + pr.participanteId;
      const oficina = mapaOficinas[pr.oficinaId] || '#' + pr.oficinaId;
      const status = pr.presente ? 'Compareceu' : 'Faltou';
      return `
        <li class="item">
          <div class="item-info">
            <div class="titulo">${escapeHtml(nome)}</div>
            <div class="detalhe">${escapeHtml(oficina)} — ${formatarData(pr.data)} — ${status}</div>
          </div>
          <div class="item-acoes">
            <button class="btn-link excluir" data-id="${pr.id}">Excluir</button>
          </div>
        </li>`;
    })
    .join('');
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  limparMensagem();

  if (!selParticipante.value) return mostrarMensagem('Selecione um participante.', 'erro');
  if (!selOficina.value) return mostrarMensagem('Selecione uma oficina.', 'erro');
  if (!campoData.value) return mostrarMensagem('Informe a data.', 'erro');

  const corpo = {
    participanteId: Number(selParticipante.value),
    oficinaId: Number(selOficina.value),
    data: campoData.value,
    presente: selPresente.value === 'true',
  };

  try {
    await apiPost('/presencas', corpo);
    mostrarMensagem('Presença registrada.', 'ok');
    form.reset();
    carregar();
  } catch (e) {
    mostrarMensagem(e.message, 'erro');
  }
});

lista.addEventListener('click', (ev) => {
  const botao = ev.target.closest('button.excluir');
  if (!botao) return;
  excluir(Number(botao.dataset.id));
});

async function excluir(id) {
  if (!confirm('Excluir este registro de presença?')) return;
  try {
    await apiDel(`/presencas/${id}`);
    mostrarMensagem('Presença excluída.', 'ok');
    carregar();
  } catch (e) {
    mostrarMensagem(e.message, 'erro');
  }
}

filtroOficina.addEventListener('change', () => {
  filtroParticipante.value = '';
  carregar();
});
filtroParticipante.addEventListener('change', () => {
  filtroOficina.value = '';
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
