import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';

describe('5. Teste o component <Pokedex />', () => {
  test('Exibe um h2 com texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Encountered Pokémon')).toBeInTheDocument();
  });

  test('exibe o próximo Pokémon da lista ao clicar no botão Próximo Pokémon', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByTestId('next-pokemon');
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).toHaveTextContent('Próximo Pokémon');

    const pokemonList = screen.getAllByTestId('pokemon-name');

    for (let i = 0; i < pokemonList.length; i++) {
      const currentPokemonElement = screen.getByTestId('pokemon-name');
      expect(currentPokemonElement).toBeInTheDocument();
      expect(currentPokemonElement?.textContent).toBe(pokemonList[i]?.textContent);

      fireEvent.click(buttonNext);
    }
  });
});
