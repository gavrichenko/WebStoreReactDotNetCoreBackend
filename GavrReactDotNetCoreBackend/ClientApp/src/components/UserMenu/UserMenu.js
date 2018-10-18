import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from "../../AC/userActions";
import { Icon, Dropdown } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import './UserMenu.css'


class UserMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {};	
	}

	componentDidMount() {
		const username = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).username : null;
		if (username !== null) {
			const { getUserInfo } = this.props;
			getUserInfo(username);
		}
	}

	handleChange = (e, { value }) => {
		this.setState({ value });
		this.props.history.push(value);
	}

	render() {
		const { firstName, lastName } = this.props;
		const { value } = this.state;

		const options = [
			{
				key: 'user',
				text: (
					<span>
						Вы зашли как <strong>{firstName} {lastName}</strong>
					</span>
				),
				disabled: true,
			},
			{ key: 'profile', text: 'Личный кабинет', value: '/profile' },
			{ key: 'cart', text: 'Корзина', value: '/cart' },
			{ key: 'help', text: 'Помощь', value: '/help' },
			{ key: 'sign-out', text: 'Выйти', value: '/sign-out' },
		];

		const trigger = (
			<span>
				<Icon name='user' /> Hello, {firstName}
			</span>
		);

		return (
			<Dropdown
				trigger={trigger}
				options={options}
				className="userMenuDropdown"
				onChange={this.handleChange}
				value={value}	
			/>
		);
	}
};

export default connect((state) => {
	return {
		firstName: state.userInfo.firstName,
		lastName: state.userInfo.lastName,
	}
}, { getUserInfo })(withRouter(UserMenu));