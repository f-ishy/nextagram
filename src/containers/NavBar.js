import React, { Component } from 'react';
import logo from '../logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import profile from '../profilepic.jfif'
import {Link} from 'react-router-dom';
import {
    NavbarToggler,
    Collapse,
    Button,
    Nav,
    NavItem,
    Navbar,
} from 'reactstrap';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginForm : false,
            isSignUpForm: false,
            isOpen: false,
        }
    }

    toggleLoginModal = () => {
        this.setState(prevState => ({
            isSignUpForm: false,
            isLoginForm: !prevState.isLoginForm,
        }))
    }
    
    toggleSignUpModal = () => {
        this.setState(prevState => ({
                isLoginForm: false,
                isSignUpForm: !prevState.isSignUpForm,
            }))
    }

    toggle = () => {
        this.setState(prevState => ({
            isOpen : !prevState.isOpen
        }))
    }

    logout = () => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('user_data')
        this.setState({})
    }

    
    render() {
        return (
            <>
                <Navbar color="light" light expand="md">
                    <Link to="/"><img src={logo} width='40px' style={{ marginLeft: '15px', marginRight: '15px' }} alt=""></img></Link>
                    <Link to="/" style={{fontSize:'1.5rem'}}>Home Page</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar style={{alignItems:'center'}}>
                            {/* <NavItem>
                                <FormGroup style={{display:'flex', alignContent:'center', marginBottom:'0'}}>
                                    <Label for="exampleSearch"/>
                                    <InputGroup>
                                        <Input
                                            type="search"
                                            name="search"
                                            id="exampleSearch"
                                            placeholder="search"
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button color="danger">Search</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </NavItem> */}
                            {localStorage.JWT //if JWT exists, then remove login/signup buttons
                            ? 
                            <>
                                <NavItem>
                                    <Link to="/profile" style = {{margin:'20px'}}><img src={profile} width='30px' height='30px' alt=""/></Link>
                                </NavItem>
                                <NavItem>
                                    <Button color="danger" onClick={this.logout} style={{margin:'10px'}}>Logout</Button>
                                </NavItem>
                            </>
                            : 
                            <NavItem>
                                <Button color="success" onClick={this.toggleLoginModal} style={{margin:'10px'}}>Login/Signup</Button>
                            </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
                <LoginModal isLoginForm={this.state.isLoginForm} toggleLoginModal={this.toggleLoginModal} toggleSignUpModal={this.toggleSignUpModal}/>
                <SignUpModal isSignUpForm={this.state.isSignUpForm} toggleLoginModal={this.toggleLoginModal} toggleSignUpModal={this.toggleSignUpModal}/>
            </>
        )
    }
}