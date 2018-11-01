import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OrderInfo.css';
import { Container, Segment, Button } from 'semantic-ui-react';
import axios from 'axios';

class OrderInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	handleClick = () => {
		axios.post(`https://ghostly-goblin-34386.herokuapp.com/telega`, { "text": `Заказ на сумму: ${this.props.totalPrice} рублей.` });
	}

	render() {
		const { totalPrice, countItems } = this.props;
		return (
			<Container>
				<h1>Ваш заказ</h1>
				<Segment vertical>
					<h4>Всего товаров в корзине: {countItems} шт </h4>
					<h4>Сумма к оплате: {totalPrice} руб. </h4>
				</Segment>
				<Segment vertical>
					<Button primary onClick={this.handleClick}>Заказать</Button>
				</Segment>
			</Container>
		)
	};
};

export default connect((state) => {
	return {
		totalPrice: state.cart.items.reduce((total, item) => total + (item.price * item.count), 0),
		countItems: state.cart.items.length,
	}
}, {})(OrderInfo);