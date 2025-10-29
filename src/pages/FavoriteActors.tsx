import Favorite from '@/components/ui/favorite';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavoritePerson } from '@/store/slices/favoritesSlice';
import { Link } from 'react-router-dom';

const FavoriteActors = () => {
  const dispatch = useAppDispatch();
  const favoritePersons = useAppSelector((state) => state.favorites.favoritePersons);

  if (favoritePersons.length === 0)
    return (
      <div className="text-center py-20 text-gray-400 text-lg">
        No favorite actors yet 😢
      </div>
    );

  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>, actor: any) => {
    e.preventDefault();
    dispatch(toggleFavoritePerson(actor));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Favorite Actors
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favoritePersons.map((actor) => (
          <div key={actor.id} className="relative group">
            <Link
              to={`/person/${actor.id}`}
              className="block overflow-hidden rounded-xl shadow-md transition-transform transform group-hover:scale-105"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                    : '/placeholder.jpg'
                }
                alt={actor.name}
                className="w-full h-72 object-cover"
              />
            </Link>

            <Favorite
              isFavorite={true}
              onClickFavorite={(e) => onClickFavorite(e, actor)}
            />

            <p className="mt-2 text-center text-gray-900 dark:text-gray-200 font-medium">
              {actor.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteActors;
