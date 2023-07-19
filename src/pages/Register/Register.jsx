import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';

export function Register() {
    
    useBackgroundChanger({color: '#E3D7F8'})

    return (
        <Container>
            <Row className='main-row'>
                <Col xs={11} md={6}>
                    HOLA
                </Col>
            </Row>
        </Container>
    )
}