import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CartPopup.css';
import { removeItemFromCart } from "../../../AC/cart";
import { Button, Image, List, Icon } from 'semantic-ui-react';

class CartPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};


	getItemList() {
		const { cartItems, removeItemFromCart } = this.props;
		return cartItems.map((item) =>
			<List.Item key={item.id}>
				<Image src={item.image} width={110} height={110} />
				<List.Content>
					<h5>{item.name}</h5>
					<List.Description>
						{item.price}<Icon name='ruble sign' />
					</List.Description>
					<List.Description>
						{item.count} шт
						</List.Description>
					<br />
					<Button color='red' onClick={() => removeItemFromCart(item.id)}>Удалить</Button>
				</List.Content>
			</List.Item>
		);
	};


	render() {
		const { countCartItems } = this.props;

		if (countCartItems !== 0) {
			return (
				<div className='cartPopup'>
					<h4>Всего товаров в корзине: {countCartItems} шт </h4>
					<List divided verticalAlign='middle'>
						{this.getItemList()}
					</List>
				</div>
			)
		} else {
			return (
				<div className='cartPopup'>
					<h4>Корзина ещё пуста</h4>
				</div>
			)
		}
	};
};

export default connect((state) => {
	return {
		countCartItems: state.cart.items.length,
		cartItems: state.cart.items,
	}
}, { removeItemFromCart })(CartPopup);