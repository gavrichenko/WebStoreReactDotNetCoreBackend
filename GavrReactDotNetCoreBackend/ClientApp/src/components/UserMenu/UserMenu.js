import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from "../../AC/userActions";
import { getUserRole } from "../../AC/rolesActions";
import { Icon, Dropdown, Confirm } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import './UserMenu.css'


class UserMenu extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false };	
	};

	componentDidMount() {
		const username = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).username : null;
		if (username !== null) {
			const { getUserInfo, getUserRole } = this.props;
			getUserInfo(username);
			getUserRole(username);
		}
	};

	handleClick = (e, { value }) => {
		this.setState({ value });
		this.props.history.push(value);
	};

	handleOpenModal = () => this.setState({ open: true })

	handleSignOut = () => {
		this.setState({ open: false })
		localStorage.removeItem('user');
		this.props.history.push('/login');
	};

	handleCancel = () => this.setState({ open: false })

	getAdminButton() {
		const { roles } = this.props;
		var isAdmin = roles.some(role => role === 'admin');
		if (isAdmin) {
			return <Dropdown.Item text='Администрирование' value='/admin' onClick={this.handleClick} />
		}
		return null;
	};


	render() {
		const { firstName, lastName } = this.props;
		const welcome = (<span><Icon name='user' /> Hello, {firstName}</span>);
		const loggedAs = (<span>Вы зашли как <strong>{firstName} {lastName}</strong></span>);
		const { value } = this.state;

		return (
			<div className='userMenuDropdown'>
				<Dropdown text={welcome} >
					<Dropdown.Menu>
						<Dropdown.Item text= { loggedAs } disabled />
						<Dropdown.Item text='Личный кабинет' value='/account' onClick={this.handleClick} />
						<Dropdown.Item text='Корзина' value='/cart' onClick={this.handleClick}/>
						<Dropdown.Item text='Помощь' value='/help' onClick={this.handleClick}/>
						<Dropdown.Item text='Выйти' value='/signout' onClick={this.handleOpenModal} />
						
					    {this.getAdminButton()}
					</Dropdown.Menu>
				</Dropdown>
				<Confirm
					header='Вы собираетесь покинуть сайт'
					content='Вы уверены?'
					open={this.state.open}
					onCancel={this.handleCancel}
					onConfirm={this.handleSignOut}
					confirmButton='Выйти'
					cancelButton='Отмена'
					size='tiny'
				/>
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
}, { getUserInfo, getUserRole })(withRouter(UserMenu));