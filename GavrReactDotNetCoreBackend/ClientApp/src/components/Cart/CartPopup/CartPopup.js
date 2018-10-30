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
				<List.Item>
					<Image src= {item.image} width={110} height={110} />
					<List.Content>
						<h5>{item.name}</h5>							
						<List.Description>
							{item.price}<Icon name='ruble sign' />					
						</List.Description>		
						<List.Description>
							{item.count} шт
						</List.Description>
						<br />
						<Button color='red' onClick={()=>removeItemFromCart(item.id)}>Удалить</Button>
					</List.Content>					
				</List.Item>
		);
	};


	render() {
		const { countCartItems } = this.props;
		return (
			<div className='cartPopup'>
				<h4>Всего товаров в корзине: {countCartItems} шт </h4>
				<List divided verticalAlign='middle'>
					{ this.getItemList() }
				</List>
			</div>
		)
	};
};

export default connect((state) => {
	return {
		countCartItems: state.cart.items.length,
		cartItems: state.cart.items,
	}
}, { removeItemFromCart })(CartPopup);