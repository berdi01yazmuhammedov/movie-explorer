import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPersonById } from '@/store/slices/personSlice';
import { toggleFavoritePerson } from '@/store/slices/favoritesSlice';
import PersonDetails from '@/components/PersonDetails';

const PersonPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const person = useAppSelector((state) => state.person.currentPerson);
    const favorites = useAppSelector((state) => state.favorites.favoritePersons);
    const isFavorite = person ? favorites.some((fav) => fav.id === person.id) : false;
    useEffect(() => {
        if (id) dispatch(fetchPersonById({ id: Number(id) }));
    }, [id, dispatch]);

    if (!person)
        return (
            <div className="text-center py-10 text-black-900 dark:text-gray-300">Loading...</div>
        );
    const onClickFavoritePerson = () => {
        dispatch(toggleFavoritePerson(person));
    };
    return (
        <div className="relative bg-zinc-950 min-h-screen text-white flex items-center justify-center px-4 py-10">
            <PersonDetails person={person} isFavorite={isFavorite} onClickFavoritePerson={onClickFavoritePerson} />
        </div>
    );
};

export default PersonPage;
