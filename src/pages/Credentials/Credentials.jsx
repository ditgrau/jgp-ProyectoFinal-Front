import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../common/Header/Header';
import { Navigation } from '../../common/Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export function Credentials() {
    const { token } = useAuth();
    useBackgroundChanger({ color: '#c8edbb' })
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleClick = () => {
        navigate(('/login'))
        dispatch(logout()) }

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                        <Header />
                        <form className='main-form'>

                            <h2 className='title-left my-3'>Contraseña actual</h2>
                            <input
                                type='password'
                                className='main-input input-reg'
                                placeholder='Contraseña actual'
                                name={'password'}
                                onChange={(e) => inputHandler(e)} />
                            <h2 className='title-left my-3'>Nueva contraseña</h2>
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
                        </form>
                        <div className='register-row mt-3 me-2 display-btt'>
                            <div className=' main-big-bttn green-bttn my-4'>
                                <div className='emoji cursor' onClick={handleClick}>✔️</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Navigation color='green' />
        </>
    )
}