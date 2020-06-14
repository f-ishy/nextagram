import loading from '../loadingcat.gif';
import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div style={{ height: '100vh' }}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                    <img src={loading} alt=""></img>
                    <p>If the cat can't stop spinning, please <a href="https://insta.nextacademy.com/api/v1/users/" target="_blank">click here</a> and enable the certificate!</p>
                </div>
            </div>
        )
    }
}

export default Loading
