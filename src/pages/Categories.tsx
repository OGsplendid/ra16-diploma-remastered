import { useFetchCategoriesQuery } from "../store/localhost.api"
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { Preloader } from "./Preloader";

export const Categories = () => {
  const { data, isLoading, isFetching, isError } = useFetchCategoriesQuery();

  const { catId } = useAppSelector(state => state.shoesShop);
  const { setCat, resetOffset } = useActions();

  const handleClick = (id: number) => {
    resetOffset();
    setCat(id);
  }

  useEffect(() => {
    setCat(0);
    resetOffset();
  }, [])

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item"
          onClick={() => handleClick(0)}>
        <a className={catId === 0 ? "nav-link active" : "nav-link"}>Все</a>
      </li>
      {isLoading || isFetching ? <Preloader /> :
      isError ? 'Не удалось загрузить категории' :
       data && data.map((cat) => (
        <li className="nav-item"
            key={cat.id}
            onClick={() => handleClick(cat.id)}>
          <a className={catId === cat.id ? "nav-link active" : "nav-link"}>{cat.title}</a>
        </li>
      ))}
    </ul>
  )
}
