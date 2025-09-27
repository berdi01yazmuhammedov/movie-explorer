import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearFilters, setFilter } from "@/store/movieSlice";

const Filters = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.movies);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="">
          <h3>Genre</h3>
          {[
            { id: 28, label: "Action" },
            { id: 35, label: "Comedy" },
            { id: 27, label: "Horror" },
          ].map((g) => (
            <Button
              key={g.id}
              variant={filters.genre === g.id ? "default" : "outline"}
              onClick={() => dispatch(setFilter({ key: "genre", value: g.id }))}
            >
              {g.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h3>Years</h3>
          {["1970", "1980", "1990", "2000", "2010", "2020"].map((decade) => (
            <Button
              key={decade}
              variant={filters.year === decade ? "default" : "outline"}
              onClick={() =>
                dispatch(setFilter({ key: "year", value: decade }))
              }
            >
              {decade}s
            </Button>
          ))}
        </div>
      </div>
      {[
        { key: "popularity", label: "Popular" },
        { key: "release_date", label: "New" },
        { key: "rating", label: "Top Rated" },
      ].map((sort) => (
        <Button
          key={sort.key}
          variant={filters.sortBy === sort.key ? "default" : "outline"}
          onClick={() =>
            dispatch(setFilter({ key: "sortBy", value: sort.key as any }))
          }
        >
          {sort.label}
        </Button>
      ))}

      <Button variant="destructive" onClick={() => dispatch(clearFilters())}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
