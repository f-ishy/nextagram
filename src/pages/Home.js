import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../components/Loading';
import UserCards from '../components/UserCards';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { isLoading } = this.props
    return (
      <>
        {
          isLoading
            ? <Loading />
            : <>
              <ul style={{ padding: '0' }}>
                {this.props.users.map(user =>
                  <UserCards user={user} key={user.id} />
                )}
              </ul>
            </>
        }
      </>
    )
  }
}

export default Home
