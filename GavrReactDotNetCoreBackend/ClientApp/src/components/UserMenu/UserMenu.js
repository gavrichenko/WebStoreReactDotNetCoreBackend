import React, { Component } from 'react';
import { Icon, Dropdown } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import './UserMenu.css'

const options = [
	{
		key: 'user',
		text: (
			<span>
				Вы зашли как <strong>Bob Smith</strong>
			</span>
		),
		disabled: true,
	},
	{ key: 'profile', text: 'Личный кабинет', value: '/profile' },
	{ key: 'cart', text: 'Корзина', value: '/cart' },
	{ key: 'help', text: 'Помощь', value: '/help' },
	{ key: 'sign-out', text: 'Выйти', value: '/sign-out' },
];

class UserMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		
	}

	handleChange = (e, { value }) => {
		this.setState({ value });
		this.props.history.push(value);
	}

	render() {
		const { value } = this.state;

		const trigger = (
			<span>
			<Icon name='user' /> Hello, Bob
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

export default withRouter(UserMenu)