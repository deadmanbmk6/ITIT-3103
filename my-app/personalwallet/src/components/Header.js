import React, { Component } from 'react';
import teste from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calculaValor = () => {
    const { expenses } = this.props;
    let valorTemp = 0;
    if (expenses.length > 0) {
      expenses.forEach((despesa) => {
        const valorDaDespesa = despesa.value;
        const cotacao = despesa.exchangeRates[despesa.currency].ask;
        valorTemp += valorDaDespesa * cotacao;
      });
    }
    // O retorno comentado é mais bonito
    // return valorTemp.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return valorTemp.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <div className="logo">
          <h1 className="superfonte">Personal Wallet</h1>
        </div>
        <div className="header-info">
          <div>
            <h5>Você está logado(a) como</h5>
            <p data-testid="email-field">{ email }</p>
          </div>
          <div>
            <h5>Total de despesas</h5>
            <p data-testid="total-field">
              { this.calculaValor() }
            </p>
          </div>
          <div>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: teste.string,
  totalDespesas: teste.number,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
