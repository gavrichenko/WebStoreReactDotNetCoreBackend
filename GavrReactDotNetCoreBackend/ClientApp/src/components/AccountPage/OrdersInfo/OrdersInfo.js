import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getOrdersListByUser, getOrderDetails, isOrderCartOpen } from "../../../AC/orderActions";
import { Loader, Table } from 'semantic-ui-react';
// import UserSearch from "../UserSearch/UserSearch";
import OrderCard from "../../Admin/OrderCard/OrderCard";


class OrdersInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
		};
	};

	componentDidMount() {
		const { getOrdersListByUser, username } = this.props;
		this.setState({ isLoaded: true });

		getOrdersListByUser(username)
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
		const {orders} = this.props;			
		const { isLoaded } = this.state;
		const preparedOrders = orders === null ? 'loading_orders': orders;
		return (
			<div className='ordersList'>

				<Loader active={isLoaded} size='big' />
				<OrderCard />
			{!this.props.orders.length ? (
				<h1>Вы ещё не сделали ни одного заказа.</h1>
			) : (
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
						{_.map(preparedOrders, ({id, customer, phone, purchaseDate, items }) => (
							<Table.Row key={id} onClick={() => this.handleRowClick(id)}>
								<Table.Cell>{id}</Table.Cell>
								<Table.Cell>{customer}</Table.Cell>
								<Table.Cell>{phone}</Table.Cell>
								<Table.Cell>{moment(purchaseDate).format('DD/MM/YY HH:mm')}</Table.Cell>
								<Table.Cell>{items.reduce((total, item) =>
 									total + (item.quantity * item.product.price), 0)}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				)}
			</div>		
		)	
	};
};

export default connect((state) => {
	return {
		orders: state.order.userOrders,
		username: state.userInfo.email,
	}	
}, { getOrdersListByUser, getOrderDetails, isOrderCartOpen })(OrdersInfo);