import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('5. Teste o component <Pokedex />', () => {
  test('Exibe um h2 com texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: 'Encountered Pokémon' })).toBeInTheDocument();
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

  test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    expect(typeButtons).toHaveLength(pokemonTypes.length);

    typeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(pokemonTypes[index]);
    });
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex.: Psychic', () => {
    renderWithRouter(<App />);
    const psychicTypeButton = screen.getByRole('button', { name: 'Psychic' });
    expect(psychicTypeButton).toBeInTheDocument();
  });

  test('O botão com a classe "filter-button" está presente', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getByRole('button', { name: /all/i });
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveClass('filter-button');
  });

  test('Ao clicar no botão All, a Pokédex deve mostrar os Pokémon normalmente (sem filtros)', () => {
    renderWithRouter(<App />);
    const psychicTypeButton = screen.getByRole('button', { name: 'Psychic' });
    fireEvent.click(psychicTypeButton);

    const allButton = screen.getByRole('button', { name: /all/i });
    fireEvent.click(allButton);
  });
});
