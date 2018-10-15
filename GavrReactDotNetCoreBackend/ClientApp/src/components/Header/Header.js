import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react'
import './Header.css'


class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <header className="header">
        <Menu stackable>

          <Link to="/" className ="header__link">
            <Menu.Item>
              <img src={require('../../static/ico/flowers.png')} />
              <span className="nameOfLogo"><p>lovely-house</p></span>
            </Menu.Item>
          </Link>

          <Link  to="/promotion" className ="header__link">
            <Menu.Item
              name='promo'
              active={activeItem === 'promo'}
              onClick={this.handleItemClick}
            >
              Акции
            </Menu.Item>
          </Link>

          <Link to="/contacts" className ="header__link">
            <Menu.Item
              name='contacts'
              active={activeItem === 'contacts'}
              onClick={this.handleItemClick}
            >
              Контакты
            </Menu.Item>
          </Link>

          <Link to="/shop" className ="header__link">
            <Menu.Item className ="header__link"
              name='shop'
              active={activeItem === 'shop'}
              onClick={this.handleItemClick}>
              Купить
            </Menu.Item>
          </Link>

          {/*right menu*/}
          <Menu.Menu position='right'>
            <Link to="/basket" className ="header__link">
              <Menu.Item
                icon = 'shop'
                name='Корзина'
                active={activeItem === 'Корзина'}
                onClick={this.handleItemClick}>
                <Icon link name='shopping cart' size="large" />
                <span>1500 руб</span>
              </Menu.Item>
            </Link>

            <Link to="/login" className ="header__link">
              <Menu.Item
                icon = 'key'
                name='Войти'
                active={activeItem === 'Войти'}
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu.Menu>

        </Menu>
      </header>
    )
  }
}

export default Header