import { useAppSelector } from '@/store/hooks';

const Cast = () => {
    const fullCast = useAppSelector((state) => state.movies.cast);
    const mainCast = fullCast.slice(0, 6);

    const filteredCast = mainCast.map((actor) => (
        <div
            key={actor.character}
            className="flex flex-col gap-2 items-center w-32 sm:w-36 md:w-40 mx-auto transition-colors duration-300"
        >
            <img
                className="w-full h-48 object-cover rounded-lg shadow-md dark:shadow-black/50 transition-shadow duration-300"
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
            />
            <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white text-center truncate">
                {actor.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center truncate">
                {actor.character}
            </p>
        </div>
    ));

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white transition-colors duration-300">
                Cast
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">{filteredCast}</div>
        </div>
    );
};

export default Cast;
