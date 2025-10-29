import { Link } from 'react-router-dom';
import Favorite from './ui/favorite';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavoritePerson } from '@/store/slices/favoritesSlice';

interface ActorProps {
    actor: {
        id: number;
        name: string;
        profile_path: string;
        character?: string;
    };
}

const Actor: React.FC<ActorProps> = ({ actor }) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.favoritePersons);
    const isFavorite = favorites.some((fav) => fav.id === actor.id);

    const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(toggleFavoritePerson(actor));
    };

    return (
        <Link
            to={`/person/${actor.id}`}
            className="relative bg-zinc-900 rounded-xl p-4 w-40 text-center flex flex-col items-center transition-all hover:scale-105"
        >
            <Favorite isFavorite={isFavorite} onClickFavorite={onClickFavorite} />
            <img
                src={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                        : '/no-image.jpg'
                }
                alt={actor.name}
                className="rounded-lg mb-3 w-32 h-48 object-cover"
            />
            <h3 className="text-white text-sm font-medium">{actor.name}</h3>
            {actor.character && (
                <p className="text-gray-400 text-xs mt-1">{actor.character}</p>
            )}
        </Link>
    );
};

export default Actor;
