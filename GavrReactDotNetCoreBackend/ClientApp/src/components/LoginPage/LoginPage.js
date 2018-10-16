import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken } from "../../AC/userActions";
import './LoginPage.css';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import * as qs from 'query-string';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		// reset login status
		//this.props.dispatch(userActions.logout());
		const queryFromUrl = qs.parse(window.location.search);

		this.state = {
			username: queryFromUrl.email,
			password: '',
			submitted: false
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
		const { getToken } = this.props;

		this.setState({ submitted: true });
		const { username, password } = this.state;
		if (username && password) {
			getToken({ email: username, password })
				.then((tokenData) => {
					return localStorage.setItem('user', JSON.stringify(tokenData.responseAPI));
				})
				.catch(e => console.log(e))
		};
	}

	//validateForm() {
	//	return this.state.email.length > 0 && this.state.password.length > 0;
	//}

	render() {
	  const { loggingIn } = this.props;
	  const { username, password, submitted } = this.state;
	  return (
		  <div className='login-form'>
			  <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>

				  <Grid.Column style={{ maxWidth: 450 }}>
					  <Header as='h2' color='teal' textAlign='center'>
						  <Icon name='sign-in' />Войти в свой аккаунт
					  </Header>
					  <Form size='large' onSubmit={this.handleSubmit} >

						  <h3>admin@admin.com</h3>
						  <h3>paswrd123</h3>

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
					  <Message>
						  <Link to="/signup">Ещё не зарегистрированы?</Link>  						
					  </Message>
				  </Grid.Column>
			  </Grid>
		  </div>
    )
  }

}
export default connect(null, { getToken })(LoginPage);