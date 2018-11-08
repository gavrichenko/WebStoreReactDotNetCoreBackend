import React, { Component } from 'react';
import { connect } from 'react-redux';
import { redirectFromLoginToCart } from '../../../AC/redirectActions';
import { openOrderInModal } from '../../../AC/cart';
import './OrderInfo.css';
import { Container, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class OrderInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	handleLogin = () => {
		this.props.redirectFromLoginToCart(true);
	};

	handleFastPurchase = () => {
		const { openOrderInModal } = this.props;
		openOrderInModal(true);
	};

	getLoginButton() {
		const isAuthCookieExist = localStorage.getItem('user') !== null ? true : false;
		if (isAuthCookieExist) {
			return true;
		} 
		return (
			<Segment className='orderIndo__login'  vertical>
					Уже покупали у нас?
					<Link to="/login">
						<Button basic color='blue' onClick={this.handleLogin}>Войти</Button>	
					</Link> 	
			</Segment>
		);
	};

	getOrderButton() {
		if(this.props.countItems != 0){
			return (
				<Segment vertical>
					<Button primary onClick={this.handleFastPurchase}>Заказать в один клик</Button>
				</Segment>
			);
		}
	};

	render() {
		const { totalPrice, countItems } = this.props;
		return (
			<Container>
				{this.getLoginButton()}
				<h1>Ваш заказ</h1>
				<Segment vertical>
					<h4>Всего товаров в корзине: {countItems} шт </h4>
					<h4>Сумма к оплате: {totalPrice} руб. </h4>
				</Segment>				
				{this.getOrderButton()}
			</Container>
		)
	};
};

export default connect((state) => {
	return {
		totalPrice: state.cart.items.reduce((total, item) => total + (item.price * item.count), 0),
		countItems: state.cart.items.length,
	}
}, {openOrderInModal, redirectFromLoginToCart})(OrderInfo);