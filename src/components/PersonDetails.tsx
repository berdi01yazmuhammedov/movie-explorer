import type { Person } from '@/store/slices/personSlice';
import React from 'react';

interface PersonDetailsProps {
    person: Person;
    isFavorite: boolean;
    onClickFavoritePerson: () => void;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({
    person,
    isFavorite,
    onClickFavoritePerson,
}) => {
    return (
        <div className="relative flex justify-center py-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl max-w-3xl w-full shadow-lg dark:shadow-black/40 overflow-y-auto transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={onClickFavoritePerson}
                        className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors duration-300 ${
                            isFavorite
                                ? 'bg-red-500 hover:bg-red-700 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200'
                        }`}
                    >
                        {isFavorite ? '★ In Favorites' : '☆ Add to Favorites'}
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <img
                        src={
                            person.profile_path
                                ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                                : '/placeholder.jpg'
                        }
                        alt={person.name}
                        className="rounded-xl w-48 sm:w-56 object-cover shadow-lg dark:shadow-black/50 transition-all duration-300"
                    />

                    <div className="flex-1">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            {person.name}
                        </h2>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                            {person.known_for_department}
                        </p>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed transition-colors duration-300">
                            {person.biography || 'No biography available.'}
                        </p>

                        <ul className="mt-6 space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                            <li>🎂 Birthday: {person.birthday || 'Unknown'}</li>
                            {person.place_of_birth && (
                                <li>📍 Place of Birth: {person.place_of_birth}</li>
                            )}
                            <li>🔥 Popularity: {person.popularity.toFixed(1)}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetails;
