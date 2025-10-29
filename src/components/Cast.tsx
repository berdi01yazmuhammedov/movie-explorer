import { useAppSelector } from '@/store/hooks';
import Actor from './Actor';

const Cast = () => {
    const fullCast = useAppSelector((state) => state.movies.cast);
    const mainCast = fullCast.slice(0, 6);

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white transition-colors duration-300">
                Cast
            </h2>
            {mainCast.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No cast found.</p>
            ) : (
                <div className="flex flex-wrap gap-6 justify-center">
                    {mainCast.map((actor) => (
                        <Actor key={actor.id} actor={actor} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cast;
