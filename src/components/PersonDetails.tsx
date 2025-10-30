import type { Person } from '@/store/slices/personSlice';
import React from 'react';
interface PersonDetailsProps{
    person: Person;
    isFavorite: boolean;
    onClickFavoritePerson: () => void;
}
const PersonDetails: React.FC<PersonDetailsProps> = ({person, isFavorite, onClickFavoritePerson}) => {
    return (
        <div className="bg-zinc-900 p-6 rounded-2xl max-w-3xl w-full my-0 mx-auto sm:mx-8 overflow-y-auto">
            <div className="flex items-center gap-3">
                <button
                    onClick={onClickFavoritePerson}
                    className={`px-4 mb-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isFavorite
                            ? 'bg-red-500 hover:bg-red-700 text-white'
                            : 'bg-zinc-700 hover:bg-zinc-600 text-gray-200'
                    }`}
                >
                    {isFavorite ? '★ In Favorites' : '☆ Add to Favorites'}
                </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                    alt={person.name}
                    className="rounded-xl w-48 sm:w-56 object-cover shadow-lg"
                />
                <div>
                    <h2 className="text-2xl font-bold">{person.name}</h2>
                    <p className="text-gray-400 mt-1">{person.known_for_department}</p>
                    <p className="text-sm mt-3 text-gray-300 leading-relaxed">
                        {person.biography || 'No biography available.'}
                    </p>
                    <ul className="mt-4 space-y-1 text-sm text-gray-400">
                        <li>🎂 {person.birthday}</li>
                        {person.place_of_birth && <li>📍 {person.place_of_birth}</li>}
                        <li>🔥 Popularity: {person.popularity.toFixed(1)}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PersonDetails;
