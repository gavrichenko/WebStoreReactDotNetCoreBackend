import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cart.css';
import { removeItemFromCart } from "../../AC/cart";
import { Grid } from 'semantic-ui-react';
import CartItem from "./CartItem/CartItem";
import OrderInfo from "./OrderInfo/OrderInfo";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	getItemList() {
		const { cartItems, removeItemFromCart } = this.props;
		return cartItems.map((item) => <CartItem {...item} /> );
	};

	render() {

		return (
			<div className='cartWrapper'>
				<h1>Корзина</h1>
				<Grid doubling stackable>
					<Grid.Column width={9}>

					{this.getItemList()}

					</Grid.Column>
					<Grid.Column width={7}>
						<OrderInfo />
					</Grid.Column>
				</Grid>
			</div>
		)
	};
};

export default connect((state) => {
	return {
		countCartItems: state.cart.items.length,
		cartItems: state.cart.items,
	}
}, { removeItemFromCart })(Cart);