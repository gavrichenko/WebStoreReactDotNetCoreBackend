import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShopPage.css'
import FlowersList from "../FlowersList/FlowersList";
import ProductFilter from "../ProductFilter/ProductFilter";
import { Dimmer, Header, Icon, Loader } from 'semantic-ui-react';
import { getFlowers } from "../../AC/index";
import { closeSuccessNotify } from "../../AC/orderActions";

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, activeDimmer: true };
  }

  componentDidMount() {
    const { getFlowers, flowersData } = this.props;

    //uploading flowers data from api
    if (flowersData.length === 0) {
      this.setState({ isLoaded: true });
      getFlowers().then(() => {
        this.setState({
          isLoaded: false
        });
      });
    }
  };

  handleCloseDimmer = () => {
	const {closeSuccessNotify} = this.props
	closeSuccessNotify();
  };

  isShowSuccessNotify() {
	const {successNotifyData} = this.props
	if (successNotifyData.isNew && successNotifyData.isSuccess){
		return true;
	} else {
		//todo: add dimmer with failed case
		return false;
	}
  };

  render() {
    return (
      <div className="shop">
        <Loader active={this.state.isLoaded} size='huge'>Loading</Loader>	
        <ProductFilter />
        <FlowersList />
        <Dimmer
          active={this.isShowSuccessNotify()}
          onClickOutside={this.handleCloseDimmer}
          page
        >
          <Header as="h2" icon inverted>
            <Icon name="heart" />
            Cпасибо за заказ!
            <br />
            Номер заказа: {this.props.orderId}
            <Header.Subheader>
              Менеджер нашего магазина свяжется с вами для уточнения деталей
              заказа.
            </Header.Subheader>
          </Header>
        </Dimmer>
      </div>
    );
  }
}

export default connect((state) => {
	return {
		flowersData: state.flowers.data,
		successNotifyData: {isNew: state.order.isNew, isSuccess: state.order.isSuccess},
		orderId: state.order.isSuccess ? state.order.orderData.orderId : ''
	}
}, { getFlowers, closeSuccessNotify })(ShopPage);