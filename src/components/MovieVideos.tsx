import { useAppSelector } from '@/store/hooks';

const MovieVideos = () => {
    const movieVideos = useAppSelector((state) => state.movies.movieVideos);

    return (
        <div className="max-w-7xl mx-auto gap-8 p-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white transition-colors duration-300">
                Videos for the movie
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
                {movieVideos.map((video) => (
                    <iframe
                        key={video.key}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="rounded-lg shadow-md dark:shadow-black/50 transition-shadow duration-300"
                    ></iframe>
                ))}
            </div>
        </div>
    );
};

export default MovieVideos;
