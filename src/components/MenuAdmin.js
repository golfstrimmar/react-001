import React from "react";
import propTypes from "prop-types";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";

class MenuAdmin extends React.Component {
  static propTypes = {
    burgers: propTypes.object,
    deliteBurger: propTypes.func,
    updateBurger: propTypes.func,
    loadSampleBurgers: propTypes.func,
  };

  render() {
    return (
      <div className="order-wrap">
        <h2>Управление меню</h2>
        {Object.keys(this.props.burgers).map((key) => {
          return (
            <EditBurgerForm
              key={key}
              index={key}
              burger={this.props.burgers[key]}
              updateBurger={this.props.updateBurger}
              deliteBurger={this.props.deliteBurger}
            />
          );
        })}
        <AddBurgerForm addBurger={this.props.addBurger} />
        <button onClick={this.props.loadSampleBurgers}>
          Загрузить бургеры
        </button>
      </div>
    );
  }
}

export default MenuAdmin;
