import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const Search = () => {

  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  // set initial search input value from router query
  useEffect(() => {
    if (router.query.input) {
      setSearchInput(router.query.input as string);
    }
  }, [router.query.input]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = searchInput.trim();

    if (input.length > 0) {
      router.push(`/search/${input}`);
    }
  };

  return (
    <form
      className="w-full"
      onSubmit={submitSearch}>
      <div className="flex w-full shadow-[0_1px_2px_0_rgb(0,0,0,20%)]">
        <input
          className="h-[24px] p-3 pr-0 box-content w-full rounded-sm border-none  outline-none placeholder:font-thin placeholder:text-black placeholder:text-opacity-25 focus:outline-offset-0"
          placeholder={"Search trades and users..."}
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button
          className="items-center  bg-none p-3"
          type="submit">
          <svg className="w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="#000" d="m21.915 20.297-4.101-4.673c1.157-1.457 1.796-3.124 1.918-5 .08-1.22-.08-2.401-.481-3.545a9.01 9.01 0 0 0-1.731-3.003 9.02 9.02 0 0 0-2.753-2.106 8.882 8.882 0 0 0-3.452-.938c-1.22-.08-2.4.08-3.544.482a9.01 9.01 0 0 0-3.004 1.73 9.021 9.021 0 0 0-2.106 2.753 8.88 8.88 0 0 0-.938 3.452c-.08 1.22.081 2.4.482 3.545a9.01 9.01 0 0 0 1.73 3.002 9.022 9.022 0 0 0 2.753 2.107 8.852 8.852 0 0 0 3.452.938c1.877.122 3.612-.296 5.207-1.253l4.102 4.66c.286.345.659.532 1.12.562.443.029.837-.108 1.182-.411s.532-.676.561-1.12a1.569 1.569 0 0 0-.397-1.181m-7.402-5.949c-1.195 1.048-2.58 1.521-4.158 1.418-1.578-.103-2.89-.752-3.938-1.946-1.049-1.194-1.521-2.58-1.418-4.158.103-1.577.751-2.89 1.946-3.938 1.194-1.048 2.58-1.521 4.158-1.418 1.577.103 2.89.752 3.938 1.946s1.521 2.58 1.418 4.158c-.103 1.578-.752 2.89-1.946 3.938" />
          </svg>
        </button>

      </div>
    </form>
  );
};

export default Search;