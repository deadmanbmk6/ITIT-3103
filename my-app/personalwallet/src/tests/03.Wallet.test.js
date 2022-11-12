import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Testa efetivamente a carteira', () => {
  test('Verifica se existem os campos necessários', () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveTextContent('');
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });
  test('Insere valores e testa botões', () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const botaoNovaDespesa = screen.getByRole('button');
    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Dez dolares');
    userEvent.click(botaoNovaDespesa);
    expect(valueInput.textContent).toBe('');
    expect(descriptionInput.textContent).toBe('');
  });
  test('Verifica se as moedas são renderizadas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<Wallet />);
    const currencies = screen.getByTestId('currency-input');
    expect(currencies).toBeInTheDocument();
    await waitFor(() => expect(currencies).toHaveValue('USD'));
    userEvent.selectOptions(currencies, 'XRP');
    expect(fetch).toHaveBeenCalled();
    userEvent.type(screen.getByRole('spinbutton'), '10');
    userEvent.type(screen.getByRole('textbox', { name: /descrição/i }), 'Dez dolares canadenses');
    userEvent.click(screen.getByRole('button'), { name: /adicionar despesa/i });
    expect(screen.getByText('Método de pagamento')).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByText(/19\.30/i)[0]).toBeInTheDocument());
  });
});
