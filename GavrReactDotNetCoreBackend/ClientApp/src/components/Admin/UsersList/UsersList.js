import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getUserInfo, getAllUsers, sortUsers, toggleUserCard } from "../../../AC/userActions";
import UserSearch from "../UserSearch/UserSearch";
import UserCardAdmin from "../UserCardAdmin/UserCardAdmin";
import { Button, Loader, Table } from 'semantic-ui-react';

import { withRouter } from "react-router-dom";
import './UsersList.css';



class UsersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			column: null,
			direction: null,
			isUserCardOpen: false,
		};
	};

	componentDidMount() {
		const { getAllUsers } = this.props;
		this.setState({ isLoaded: true });
		getAllUsers()
			.then(() => {
				this.setState({
					isLoaded: false,
				});
			});
	};

	handleSort = clickedColumn => () => {
		const { column, direction } = this.state
		const { users } = this.props;

		
		if (column !== clickedColumn) {
			//sortUsers(_.sortBy(users, [clickedColumn]));
			this.setState({
				column: clickedColumn,
				direction: 'ascending',
			});
			return
		}

		users.reverse();
		this.setState({
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	};

	handleRowClick(value) {
		const { toggleUserCard } = this.props;
		toggleUserCard(true);

		console.log(value);
	}



	render() {
		const { isLoaded, column, direction, isUserCardOpen } = this.state;
		const { users, sortedUsers } = this.props;
		const filteredUsers = sortedUsers.length ? sortedUsers.map((user) => {
			return { email: user.original.email, firstName: user.original.firstName, lastName: user.original.lastName }
		}) : users;
		return (
			<div className='usersList'>

				<Loader active={isLoaded} size='big' />
				<UserCardAdmin />
				<UserSearch />

				<Table sortable celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell
								sorted={column === 'email' ? direction : null}
								onClick={this.handleSort('email')}
							>
								Email
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === 'firstName' ? direction : null}
								onClick={this.handleSort('firstName')}
							>
								Имя
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === 'lastName' ? direction : null}
								onClick={this.handleSort('lastName')}
							>
								Фамилия
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body >
						{_.map(filteredUsers, ({ email, firstName, lastName }) => (
							<Table.Row key={email} onClick={() => this.handleRowClick(email)}>
								<Table.Cell>{email}</Table.Cell>
								<Table.Cell>{firstName}</Table.Cell>
								<Table.Cell>{lastName}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>		
		)	
	};
};

export default connect((state) => {
	return {
		users: state.admin.users,
		sortedUsers: state.admin.sortUsers,
	}	
}, { getUserInfo, getAllUsers, sortUsers, toggleUserCard })(withRouter(UsersList));