import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Login.css'
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';

export function Login() {

    useBackgroundChanger({color: '#E3D7F8'})
    return (
        <Container>
            <Row>
                <Col>kfahsfjkanl
                </Col>
            </Row>
        </Container>
    )
}