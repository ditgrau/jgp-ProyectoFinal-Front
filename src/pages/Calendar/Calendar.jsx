import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link } from 'react-router-dom';
import { Navigation } from '../../common/Navigation/Navigation';
import { useAuth } from '../../hooks/useAuth';
import { getMyEvents, getEventsByType, getMyGroups } from '../../services/apiCalls';

import './Calendar.css'

export function Calendar() {
    useBackgroundChanger({ color: '#FFE2FB' })
    const { token } = useAuth();
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await getMyEvents(token);
                setEvents(res.data)
                const resGroups = await getMyGroups(token);
                setGroups(resGroups)
            } catch (error) {
                console.error(error)
            }
        }
        getEvents()
    }, [])
console.log(groups)
    useEffect(() => {
        if (events.length === 0) {
            setMessage('¡Aquí aparecerán tus próximos eventos!')
        } else {
            setMessage('')
        }
    }, [events])

    const detailHandler = (id) => {
        console.log(id)
    }

    console.log(events)
    return (
        <>
            <Container>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                        <h2 className='title-left mx-2 my-3'>Mi grupo y horario</h2>
                        <div className='main-card pink-shadow'>
                        {
                            groups.length > 0 ? (
                                groups.map((group) => (
                                    <div className='py-1 space elements-column' key={group.id}>
                                            <div className='span-bold'>{group.group.name}</div> 
                                            <div>{group.group.days}</div>
                                            <div>{group.group.start_hour} / {group.group.end_hour}</div>
                                        </div>
                                ))
                            ) : (
                                <></>
                            )
                        }

                        </div>
                        <h2 className='title-left mx-2 mb-3 mt-5'>Eventos próximos</h2>
                        <div className='elements-row mb-4'>
                            <div className='main-big-bttn pink-bttn' />
                            <div className='main-big-bttn pink-bttn' />
                            <div className='main-big-bttn pink-bttn' />
                        </div>
                        {
                            events.length > 0
                                ? (<>{events.map((event) => (
                                    <div className='elements-row my-1' key={event.id}>
                                        <div className='main-big-bttn pink-bttn cursor' onClick={() => { detailHandler(event.event.id) }} />
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