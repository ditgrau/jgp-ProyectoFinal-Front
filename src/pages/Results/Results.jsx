import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link } from 'react-router-dom';
import { Navigation } from '../../common/Navigation/Navigation';


export function Results() {
    useBackgroundChanger({ color: '#FFEDAE' })
    // useBackgroundChanger({ color: '#F1F1F1' })

    return (
        <>
            <Container>
                <Row className='main-row mb-5'>
                    <Col xs={11} md={8} lg={6} xl={4}>

                    </Col>
                </Row>
            </Container>
            <Navigation yellow />
        </>
    )
}