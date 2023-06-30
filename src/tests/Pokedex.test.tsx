import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('5. Teste o component <Pokedex />', () => {
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = renderWithRouter(<App />);
  });

  test('Exibe um h2 com texto "Encountered Pokémon"', () => {
    expect(screen.getByText('Encountered Pokémon')).toBeInTheDocument();
  });

  test('exibe o próximo Pokémon da lista ao clicar no botão Próximo Pokémon', () => {
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

  test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    expect(typeButtons).toHaveLength(pokemonTypes.length);

    typeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(pokemonTypes[index]);
    });
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex.: Psychic', () => {
    const psychicTypeButton = screen.getByText('Psychic');
    expect(psychicTypeButton).toBeInTheDocument();
  });

  test('O botão All precisa estar sempre visível.', () => {
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });

  test('Ao carregar a página, o filtro selecionado deve ser All', () => {
    const allButton = screen.getByText('All');
    expect(allButton).toHaveClass('filter-button');
  });
});
