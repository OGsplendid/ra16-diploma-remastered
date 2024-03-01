import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";
import { Order } from "./Order";

export const Cart = () => {
    const { cart } = useAppSelector(state => state.shoesShop);
    const { removeFromCart } = useActions();
    
    let counter = 1;

    const fullPrice = cart.reduce((acc, item) => acc + item.priceSum, 0);

    const handleDeleteProduct = (id: number | undefined) => {
        if (id) removeFromCart(id);
    }

  return (
    <>
        {!cart.length ? 'В корзине товаров нет' : <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Размер</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Итого</th>
                    <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product) => (
                        <tr key={product.product?.id}>
                            <td scope="row">{counter++}</td>
                            <td><Link to={`/catalog/${product.product?.id}`}>{product.product?.title}</Link></td>
                            <td>{product.checkedSize}</td>
                            <td>{product.quantity}</td>
                            <td>{product.product?.price}</td>
                            <td>{product.priceSum}</td>
                            <td><button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteProduct(product.product?.id)}>Удалить</button></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={5} className="text-right">Общая стоимость</td>
                        <td>{fullPrice}</td>
                    </tr>
                </tbody>
            </table>
        </section>}
        <Order />
    </>
  )
}
