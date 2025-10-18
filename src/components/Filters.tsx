import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearFilters, setFilter } from '@/store/movieSlice';

const Filters = () => {
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector((state) => state.movies);
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-6">
                <div>
                    <h3 className="text-gray-300 font-semibold text-sm uppercase tracking-wide mb-3">
                        Genre
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 28, label: 'Action' },
                            { id: 35, label: 'Comedy' },
                            { id: 27, label: 'Horror' },
                        ].map((g) => (
                            <Button
                                key={g.id}
                                variant={filters.genre === g.id ? 'default' : 'outline'}
                                className={`px-4 py-2 text-xs rounded-lg border border-zinc-700 ${
                                    filters.genre === g.id
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                                }`}
                                onClick={() => dispatch(setFilter({ key: 'genre', value: g.id }))}
                            >
                                {g.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-gray-300 font-semibold text-sm uppercase tracking-wide mb-3">
                        Years
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {['1970', '1980', '1990', '2000', '2010', '2020'].map((decade) => (
                            <Button
                                key={decade}
                                variant={filters.year === decade ? 'default' : 'outline'}
                                className={`px-4 py-2 text-xs rounded-lg border border-zinc-700 ${
                                    filters.year === decade
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                                }`}
                                onClick={() => dispatch(setFilter({ key: 'year', value: decade }))}
                            >
                                {decade}s
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {[
                    { key: 'popularity', label: 'Popular' },
                    { key: 'release_date', label: 'New' },
                    { key: 'rating', label: 'Top Rated' },
                ].map((sort) => (
                    <Button
                        key={sort.key}
                        variant={filters.sortBy === sort.key ? 'default' : 'outline'}
                        className={`w-full px-4 py-2 text-sm rounded-lg border border-zinc-700 ${
                            filters.sortBy === sort.key
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                        }`}
                        onClick={() =>
                            dispatch(setFilter({ key: 'sortBy', value: sort.key as any }))
                        }
                    >
                        {sort.label}
                    </Button>
                ))}

                <Button
                    variant="destructive"
                    onClick={() => dispatch(clearFilters())}
                    className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                >
                    Clear Filters
                </Button>
            </div>
        </div>
    );
};

export default Filters;
