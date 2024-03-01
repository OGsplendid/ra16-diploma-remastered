import { useEffect, useState } from "react";
import { useAppSelector } from "./redux"

export const useQueryAssembler = () => {
    const [query, setQuery] = useState<string>('');
    const { offset, catId, currentQuery } = useAppSelector(state => state.shoesShop);

    useEffect(() => {
        let str = '';
        if (catId) str += `&categoryId=${catId}`;
        if (offset) str += `&offset=${offset}`;
        if (currentQuery) str += `&q=${currentQuery}`;
        setQuery(str.replace('&', '?'));
    }, [offset, catId, currentQuery])

    return query;
}
