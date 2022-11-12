import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import App from '../App';

describe('Testa o componente Header', () => {
  test('Informações básicas corretas?', () => {
    renderWithRouterAndRedux(<Header />);
    expect(screen.getByText(/0.00/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
  });
  test('E-mail aparece no header?', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), 'teste@emaildeteste.com');
    userEvent.type(screen.getByPlaceholderText(/digite sua senha/i), '123456');
    userEvent.click(screen.getByRole('button'));
    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText('teste@emaildeteste.com')).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
  });
});
