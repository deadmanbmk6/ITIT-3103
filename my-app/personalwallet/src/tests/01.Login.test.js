import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Login', () => {
  test('Busca inputs e textos na página', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const botaoEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(botaoEntrar).toBeDisabled();
  });
  test('Email válido e senha maior que 6 caracteres para acessar /wallet?', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const botaoEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(screen.getByRole('textbox'), 'devsakae@gmail.com');
    userEvent.type(inputPassword, '12345');
    expect(botaoEntrar).toBeDisabled();
    userEvent.type(inputPassword, '6');
    expect(botaoEntrar).toBeEnabled();
    userEvent.click(botaoEntrar);
    expect(history.location.pathname).toBe('/carteira');
  });
});
