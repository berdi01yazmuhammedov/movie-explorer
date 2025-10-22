import { useAppSelector } from '@/store/hooks';

const Cast = () => {
    const fullCast = useAppSelector((state) => state.movies.cast);
    const mainCast = fullCast.slice(0, 6);
    const filteredCast = mainCast.map((actor) => {
        return (
            <div key={actor.character} className="flex flex-col gap-4 items-center mx-auto">
                <img
                    className="w-35 h-50"
                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                    alt="Profile"
                />
                <h2>{actor.name}</h2>
                <p>{actor.character}</p>
            </div>
        );
    });

    return (
        <>
            <div className="max-w-7xl mx-auto gap-8">
                <h2 className="text-2xl font-bold mb-8 text-center">Cast</h2>
                <div className="flex flex-wrap">{filteredCast}</div>
            </div>
        </>
    );
};

export default Cast;
