import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux"
import { IItem, IOrder } from "../models/models";
import { useSendOrderMutation } from "../store/localhost.api";
import { Preloader } from "./Preloader";
import { useActions } from "../hooks/actions";

export const Order = () => {
  const [contacts, setContacts] = useState({ phone: '', address: '' });
  const [agreed, setAgreed] = useState(false);

  const { cart } = useAppSelector(state => state.shoesShop);
  const { removeFromCart } = useActions();

  const [sendOrder, { isSuccess, isLoading }] = useSendOrderMutation();

  const handleContactsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContacts((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!agreed) return;

      const itemsOnSend = cart.reduce((acc, item) => {
          acc.push({
            id: item.product?.id,
            price: item.product?.price,
            count: item.quantity,
          });
          return acc;
      }, [] as IItem[]);

      const infoOnSend: IOrder = {
        owner: {
          phone: contacts.phone,
          address: contacts.address,
        },
        items: itemsOnSend,
      }

      sendOrder(infoOnSend);
  }

  useEffect(() => {
    if (!isSuccess) return;
    cart.forEach((item) => removeFromCart(item.product?.id));
  }, [cart, isSuccess, removeFromCart])

  return (
    <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{maxWidth: "30rem", margin: "0 auto"}}>
          {isLoading ? <Preloader /> :
            !cart.length && !isSuccess ? '' :
            isSuccess ?
            'Ваш заказ успешно оформлен' :
          <form className="card-body" onSubmit={onSubmit}>
              <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Ваш телефон"
                    onChange={handleContactsInput}
                    value={contacts.phone}
              />
              </div>
              <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input className="form-control"
                    id="address"
                    name="address"
                    placeholder="Адрес доставки"
                    onChange={handleContactsInput}
                    value={contacts.address}
              />
              </div>
              <div className="form-group form-check">
              <input type="checkbox" className="form-check-input"
                    id="agreement"
                    onClick={() => setAgreed((prev) => !prev)}
              />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>}
        </div>
    </section>
  )
}
