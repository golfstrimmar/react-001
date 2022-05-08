import React from "react";
import Shipment from "./Shipment";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import propTypes from "prop-types";




class Order extends React.Component {
  static propTypes = {
    burgers: propTypes.object,
    order: propTypes.object,
    deleteFronOrder: propTypes.func
  };

  renderOrder = (key) => {
    const burger = this.props.burgers[key];
    const count = this.props.order[key];
    const isAvailable = burger && burger.status === "available";
    const TransitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 1000, exit: 1000 },
    };
    if (!burger) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...TransitionOptions}>
          <li className="unavailable" key={key}>
            Извините, {burger ? burger.name : "бургер"} временно недоступен
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...TransitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 1000, exit: 1000 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
          </span>
          шт. {burger.name}
          <span>{count * burger.price} $</span>
          <button
            onClick={() => this.props.deleteFronOrder(key)}
            className="cancelItem"
          >
            &times;
          </button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const burger = this.props.burgers[key];
      const count = this.props.order[key];
      const isAvailable = burger && burger.status === "available";
      if (isAvailable) {
        return prevTotal + burger.price * count;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2> Ваш заказ </h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        {total > 0 ? (
          <Shipment total={total} />
        ) : (
          <div className="nothing Selected">
            Выберите блюдо и добавьте к заказу
          </div>
        )}
      </div>
    );
  }
}

export default Order;
