﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken, getUserInfo } from "../../AC/userActions";
import { getUserRole } from "../../AC/rolesActions";
import { GET_TOKEN, SUCCESS } from "../../constance";
import './LoginPage.css';
import { Button, Form, Grid, Header, Loader, Message, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import * as qs from 'query-string';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		// fetching user data(email) from url
		const queryFromUrl = qs.parse(window.location.search);

		this.state = {
			username: queryFromUrl.email,
			password: '',
			submitted: false,
			isLoaded: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();
		const { getToken, getUserInfo, getUserRole, isRedirectToCart } = this.props;

		this.setState({ submitted: true });
		const { username, password } = this.state;
		if (username && password) {
			this.setState({ isLoaded: true });
			getToken({ email: username, password })
				.then((tokenData) => {
					this.setState({ isLoaded: false, password: '' });
					if (tokenData.type === GET_TOKEN + SUCCESS) {
						localStorage.setItem('user', JSON.stringify(tokenData.responseAPI));
						return tokenData;
					} else {
						// todo: add modal window with error
						return Promise.reject('auth issue');
					}
				})
				.then((tokenData) => {
					const username = tokenData.responseAPI.username;
					getUserInfo(username);
					getUserRole(username);
					if (isRedirectToCart){
						return this.props.history.push('/cart');
					}
					this.props.history.push('/');
				})
				.catch(e => console.log(e));
		};
	}

	//validateForm() {
	//	return this.state.email.length > 0 && this.state.password.length > 0;
	//}

	render() {
	  const { loggingIn } = this.props;
		const { username, password, isLoaded } = this.state;
	  return (
		  <div className='login-form'>
			  <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>			 
				  <Grid.Column style={{ maxWidth: 450 }}>

					  <Loader active={isLoaded} size='big' />

					  <Header as='h2' color='teal' textAlign='center'>
						  <Icon name='sign-in' />Войти в свой аккаунт
					  </Header>
					  <Form size='large' onSubmit={this.handleSubmit} >

						  <Segment stacked>
							  <Form.Input
								  name="username"
								  fluid icon='at'
								  iconPosition='left'
								  placeholder='E-mail'
								  value={username} onChange={this.handleChange}
								  onChange={e => this.handleChange(e)}/>
							  <Form.Input
								  name = 'password'
								  fluid
								  icon='lock'
								  iconPosition='left'
								  placeholder='Пароль'
								  type='password'
								  value={password} onChange={this.handleChange}
								  onChange={e => this.handleChange(e)}
							  />

							  <Button color='teal' fluid size='large'>
								  Войти
							  </Button>
						  </Segment>
					  </Form>
					  <Message attached='bottom' warning>
						  <Icon name='help' />
						  <Link to="/signup">Ещё не зарегистрированы?</Link>  						
					  </Message>
				  </Grid.Column>
			  </Grid>
			  
			  <b>admin@admin.com</b> <br />
			  <b>paswrd123</b><br />
			  <br />
			  <b>user@user.com</b> <br />
			  <b>paswrd123</b>
			  <br />
			  <div>
				  <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
				  <form>
					  <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
				  </form>
			  </div>
		  </div>
    )
  }

}
export default connect((state)=>{
	return {
		isRedirectToCart: state.redirect.fromLoginToCart,
	}
}, { getToken, getUserInfo, getUserRole })(LoginPage);