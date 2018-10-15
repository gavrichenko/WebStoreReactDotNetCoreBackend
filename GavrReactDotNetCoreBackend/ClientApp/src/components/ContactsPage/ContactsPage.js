import React, {Component} from 'react';
import './ContactsPage.css';
import YandexMap from '../YandexMap';
import { Icon } from 'semantic-ui-react'

class ContactsPage extends Component {

  render() {
    return (
      <div className="contacts">
        <div className="contacts__map">
          <YandexMap />
        </div>
        <div className="contacts__detail">
          <h1>Наши контакты:</h1>
          <div>
            <ul>
              <li><Icon link name='call' size="big"/>8-960-545-91-69</li>
              <li><Icon link name='mail' size="big"/>gavr.imba@mail.ru</li>
              <li><Icon link name='instagram' size="big"/>insta-flowers</li>
              <li><Icon link name='vk' size="big"/>my-vk-group</li>
              <li><Icon link name='map marker alternate' size="big"/>г. Ярославль, Октябрьский пер-555</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

export default ContactsPage