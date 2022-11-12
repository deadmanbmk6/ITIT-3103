import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

// const mockError = { error: { message: 'Erro simulado' } };
const VALUE_INPUT = 'value-input';
const DESCRIPTION_INPUT = 'description-input';

describe('Verifica se a despesa foi adicionada corretamente', () => {
  test('É uma tabela?', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<Wallet />);
    const currencies = screen.getByTestId('currency-input');
    await waitFor(() => userEvent.selectOptions(currencies, 'USD'));
    userEvent.type(screen.getByTestId(VALUE_INPUT), '10');
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), 'Dez dolares');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      const tabelaExiste = screen.getByRole('table');
      const editAndDelete = screen.getByRole('cell', {
        name: /editar despesa excluir/i,
      });
      const usdToBrl = screen.getByRole('cell', {
        name: /dólar americano\/real brasileiro/i,
      });
      expect(tabelaExiste).toBeInTheDocument();
      expect(editAndDelete).toBeInTheDocument();
      expect(usdToBrl).toBeInTheDocument();
    });
  });
  test('Verifica se as funções de editar e excluir estão funcionando', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<Wallet />);
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    const valorConvertido = screen.getByText(/Valor convertido/i);
    expect(valorConvertido).toBeInTheDocument();
    await waitFor(() => userEvent.click(screen.getByTestId('edit-btn')));
    userEvent.type(screen.getByTestId(VALUE_INPUT), '20');
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), 'Vinte');
    const doisBotaoDeEditar = await screen.getAllByRole('button', { name: /editar despesa/i });
    userEvent.click(doisBotaoDeEditar[0]);
    expect(screen.getByText(/Vinte/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('delete-btn'));
  });
  // test('Simular erro no fetch e verifica se é pego no catch', async () => {
  //   jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockError }));
  //   renderWithRouterAndRedux(<Wallet />);
  //   expect(fetch).toThrow();
  // });
});
