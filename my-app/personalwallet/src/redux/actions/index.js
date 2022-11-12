export const LOGA_USUARIO = 'LOGA_USUARIO';
export const FETCHA_AS_MOEDAS = 'FETCHA_AS_MOEDAS';
export const NOVA_DESPESA = 'NOVA_DESPESA';
export const DELETA_DESPESA = 'DELETA_DESPESA';
export const CAMPO_EDICAO_DESPESA = 'CAMPO_EDICAO_DESPESA';
export const EDITA_DESPESA_EXISTENTE = 'EDITA_DESPESA_EXISTENTE';

const appLogin = (dados) => ({
  type: LOGA_USUARIO,
  payload: dados,
});

const fetchaMoedas = (dados) => ({
  type: FETCHA_AS_MOEDAS,
  payload: dados,
});

const gastaNoGlobal = (dados) => ({
  type: NOVA_DESPESA,
  payload: dados,
});

const deletaNoGlobal = (dados) => ({
  type: DELETA_DESPESA,
  payload: dados,
});

const abreCampoDeEdicao = (dados) => ({
  type: CAMPO_EDICAO_DESPESA,
  id: dados,
});

const editaDespesaExistente = (dados) => ({
  type: EDITA_DESPESA_EXISTENTE,
  payload: dados,
});

export { appLogin, fetchaMoedas, gastaNoGlobal, deletaNoGlobal,
  abreCampoDeEdicao, editaDespesaExistente };
