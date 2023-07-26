import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { getAllEvents, getEventsByType } from '../../services/apiCalls';
import { NavAdmin } from '../../common/Navigation/NavAdmin';
import { Link, useNavigate } from 'react-router-dom';

import '../Control/Admin.css'

export function Agenda() {
    const { token } = useAuth();
    useBackgroundChanger({ color: '#F1F1F1' })
    const [events, setEvents] = useState([])
    const [restore, setRestore] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await getAllEvents(token);
                setEvents(res.data)
            } catch (error) {
                console.error(error);
            }
        }
        getEvents()
    }, [restore])

    // el boton trae el id del tipo de evento
    const clickHandler = (id) => {
        getEventsByType(token, id)
            .then((res) => {
                setEvents(res)
            })
    }

    // click sobre el titulo restaura la llamada a allEvents
    const resetHandler = () => {
        setRestore(!restore)
        console.log(restore)
    }

    const navigateHandler = () => navigate('/newEvent')

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4} className='my-5'>

                        <h2 className='title-left cursor my-4' onClick={() => { resetHandler() }} >Agenda</h2>
                        <div className='elements-row mb-4 space'>
                            <div className='elements-row'>
                                <div className='main-big-bttn pink-bttn cursor' onClick={() => { clickHandler(1) }} >
                                    <div className='emoji-sm'>🎖️</div>
                                </div>
                                <div className='main-big-bttn pink-bttn cursor' onClick={() => { clickHandler(2) }} >
                                    <div className='emoji-sm'>⚡</div>
                                </div>
                                <div className='main-big-bttn pink-bttn cursor' onClick={() => { clickHandler(3) }} >
                                    <div className='emoji-sm'>🎉</div>
                                </div>
                            </div>
                            <div className='main-big-bttn pink-bttn' onClick= {navigateHandler}>
                                <div className='emoji-sm'>➕</div>
                            </div>
                        </div>
                        <div className='main-card'>
                            {
                                events.length > 0
                                    ? (<>{events.map((event) => (
                                        <div className='elements-column my-2 mx-2' key={event.id}>
                                            <span className='span-bold'>{event.name}</span>
                                            <span>{event.start_date} / {event.end_date}</span>
                                        </div>
                                    ))
                                    }
                                    </>)
                                    : (<>
                                        {/* <h3 className='form-block'>{message}</h3> */}
                                    </>)
                            }
                        </div>
                    </Col>
                </Row>
            </Container >
            <NavAdmin />
        </>
    )
}