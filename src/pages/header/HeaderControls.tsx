import { useEffect, useState } from "react"
import { CatalogSearchField } from "../CatalogSearchField"
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/actions";
import { useQueryAssembler } from "../../hooks/queryAssembler";
import { useAppSelector } from "../../hooks/redux";

export const HeaderControls = () => {
    const [invisible, setInvisible] = useState<boolean>(true);

    const { cart } = useAppSelector(state => state.shoesShop);
    const { setCat } = useActions();
    const query = useQueryAssembler();
    const navigate = useNavigate();


    const handleSearchClick = () => {
        if (invisible) {
            setInvisible(false);
            return;
        }
        setCat(0);
        navigate('/catalog');
    }

    useEffect(() => setInvisible(true), [query])

  return (
    <div>
        <div className="header-controls-pics">
            <div
                data-id="search-expander"
                className="header-controls-pic header-controls-search"
                onClick={handleSearchClick}
            ></div>
            <div className="header-controls-pic header-controls-cart" onClick={() => navigate('/cart')}>
                {cart.length > 0 && <div className="header-controls-cart-full">{cart.length}</div>}
                <div className="header-controls-cart-menu"></div>
            </div>
        </div>
        {!invisible && <CatalogSearchField headerPlaced={true} invisible={invisible} />}
    </div>
  )
}
