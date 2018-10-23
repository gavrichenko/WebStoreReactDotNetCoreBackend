import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getUserInfo, getAllUsers } from "../../../AC/userActions";
import { Button, Loader, Table } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import './UsersList.css';

const tableData = [
	{ name: 'John', age: 15, gender: 'Male' },
	{ name: 'Amber', age: 40, gender: 'Female' },
	{ name: 'Leslie', age: 25, gender: 'Female' },
	{ name: 'Ben', age: 70, gender: 'Male' },
]

class UsersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			column: null,
			data: tableData,
			direction: null,
		};
	};

	componentDidMount() {
		//const { getAllUsers, users } = this.props;
		//this.setState({ isLoaded: true });
		//getAllUsers()
		//	.then((apiData) => {
		//		this.setState({
		//			isLoaded: false,
		//			data: users,
		//		});
		//	});
	};

	handleSort = clickedColumn => () => {
		const { column, data, direction } = this.state

		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				data: _.sortBy(data, [clickedColumn]),
				direction: 'ascending',
			});
			return
		}

		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	};

	handleRowClick(value) {

		console.log(value)
	}



	render() {


		const { isLoaded, column, data, direction  } = this.state;
		return (
			<div className='usersList'>

				<Loader active={isLoaded} size='big' />
				<h1>Данные о пользователях</h1>

				<Table sortable celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell
								sorted={column === 'name' ? direction : null}
								onClick={this.handleSort('name')}
							>
								Name
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === 'age' ? direction : null}
								onClick={this.handleSort('age')}
							>
								Age
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === 'gender' ? direction : null}
								onClick={this.handleSort('gender')}
							>
								Gender
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body >
						{_.map(data, ({ age, gender, name }) => (
							<Table.Row key={name} onClick={() => this.handleRowClick(name)}>
								<Table.Cell>{name}</Table.Cell>
								<Table.Cell>{age}</Table.Cell>
								<Table.Cell>{gender}</Table.Cell>
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
	}
	
}, { getUserInfo, getAllUsers })(withRouter(UsersList));