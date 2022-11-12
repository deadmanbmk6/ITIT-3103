// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGA_USUARIO } from '../actions';

const estadoInicial = {
  email: '',
  password: '',
};

const userReducer = (state = estadoInicial, action) => {
  switch (action.type) {
  case LOGA_USUARIO:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
