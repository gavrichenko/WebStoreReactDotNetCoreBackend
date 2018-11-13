import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button, Icon, Grid, Confirm, Modal } from 'semantic-ui-react';
import { removeProduct, getFlowers } from "../../../AC/index";


class ItemAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			isZoomImageModalActive: false,
			isRemoveConfirmWindowOpen: false,
		 };
	};

	handleZoomImageOpen = () => this.setState({ isZoomImageModalActive: true })
	handleZoomImageClose = () => this.setState({ isZoomImageModalActive: false })

	getModalWithImage() {
		const { isZoomImageModalActive } = this.state;
		return (
			<Modal
				open={isZoomImageModalActive}
				onClick={this.handleZoomImageClose}
				size='small'
				closeIcon
			>
				<Image src={this.props.image} fluid />
			</Modal>
		)
	}

	handleRemoveItem = () => {
		const { removeProduct, id, getFlowers } = this.props;
		removeProduct(id)
			.then(() => getFlowers())
	}

	handleCloseRemoveConfirmWindow = () => this.setState({ isRemoveConfirmWindowOpen: false })
	handleOpenRemoveConfirmWindow = () => this.setState({ isRemoveConfirmWindowOpen: true })

	getRemoveConfirmWindow() {
		const {name} = this.props;
		return (
			<Confirm
				header={`Вы собираетесь безвозвратно удалить "${name}"`}
				content='Вы уверены?'
				open={this.state.isRemoveConfirmWindowOpen}
				onCancel={this.handleCloseRemoveConfirmWindow}
				onConfirm={this.handleRemoveItem}
				confirmButton='Удалить'
				cancelButton='Отмена'
				size='tiny'
			/>
		)
	}

	render() {
		const { id, name, price, image, description, count, rating } = this.props;

		return (
			<div className='cartItem'>
				{this.getModalWithImage()}
				{this.getRemoveConfirmWindow()}

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
									</Grid.Column>
									<Grid.Column width={3}>
										<div className="cart-buttons">
											<Button floated="right" icon onClick={this.handleOpenRemoveConfirmWindow} negative>
												<Icon name="trash" />
											</Button>
											<Button floated="right" icon onClick={this.handleEditItem} color="purple">
												<Icon name="pencil" />
											</Button>
										</div>
									</Grid.Column>
								</Grid.Row>
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

	}
}, { getFlowers, removeProduct })(ItemAdmin);