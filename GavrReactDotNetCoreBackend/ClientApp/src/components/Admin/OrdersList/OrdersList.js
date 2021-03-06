﻿import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { getOrderListWithPrice, getOrderDetails, isOrderCartOpen } from "../../../AC/orderActions";
import UserSearch from "../UserSearch/UserSearch";
import OrderCard from "../OrderCard/OrderCard";
import { Button, Loader, Table } from 'semantic-ui-react';

import { withRouter } from "react-router-dom";
import './OrdersList.css';


class OrdersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
		};
	};

	componentDidMount() {
		const { getOrderListWithPrice } = this.props;
		this.setState({ isLoaded: true });

		getOrderListWithPrice()
		.then(() => {
			this.setState({isLoaded: false});
		});
	};

	handleRowClick(orderId) {
		const { getOrderDetails, isOrderCartOpen } = this.props;
		this.setState({ isLoaded: true });
		getOrderDetails(orderId)
			.then(() => this.setState({ isLoaded: false }))	
			.then(()=> isOrderCartOpen(true))
	}

	render() {
		const {orders, totalPrice} = this.props;			
		const { isLoaded } = this.state;
		const preparedOrders = orders === null ? 'loading_orders': orders;
		return (
			<div className='ordersList'>

				<Loader active={isLoaded} size='big' />
				<OrderCard />
				<UserSearch />
				<h4>Всего заказов: {orders.length} шт.</h4>  
				<h4>Общая сумма заказов: {totalPrice} руб.</h4>  
				<Table sortable celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								#
							</Table.HeaderCell>
							<Table.HeaderCell>
								Имя
							</Table.HeaderCell>
							<Table.HeaderCell>
								Телефон
							</Table.HeaderCell>
							<Table.HeaderCell>
								Дата заказа
							</Table.HeaderCell>
							<Table.HeaderCell>
								Сумма заказа
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body >
						{_.map(preparedOrders, ({id, customer, phone, purchaseDate, totalPrice }) => (
							<Table.Row key={id} onClick={() => this.handleRowClick(id)}>
								<Table.Cell>{id}</Table.Cell>
								<Table.Cell>{customer}</Table.Cell>
								<Table.Cell>{phone}</Table.Cell>
								<Table.Cell>{moment(purchaseDate).format('DD/MM/YY HH:mm')}</Table.Cell>
								<Table.Cell>{totalPrice}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>		
		)	
	};
};

export default connect((state) => {
	return {
		orders: state.order.adminOrdersList,
		totalPrice: state.order.adminOrdersTotalPrice,
	}	
}, { getOrderListWithPrice, getOrderDetails, isOrderCartOpen })(withRouter(OrdersList));