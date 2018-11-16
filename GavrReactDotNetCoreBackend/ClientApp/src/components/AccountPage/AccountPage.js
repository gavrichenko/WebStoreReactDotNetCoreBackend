import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserInfo from "./UserInfo/UserInfo";
import OrdersInfo from "./OrdersInfo/OrdersInfo";
import { withRouter } from "react-router-dom";
import './AccountPage.css'


class AccountPage extends Component {
	constructor(props) {
		super(props);
		this.state = { activeItem: 'userInfo' }
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	getContent() {
		const { activeItem } = this.state
		switch (activeItem) {
		case 'userInfo':
			return <UserInfo />;
		case 'resetPassword':
			return (
				<h1>Компонент 'Смена пароля'</h1>
			);
		case 'ordersInfo':
			return <OrdersInfo />;
		default:
		}
	};

	render() {
		const { activeItem } = this.state
		return (
			<div className='accountContainer'>			
				<Menu pointing secondary vertical>
					<Menu.Item
						content='Данные о пользователе'
						name='userInfo'
						active={activeItem === 'userInfo'}
						onClick={this.handleItemClick} />
					<Menu.Item
						content='Смена пароля'
						name='resetPassword'
						active={activeItem === 'resetPassword'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						content='Информация о заказах'
						name='ordersInfo'
						active={activeItem === 'ordersInfo'}
						onClick={this.handleItemClick}
					/>
				</Menu>	
				<div className='infoContainer'>
					{this.getContent()}	
				</div>		
			</div>
		)	
	};
};

export default withRouter(AccountPage);