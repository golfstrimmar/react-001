import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";

class App extends React.Component {
  state = {
    burgers: {},
    order: {},
  };

  addBurger = (burger) => {
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2.ДОБавить новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] = burger;
    // 3. записать новый бургер в объект state
    this.setState({ burgers: burgers });
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
        <Order />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSampleBurgers={this.loadSampleBurgers}
        />
      </div>
    );
  }
}

export default App;
