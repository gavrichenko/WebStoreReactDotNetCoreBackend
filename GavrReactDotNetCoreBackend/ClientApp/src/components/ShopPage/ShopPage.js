import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShopPage.css'
import FlowersList from "../FlowersList/FlowersList";
import {getFlowers} from "../../AC/index";
import SearchSemantic from '../SearchSemantic';

class ShopPage extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoaded: false};
	};

	componentDidMount() {
		const { getFlowers } = this.props;
		this.setState({ isLoaded: true });
		getFlowers()
			.then(() => {
				this.setState({
					isLoaded: false,
				});
			});
	};
  render() {
    return (
      <div className="shop">
        <SearchSemantic className ="shop__search"/>
        <FlowersList />
      </div>
    )
  }

}

export default connect(null, { getFlowers })(ShopPage);