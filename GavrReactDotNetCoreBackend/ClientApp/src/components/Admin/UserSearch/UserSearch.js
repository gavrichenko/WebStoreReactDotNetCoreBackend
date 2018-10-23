import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchUser } from "../../../AC/userActions";
import { Search } from 'semantic-ui-react';

class UserSearch extends Component {
	componentWillMount() {
		this.resetComponent()
	}

	resetComponent = () => {
		this.setState({
			isLoading: false,
			results: [],
			value: '',
		});
		this.props.searchUser([])
	};

	handleResultSelect = (e, { result }) => {
		this.setState({ value: result.title });
		this.props.searchUser([result])
	};

	handleSearchChange = (e, { value }) => {
		const { users, searchUser } = this.props;
		this.setState({ isLoading: true, value })

		setTimeout(() => {
			if (this.state.value.length < 1) return this.resetComponent()

			const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
			const isMatch = result => re.test(result.title);

			this.setState({
				isLoading: false,
				results: _.filter(users, isMatch),
			});

			searchUser(_.filter(users, isMatch))

		}, 200)
	}


	render() {
		const { isLoading, value, results } = this.state

		return (
			<Search
				loading={isLoading}
				onResultSelect={this.handleResultSelect}
				onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
				results={ results }
				value={value}
				placeholder='поиск по E-mail'
				{...this.props}
			/>
		)
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
