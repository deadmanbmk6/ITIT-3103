// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { DELETA_DESPESA, FETCHA_AS_MOEDAS,
  NOVA_DESPESA, CAMPO_EDICAO_DESPESA, EDITA_DESPESA_EXISTENTE } from '../actions';

const estadoInicial = {
  currencies: [],
  expenses: [],
  editandoDespesa: false,
};

const currencies = (state = estadoInicial, action) => {
  switch (action.type) {
  case FETCHA_AS_MOEDAS:
    return {
      ...state,
      currencies: action.payload,
    };
  case NOVA_DESPESA:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETA_DESPESA:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case CAMPO_EDICAO_DESPESA:
    return {
      ...state,
      editandoDespesa: true,
      idDeEdicao: action.id,
    };
  case EDITA_DESPESA_EXISTENTE:
    return {
      ...state,
      editandoDespesa: false,
    };
  default:
    return state;
  }
};

export default currencies;
