import React, { Component } from 'react';
import { connect } from 'react-redux';
import teste from 'prop-types';
import { fetchaMoedas, gastaNoGlobal, editaDespesaExistente } from '../redux/actions';

class WalletForm extends Component {
  state = {
    moedas: [],
    loading: true,
    expenses: [],
    valor: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const fazAFrente = async () => {
      const cotaAi = await this.pegaCotacao();
      this.portaMoedas(cotaAi);
    };
    fazAFrente();
  }

  pegaCotacao = async () => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  lidaComMudanca = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  portaMoedas = (data) => {
    const { currencies } = this.props;
    const chavesSemUsdt = Object.keys(data).filter((naoUsdt) => naoUsdt !== 'USDT');
    this.setState({
      moedas: chavesSemUsdt,
      loading: false,
    }, () => currencies(chavesSemUsdt));
  };

  novaDespesa = async () => {
    // as infos do estado
    const { valor, description, currency, method, tag, expenses } = this.state;
    const { addDespesaNoGlobal } = this.props;
    const MENOS_UM = -1;
    // fetcha a cotação atual
    const exchangeRates = await this.pegaCotacao();
    let qualId = MENOS_UM;
    if (expenses.length > 0) qualId = expenses[expenses.length - 1].id;
    // prepara o objeto a ser salvo
    const novaDespesa = {
      id: qualId + 1,
      value: valor,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    // insere a despesa no array expenses
    this.setState((prevState) => ({
      valor: '',
      description: '',
      expenses: [...prevState.expenses, novaDespesa],
    }), () => addDespesaNoGlobal(novaDespesa));
  };

  editaDespesa = () => {
    const { idDeEdicao, expenses, editaDespesaExistenteNoGlobal } = this.props;
    const { valor, description, currency, method, tag } = this.state;
    const novaDespesa = {
      id: idDeEdicao,
      value: valor,
      description,
      currency,
      method,
      tag,
      exchangeRates: expenses[idDeEdicao].exchangeRates,
    };
    expenses.splice(idDeEdicao, 1, novaDespesa);
    editaDespesaExistenteNoGlobal(expenses);
  };

  render() {
    const { moedas, loading, valor, description } = this.state;
    const { editandoDespesa } = this.props;
    return (
      <div className="walletform">
        <form>
          <label htmlFor="valor">
            <input
              id="valor"
              name="valor"
              type="number"
              data-testid="value-input"
              min="0"
              placeholder="0"
              value={ valor }
              onChange={ this.lidaComMudanca }
            />
            <br />
            Valor
          </label>
          <label htmlFor="description">
            <input
              id="description"
              name="description"
              value={ description }
              onChange={ this.lidaComMudanca }
              type="text"
              data-testid="description-input"
              placeholder="Descrição"
            />
            <br />
            Descrição
          </label>
          <div>
            <select
              data-testid="currency-input"
              name="currency"
              onChange={ this.lidaComMudanca }
            >
              { loading || moedas.map((coin) => (
                <option
                  name="currency"
                  value={ coin }
                  key={ coin }
                >
                  { coin }
                </option>)) }
            </select>
            <br />
            Moeda
          </div>
          <div>
            <select
              data-testid="method-input"
              name="method"
              onChange={ this.lidaComMudanca }
            >
              <option
                value="Dinheiro"
                name="method"
              >
                Dinheiro
              </option>
              <option
                value="Cartão de crédito"
                name="method"
              >
                Cartão de crédito
              </option>
              <option
                value="Cartão de débito"
                name="method"
              >
                Cartão de débito
              </option>
            </select>
            <br />
            Forma de pagamento
          </div>

          <div>
            <select
              data-testid="tag-input"
              name="tag"
              onChange={ this.lidaComMudanca }
            >
              <option name="tag" value="Alimentação">Alimentação</option>
              <option name="tag" value="Lazer">Lazer</option>
              <option name="tag" value="Trabalho">Trabalho</option>
              <option name="tag" value="Transporte">Transporte</option>
              <option name="tag" value="Saúde">Saúde</option>
            </select>
            <br />
            Tag
          </div>

          <div>
            { editandoDespesa
              ? (
                <button
                  type="button"
                  onClick={ () => this.editaDespesa() }
                >
                  Editar despesa
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={ () => this.novaDespesa() }
                >
                  Adicionar despesa
                </button>)}
          </div>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: teste.shape(),
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: (coins) => dispatch(fetchaMoedas(coins)),
  addDespesaNoGlobal: (despesa) => dispatch(gastaNoGlobal(despesa)),
  editaDespesaExistenteNoGlobal: (despesa) => dispatch(editaDespesaExistente(despesa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
