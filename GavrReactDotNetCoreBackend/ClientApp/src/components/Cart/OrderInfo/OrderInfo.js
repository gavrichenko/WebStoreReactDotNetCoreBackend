import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OrderInfo.css';
import { Container, Segment, Button } from 'semantic-ui-react';



class OrderInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};


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
					<Button primary>Заказать</Button>
				</Segment>
			</Container>
		)
	};
};

export default connect((state) => {
	return {
		totalPrice: state.cart.items.reduce((total, item) => total + item.price, 0),
		countItems: state.cart.items.length,
	}
}, {})(OrderInfo);