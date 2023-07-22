import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link } from 'react-router-dom';

import './Calendar.css'

export function Calendar() {
    useBackgroundChanger({ color: '#FFE2FB' })
    // useBackgroundChanger({ color: '#F1F1F1' })

    return (
        <Container>
            <Row className='main-row mb-5'>
                <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                    <h2 className='title-left'>Mi grupo y horario</h2>
                    <div className='main-card pink-shadow'></div>
                    <h2 className='title-left'>Eventos próximos</h2>
                    <div className='elements-row mb-4'>
                        <div className='main-big-bttn pink-bttn' />
                        <div className='main-big-bttn pink-bttn' />
                        <div className='main-big-bttn pink-bttn' />
                    </div>
                    <div className='elements-row'>
                    <div className='main-small-bttn pink-bttn' />
                    <div className='main-card pink-shadow'></div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}