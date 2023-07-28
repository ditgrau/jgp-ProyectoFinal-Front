import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';

import './Auth.css'

export function Unconfirmed() {
    useBackgroundChanger({ color: '#E3D7F8' })
    const { token } = useAuth();

    return (<>
        <Container className='p-0'>
            <Row className='main-row mb-5'>
                <Col xs={11} md={6} lg={4} xl={4}>
                    <h1 className='title-left my-4'>¡Usuario registrado!</h1>
                    <div className='main-card purple-shadow elements-column'>
                        <h3>Cuando se confirme tu cuenta, podrás acceder a ella.</h3>
                        <span>De momento, tendrás que esperar.</span>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}