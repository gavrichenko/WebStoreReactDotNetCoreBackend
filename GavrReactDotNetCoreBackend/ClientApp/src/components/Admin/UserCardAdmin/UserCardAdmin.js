import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchUser, toggleUserCard } from "../../../AC/userActions";
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

class UserCardAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = { };
	};

	handleClose = () => {
		const { toggleUserCard } = this.props;
		toggleUserCard(false);
	}

	render() {
		const { isOpen } = this.props;

		return (
			<Modal open={isOpen} >
				<Modal.Header>Данные пользователя $email}</Modal.Header>
				<Modal.Content image scrolling>
					<Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />

					<Modal.Description>
						<Header>Modal Header</Header>
						<p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>

						{_.times(8, i => (
							<Image key={i} src='https://react.semantic-ui.com/images/wireframe/paragraph.png' style={{ paddingBottom: 5 }} />
						))}
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button primary onClick={this.handleClose}>
						Proceed <Icon name='chevron right' />
					</Button>
				</Modal.Actions>
			</Modal>
		);
	};
};

export default connect((state) => {
		return {
			isOpen: state.admin.isOpenUserCard,
		}
	},
	{ searchUser, toggleUserCard })(UserCardAdmin);
