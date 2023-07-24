import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link } from 'react-router-dom';
import { Navigation } from '../../common/Navigation/Navigation';
import { useAuth } from '../../hooks/useAuth';
import { getMyEvents } from '../../services/apiCalls';

import './Calendar.css'

export function Calendar() {
    useBackgroundChanger({ color: '#FFE2FB' })
    const { token } = useAuth();
    const [events, setEvents] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await getMyEvents(token);
                setEvents(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getEvents()
    }, [])

    useEffect(() => {
        if (events.length === 0) {
            setMessage('¡Aquí aparecerán tus próximos eventos!')
        } else {
            setMessage('')
        }
    }, [events])

    console.log(events)
    return (
        <>
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
                        {
                            events.length > 0
                                ? (<>{events.map((event) => (
                                    <div className='elements-row my-1' key={event.event.id}>
                                        <div className='main-big-bttn pink-bttn cursor' onClick={() => { detailHandler(event.id) }} />
                                        <div className='main-target px-3 pink-shadow elements-column'>
                                            <div className='span-bold'>{event.event.name}</div> 
                                            <div >{event.event.start_date} / {event.event.end_date}</div>
                                        </div>
                                    </div>
                                ))

                                }
                                </>)
                                : (<><h3 className='form-block'>{message}</h3></>)
                        }
                    </Col>
                </Row>
            </Container>
            <Navigation color='pink' />
        </>
    )
}