const API_BASE = '/api';

async function api(method, caminho, corpo) {
  const opcoes = { method, headers: {} };
  if (corpo !== undefined) {
    opcoes.headers['Content-Type'] = 'application/json';
    opcoes.body = JSON.stringify(corpo);
  }

  let resposta;
  try {
    resposta = await fetch(API_BASE + caminho, opcoes);
  } catch (e) {
    throw new Error('Não foi possível falar com o servidor. Ele está rodando?');
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    let mensagem = dados && dados.erro ? dados.erro : 'Erro ' + resposta.status;
    if (dados && Array.isArray(dados.campos) && dados.campos.length) {
      mensagem += ': ' + dados.campos.join('; ');
    }
    throw new Error(mensagem);
  }
  return dados;
}

const apiGet = (caminho) => api('GET', caminho);
const apiPost = (caminho, corpo) => api('POST', caminho, corpo);
const apiPut = (caminho, corpo) => api('PUT', caminho, corpo);
const apiDel = (caminho) => api('DELETE', caminho);

function escapeHtml(valor) {
  if (valor === null || valor === undefined) return '';
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatarData(valor) {
  if (!valor) return '';
  const partes = String(valor).slice(0, 10).split('-');
  if (partes.length !== 3) return valor;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function mostrarMensagem(texto, tipo) {
  const faixa = document.getElementById('mensagem');
  if (!faixa) return;
  faixa.textContent = texto;
  faixa.className = 'msg ' + (tipo === 'erro' ? 'erro' : 'ok');
  faixa.hidden = false;
}

function limparMensagem() {
  const faixa = document.getElementById('mensagem');
  if (faixa) faixa.hidden = true;
}

async function carregarResumo() {
  const alvo = document.getElementById('resumo');
  if (!alvo) return;
  const entidades = [
    ['participantes', 'Participantes'],
    ['oficinas', 'Oficinas'],
    ['presencas', 'Presenças'],
    ['progressos', 'Progressos'],
  ];
  try {
    const contagens = await Promise.all(
      entidades.map(([rota]) => apiGet('/' + rota).then((lista) => lista.length))
    );
    alvo.innerHTML = entidades
      .map(
        ([, rotulo], i) => `
        <div class="card-resumo">
          <span class="numero">${contagens[i]}</span>
          <span class="rotulo">${rotulo}</span>
        </div>`
      )
      .join('');
  } catch (e) {
    alvo.innerHTML = `<p class="msg erro">${escapeHtml(e.message)}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', carregarResumo);
