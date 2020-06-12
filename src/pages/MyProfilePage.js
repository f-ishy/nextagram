import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import ImagePreviewer from "../containers/ImagePreviewer";

const UserImageContainer = styled(Col)`
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MyProfilePage = () => {
  const [userPics, setUserPics] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      axios({
        method: 'get',
        url: `https://insta.nextacademy.com/api/v2/images?userId=${currentUser.id}`,
      })
        .then((response) => {
          setUserPics(response.data)
        })

        .catch((error) => {
          console.log(error);
          localStorage.removeItem('JWT')
          localStorage.removeItem('user_data')
          alert("You're not signed in!")
          history.push('/')
        });
    }
  }, [currentUser, history])

  return (
    <>
      {currentUser === null
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

export default MyProfilePage;