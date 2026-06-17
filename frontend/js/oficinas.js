const form = document.getElementById('form');
const lista = document.getElementById('lista');
const busca = document.getElementById('busca');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');
const campoEditId = document.getElementById('editId');

const campos = {
  titulo: document.getElementById('titulo'),
  educador: document.getElementById('educador'),
  dataInicio: document.getElementById('dataInicio'),
  dataFim: document.getElementById('dataFim'),
  cargaHoraria: document.getElementById('cargaHoraria'),
  descricao: document.getElementById('descricao'),
};

let itensAtuais = [];

async function carregar() {
  const termo = busca.value.trim();
  const caminho = termo
    ? `/oficinas?titulo=${encodeURIComponent(termo)}`
    : '/oficinas';
  try {
    itensAtuais = await apiGet(caminho);
    renderizar(itensAtuais);
  } catch (e) {
    lista.innerHTML = `<li class="vazio">${escapeHtml(e.message)}</li>`;
  }
}

function renderizar(itens) {
  if (!itens.length) {
    lista.innerHTML = '<li class="vazio">Nenhuma oficina cadastrada.</li>';
    return;
  }
  lista.innerHTML = itens
    .map((o) => {
      const periodo = o.dataFim
        ? `${formatarData(o.dataInicio)} a ${formatarData(o.dataFim)}`
        : `início em ${formatarData(o.dataInicio)}`;
      const detalhe = [
        `Educador: ${o.educador}`,
        periodo,
        `${o.cargaHoraria}h`,
        o.descricao,
      ]
        .filter(Boolean)
        .join(' — ');
      return `
        <li class="item">
          <div class="item-info">
            <div class="titulo">${escapeHtml(o.titulo)}</div>
            <div class="detalhe">${escapeHtml(detalhe)}</div>
          </div>
          <div class="item-acoes">
            <button class="btn-link editar" data-id="${o.id}">Editar</button>
            <button class="btn-link excluir" data-id="${o.id}">Excluir</button>
          </div>
        </li>`;
    })
    .join('');
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  limparMensagem();

  const corpo = {
    titulo: campos.titulo.value.trim(),
    educador: campos.educador.value.trim(),
    dataInicio: campos.dataInicio.value,
    cargaHoraria: Number(campos.cargaHoraria.value),
  };
  const dataFim = campos.dataFim.value;
  const descricao = campos.descricao.value.trim();

  if (!corpo.titulo) return mostrarMensagem('Informe o título.', 'erro');
  if (!corpo.educador) return mostrarMensagem('Informe o educador.', 'erro');
  if (!corpo.dataInicio) return mostrarMensagem('Informe a data de início.', 'erro');
  if (!corpo.cargaHoraria || corpo.cargaHoraria <= 0)
    return mostrarMensagem('Informe uma carga horária maior que zero.', 'erro');

  if (dataFim) corpo.dataFim = dataFim;
  if (descricao) corpo.descricao = descricao;

  try {
    const id = campoEditId.value;
    if (id) {
      await apiPut(`/oficinas/${id}`, corpo);
      mostrarMensagem('Oficina atualizada.', 'ok');
    } else {
      await apiPost('/oficinas', corpo);
      mostrarMensagem('Oficina adicionada.', 'ok');
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
  const o = itensAtuais.find((x) => x.id === id);
  if (!o) return;
  campoEditId.value = o.id;
  campos.titulo.value = o.titulo || '';
  campos.educador.value = o.educador || '';
  campos.dataInicio.value = (o.dataInicio || '').slice(0, 10);
  campos.dataFim.value = (o.dataFim || '').slice(0, 10);
  campos.cargaHoraria.value = o.cargaHoraria != null ? o.cargaHoraria : '';
  campos.descricao.value = o.descricao || '';
  btnSalvar.textContent = 'Salvar';
  btnCancelar.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  campos.titulo.focus();
}

async function excluir(id) {
  if (!confirm('Excluir esta oficina?')) return;
  try {
    await apiDel(`/oficinas/${id}`);
    mostrarMensagem('Oficina excluída.', 'ok');
    if (campoEditId.value === String(id)) resetarForm();
    carregar();
  } catch (e) {
    mostrarMensagem(e.message, 'erro');
  }
}

function resetarForm() {
  form.reset();
  campoEditId.value = '';
  btnSalvar.textContent = 'Adicionar';
  btnCancelar.hidden = true;
}

btnCancelar.addEventListener('click', resetarForm);
busca.addEventListener('input', carregar);

carregar();
