import React from 'react';
import HeartSVG from '../../assets/heart.svg';
import unCheckedHeartSVG from '../../assets/uncheckedHeart.svg';
interface favoriteProps {
    isFavorite: boolean;
    onClickFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Favorite: React.FC<favoriteProps> = ({ isFavorite, onClickFavorite }) => {
    return (
        <button
            onClick={onClickFavorite}
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
                backdrop-blur-md border transition-all duration-200
                ${
                    isFavorite
                        ? 'bg-red-200/30 dark:bg-red-500/20 border-red-300 shadow-lg shadow-red-500/30 hover:bg-red-500 dark:hover:bg-red-600'
                        : 'bg-zinc-800/70 dark:bg-zinc-200/30 border-zinc-700 dark:border-zinc-500 hover:bg-zinc-700/80 dark:hover:bg-zinc-400/50'
                }`}
        >
            <img
                src={isFavorite ? HeartSVG : unCheckedHeartSVG}
                alt="favorite"
                className={`w-4 h-4 ${isFavorite ? 'brightness-110' : 'opacity-80'} transition-all`}
            />
        </button>
    );
};

export default Favorite;
