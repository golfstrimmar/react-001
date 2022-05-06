import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from "../base";

class App extends React.Component {
  state = {
    burgers: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.restaurantId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: "burgers",
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addBurger = (burger) => {
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2.ДОБавить новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] = burger;
    // 3. записать новый бургер в объект state
    this.setState({ burgers: burgers });
  };

  updateBurger = (key, updatedBurger) =>{
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2.Обновляем нужный бургер
    burgers[key] = updatedBurger;
    // 3. записать новый бургер в объект state
    this.setState({ burgers });
  };

  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers });
  };

  addToOrder = (key) => {
    //1. Делаем копию объекта state
    const order = { ...this.state.order };
    //2.если ключ есть то добавится к ключу 1 ---если нет, то ключ будет 1
    order[key] = order[key] + 1 || 1;
    //3. Записать наш новый объект order в объект state
    this.setState({ order: order });
  };

  render() {
    return (
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Very Hot Burger" amount={10} hot={true} />
          <ul className="burgers">
            {Object.keys(this.state.burgers).map((key) => {
              return (
                <Burger
                  key={key}
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.burgers[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order burgers={this.state.burgers} order={this.state.order} />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSampleBurgers={this.loadSampleBurgers}
          burgers={this.state.burgers}
          updateBurger = {this.updateBurger}
        />
      </div>
    );
  }
}

export default App;
