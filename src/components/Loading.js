import loading from '../loadingcat.gif';
import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div style={{ height: '100vh' }}>
                <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={loading} alt=""></img>
                </div>
            </div>
        )
    }
}

export default Loading
