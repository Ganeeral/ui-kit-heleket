import { useEffect, useState } from "react";

import { useDebounce } from "../hooks/use-debounce";

export const useFilteredList = <T>(
  items: T[],
  searchValue: string,
  searchKey: keyof T,
  delay?: number,
) => {
  const [filteredList, setFilteredList] = useState<T[]>(items);
  const debouncedSearch = useDebounce(searchValue, delay || 400);

  useEffect(() => {
    if (debouncedSearch) {
      setFilteredList(
        items?.filter((item) =>
          (item[searchKey] as string)
            .toString()
            .toLowerCase()
            .includes(debouncedSearch.trim().toLowerCase()),
        ),
      );
    } else if (items?.length) {
      setFilteredList(items);
    } else if (!items?.length && filteredList?.length) {
      setFilteredList([]);
    }
  }, [debouncedSearch, items, searchKey, searchValue]);

  return filteredList;
};
