import { useAppSelector } from '@/store/hooks';
import React from 'react'

const MovieVideos = () => {
    const movieVideos = useAppSelector((state) => state.movies.movieVideos);
 return (
        <>
            <div className="max-w-7xl mx-auto gap-8">
                <h2 className="text-2xl font-bold mb-8 text-center">Cast</h2>
                <div className="flex flex-wrap">{movieVideos.map((video) => {
                    return (
                        <iframe
                            key={video.key}
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    );
                })}</div>
            </div>
        </>
    );
}

export default MovieVideos