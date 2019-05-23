import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input,
} from 'reactstrap';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

class LoginModal extends Component {
    state = {
        email: '',
        password:'',
    }

    handleSubmit = event => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                email: this.state.email,
                password: this.state.password,
                header: "Content-Type: application/json"
            }
        })
        .then((response) => {
            localStorage.setItem('JWT', response.data.auth_token);
            localStorage.setItem('user_data', JSON.stringify(response.data.user))
            this.props.toggleLoginModal()
            this.props.history.push('/profile')
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleEmail = event => {
        this.setState({email: event.target.value}) //alternatively, can make one function for handleEmail and handlePassword, making id of each input equal to the state.
    }

    handlePassword = event => {
        this.setState({password: event.target.value})
    }

    render() {
        const {toggleLoginModal, isLoginForm, toggleSignUpModal} = this.props;
        const {handleSubmit,handleEmail, handlePassword} = this;
        return (
            <>
                <Modal isOpen={isLoginForm} toggle={toggleLoginModal}>
                    <ModalHeader toggle={toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit = {handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input onChange={handleEmail} type="email" name="email" id="email" placeholder="email address"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input onChange={handlePassword} type="password" name="password" id="password" placeholder="password" />
                            </FormGroup>
                            <p>New member? <a href="/#" onClick={toggleSignUpModal} >Sign up here.</a></p>
                            <ModalFooter>
                                <div>
                                    <Button type='submit' color="primary">Login?</Button>{' '}
                                    <Button color="secondary" onClick={toggleLoginModal}>Cancel</Button>
                                </div>
                            </ModalFooter>
                        </Form>                    
                    </ModalBody>

                </Modal>
            </>
        )
    }
}

export default withRouter(LoginModal)