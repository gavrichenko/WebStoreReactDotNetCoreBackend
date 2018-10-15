import React, {Component} from 'react';
import './FlowerInfo.css'
import SearchSemantic from '../../SearchSemantic';
import FlowerCard from '../../FlowerCard/FlowerCard';
import { Segment, Button } from 'semantic-ui-react'

class FlowerInfo extends Component {

  render() {
    return (
      <div className="flowerInfo">
        <Segment className="flowerInfo__segment" raised >
          <h3>найти цветок и сделать с ним чтонить</h3>
          <SearchSemantic />
          <FlowerCard name = 'цветок'/>
          <Button onClick = {this.handleGetReq}>Update</Button>
          <Button onClick = {this.handlePostReq}>Delete</Button>
        </Segment>
      </div>
    )
  }

}

export default FlowerInfo