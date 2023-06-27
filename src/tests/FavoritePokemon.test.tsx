import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente FavoritePokemon', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    renderWithRouter(<FavoritePokemon />);

    const notFound = screen.getByText(/no favorite pokémon found/i, { selector: 'p' });
    expect(notFound).toBeInTheDocument();
  });

  test('Apenas são exibidos os Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);

    const favoritePokemonCard = screen.getByText(/pikachu/i);
    expect(favoritePokemonCard).toBeInTheDocument();

    const selectedPokemon = screen.getByLabelText('Pokémon favoritado?');
    await user.click(selectedPokemon);

    const checkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(checkFavorite);

    const detailsPokemonPage = screen.getByRole('link', { name: /more details/i });
    await user.click(detailsPokemonPage);
  });
});
