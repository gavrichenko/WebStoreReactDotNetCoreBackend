import React, {Component} from 'react';
import {connect} from "react-redux";
import {getFlower, getFlowers} from "../../AC";

import './FlowerList.css';
import FlowerCard from '../FlowerCard/FlowerCard';
import Spinner from '../Spinner';

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
    return flowersData.map(el =>
      <FlowerCard key={el._id}
        name = {el.name}
        price={el.price}
        description = {el.description}
        rating = {el.rating}
        comments = {el.comments}
		image={el.image}
		/>);
  };
}

export default connect((state) => {
  return {
    flowersData: state.flowers.data,
    flowerData: state.flowers.flowerData,
    loading: state.flowers.loading,
    loaded: state.flowers.loaded,
  }
}, {getFlowers, getFlower}) (FlowersList)