import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItemToCart } from "../../AC/cart";
import { Card, Icon, Image, Button, Rating, Dimmer, Header, Modal } from "semantic-ui-react";
import "./FlowerCard.css";

class FlowerCard extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, isZoomImageModalActive: false };
  }

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    description: PropTypes.string,
    rating: PropTypes.number,
    comments: PropTypes.array,
    image: PropTypes.string
  };

  handleOpenModal = () => this.setState({ active: true });
  handleCloseModal = () => this.setState({ active: false });

  handleClick = e => {
    e.preventDefault();
    const { id, name, price, description, rating, image } = this.props;
    const itemObjForAddingToCart = {
      id,
      name,
      price,
      description,
      rating,
      image
    };
    this.props.addItemToCart(itemObjForAddingToCart);
    this.handleOpenModal();
    setTimeout(() => {
      this.handleCloseModal();
    }, 4000);
  };

  handleZoomImageOpen = () => this.setState({isZoomImageModalActive: true})
  handleZoomImageClose = () => this.setState({isZoomImageModalActive: false})

  getModalWithImage() {
    const { isZoomImageModalActive } = this.state;
    return (
      <Modal
        open={isZoomImageModalActive}
        onClick={this.handleZoomImageClose}
        size='small'
        closeIcon
      >
        <Image src={this.props.image} fluid/>
      </Modal>
    )
  }

  render() {
    const { id, name, price, description, rating, image } = this.props;
    const { active } = this.state;
    const commentsList = this.props.comments;

    return (
      <div className="flowerCard">
        <Dimmer active={active} onClickOutside={this.handleCloseModal} page>
          <Header as="h2" icon inverted>
            <Icon name="shopping cart" />
            Товар успешно добавлен в корзину!
            <Header.Subheader>
              Вы можете продолжить покупки или оформить заказ в меню Корзины
            </Header.Subheader>
          </Header>
        </Dimmer>

        {this.getModalWithImage()}

        <Card>
          <div className='flowerCard__image'>
            <Image src={image} width={300} height={300} onClick={this.handleZoomImageOpen} />
          </div>

          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <a>Отзывы ({Math.floor(Math.random() * (0 - 20)) + 20})</a>
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Rating icon="star" rating={rating} maxRating={5} />
            <Button
              className="flowerCard__shopBtn"
              animated="vertical"
              color="red"
              fluid
              onClick={this.handleClick}
            >
              <Button.Content hidden>Добавить в корзину</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
                <span className="flowerCard_price">{price}</span>
              </Button.Content>
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  { addItemToCart }
)(FlowerCard);
