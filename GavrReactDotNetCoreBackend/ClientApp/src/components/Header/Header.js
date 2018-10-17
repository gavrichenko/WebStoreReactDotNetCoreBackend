import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Menu, Icon, Dropdown } from 'semantic-ui-react'
import UserMenu from "../UserMenu/UserMenu";
import './Header.css'


class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <header className="header" >
        <Menu stackable>

          <Link to="/" >
				<Menu.Item
					name='logo'
					onClick={this.handleItemClick}
				>
              <img src={require('../../static/ico/flowers.png')} />
              <span className="nameOfLogo"><p>lovely-house</p></span>
            </Menu.Item>
          </Link>

          <Link  to="/promotion" >
            <Menu.Item
              name='promo'
              active={activeItem === 'promo'}
              onClick={this.handleItemClick}
            >
              Акции
            </Menu.Item>
          </Link>

          <Link to="/contacts" >
            <Menu.Item
				name='contacts'
				active={activeItem === 'contacts'}
				onClick={this.handleItemClick}
			>
              Контакты
            </Menu.Item>
          </Link>

          <Link to="/shop" >
            <Menu.Item className ="header__link"
              name='shop'
              active={activeItem === 'shop'}
              onClick={this.handleItemClick}>
              Купить
            </Menu.Item>
          </Link>

          {/*right menu*/}
          <Menu.Menu position='right'>
            <Link to="/basket" >
              <Menu.Item
                icon = 'shop'
                name='Корзина'
                active={activeItem === 'Корзина'}
                onClick={this.handleItemClick}>
                <Icon link name='shopping cart' size="large" />
                <span>1500 руб</span>
              </Menu.Item>
            </Link>

			<div hidden={false}  >
				<Link to="/login" >
	              <Menu.Item icon = 'key'
	                name='Войти'
	                onClick={this.handleItemClick}
				  />				
				</Link>
			</div>

			<div hidden={true}  >
				<Menu.Item 
					name='userMenu'
					onClick={this.handleItemClick} >
					<UserMenu />
				</Menu.Item>
			</div>
			
          </Menu.Menu>

        </Menu>
      </header>
    )
  }
}

export default Header