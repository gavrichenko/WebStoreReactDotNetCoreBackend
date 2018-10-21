import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from "../../../AC/userActions";
import { getUserRole } from "../../../AC/rolesActions";
import { Button, Icon, Input, Message } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import './UserInfo.css'


class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = { editMode: false };
	};

	componentDidMount() { };

	handleItemClick = (e, { name }) => this.setState({ editMode: !this.state.editMode });
	handleChange = (e, { name }) => {

	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	getEditMode() {
		return(
				<div className='userDataContainer'>
					<Input  value='Илья' placeholder='Имя' label={{ icon: 'asterisk' }} labelPosition='left corner' />
					<Input disabled  defaultValue='Гавриченко' placeholder='Фамилия' />
					<Input  placeholder='E-mail' label={{ icon: 'asterisk' }} labelPosition='left corner' />
				 
					<Input placeholder='Телефон' iconPosition='left'>
						<Icon name='phone' />
						<input />
					</Input>

					<Input value='Ярославль' placeholder='Город' iconPosition='left'>

						<Icon name='home' />
						<input />
					</Input>

					<Button type='submit'>Submit</Button>
				</div>
			);
	};

	getReadMode() {
		return (
			<div>
				<h1>Read Mode</h1>
				<Message header='Имя'content='Илья'/>
				<Message header='Фамилия'content='Гавриченко'/>


				<Button onClick={this.handleItemClick} >Edit</Button>
			</div>
		);
	};

	render() {
		const { editMode } = this.state;

		return (

			<div>
				{!editMode ? (
					 this.getEditMode()
				) : (
					this.getReadMode()
					)}
			</div>
		)	
	};
};

export default connect((state) => {
	return {
		firstName: state.userInfo.firstName,
		lastName: state.userInfo.lastName,
		roles: state.userInfo.roles,
	}
}, { getUserInfo, getUserRole })(withRouter(UserInfo));