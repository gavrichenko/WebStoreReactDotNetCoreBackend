import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Card, Icon, Image, Button, Rating, Input } from 'semantic-ui-react'
import './FlowerCardAdmin.css'
import { connect } from "react-redux";
import { getFlower, getFlowers, addFlower, uploadImage } from "../../../AC";
import Spinner from '../../Spinner';

class FlowerCardAdmin extends Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired,
  //   price: PropTypes.number,
  //   description: PropTypes.string,
  //   rating: PropTypes.number,
  //   comments: PropTypes.array,
  // };
  constructor(props) {
    super();
    this.state = {
      selectedImage: null,
      preLoad: false,
      isImageLoaded: false,
      name: '',
      price: '',
      description: '',
      rating: '',
    };
  }

  handleChangeName = e => { this.setState({ name: e.target.value }) };
  handleChangePrice = e => { this.setState({ price: e.target.value }) };
  handleChangeDescription = e => { this.setState({ description: e.target.value }) };
  handleChangeRating = (e, { rating, maxRating }) => this.setState({ rating, maxRating });

  handleGetReq = () => {
    const { getFlowers, loading, loaded } = this.props;
    console.log('getting flowers list');
    if (!loading || !loaded) {
      getFlowers();
    }
  };

  handlePostReq = () => {
    const { addFlower, loading, loaded } = this.props;
    const {selectedImage, name, price, description, rating  } = this.state;

    const data = {
      image: selectedImage,
      name,
      price,
      description,
      rating,
    };
    if (!loading || !loaded) {
      addFlower(data)
    }
  };

  imageSelectedHandler = (event) => {
    this.setState({
      selectedImage: event.target.files[0],
      isImageLoaded: false,
      isPreviewExist: true,
    })
  }

  fileUploadHandler = () => {
    const { uploadImage } = this.props;
    const fd = new FormData();
    fd.append('file', this.state.selectedImage, this.state.selectedImage.name);
    uploadImage(fd)
      .then(res => {
        this.setState({
          selectedImage: res.responseAPI.url,
          isImageLoaded: true,
          isPreviewExist: false,
        })
      })
  }

  getSpinner() {
    const { loading } = this.props;
    if (loading) {
      return <Spinner />
    }
  }

  getImage() {
    const { selectedImage, isImageLoaded, isPreviewExist } = this.state;
    if (isPreviewExist && !isImageLoaded) {
      var preLoadUrl = URL.createObjectURL(selectedImage);
      return <Image src={preLoadUrl} width={300} height={300} />
    }
    if (isImageLoaded) {
      return <Image src={selectedImage} width={300} height={300} />
    } else {
      return <Image src={require('../../../static/img/1.jpg')} width={300} height={300} />
    }
  }

  render() {
    const commentsList = this.props.comments;
    return (
      <div className="flowerCardAdmin">
        <Card>
          <div className='flowerCardAdmin__uploadImage'>
            {this.getImage()}
            <input style={{ display: 'none' }} type='file' onChange={this.imageSelectedHandler} ref={fileInput => this.fileInput = fileInput} />
            <Button.Group basic fluid>
              <Button onClick={() => this.fileInput.click()}>Выбрать</Button>
              <Button onClick={this.fileUploadHandler}>Загрузить</Button>
            </Button.Group>

          </div>
          <Card.Content>
            <Card.Header>
              <Input placeholder="Название"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </Card.Header>
            <Card.Meta><a>Отзывы ({commentsList})</a></Card.Meta>
            <Card.Description>
              <Input placeholder="Описание"
                value={this.state.description}
                onChange={this.handleChangeDescription}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Rating icon='star' maxRating={5}
              rating={this.state.rating}
              onRate={this.handleChangeRating}
            />
            <Button className="flowerCard__shopBtn" color='red' fluid>
              <Button.Content hidden />
              <Button.Content visible>
                <Icon name='shop' />
                <span className="flowerCard_price">
                  <Input placeholder="Цена"
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
          <Button onClick={this.handlePostReq}>Добавить товар</Button>
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
}, { getFlowers, getFlower, addFlower, uploadImage })(FlowerCardAdmin)