import React from 'react';
import axios from 'axios';
// import PictureDisplay from '../components/PictureDisplay'
import {Link} from 'react-router-dom'

export default class UserImages extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        images: [],
      }
    }
    
    componentDidMount(){
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.user_id}`)
          .then((response) => {
            this.setState({
              images: response.data,
              imagesLoading: false
            })
            // this.setState({users : response.data, isLoading : false})
          })
          .catch((error) => {
            console.log(error);
          })
      }

    renderPic = (e) =>{
      console.log('asd')
      // {e.target.classList.contains('overlay')
      // ? e.target.classList.remove('overlay')
      // : e.target.classList.add('overlay')}
    }

    render() {
        return (
            <>
              {this.state.images.map((image, index) =>
                // <Image src={image} alt="" style={{objectFit:'cover', height:'300px', width:'400px', margin:'10px'}}></Image>
                <Link to={{pathname: "/image", state: {image: {image}}}} key={index}>
                  <img key={index} 
                    src={image} 
                    alt="" 
                    height={this.props.height} 
                    width={this.props.width} 
                    style={{objectFit:'cover', margin:'10px'}} 
                    onClick={this.renderPic}>
                  </img>
                </Link>
              )}
            </>
          )
    }

}