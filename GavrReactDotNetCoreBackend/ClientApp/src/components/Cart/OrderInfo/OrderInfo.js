import React, { Component } from 'react';
import { connect } from 'react-redux';
import { redirectFromLoginToCart } from '../../../AC/redirectActions';
import './OrderInfo.css';
import { Container, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class OrderInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	componentDidMount(){
		
	}

	handleClick = () => {
		this.props.redirectFromLoginToCart(true);
		// const telegramApi = 'https://ghostly-goblin-34386.herokuapp.com/telega';
		// axios.post(telegramApi, { "text": `Заказ на сумму: ${this.props.totalPrice} рублей.` });
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
						<Button basic color='blue' onClick={this.handleClick}>Войти</Button>	
					</Link> 	
			</Segment>
		);
	};

	getOrderButton() {
		if(this.props.countItems != 0){
			return (
				<Segment vertical>
					<Button primary onClick={this.handleClick}>Заказать в один клик</Button>
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
}, {redirectFromLoginToCart})(OrderInfo);