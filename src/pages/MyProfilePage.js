import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import styled from "styled-components";
import ImagePreviewer from "../containers/ImagePreviewer";
import { connect } from "react-redux";

const UserImageContainer = styled(Col)`
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MyProfilePage = ({currentUser}) => {
  const [userPics, setUserPics] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (currentUser.id) {
      axios({
        method: 'get',
        url: `https://insta.nextacademy.com/api/v2/images?userId=${currentUser.id}`,
      })
        .then((response) => {
          setUserPics(response.data)
        })

        .catch((error) => {
          console.log(error);
          localStorage.clear()
          alert("You're not signed in!")
          history.push('/')
        });
    }
  }, [currentUser, history])

  return (
    <>
      {!currentUser.id
        ? <>Loading</>
        :
        <Container className='d-flex text-center justify-content-center flex-column' style={{ width: '80%' }}>
          <ImagePreviewer selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          <div>
            <img
              src={currentUser.profile_picture}
              alt=""
              style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '50%', border: '5px solid #eee' }}
            />
            <h3>{currentUser.username}</h3>
          </div>
          <hr style={{ width: '100%' }} />
          <Row>
            {userPics.map((image, index) =>
              <UserImageContainer md={4} onClick={() => setSelectedImage(image)} key={index}>
                <UserImage src={image.url} alt="" />
              </UserImageContainer>
            )}
          </Row>
        </Container>
      }
    </>
  )
}

const mapStateToProps = ({currentUser}) => ({currentUser})

export default connect(mapStateToProps)(MyProfilePage);