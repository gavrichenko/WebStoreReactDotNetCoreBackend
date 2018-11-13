import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import ItemAdmin from "./ItemAdmin";
import { getFlowers } from "../../../AC/index";

class ItemListAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {isLoaded: false};
	};

	componentDidMount() {
		this.setState({ isLoaded: true })
		this.props.getFlowers()
			.then(() => this.setState({ isLoaded: false }))
	}

	getItemList() {
		const { items } = this.props;
		return items.map((item) => <ItemAdmin key={item.id} {...item} /> );
	};

	render() {
		const {isLoaded} = this.state;
		return (
			<div >		
				<Loader active={isLoaded} size='huge'>Loading</Loader>	
				{this.getItemList()}		
			</div>
		)
	};
};

export default connect((state) => {
	return {
		items: state.flowers.data,
	}
}, { getFlowers })(ItemListAdmin);