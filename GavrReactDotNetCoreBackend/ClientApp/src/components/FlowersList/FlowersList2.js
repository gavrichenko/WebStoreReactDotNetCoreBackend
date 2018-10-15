import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getFlowers} from '../../AC'
import {getFlower} from '../../AC'
import Spinner from '../Spinner';


class FlowersList2 extends Component {
  componentDidMount() {
    const {getFlowers, getFlower, loading, loaded} = this.props;
    console.log('getting flowers list');
    if (!loading || ! loaded) {
      getFlowers();
      getFlower('5b6d9819d7c75900209ab5cd');
    }
  }

  render() {
    const {loading} = this.props;
    if (loading) {
      return <Spinner />
    }

    return (
        <div className="flowersList">
          <h1>data: {this.getFlowersList()}</h1>
        </div>
    );
  }

  getFlowersList() {
    const {flowersData, flowerData} = this.props;
    const data = flowersData.map(el => <li key={el._id}>{el.name}</li>);
    return (
      <ul>
        {data}
        <h1>ONCE FLOWER: {flowerData.name}</h1>
      </ul>
    )
  }

}

export default connect((state) => {
  return {
    flowersData: state.flowers.data,
    flowerData: state.flowers.flowerData,
    loading: state.flowers.loading,
    loaded: state.flowers.loaded,
  }
}, {getFlowers, getFlower}) (FlowersList2)