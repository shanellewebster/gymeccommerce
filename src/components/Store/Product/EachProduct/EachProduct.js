import React, { Component } from "react";
import "./EachProduct.css";
import axios from "axios";
import { Link } from "react-router-dom";

class EachProduct extends Component {
  constructor() {
    super();
    this.state = {
      item: [],
      quantity: 1
    };
  }

  componentDidMount() {
    axios.get(`/api/inventory/${this.props.match.params.id}`).then(res => {
      this.setState({ item: res.data[0] });
    });
  }

  add() {
    let { quantity } = this.state;
    ++quantity;
    this.setState({ quantity: quantity });
  }

  subtract() {
    let { quantity } = this.state;
    --quantity;
    this.setState({ quantity: quantity });
  }

  addCart = () => {};

  render() {
    let { quantity } = this.state;
    let { imageurl, name, price, description } = this.state.item;

    return (
      <div className="productpage">
        <img className="bigproductimg" src={imageurl} />
        <div className="eachproduct_discriptor">
          <div className="eachproduct_title">{name}</div>
          <div className="eachproduct_price">{price}</div>
          <div>{description}</div>
          <div>
            Quantity:
            <button onClick={() => this.add()}>+</button>
            {quantity}
            <button
              onClick={() => this.subtract()}
              disabled={quantity < 2 ? true : false}
            >
              -
            </button>
          </div>
          <Link to={`/cart`}>
            <button className="addtocart">Add To Cart</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default EachProduct;
