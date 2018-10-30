import React, {Component} from 'react';
import { connect } from "react-redux";
import { Menu } from 'semantic-ui-react';
import { setFilter } from "../../AC/flowersFilterActions";
import SearchSemantic from '../SearchSemantic';
import './ProductFilter.css';


class ProductFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	handleItemClick = (e, { name }) => {
		const { setFilter } = this.props;
		setFilter(name);
	}

	render() {
		const { activeItem } = this.props;	

		return (
		  <Menu text stackable className="products__filter" >
			  <Menu.Item header>Фильтр:</Menu.Item>
			  <Menu.Item>
				  < SearchSemantic className="shop__search" />
			  </Menu.Item>
			  <Menu.Item
				  name='all'
				  active={activeItem === 'all'}
				  onClick={this.handleItemClick}
			  >Все</Menu.Item>
			  <Menu.Item
				  name='price_high'
				  active={activeItem === 'price_high'}
				  onClick={this.handleItemClick}
			  >По возрастанию цены</Menu.Item>
			  <Menu.Item
				  name='price_low'
				  active={activeItem === 'price_low'}
				  onClick={this.handleItemClick}
			  >По убыванию цены</Menu.Item>
		  </Menu>
		);
  }

};

export default connect((state) => {
	return {
		activeItem: state.flowers.filterBy,
	}
}, { setFilter })(ProductFilter)