import React, {Component} from "react";
import axios from 'axios';
import Loading from '../components/loading';
import {Link} from 'react-router-dom'
import {Container} from 'reactstrap';



export default class MyProfilePage extends Component {
    constructor(props){
    super(props)
    this.state = {
        userPics : [],
        isLoading : true,
    }
  }


  componentDidMount() {
    axios({
        method: 'get',
        url: 'https://insta.nextacademy.com/api/v1/images/me',
        headers: {
            "authorization": `Bearer ${localStorage.getItem('JWT')}`,
            "content-type": "application/json"
        } 
    })
    .then((response) => {
        console.log(response)
        this.setState({
            userPics : response.data
        })
        console.log(JSON.parse(localStorage.getItem('user_data')))
        this.setState({isLoading: false})
    })

    .catch((error) => {
        console.log(error);
        localStorage.removeItem('JWT')
        localStorage.removeItem('user_data')
        alert("You're not signed in!")
        this.props.history.push('/')
    });
  }

  render() {

    return (
      <>
        <Container className='d-flex text-center justify-content-center flex-column' style ={{width:'80%'}}>
          <div style={{borderBottom: '1px solid grey'}}>
            { (localStorage.getItem('JWT'))
            ? <img 
              src={`http://next-curriculum-instagram.s3.amazonaws.com/${JSON.parse(localStorage.getItem('user_data')).profile_picture}`} 
              alt=""
              style={{width:'150px', height:'150px', objectFit:'contain', borderRadius:'50%', border:'5px solid black'}}
            />
            : <img 
              src="http://next-curriculum-instagram.s3.amazonaws.com/profile-placeholder.jpg" 
              alt =""
              style={{width:'100px', height:'100px', objectFit:'contain', border:'5px solid black', borderRadius:'50%'}}
            />
            }            
            <h1>Own profile</h1>
          </div>
          <div>
            {this.state.userPics.map((image, index) =>
              <Link to={{pathname: "/image", state: {image: {image}}}} key={index}>
                <img src={image} key={index} width="300px" height="300px" className="addhover" style={{margin:'10px', objectFit: 'cover'}} alt =""/>
              </Link>
            )}
          </div>
        </Container>
      </>
    )
  }
}