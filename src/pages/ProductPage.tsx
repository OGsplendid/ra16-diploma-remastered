import { Params, useNavigate, useParams } from "react-router-dom";
import { useFetchProductQuery } from "../store/localhost.api"
import { Preloader } from "./Preloader";
import { useState } from "react";
import { useActions } from "../hooks/actions";

export const ProductPage = () => {
    const [checkedSize, setCheckedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const { id }: Readonly<Params<string>> = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useFetchProductQuery(`${id}`);

    const { addToCart } = useActions();

    if (isLoading) return <Preloader />;

    const handleSizeClick = (size: string): void => {
        size === checkedSize ? setCheckedSize(null) : setCheckedSize(size);
    }

    const increaseQuantity = () => {
        if (!checkedSize) return;
        if (quantity < 10) setQuantity((prev) => prev + 1);
    }

    const decreaseQuantity = () => {
        if (!checkedSize) return;
        if (quantity > 1) setQuantity((prev) => prev - 1);
    }

    const handleToCartButtonClick = () => {
        if (!checkedSize) return;
        const obj = {
            product: data,
            quantity,
            checkedSize,
            priceSum: data?.price ? data.price * quantity : 0,
        }
        addToCart(obj);
        navigate('/cart')
    }


  return (
    data && <section className="catalog-item">
        <h2 className="text-center">{data.title && data.title}</h2>
        <div className="row">
            <div className="col-5">
                <img src={data.images[0] && data.images[0]}
                    className="img-fluid" alt="" />
            </div>
            <div className="col-7">
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Артикул</td>
                            <td>{data.sku && data.sku}</td>
                        </tr>
                        <tr>
                            <td>Производитель</td>
                            <td>{data.manufacturer && data.manufacturer}</td>
                        </tr>
                        <tr>
                            <td>Цвет</td>
                            <td>{data.color && data.color}</td>
                        </tr>
                        <tr>
                            <td>Материалы</td>
                            <td>{data.material && data.material}</td>
                        </tr>
                        <tr>
                            <td>Сезон</td>
                            <td>{data.season && data.season}</td>
                        </tr>
                        <tr>
                            <td>Повод</td>
                            <td>{data.reason && data.reason}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    {data.sizes.length &&
                    <p>Размеры в наличии:
                        {data.sizes.map((size) => (
                            size.available &&
                            <span
                                key={size.size}
                                onClick={() => handleSizeClick(size.size)}
                                className={`catalog-item-size ${checkedSize === size.size && 'selected'}`}>{size.size}
                            </span>
                        ))}
                    </p>}
                    {data.sizes.some((size) => size.available) &&
                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                            <button className="btn btn-secondary" onClick={decreaseQuantity}>-</button>
                            <span className="btn btn-outline-primary">{quantity}</span>
                            <button className="btn btn-secondary" onClick={increaseQuantity}>+</button>
                        </span>
                    </p>}
                </div>
                {data.sizes.some((size) => size.available) &&
                <button
                    onClick={handleToCartButtonClick}
                    className={`btn btn-danger btn-block btn-lg ${!checkedSize && 'disabled'}`}>В корзину
                </button>}
            </div>
        </div>
    </section>
  )
}
