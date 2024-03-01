import { useFetchTopSalesQuery } from "../store/localhost.api"
import { Preloader } from "./Preloader";
import { ProductListView } from "./ProductListView";
import { useActions } from "../hooks/actions";

export const TopSales = () => {
  const { isLoading, isError, data } = useFetchTopSalesQuery();
  const { setCurrentQuery } = useActions();

  if (isError) return '';

  setCurrentQuery('');

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {isLoading ?
          <Preloader /> :
          data && data.map((item) => (
            <ProductListView item={item} isHit={true} key={item.id} />
          ))
        }
      </div>
    </section>
  )
}
