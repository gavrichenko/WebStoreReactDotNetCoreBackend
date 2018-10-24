import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchUser, toggleUserCard } from "../../../AC/userActions";
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import AccountPage from "../../AccountPage/AccountPage";

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
		const { isOpen, userEmail } = this.props;

		return (
			<Modal open={isOpen} >
				<Modal.Header>Карточка {userEmail}</Modal.Header>
				<Modal.Content image scrolling>
					<AccountPage />
				</Modal.Content>
				<Modal.Actions>
					<Button primary onClick={this.handleClose}>
						Закрыть <Icon name='chevron right' />
					</Button>
				</Modal.Actions>
			</Modal>
		);
	};
};

export default connect((state) => {
		return {
			isOpen: state.admin.isOpenUserCard,
			userEmail: state.admin.userCardEmail,
		}
	},
	{ searchUser, toggleUserCard })(UserCardAdmin);
