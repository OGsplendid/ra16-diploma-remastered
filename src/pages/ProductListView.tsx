import { Link, useLocation } from "react-router-dom";
import { IHit } from "../models/models"

export const ProductListView = ({ item, isHit }: {item: IHit, isHit: boolean}) => {
  const { pathname } = useLocation();
  const cardClasses = isHit ? "card" : "card catalog-item-card";

  return (
    <div className="col-4">
      <div className={cardClasses}>
        <img src={item.images[0]}
          className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{`${item.price} руб.`}</p>
          <Link to={pathname === '/catalog' ? `${item.id}` : `/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
}
