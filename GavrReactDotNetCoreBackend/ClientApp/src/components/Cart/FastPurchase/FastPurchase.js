import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openOrderInModal, getItemsFromLocalStorage } from '../../../AC/cart';
import { sendOrder } from '../../../AC/orderActions';
import './FastPurchase.css';
import { Button, Header, Segment, Modal, Form, Message, Icon } from 'semantic-ui-react';
import CartItem from "../CartItem/CartItem";
import MaskedInputPhone from "../../MaskedInput/MaskedInputPhone";
import axios from 'axios';

//todo: add additional info from textArea to the order
class FastPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = { isNameError: false, name: '', phone: '', isValid: true };
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
    if (event.target.value.length <= 1) {
      this.setState({ isNameError: true })
    } else {
      this.setState({ isNameError: false })
    }
  }

  // take data from child component
  updateData = (value) => {
    this.setState({ phone: value })
  }

  handleClose = () => {
    const { openOrderInModal } = this.props;
    return openOrderInModal(false);
  }

  handleConfirmOrder = () => {
    const { name, phone } = this.state;
    const { cartItems, sendOrder, history, getItemsFromLocalStorage } = this.props;
    if (name.length > 1 && phone.length === 11) {
      this.setState({ isValid: true });
      sendOrder({ name, phone, cartItems })
      // .then((data)=>{
      // }) 
      // .catch(e=>console.log(e))
      this.handleClose();
      localStorage.removeItem('cart_items');
      getItemsFromLocalStorage();
      history.push('/shop');

      // send telegram notification
      const telegramApi = 'https://ghostly-goblin-34386.herokuapp.com/telega';
      axios.post(telegramApi, { "text": `${this.state.name}(${this.state.phone}) сделал заказ на сумму: ${this.props.totalPrice} рубля.` });
    } else {
      this.setState({ isValid: false })
    }
  }

  getItemList() {
    const { cartItems } = this.props;
    return cartItems.map((item) => <CartItem key={item.id} {...item} />);
  };

  render() {
    const { isOpen, totalPrice, countItems } = this.props;
    return (
      <Modal open={isOpen} closeOnDimmerClick={true}>
        <Modal.Header>Заказ в один клик</Modal.Header>

        <Modal.Content>
          <Segment vertical>
            <h4>
              Укажите ваше имя и номер телефона, по которому менеджер нашего
              магазина свяжется с вами для уточнения деталей заказа
            </h4>
            <Form>
              <Form.Group widths="equal">
                <Form.Input fluid label="Имя" placeholder="Ваше имя" error={this.state.isNameError} onChange={this.handleNameChange} />
                <Form.Field>
                  <MaskedInputPhone label='Телефон' placeholder='Ваш телефон' updateData={this.updateData} />
                </Form.Field>
              </Form.Group>
              <Form.TextArea label='Пожелания' placeholder='Не обязательно для заполнения. Сдесь вы можете указать дополнительную информацию, которую считаете необходимой.' />
            </Form>
          </Segment>

          <Header>Ваш заказ</Header>
          {this.getItemList()}

          <h4>Всего товаров в заказе: {countItems} шт </h4>
          <h4>Сумма к оплате: {totalPrice} руб. </h4>

          <Message icon negative hidden={this.state.isValid}>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Ваше имя или телефон введены не верно</Message.Header>
              Проверьте, пожалуйста, правильность введенных вами данных.
              </Message.Content>
          </Message>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={this.handleClose} negative>
            Отмена
          </Button>
          <Button onClick={this.handleConfirmOrder} positive labelPosition="right" icon="checkmark" content="Подтвердить заказ" />
        </Modal.Actions>
      </Modal>
    );
  };
};

export default connect((state) => {
  return {
    isOpen: state.cart.isOpenInModal,
    cartItems: state.cart.items,
    totalPrice: state.cart.items.reduce((total, item) => total + (item.price * item.count), 0),
    countItems: state.cart.items.length,
  }
}, { openOrderInModal, sendOrder, getItemsFromLocalStorage })(withRouter(FastPurchase));