import React from 'react';
import { connect } from 'react-redux';
import teste from 'prop-types';
import { appLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      botaoEstaDesabilitado: true,
    };

    this.lidaAlteracoes = this.lidaAlteracoes.bind(this);
    this.verificaBotao = this.verificaBotao.bind(this);
  }

  componentDidMount() {
    document.title = 'Personal Wallet';
  }

  lidaAlteracoes({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verificaBotao());
  }

  verificaBotao() {
    const { email, password } = this.state;
    const regex = /\S+[@]\w+[.]\w+/gi;
    const MIN_PASSWORD_LENGTH = 5;
    const validaEmail = regex.test(email);
    const validaPassword = password.length > MIN_PASSWORD_LENGTH;
    if (validaEmail && validaPassword) {
      this.setState({ botaoEstaDesabilitado: false });
    } else {
      this.setState({ botaoEstaDesabilitado: true });
    }
  }

  enviaDados() {
    const { history, loginUser } = this.props;
    loginUser({ ...this.state });
    history.push('/carteira');
  }

  render() {
    const { botaoEstaDesabilitado, email, password } = this.state;
    return (
      <div className="loginpage">
        <h1 className="superfonte">Personal Wallet</h1>
        <div className="login-box">
          <div className="login-header">Digite seus dados.</div>
          <div>
            <form>
              <input
                type="text"
                name="email"
                data-testid="email-input"
                placeholder="Digite seu e-mail"
                value={ email }
                onChange={ this.lidaAlteracoes }
              />
              <input
                type="password"
                name="password"
                data-testid="password-input"
                placeholder="Digite sua senha"
                value={ password }
                onChange={ this.lidaAlteracoes }
              />
              <button
                type="button"
                disabled={ botaoEstaDesabilitado }
                onClick={ () => this.enviaDados() }
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: teste.func,
  history: teste.shape({
    push: teste.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginUser: (dados) => dispatch(appLogin(dados)),
});

export default connect(null, mapDispatchToProps)(Login);
