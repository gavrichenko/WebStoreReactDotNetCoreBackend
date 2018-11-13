import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Menu, Icon, Popup } from 'semantic-ui-react'
import UserMenu from "../UserMenu/UserMenu";
import CartPopup from "../Cart/CartPopup/CartPopup";
import './Header.css'


class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	isAuthenticated() {
		const isAuthCookieExist = localStorage.getItem('user') !== null ? true : false;
		if (isAuthCookieExist) {
			return true;
		}
		return false;
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.userId !== nextProps.userId) {
			return true;
		}
		if (this.props.totalPrice !== nextProps.totalPrice) {
			return true;
		}
		return false;
	}

	render() {
		const { activeItem } = this.state;
		const { totalPrice } = this.props;

		return (

			<header className="header" >
				<Menu stackable>

					<Link to="/" >
						<Menu.Item
							name='logo'
							onClick={this.handleItemClick}
						>
							<img src={require('../../static/ico/flowers.png')} />
							<span className="nameOfLogo"><p>lovely-house</p></span>
						</Menu.Item>
					</Link>

					<Link to="/promotion" >
						<Menu.Item
							name='promo'
							active={activeItem === 'promo'}
							onClick={this.handleItemClick}
						>
							Акции
            </Menu.Item>
					</Link>

					<Link to="/contacts" >
						<Menu.Item
							name='contacts'
							active={activeItem === 'contacts'}
							onClick={this.handleItemClick}
						>
							Контакты
            </Menu.Item>
					</Link>

					<Link to="/shop" >
						<Menu.Item className="header__link"
							name='shop'
							active={activeItem === 'shop'}
							onClick={this.handleItemClick}>
							Купить
            </Menu.Item>
					</Link>

					{/*right menu*/}
					<Menu.Menu position='right'>

						<Popup
							trigger={
								<Link to="/cart" >
									<Menu.Item
										icon='shop'
										name='Корзина'
										active={activeItem === 'Корзина'}
										onClick={this.handleItemClick}>
										<Icon link name='shopping cart' size="large" />
										<span>{totalPrice} руб</span>
									</Menu.Item>
								</Link>
							}
							content={<CartPopup />}
							hoverable
							flowing
						/>

						<div hidden={this.isAuthenticated()}  >
							<Link to="/login" >
								<Menu.Item icon='key'
									name='Войти'
									onClick={this.handleItemClick}
								/>
							</Link>
						</div>

						<div hidden={!this.isAuthenticated()}  >
							<Menu.Item
								name='userMenu'
								onClick={this.handleItemClick} >
								<UserMenu />
							</Menu.Item>
						</div>

					</Menu.Menu>

				</Menu>
			</header>
		)
	}
}

export default connect((state) => {
	return {
		totalPrice: state.cart.items.reduce((total, item) => total + (item.price * item.count), 0),
		userId: state.userInfo.email,
	}
})(Header)