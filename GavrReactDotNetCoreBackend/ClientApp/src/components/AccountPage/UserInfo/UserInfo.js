import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo, updateUserInfo } from "../../../AC/userActions";
import { Button, Loader, Input } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import './UserInfo.css'

class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			isDisabled: true,
		};
	};

	componentDidMount() {
		const username = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).username : null;
		if (username !== null) {
			const { getUserInfo } = this.props;
			this.setState({ isLoaded: true });
			getUserInfo(username)
				.then(() => this.setState({ isLoaded: false, username }));
		}
	};

	handleToggleDisabled = () => this.setState({ isDisabled: !this.state.isDisabled });

	handleChange = (e) => {
		const { name, value, defaultValue } = e.target;
		if (value !== defaultValue) {
			console.log(`${name} was changed`); // todo: add case when input have changes
		}
		this.setState({ [name]: value });
	};


	handleSubmit = () => {
		const { updateUserInfo, email } = this.props;
		const { firstName, lastName, birthday, city, gender, phone } = this.state;
		this.setState({ isLoaded: true });
		const objectToSend = { firstName, lastName, birthday, city, gender, phone };
		const mapKey = (obj) => {
			Object.keys(obj).forEach(key => {
				if (obj[key] === undefined) {
					obj[key] = this.props[key];
				}
			});
			return obj;
		};
		mapKey(objectToSend);
		updateUserInfo(email, objectToSend)
			.then(() => this.setState({ isDisabled: true, isLoaded: false }))
	};

	getReadModeButton() {
		return (
			<Button type='submit' onClick={this.handleToggleDisabled}>Редактировать </Button>
		);
	};

	getEditModeButton() {
		return (
			<div>
				<Button type='submit' onClick={this.handleSubmit}>Изменить </Button>
				<Button type='submit' onClick={this.handleToggleDisabled}>Отмена </Button>
			</div>
		);
	};

	render() {
		const { firstName, lastName, email, birthday, city, gender, phone } = this.props;
		const { isDisabled, isLoaded } = this.state;

		return (
			<div className='userDataContainer'>
				<Loader active={isLoaded} size='big' />
				<Input name='firstName' disabled={isDisabled} defaultValue={firstName} onChange={this.handleChange} placeholder='Имя' />
				<Input name='lastName' disabled={isDisabled} defaultValue={lastName} onChange={this.handleChange} placeholder='Фамилия' />
				<Input name='email' disabled={isDisabled} defaultValue={email} onChange={this.handleChange} placeholder='E-mail' icon='mail' iconPosition='left' />
				<Input name='birthday' disabled={isDisabled} defaultValue={birthday} onChange={this.handleChange} placeholder='День рождения' icon='birthday' iconPosition='left' />
				<Input name='phone' disabled={isDisabled} defaultValue={phone} onChange={this.handleChange} placeholder='Телефон' icon='phone' iconPosition='left' />
				<Input name='gender' disabled={isDisabled} defaultValue={gender} onChange={this.handleChange} placeholder='Пол' icon='man' iconPosition='left' />
				<Input name='city' disabled={isDisabled} defaultValue={city} onChange={this.handleChange} placeholder='Город' icon='home' iconPosition='left' />
				
				{!isDisabled ? (
					this.getEditModeButton()
				) : (
					this.getReadModeButton()
					)}
			</div>		
		)	
	};
};

export default connect((state) => {
	return {
		firstName: state.userInfo.firstName,
		lastName: state.userInfo.lastName,
		email: state.userInfo.email,
		birthday: state.userInfo.birthday,
		city: state.userInfo.city,
		gender: state.userInfo.gender,
		phone: state.userInfo.phone,
	}
}, { getUserInfo, updateUserInfo })(withRouter(UserInfo));