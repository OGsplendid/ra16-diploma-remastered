import { useLocation, useNavigate } from "react-router-dom";
import { useActions } from "../hooks/actions";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";

export const CatalogSearchField = ({ headerPlaced, invisible }: {headerPlaced: boolean, invisible: boolean}) => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const { setCurrentQuery, resetOffset } = useActions();
  const { currentQuery } = useAppSelector(state => state.shoesShop);

  const location = useLocation();
  const navigate = useNavigate();

  const classes = `${headerPlaced ? 'header-controls-search-form' : 'catalog-search-form'} ${invisible ? 'invisible' : ''} 'form-inline'`

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location.pathname !== '/catalog') navigate('/catalog');
    resetOffset();
    setCurrentQuery(searchInputValue);
  }

  useEffect(() => setSearchInputValue(currentQuery), [])

  return (
    <form className={classes} onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Поиск" onChange={handleInputChange} value={searchInputValue} />
    </form>
  )
}
