"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SearchBar = () => {
  let [search, setSearch] = useState<string>("");
  let [error, setError] = useState<string>("");
  let router = useRouter();
  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search == "") {
      setError("Please enter a search term");
      return;
    }
    console.log(search);
    router.push(`/articles/search?searchText=${search}`);
  };
  return (
    <div className="container mb-6 max-w-3xl">
      <form onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setError("");
          }}
          className="border-border bg-background border-dotted border-2 p-2 rounded-lg w-full outline-none focus:border-primary"
          type="search"
          placeholder="Search... click enter to search"
        />
        {error ? <p className="text-red-500 text-sm">{error}</p> : ""}
      </form>
    </div>
  );
};

export default SearchBar;
