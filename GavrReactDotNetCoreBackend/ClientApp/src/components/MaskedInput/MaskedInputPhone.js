import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import './MaskedInputPhone.css';

class MaskedInputPhone extends Component {
	constructor(props) {
		super(props);
		this.state = { isShowMask:false, value: '', isErrorValidationClassName: ''};
		this.handleChange = this.handleChange.bind(this);
		this.regExp = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
	};

	handleChange(event) {		
		this.props.updateData(event.target.value.replace(/\D/g, ''))
		this.setState({value: event.target.value.replace(/\D/g, '')});
		// !/\d/g.test(event.target.value) &&
		if (this.state.value.length != 10){
			this.setState({isErrorValidationClassName: '_error'})
		} else {
			this.setState({isErrorValidationClassName: ''})
		}
	}


	render() {
		const {placeholder, label } = this.props;
		return (
			<div className='maskedInput'>
				<label>{label}</label>
				<div className={'inputWrapper' + this.state.isErrorValidationClassName}>
					<MaskedInput
					  type='tel'
						mask={this.regExp}
						className="form-control"
						placeholder={placeholder}
						onChange={this.handleChange}
					/>
				</div>
			</div>
		)
	};
};

export default MaskedInputPhone;