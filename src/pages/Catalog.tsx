import { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { Preloader } from "./Preloader";
import { ProductListView } from "./ProductListView";
import { useFetchGoodsQuery } from "../store/localhost.api";
import { LoadMoreBtn } from "./LoadMoreBtn";
import { CatalogSearchField } from "./CatalogSearchField";
import { useQueryAssembler } from "../hooks/queryAssembler";
import { useAppSelector } from "../hooks/redux";
import { IHit } from "../models/models";

export const Catalog = ({ withSearchField }: {withSearchField: boolean}) => {
  const [goods, setGoods] = useState<IHit[] | []>([]);

  const query = useQueryAssembler();

  const { offset } = useAppSelector(state => state.shoesShop);
  const { data, isLoading, isFetching, isError } = useFetchGoodsQuery(query);

  useEffect(() => {
    if (!data) return;
    if (data.length && offset) {
      setGoods((prev) => [...prev, ...data]);
      return;
    }
    if (data.length && !offset) {
      setGoods(data);
      return;
    }
    if (!data.length && offset) return;
    if (!data.length && !offset) setGoods(data);
  }, [data])

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {withSearchField && <CatalogSearchField headerPlaced={false} invisible={false} />}
      <Categories />
      <div className="row">
        {isLoading || isFetching ?
          <Preloader /> :
          isError ?
          'Что-то пошло не так' :
          goods && goods.map((item) => (
            <ProductListView item={item} isHit={false} key={item.id} />
          ))
        }
      </div>
      {(data?.length && data.length > 5) ? <LoadMoreBtn /> : ''}
    </section>
  )
}
