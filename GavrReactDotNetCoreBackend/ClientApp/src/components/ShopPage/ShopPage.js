import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShopPage.css'
import FlowersList from "../FlowersList/FlowersList";
import ProductFilter from "../ProductFilter/ProductFilter";
import { getFlowers } from "../../AC/index";

class ShopPage extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoaded: false };
	};

	componentDidMount() {
		const { getFlowers, flowersData } = this.props;

		//uploading flowers data from api
		if (flowersData.length === 0) {
			this.setState({ isLoaded: true });
			getFlowers()
				.then(() => {
					this.setState({
						isLoaded: false,
					});
				});
		}
	};

	render() {
		return (
			<div className="shop">
				<ProductFilter />
				<FlowersList />
			</div>
		)
	}

}

export default connect((state) => {
	return {
		flowersData: state.flowers.data,
	}
}, { getFlowers })(ShopPage);