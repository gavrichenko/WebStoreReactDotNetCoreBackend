import React, { Component } from 'react';
import './AdminPage.css'
import UsersList from "../UsersList/UsersList";
import OrdersList from "../OrdersList/OrdersList";
import FlowerCardAdmin from "../FlowerCardAdmin/FlowerCardAdmin";
import ItemListAdmin from "../ItemList/ItemListAdmin";
import { Menu } from 'semantic-ui-react'

class AdminPage extends Component {
	constructor(props) {
		super(props);
		this.state = { activeItem: '' }
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	getContent() {
		const { activeItem } = this.state
		switch (activeItem) {
			case 'usersInfo':
				return <UsersList />
			case 'productsInfo':
				return (
					<div>
						<h1>Компонент 'Информация о продуктах'</h1>
						<ItemListAdmin />
					</div>				
				);
			case 'addProduct':
				return (
					<div>
						<h1>Добавление нового товара</h1>
						<FlowerCardAdmin />
					</div>
				);
			case 'orders':
				return <OrdersList />
			default:
		}
	};

	render() {
		const { activeItem } = this.state
		return (
			<div className='accountContainer'>
				<Menu pointing secondary vertical>
					<Menu.Item
						content='Данные о пользователях'
						name='usersInfo'
						active={activeItem === 'usersInfo'}
						onClick={this.handleItemClick} />
					<Menu.Item
						content='Данные о товарах'
						name='productsInfo'
						active={activeItem === 'productsInfo'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						content='Добавить товар'
						name='addProduct'
						active={activeItem === 'addProduct'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						content='Заказы'
						name='orders'
						active={activeItem === 'orders'}
						onClick={this.handleItemClick}
					/>
				</Menu>
				<div className='admin__infoContainer'>
					{this.getContent()}
				</div>
			</div>
		)
	};


}

export default AdminPage