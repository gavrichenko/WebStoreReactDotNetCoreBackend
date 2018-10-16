import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken } from "../../AC/userActions";
import './LoginPage.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class LoginPage extends Component {
	constructor(props) {
		super(props);

		// reset login status
		//this.props.dispatch(userActions.logout());

		this.state = {
			username: '',
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
			console.log(username, password)
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
						  <Image src='/logo.png' /> Log-in to your account
					  </Header>
					  <Form size='large' onSubmit= { this.handleSubmit } >
						  <h2>admin@admin.com</h2>
						  <h2>paswrd123</h2>
						  <Segment stacked>
							  <Form.Input
								  name="username"
								  fluid icon='user'
								  iconPosition='left'
								  placeholder='E-mail address'
								  value={username} onChange={this.handleChange}
								  onChange={e => this.handleChange(e)}/>
							  <Form.Input
								  name = 'password'
								  fluid
								  icon='lock'
								  iconPosition='left'
								  placeholder='Password'
								  type='password'
								  value={password} onChange={this.handleChange}
								  onChange={e => this.handleChange(e)}
							  />

							  <Button
								  color='teal'
								  fluid size='large'
							  >
								  Login
							  </Button>
						  </Segment>
					  </Form>
					  <Message>
						  New to us? <a href='#'>Sign Up</a>
					  </Message>
				  </Grid.Column>
			  </Grid>
		  </div>
    )
  }

}
export default connect(null, { getToken })(LoginPage);