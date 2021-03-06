﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cart.css';
import { removeItemFromCart } from "../../AC/cart";
import { Grid, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CartItem from "./CartItem/CartItem";
import OrderInfo from "./OrderInfo/OrderInfo";
import FastPurchase from "./FastPurchase/FastPurchase";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	getItemList() {
		const { cartItems } = this.props;
		if (cartItems.length === 0) {
			return (
				<Message success size='huge'>
					<Message.Header>В это сложно поверить, но ваша корзина пуста</Message.Header>
					<Message.Content>Воспользуйтесь нашим
						<Link to="/shop"> каталогом</Link>  	
					, чтобы наполнить её.</Message.Content>		
				</Message>
			);
		}
		return cartItems.map((item) => <CartItem key={item.id} {...item} /> );
	};

	render() {

		return (
			<div className='cartWrapper'>
				<h1>Корзина</h1>

				<FastPurchase />

				<Grid doubling stackable>
					<Grid.Column width={9}>

					<div className='orderList'>
						{this.getItemList()}
					</div>
					

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