import { useMemo, useState } from "react";
import type { MarketplaceCard } from "../../../core/types/domain";

export function useProductSearch(listings: MarketplaceCard[]) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Items");

  const filtered = useMemo(() => {
    return listings.filter((item) => {
      const matchCat = activeCategory === "All Items" || item.category === activeCategory;
      const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.merchantName.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory, listings]);

  return { search, setSearch, activeCategory, setActiveCategory, filtered };
}
