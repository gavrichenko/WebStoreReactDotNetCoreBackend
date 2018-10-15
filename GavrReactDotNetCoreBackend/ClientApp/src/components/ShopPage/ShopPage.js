import React, {Component} from 'react';
import './ShopPage.css'
import FlowersList from "../FlowersList/FlowersList";
import SearchSemantic from '../SearchSemantic';

class ShopPage extends Component {

  render() {
    return (
      <div className="shop">
        <SearchSemantic className ="shop__search"/>
        <FlowersList />
      </div>
    )
  }

}

export default ShopPage