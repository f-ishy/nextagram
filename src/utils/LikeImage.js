import axios from "axios";

export const likeImage = (id) => {
  axios({
    method: 'post',
    url: `https://insta.nextacademy.com/api/v1/images/${id}/toggle_like`,
    headers: {
      "authorization": `Bearer ${localStorage.getItem('JWT')}`,
      "content-type": "application/json"
    }
  })
    .then((res) => { console.log(res); })
    .catch((err) => { console.log(err) })
}