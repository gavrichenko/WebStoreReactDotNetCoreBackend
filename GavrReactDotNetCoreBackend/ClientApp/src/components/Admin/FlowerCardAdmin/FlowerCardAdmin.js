import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Card, Icon, Image, Button, Rating, Input } from 'semantic-ui-react'
import './FlowerCardAdmin.css'
import axios from 'axios';
import {connect} from "react-redux";
import {getFlower, getFlowers, addFlower} from "../../../AC";
import Spinner from '../../Spinner';



class FlowerCardAdmin extends Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired,
  //   price: PropTypes.number,
  //   description: PropTypes.string,
  //   rating: PropTypes.number,
  //   comments: PropTypes.array,
  // };
  constructor(props){
    super();
    this.axiosInstance = axios.create({
      baseURL: `https://salty-ridge-37026.herokuapp.com/`
    });
    this.state = {
      name: '',
      price: '',
      description: '',
      rating: '',
    };
  }

  handleChangeName = e => {this.setState({name: e.target.value})};
  handleChangePrice = e => {this.setState({price: e.target.value})};
  handleChangeDescription = e => {this.setState({description: e.target.value})};
  handleChangeRating = (e, { rating, maxRating }) => this.setState({ rating, maxRating });

  handleGetReq = () => {
    const {getFlowers, loading, loaded} = this.props;
    console.log('getting flowers list');
    if (!loading || ! loaded) {
      getFlowers();
    }
  };

  handlePostReq = () => {
    const {addFlower, loading, loaded} = this.props;
    const data = {
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        rating: this.state.rating,
    };
    if (!loading || ! loaded) {
      addFlower(data)
    }
  };

  getSpinner() {
    const {loading} = this.props;
    if (loading) {
      return <Spinner />
    }
  }

  render() {
    // const {name, price, description, rating} = this.props;

    const commentsList = this.props.comments;
    return (
      <div className="flowerCardAdmin">
        <Card>
          <Image src={require('../../../static/img/1.jpg')} />
          <Card.Content>
            <Card.Header>
            <Input placeholder="Name"
                   value={this.state.name}
                   onChange={this.handleChangeName}
            />
            </Card.Header>
            <Card.Meta><a>Отзывы ({ commentsList})</a></Card.Meta>
            <Card.Description>
              <Input placeholder="Description"
                     value={this.state.description}
                     onChange={this.handleChangeDescription}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Rating icon='star'  maxRating={5}
                    rating={this.state.rating}
                    onRate={this.handleChangeRating}
            />
            <Button className="flowerCard__shopBtn" color='red' fluid>
              <Button.Content hidden />
              <Button.Content visible>
                <Icon name='shop' />
                <span className="flowerCard_price">
                  <Input placeholder="Price"
                         value={this.state.price}
                         onChange={this.handleChangePrice}
                  />
                </span>
              </Button.Content>
            </Button>
          </Card.Content>
        </Card>

        <div className="flowerCardAdmin__result">
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <Button onClick = {this.handleGetReq}>Get</Button>
          <Button onClick = {this.handlePostReq}>Post</Button>
        </div>

        {this.getSpinner()}

      </div>
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
}, {getFlowers, getFlower, addFlower}) (FlowerCardAdmin)