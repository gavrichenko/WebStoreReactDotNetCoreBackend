import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchUser } from "../../../AC/userActions";
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

class UserSearch extends Component {



	render() {

	
		return (
			<Modal trigger={<Button>Scrolling Content Modal</Button>}>
				<Modal.Header>Profile Picture</Modal.Header>
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
					<Button primary>
						Proceed <Icon name='chevron right' />
					</Button>
				</Modal.Actions>
			</Modal>
		);
	};
};

export default connect((state) => {
		return {
			users: state.admin.users.map((res) => {
				return { title: res.email, description: `${res.firstName} ${res.lastName}`, original: res };
			})
		}
	},
	{ searchUser })(UserSearch);
