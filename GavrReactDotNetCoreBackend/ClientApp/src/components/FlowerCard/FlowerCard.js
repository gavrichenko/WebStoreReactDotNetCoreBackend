import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Card, Icon, Image, Button, Rating } from 'semantic-ui-react'
import './FlowerCard.css'

class FlowerCard extends Component {
  static propTypes = {
	id: PropTypes.number,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    description: PropTypes.string,
    rating: PropTypes.number,
	comments: PropTypes.array,
	image: PropTypes.string,
	};

	handleClick = () => {
		const {id, name, price, description, rating, image } = this.props;
		console.log(id, name, price);
	}

  render() {
    const {id, name, price, description, rating, image} = this.props;
    const commentsList = this.props.comments;

	return (
	  <div className="flowerCard">
		<Card>
			<div>
				<Image src={image} width={300} height={300}/>
			</div>

			<Card.Content>
	            <Card.Header>{name}</Card.Header>
	            <Card.Meta><a>Отзывы ({Math.floor(Math.random() * (0 - 20)) + 20})</a></Card.Meta>
	            <Card.Description>{description}</Card.Description>
			</Card.Content>

			<Card.Content extra>
				<Rating icon='star' rating={rating} maxRating={5} />
					<Button className="flowerCard__shopBtn" animated='vertical' color='red' fluid onClick={this.handleClick} >
					<Button.Content hidden>Купить</Button.Content>
					<Button.Content visible>
						<Icon name='shop' />
						<span className="flowerCard_price">{price}</span>
					</Button.Content>
				</Button>
			</Card.Content>
					
	    </Card>
	  </div>
	)
  }
}

export default FlowerCard