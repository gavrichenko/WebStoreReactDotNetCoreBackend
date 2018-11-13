import React, {Component} from 'react';
import {connect} from "react-redux";
import {getFlower, getFlowers} from "../../AC";
import FlowerCard from '../FlowerCard/FlowerCard';
import Spinner from '../Spinner';
import './FlowerList.css';
import _ from 'lodash';

class FlowersList extends Component {

  render() {
    const {loading} = this.props;
    if (loading) {
      return <Spinner />
    }

    return (
        <div className="flowersList">
          {this.getFlowersList()}
        </div>
    );
  }

  getFlowersList() {
    const {flowersData} = this.props;
    return flowersData.map((el, i) =>
      <FlowerCard key={i}
        id={el.id}
        name = {el.name}
        price={el.price}
        description = {el.description}
        rating = {el.rating}
        comments = {el.comments}
		    image={el.image}
		/>);
  };
}

const sortBy = (flowersData, filterBy, filteredQuery) => {
	let filtered = () => {
		switch (filterBy) {
		case 'price_high':
			return _.orderBy(flowersData, 'price', 'asc');
		case 'price_low':
			return _.orderBy(flowersData, 'price', 'desc');
		case 'all':
		default:
			return flowersData;
		}
	}

	if (filteredQuery != '') {
		console.log(filteredQuery);
		return _.filter(filtered(), o => o.name.toLowerCase().indexOf(filteredQuery.toLowerCase()) >=0);
	}
	return filtered();
};

export default connect((state) => {
  return {
	flowersData: sortBy(state.flowers.data, state.flowers.filterBy, state.flowers.filterByQuery),
    flowerData: state.flowers.flowerData,
    filterBy: state.flowers.filterBy,
    loading: state.flowers.loading,
    loaded: state.flowers.loaded,
  }
}, {getFlowers, getFlower}) (FlowersList)