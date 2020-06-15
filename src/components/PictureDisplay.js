import React from 'react';

export default class PictureDisplay extends React.Component {
    
    render() {
        const {image} = this.props.location.state
        return (
            <div style={{height: '90vh', width: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={image.image} alt="" style={{objectFit:'contain', maxHeight:'90vh'}} onClick={this.props.history.goBack}></img>
                </div>
            </div>
        )
    }
}

