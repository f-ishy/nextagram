import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "react-graceful-image";
import styled from 'styled-components';
import { Container } from 'reactstrap';
import ImagePreviewer from './ImagePreviewer';

const ImageContainer = styled.div`
  display: inline-block;
  height: ${({ height }) => height};
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
`;

export default function UserImages({ user_id, height, width }) {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${user_id}`)
      .then((response) => {
        setImages(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [user_id])

  return (
    <Container className="d-flex justify-content-center">
      <ImagePreviewer selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <Grid>
        {images.map((image, index) =>
          <ImageContainer onClick={() => setSelectedImage(image)} key={index} width={width} height={height} >
            <Image
              src={image.url}
              alt=""
              className="addhover"
              height='100%'
              width='100%'
              style={{ objectFit: 'cover', padding: '10px' }}
            />
          </ImageContainer>
        )}
      </Grid>
    </Container>
  )
}
