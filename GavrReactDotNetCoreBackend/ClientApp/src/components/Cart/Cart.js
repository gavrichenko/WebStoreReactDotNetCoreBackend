import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cart.css';
import { Card, Image, Button, Icon, Grid, Input } from 'semantic-ui-react'
import CartItem from "./CartItem/CartItem";


class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};


	render() {

		return (
			<div className='cartWrapper'>
				<Grid doubling stackable>
					<Grid.Column width={9}>
						<CartItem />
						<CartItem />
						<CartItem />
						<CartItem />
						<CartItem />
					</Grid.Column>
					<Grid.Column width={7}>
						<h1>Общая информация о заказе</h1>
					</Grid.Column>
				</Grid>
			</div>
		)
	};
};

export default connect((state) => {
	return {
		
	}
}, {})(Cart);