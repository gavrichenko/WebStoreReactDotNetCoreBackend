import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button, Icon, Grid, Input } from 'semantic-ui-react'
import './CartItem.css'


class CartItem extends Component {
	constructor(props) {
		super(props);
		this.state = { isExpanded: false, };
	};


	toggleCardHeight = () => {
		this.setState({ isExpanded: !this.state.isExpanded });
	}



	render() {

		return (
			<div className='cartItem'>
				<Card.Group itemsPerRow='one'>
					<Card>

						<Card.Content>
							<Grid doubling>
								<Grid.Row centered >
									<Grid.Column width={4} textAlign="center">
										<Image floated='left' size='small' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
									</Grid.Column>
									<Grid.Column width={9}>
										<Card.Header>Matthew Harris</Card.Header>
										<Card.Meta>Co-Worker</Card.Meta>
										<Card.Meta>Co-Wosadrker</Card.Meta>
									</Grid.Column>
									<Grid.Column width={3}>
										<div className="cart-buttons">
											<Button floated="right" icon className="cart-delete" onClick={this.removeItem}>
												<Icon name="trash" />
											</Button>
											<Button floated="right" icon onClick={this.toggleCardHeight} color="purple">
												<Icon name="pencil" />
											</Button>							
										</div>
									</Grid.Column>
								</Grid.Row>

								{this.state.isExpanded ? (
									<Grid.Row>

										<p className="cart-quantity-label">&nbsp;Количество:</p>

										<Button icon onClick={this.reduceItemQuantity} className="cart-button">
											<Icon name="minus" />
										</Button>
										<Input value={this.state.quantity} readOnly className="cart-quantity-input" />
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
		firstNamedsfdsdsffdsdsf: state.userInfo.firstName,
	}
}, {})(CartItem);