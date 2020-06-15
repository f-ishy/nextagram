import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input,
} from 'reactstrap';
import axios from 'axios'

export default class SignUpModal extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        confirmpassword: '',
    }

    handleEntry = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.password === this.state.confirmpassword) {
            axios({
                method: 'post',
                url: 'https://insta.nextacademy.com/api/v1/users/',
                data: {
                    email: this.state.email,
                    password: this.state.password,
                    header: "Content-Type: application/json",
                    username: this.state.username,
                }
            })
                .then((response) => {
                    localStorage.setItem('JWT', response.data.auth_token);
                    localStorage.setItem('user_data', JSON.stringify(response.data.user))
                    this.props.setCurrentModal('')
                    this.setState({})
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert('Your passwords do not match')
        }
    }

    render() {
        // const {toggleLoginModal, isSignUpForm, toggleSignUpModal} = this.props;
        const { currentModal, setCurrentModal } = this.props;
        const { handleEntry, handleSubmit } = this;
        return (
            <>
                <Modal isOpen={currentModal === 'signup'} toggle={() => (setCurrentModal(''))}>
                    <ModalHeader toggle={() => (setCurrentModal(''))}>Sign up</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input onChange={handleEntry} type="email" name="email" id="email" placeholder="email address" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input onChange={handleEntry} type="text" name="username" id="username" placeholder="username" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input onChange={handleEntry} type="password" name="password" id="password" placeholder="password" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Confirm Password</Label>
                                <Input
                                    onChange={handleEntry}
                                    type="password"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    placeholder="re-type password" />
                            </FormGroup>
                            <p>Already a member? <a href="/#" onClick={() => setCurrentModal('login')} >Log in here.</a></p>
                            <ModalFooter>
                                <div>
                                    <Button color="primary" type="submit">Sign up</Button>{' '}
                                    <Button color="secondary" onClick={() => (setCurrentModal(''))}>Cancel</Button>
                                </div>

                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}