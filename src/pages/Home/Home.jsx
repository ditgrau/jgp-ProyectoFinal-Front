import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { capitalizeFirstLetter } from '../../utils/functions';

import './Home.css'
import { Navigation } from '../../common/Navigation/Navigation';

export function Home() {
    const { token, nameUser } = useAuth();
    const formattedName = capitalizeFirstLetter(nameUser)
    useBackgroundChanger({ color: '#B7DDFF' })

    return (
        <>
            <Container>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                        <h1 className='title-left'> Hola, {formattedName}</h1>
                        <h2 className='title-left'>Calendario</h2>
                        <div className='main-card blue-shadow'></div>
                        <div className='register-row mt-4 display-btt'>
                            <Link to='/calendar' className='main-big-bttn blue-bttn' />
                        </div>
                        <div className='elements-row'>
                            <div className='elements-column'>
                                <h2 className='title-left'>Mi media</h2>
                                <div className='main-card small-card blue-shadow'>
                                    <h1>16.855</h1>
                                </div>
                            </div>
                            <div className='elements-column'>
                                <h2 className='title-left'>La del club</h2>
                                <div className='main-card small-card blue-shadow'>
                                    <h1>16.855</h1>
                                </div>
                            </div>
                        </div>
                        <h2 className='title-left'>Mis resultados</h2>
                        <div className='main-card blue-shadow'></div>
                        <div className='register-row mt-4 display-btt'>
                            <Link to='/results' className='main-big-bttn blue-bttn' />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Navigation color='blue' />
        </>
    )
}
