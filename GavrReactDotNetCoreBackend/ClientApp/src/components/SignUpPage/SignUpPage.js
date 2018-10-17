import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from "../../AC/userActions";
import './SignUpPage.css';
import { Button, Form, Grid, Header, Message, Segment, Icon, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class SignUpPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			submitted: false,
			isLoaded: false
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
		const { signUp } = this.props;

		this.setState({ submitted: true });
		const { firstName, lastName, email, password } = this.state;
		if (email && password) {
			this.setState({isLoaded: true});
			signUp({ firstName, lastName, email, password })
				.then((responseData) => {
					console.log(responseData);
					this.setState({ isLoaded: false, password: '' });
					this.props.history.push(`/login?email=${responseData.responseAPI.userName}`);
				})
				.catch(e => console.log(e))
		};
	}

	render() {
	  const { loggingIn } = this.props;
	  const { email, firstName, lastName, password, submitted, isLoaded } = this.state;
	  return (
		  <div className='login-form'>
			  <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
				  <Grid.Column style={{ maxWidth: 450 }}>
					  <Header as='h2' color='teal' textAlign='center' >
	                     <Icon name='settings' />Регистрация на сайте
					  </Header>
					  <Form size='large' onSubmit={this.handleSubmit} >

						  <Loader active={isLoaded} size='big' />

						  <Segment stacked>
							  <Form.Input
								  name="firstName"
								  fluid icon='user'
								  iconPosition='left'
								  placeholder='Имя'
								  value={firstName} onChange={this.handleChange}
								  onChange={e => this.handleChange(e)} />
							  <Form.Input
								  name="lastName"
								  fluid icon='user'
								  iconPosition='left'
								  placeholder='Фамилия'
								  value={lastName} onChange={this.handleChange}
								  onChange={e => this.handleChange(e)} />
							  <Form.Input
								  name="email"
								  fluid icon='at'
								  iconPosition='left'
								  placeholder='E-mail'
								  value={email} onChange={this.handleChange}
								  onChange={e => this.handleChange(e)}/>
							  <Form.Input
								  name = 'password'
								  fluid icon='lock'
								  iconPosition='left'
								  placeholder='Пароль'
								  type='password'
								  value={password} onChange={this.handleChange}
								  onChange={e => this.handleChange(e)}
							  />

							  <Button color='teal' fluid size='large'>
								  Зарегистрироваться
							  </Button>
						  </Segment>
					  </Form>
					  <Message>
						  После регистрации вы можете добавить больше информации о себе в личном кабинете
					  </Message>
				  </Grid.Column>
			  </Grid>
		  </div>
    )
  }
}
export default connect(null, { signUp, withRouter })(SignUpPage);