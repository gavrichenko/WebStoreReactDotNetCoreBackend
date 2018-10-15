import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import {getFlowers} from "../AC";
import {connect} from "react-redux";

const source = _.times(10, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}));



class SearchExampleStandard extends Component {
  componentDidMount() {
    const {getFlowers, loading, loaded} = this.props;
    console.log('getting flowers list for search component');
    if (!loading || ! loaded) {
      getFlowers();
    }
  }

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
        image: require('../static/img/1.jpg')
      }
    });
  };

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {


    this.setState({ value: result.title })
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.changeKeysForEachElemnt(), isMatch),
      })
    }, 200)
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
        {...this.props}
      />
    )
  }
}

export default connect((state) => {
  return {
    flowersData: state.flowers.data,
  }
}, {getFlowers}) (SearchExampleStandard)

