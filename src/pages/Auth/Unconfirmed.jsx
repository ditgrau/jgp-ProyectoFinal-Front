import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';

import './Auth.css'

export function Unconfirmed() {
    useBackgroundChanger({ color: '#E3D7F8' })
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (<>
        <Container className='p-0'>
            <Row className='main-row mb-5'>
                <Col xs={11} md={8} lg={6} xl={4}>
                    <h2 className='title-left'>¡Usuario registrado!</h2>
                    <div className='main-card purple-shadow elements-column'>
                        <span>Cuando se confirme tu cuenta, podrás acceder a ella.</span>
                        <span>De momento, tendrás que esperar.</span>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}