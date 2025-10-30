import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPersonById } from '@/store/slices/personSlice';
import { toggleFavoritePerson } from '@/store/slices/favoritesSlice';
import PersonDetails from '@/components/PersonDetails';

const PersonPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { currentPerson: person, status, error } = useAppSelector((state) => state.person);
    const favorites = useAppSelector((state) => state.favorites.favoritePersons);
    const isFavorite = person ? favorites.some((fav) => fav.id === person.id) : false;
    useEffect(() => {
        if (id) dispatch(fetchPersonById({ id: Number(id) }));
    }, [id, dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>{error}</div>;
    if (!person) return null;
    const onClickFavoritePerson = () => {
        dispatch(toggleFavoritePerson(person));
    };
    return (
        <div>
            <PersonDetails
                person={person}
                isFavorite={isFavorite}
                onClickFavoritePerson={onClickFavoritePerson}
            />
        </div>
    );
};

export default PersonPage;
