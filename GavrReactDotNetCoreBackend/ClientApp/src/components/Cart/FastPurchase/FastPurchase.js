import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openOrderInModal } from '../../../AC/cart';
import './FastPurchase.css';
import { Button, Header, Segment, Modal } from 'semantic-ui-react';
import CartItem from "../CartItem/CartItem";
import axios from 'axios';

class FastPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleClose = () => {
    const { openOrderInModal } = this.props;
    return openOrderInModal(false);
  }

  handleConfirmOrder = () => {
    const telegramApi = 'https://ghostly-goblin-34386.herokuapp.com/telega';
    axios.post(telegramApi, { "text": `Заказ на сумму: ${this.props.totalPrice} рублей.` });
  }

  getItemList() {
		const { cartItems } = this.props;
		return cartItems.map((item) => <CartItem key={item.id} {...item} /> );
	};

  render() {
    const { isOpen, totalPrice, countItems } = this.props;
    return (
      <Modal open={isOpen} closeOnDimmerClick={true}>
        <Modal.Header>Заказ в один клик</Modal.Header>


        <Modal.Content >
          <Header>Ваш заказ</Header>
            {this.getItemList()}
          <Segment vertical>
            <h4>Всего товаров в корзине: {countItems} шт </h4>
            <h4>Сумма к оплате: {totalPrice} руб. </h4>
          </Segment>
        </Modal.Content>


        <Modal.Actions>
          <Button onClick={this.handleClose} negative>
            Отмена
          </Button>
          <Button onClick={this.handleConfirmOrder} positive labelPosition='right' icon='checkmark'
            content='Подтвердить заказ'
          />
        </Modal.Actions>
      </Modal>
    )
  };
};

export default connect((state) => {
  return {
    isOpen: state.cart.isOpenInModal,
    cartItems: state.cart.items,
    totalPrice: state.cart.items.reduce((total, item) => total + (item.price * item.count), 0),
		countItems: state.cart.items.length,
  }
}, {openOrderInModal})(FastPurchase);