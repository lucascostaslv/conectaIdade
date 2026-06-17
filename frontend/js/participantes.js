const form = document.getElementById('form');
const lista = document.getElementById('lista');
const busca = document.getElementById('busca');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');
const campoEditId = document.getElementById('editId');

const campos = {
  nome: document.getElementById('nome'),
  dataNascimento: document.getElementById('dataNascimento'),
  telefone: document.getElementById('telefone'),
  email: document.getElementById('email'),
  observacoes: document.getElementById('observacoes'),
};

let itensAtuais = [];

async function carregar() {
  const termo = busca.value.trim();
  const caminho = termo
    ? `/participantes?nome=${encodeURIComponent(termo)}`
    : '/participantes';
  try {
    itensAtuais = await apiGet(caminho);
    renderizar(itensAtuais);
  } catch (e) {
    lista.innerHTML = `<li class="vazio">${escapeHtml(e.message)}</li>`;
  }
}

function renderizar(itens) {
  if (!itens.length) {
    lista.innerHTML = '<li class="vazio">Nenhum participante cadastrado.</li>';
    return;
  }
  lista.innerHTML = itens
    .map((p) => {
      const contatos = [p.telefone, p.email].filter(Boolean).join(' · ');
      const detalhe = [
        `Nascimento: ${formatarData(p.dataNascimento)}`,
        contatos,
        p.observacoes,
      ]
        .filter(Boolean)
        .join(' — ');
      return `
        <li class="item">
          <div class="item-info">
            <div class="titulo">${escapeHtml(p.nome)}</div>
            <div class="detalhe">${escapeHtml(detalhe)}</div>
          </div>
          <div class="item-acoes">
            <button class="btn-link editar" data-id="${p.id}">Editar</button>
            <button class="btn-link excluir" data-id="${p.id}">Excluir</button>
          </div>
        </li>`;
    })
    .join('');
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  limparMensagem();

  const corpo = {
    nome: campos.nome.value.trim(),
    dataNascimento: campos.dataNascimento.value,
  };
  const telefone = campos.telefone.value.trim();
  const email = campos.email.value.trim();
  const observacoes = campos.observacoes.value.trim();

  if (!corpo.nome) return mostrarMensagem('Informe o nome.', 'erro');
  if (!corpo.dataNascimento) return mostrarMensagem('Informe a data de nascimento.', 'erro');
  if (!telefone && !email) return mostrarMensagem('Informe pelo menos telefone ou e-mail.', 'erro');

  if (telefone) corpo.telefone = telefone;
  if (email) corpo.email = email;
  if (observacoes) corpo.observacoes = observacoes;

  try {
    const id = campoEditId.value;
    if (id) {
      await apiPut(`/participantes/${id}`, corpo);
      mostrarMensagem('Participante atualizado.', 'ok');
    } else {
      await apiPost('/participantes', corpo);
      mostrarMensagem('Participante adicionado.', 'ok');
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
  const p = itensAtuais.find((x) => x.id === id);
  if (!p) return;
  campoEditId.value = p.id;
  campos.nome.value = p.nome || '';
  campos.dataNascimento.value = (p.dataNascimento || '').slice(0, 10);
  campos.telefone.value = p.telefone || '';
  campos.email.value = p.email || '';
  campos.observacoes.value = p.observacoes || '';
  btnSalvar.textContent = 'Salvar';
  btnCancelar.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  campos.nome.focus();
}

async function excluir(id) {
  if (!confirm('Excluir este participante?')) return;
  try {
    await apiDel(`/participantes/${id}`);
    mostrarMensagem('Participante excluído.', 'ok');
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
