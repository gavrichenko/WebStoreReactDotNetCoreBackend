import _ from 'lodash';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { setSearchQuery} from "../AC/flowersFilterActions";
import {connect} from "react-redux";


class SearchExampleStandard extends Component {

  componentWillMount() {
    this.resetComponent()
  }

  changeKeysForEachElemnt = () => {
    const dataFromStore = this.props.flowersData;
    return dataFromStore.map((el) =>{
      return {
        title: el.name,
        description: el.description,
        price: `${el.price} руб.`,
        image: el.image,
      }
    });
  };

	resetComponent = () => {
		this.setState({ isLoading: false, results: [], value: '' });
		this.props.setSearchQuery('');
	}

	handleResultSelect = (e, { result }) => {
	this.props.setSearchQuery(result.title );
    this.setState({ value: result.title })
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    this.props.setSearchQuery(value);
	
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

	 
      this.setState({
        isLoading: false,
        results: _.filter(this.changeKeysForEachElemnt(), isMatch),
      })
    }, 100)
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={results}
        value={value}
		placeholder='Поиск по названию'
        {...this.props}
      />
    )
  }
}

export default connect((state) => {
  return {
    flowersData: state.flowers.data,
  }
}, { setSearchQuery }) (SearchExampleStandard)

