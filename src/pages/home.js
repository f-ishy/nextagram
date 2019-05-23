import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import UserImages from '../containers/userimages';
import Loading from '../components/loading';
import {Link} from 'react-router-dom';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

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
                                    <Container fluid key={user.id}>
                                        <Row style={{ borderBottom: '2px solid grey'}}>
                                            <Col md="3" style={{ textAlign: 'center' }}>
                                                {/* <li key={user.id} style={{listStyleType: 'none', textAlign: 'center' }}> */}
                                                <Link to={`/users/${user.id}`}>
                                                    <img src={user.profileImage} style={{ border: '2px solid black', width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginTop: '20px', marginBottom: '20px' }} alt=""></img>
                                                </Link>
                                                <p style={{}}>{user.id}: {user.username}</p>
                                                {/* </li> */}
                                            </Col>
                                            <Col md="9">
                                                <Container fluid>
                                                    <UserImages height='200px' width='280px' user_id={user.id} />
                                                    {/* <UserImages user_id={user.id}/> */}
                                                </Container>
                                            </Col>
                                        </Row>
                                    </Container>
                                )
                                }
                            </ul>
                        </>
                }
            </>
        )
    }
}

export default Home