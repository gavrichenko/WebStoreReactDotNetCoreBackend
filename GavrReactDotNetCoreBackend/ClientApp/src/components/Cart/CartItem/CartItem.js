﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button, Icon, Grid, Input, Modal } from 'semantic-ui-react';
import { addItemToCart, removeItemFromCart } from "../../../AC/cart";
import './CartItem.css';


class CartItem extends Component {
	constructor(props) {
		super(props);
		this.state = { isExpanded: false, isZoomImageModalActive: false, };
	};

	toggleCardHeight = () => {
		this.setState({ isExpanded: !this.state.isExpanded });
	};

	removeItem = () => {
		const { id, removeItemFromCart } = this.props;
		removeItemFromCart(id);
	};

	dereaseItemQuantity = () => {
		const { id, count, removeItemFromCart } = this.props;
		if (count >= 2) {
			removeItemFromCart(id);
		}
		
	};

	increaseItemQuantity = () => {
		const { addItemToCart, id, name, price, image, description, count, rating } = this.props;
		const flowerObj = { id, name, price, image, description, count, rating };
		addItemToCart(flowerObj);
	};

	handleZoomImageOpen = () => this.setState({isZoomImageModalActive: true})
	handleZoomImageClose = () => this.setState({isZoomImageModalActive: false})
  
	getModalWithImage() {
	  const { isZoomImageModalActive } = this.state;
	  return (
		<Modal
		  open={isZoomImageModalActive}
		  onClick={this.handleZoomImageClose}
		  size='small'
		  closeIcon
		>
		  <Image src={this.props.image} fluid/>
		</Modal>
	  )
	}

	render() {
		const { id, name, price, image, description, count, rating, isOpenInOrderCard } = this.props;

		return (
			<div className='cartItem'>
				{this.getModalWithImage()}
				<Card.Group itemsPerRow='one'>
					<Card>
						<Card.Content>
							<Grid doubling>
								<Grid.Row centered >
									<Grid.Column width={4} textAlign="center">
										<Image floated='left' size='small' src={image} onClick={this.handleZoomImageOpen} className='cartItem__image' />
									</Grid.Column>
									<Grid.Column width={9}>
										<Card.Header>{name}</Card.Header>
										<Card.Meta>Описание: {description}</Card.Meta>
										<Card.Content>Цена: {price} руб.</Card.Content>
										<Card.Content>Количество: {count} шт.</Card.Content>										
										<Card.Content><b>Итого: {price * count} руб.</b></Card.Content>										
									</Grid.Column>
								   
									<Grid.Column  width={3}>
										{isOpenInOrderCard ? null : (   
											<div className="cart-buttons">
												<Button  floated="right" icon className="cart-delete" onClick={this.removeItem}>
													<Icon name="trash" />
												</Button>
												<Button floated="right" icon onClick={this.toggleCardHeight} color="purple">
													<Icon name="pencil" />
												</Button>							
											</div>
										)}
									</Grid.Column>
									
								</Grid.Row>

								{this.state.isExpanded ? (
									<Grid.Row>

										<p className="cart-quantity-label">&nbsp;Количество:</p>

										<Button icon onClick={this.dereaseItemQuantity} className="cart-button">
											<Icon name="minus" />
										</Button>
										<Input value={count} readOnly className="cart-quantity-input" />
										<Button icon onClick={this.increaseItemQuantity} className="cart-button">
											<Icon name="plus" />
										</Button>

									</Grid.Row>
								) : null}


							</Grid>
						</Card.Content>
					</Card>

				</Card.Group>
			</div>
		)
	};
};

export default connect((state) => {
	return {
		isOpenInOrderCard: state.order.isOrderCardOpen,
	}
}, { addItemToCart, removeItemFromCart })(CartItem);