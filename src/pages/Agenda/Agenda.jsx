import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from "react-redux";
import { saveId } from '../../redux/detailEventSlice';
import { getAllEvents, getEventsByType } from '../../services/apiCalls';
import { NavAdmin } from '../../common/Navigation/NavAdmin';
import { useNavigate } from 'react-router-dom';

import '../Control/Admin.css'
import { checkRole } from '../../hooks/useNavigateRole';

export function Agenda() {
    const { token } = useAuth();
    useBackgroundChanger({ color: '#F1F1F1' })
    const [events, setEvents] = useState([])
    const [restore, setRestore] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    checkRole(3)
    
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

    const detailHandler = (eventId) => {
        dispatch(saveId({ id: eventId }))
        console.log(eventId)
        navigate('/detailCalendar')
    }

    const navigateHandler = () => navigate('/newEvent')
    const handleNav = () => navigate('/control')

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4} className='mt-3 mb-5'>

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
                            <div className='main-big-bttn pink-bttn cursor' onClick={navigateHandler}>
                                <div className='emoji-sm'>➕</div>
                            </div>
                        </div>
                        <div className='main-card mb-3'>
                            {
                                events.length > 0
                                && (<>
                                    {events.map((event) => (
                                        <div className='elements-column my-2 mx-2 cursor' key={event.id} onClick={()=>{detailHandler(event.id)}}>
                                            <span className='span-bold'>{event.name}</span>
                                            <span>{event.start_date} / {event.end_date}</span>
                                        </div>
                                    ))}
                                </>)
                            }
                        </div>
                        <div className='elements-row display-btt mb-5'>
                            <div className='main-big-bttn pink-bttn cursor display-btt'
                                onClick={handleNav}>
                                <div className='emoji'>👈🏿</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
            <NavAdmin />
        </>
    )
}