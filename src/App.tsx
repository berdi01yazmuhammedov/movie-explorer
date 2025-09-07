import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
const [searchValue, setSearchValue] = useState("");
const [query, setQuery] = useState("");
const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchValue(e.target.value);
  
}
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchValue);
  }
  return (
    <>
      <div className="p-4 max-w-3xl mx-auto">
        <form onSubmit={onFormSubmit} className="flex relative">
          <Input name="search" onChange={onSearchChange} value={searchValue} placeholder="Search movie..." />
          <Button variant={"outline"} className="absolute right-0" type="submit">
            Search
          </Button>
        </form>

        <h3>{query}</h3>
      </div>
    </>
  );
}

export default App;
