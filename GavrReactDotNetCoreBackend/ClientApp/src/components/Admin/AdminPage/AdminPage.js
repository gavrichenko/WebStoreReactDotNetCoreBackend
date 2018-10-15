import React, {Component} from 'react';
import './AdminPage.css'
import FlowerCardAdmin from '../FlowerCardAdmin/FlowerCardAdmin';
import FlowerInfo from '../FlowerInfo/FlowerInfo';
import { Divider } from 'semantic-ui-react'

class AdminPage extends Component {

  render() {
    return (
        <div className="adminWrapper">

          <Divider horizontal>
            <h1>ADMIN PANEL</h1>
          </Divider>

          <div className="admin">
            <FlowerCardAdmin/>
            <FlowerInfo />
          </div>

        </div>
    )
  }

}

export default AdminPage