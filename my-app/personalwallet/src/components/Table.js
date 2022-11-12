import React, { Component } from 'react';
import teste from 'prop-types';
import { connect } from 'react-redux';
import { deletaNoGlobal, abreCampoDeEdicao } from '../redux/actions';

class Table extends Component {
  gerenciaDespesa = ({ target: { id } }, funcao) => {
    const { expenses, atualizaDespesas, editaDespesa } = this.props;
    const novoId = JSON.parse(id);
    const newId = expenses.findIndex((elemento) => elemento.id === novoId);
    if (funcao === 'del') {
      expenses.splice(newId, 1);
      atualizaDespesas(expenses);
    }
    if (funcao === 'edit') editaDespesa(newId);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table hidden={ expenses.length < 1 }>
        <thead>
          <tr className="expenses-header">
            <th className="desctd">Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const rate = expense.exchangeRates[expense.currency].ask;
            return (
              <tr key={ expense.id } className="infoDivida">
                <td className="desctd">{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>{ Number(rate).toFixed(2) }</td>
                <td>
                  { (rate * expense.value).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    id={ expense.id }
                    onClick={ (e) => this.gerenciaDespesa(e, 'edit') }
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ expense.id }
                    onClick={ (e) => this.gerenciaDespesa(e, 'del') }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: teste.shape({}),
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  atualizaDespesas: (despesa) => dispatch(deletaNoGlobal(despesa)),
  editaDespesa: (id) => dispatch(abreCampoDeEdicao(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
