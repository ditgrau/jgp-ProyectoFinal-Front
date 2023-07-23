import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';


export function Credentials() {
    const { token } = useAuth();
    useBackgroundChanger({ color: '#c8edbb' })
    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                        <h2 className='title-left'>Contraseña actual</h2>
                        <input
                            type='password'
                            className='main-input input-reg'
                            placeholder='Contraseña actual'
                            name={'password'}
                            onChange={(e) => inputHandler(e)} />
                        <h2 className='title-left'>Nueva contraseña</h2>
                        <input
                            type='password'
                            className='main-input input-reg'
                            placeholder='Nueva contraseña'
                            name={'password'}
                            onChange={(e) => inputHandler(e)} />
                        <input
                            type='password'
                            className='main-input input-reg'
                            placeholder='Repite contraseña'
                            name={'password'}
                            onChange={(e) => inputHandler(e)} />
                    </Col>
                </Row>
            </Container>
            <Navigation color='green' />
        </>
    )
}