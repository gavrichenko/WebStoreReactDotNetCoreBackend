import React, {Component} from 'react';
import {connect} from "react-redux";
import {getFlower, getFlowers} from "../../AC";
import FlowerCard from '../FlowerCard/FlowerCard';
import Spinner from '../Spinner';
import './FlowerList.css';
import _ from 'lodash';

class FlowersList extends Component {
  componentDidMount() {
    const {getFlowers, getFlower, loading, loaded} = this.props;
    console.log('getting flowers list');
    if (!loading || ! loaded) {
    //  getFlowers();
    }
  }

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

const sortBy = (flowersData, filterBy) => {
	switch (filterBy) {
		case 'all':
			return flowersData;
		case 'price_high':		
			return _.orderBy(flowersData, 'price', 'asc'); 
		case 'price_low':
			return _.orderBy(flowersData, 'price', 'desc');
		default:
			return flowersData;
	}
	return 
};

export default connect((state) => {
  return {
    flowersData: sortBy(state.flowers.data, state.flowers.filterBy),
    flowerData: state.flowers.flowerData,
    filterBy: state.flowers.filterBy,
    loading: state.flowers.loading,
    loaded: state.flowers.loaded,
  }
}, {getFlowers, getFlower}) (FlowersList)