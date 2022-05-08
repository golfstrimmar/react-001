import React from "react";
import propTypes from "prop-types";

class EditBurgerForm extends React.Component {
  static propTypes = {
    details: propTypes.shape({
      image: propTypes.string,
      name: propTypes.string,
      price: propTypes.number,
      desc: propTypes.string,
      status: propTypes.string,
    }),
    index: propTypes.string,
    updateBurger: propTypes.func,
    deliteBurger: propTypes.func,
  };

  handleChange = (event) => {
    const updatedBurger = {
      ...this.props.burger,
      [event.currentTarget.name]:
        event.currentTarget.name === "price"
          ? parseFloat(event.currentTarget.value) || 0
          : event.currentTarget.value,
    };

    this.props.updateBurger(this.props.index, updatedBurger);
  };

  render() {
    return (
      <div className="burger-edit">
        <input
          onChange={this.handleChange}
          name="name"
          type="text"
          value={this.props.burger.name}
        ></input>
        <input
          onChange={this.handleChange}
          name="price"
          type="text"
          value={this.props.burger.price}
        ></input>
        <select
          onChange={this.handleChange}
          name="status"
          className="status"
          value={this.props.burger.status}
        >
          <option value="available">Доступно!</option>
          <option value="unavailable">Не доступно!</option>
        </select>
        <textarea
          onChange={this.handleChange}
          name="desc"
          value={this.props.burger.desc}
        />
        <input
          onChange={this.handleChange}
          name="image"
          type="text"
          value={this.props.burger.image}
        ></input>
        <button onClick={() => this.props.deliteBurger(this.props.index)}>
          удалить из меню
        </button>
      </div>
    );
  }
}

export default EditBurgerForm;
