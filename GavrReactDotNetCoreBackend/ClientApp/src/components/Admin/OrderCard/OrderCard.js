import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Modal, Header } from 'semantic-ui-react';
import { isOrderCartOpen } from "../../../AC/orderActions";
import CartItem from "../../Cart/CartItem/CartItem";


class OrderCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
		};
	};

	componentDidMount() {

	};

	handleClose = () => this.props.isOrderCartOpen(false);

	getItemList() {
		const { order, isOpen } = this.props;
		if (isOpen){
			return  order.items.map(item=> <CartItem key={item.id} count={item.quantity} {...item.product} /> )
		}
	};

	render() {
		const {isOpen, order} = this.props;			
		if (isOpen){
			var totalPrice = order.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
		}
		return (
			<div className='orderCard'>
				<Modal open={isOpen} closeOnDimmerClick={true}>
					<Modal.Header>Заказ #{order.id}</Modal.Header>

					<Modal.Content>				
						<Header>Содержимое заказа</Header>
						{this.getItemList()}

						<h4>Дата заказа: {moment(order.purchaseDate).format('DD/MM/YY HH:mm')}  </h4>
						<h4>Сумма к оплате: {totalPrice} руб. </h4>

					</Modal.Content>

					<Modal.Actions>
						<Button onClick={this.handleClose} positive labelPosition="right" icon="checkmark" content="Закрыть" />
					</Modal.Actions>
				</Modal>		
			</div>		
		)	
	};
};

export default connect((state) => {
	return {
		isOpen: state.order.isOrderCardOpen,
		order: state.order.orderDetails,
	}	
}, { isOrderCartOpen })(OrderCard);