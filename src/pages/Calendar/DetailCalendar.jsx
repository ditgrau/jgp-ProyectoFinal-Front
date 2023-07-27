import React, { useEffect, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Header } from "../../common/Header/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { eventDetail } from "../../redux/detailEventSlice";
import { Navigation } from "../../common/Navigation/Navigation";
import { getEventById, myEventById } from "../../services/apiCalls";

export function DetailCalendar() {
    useBackgroundChanger({ color: '#FFE2FB' })
    const { token, role } = useAuth();
    const dataSlice = useSelector(eventDetail)
    const eventId = dataSlice.data.id
    const [event, setEvent] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getDetail = async () => {
            try {
                if (role === 1) {
                    const res = await getEventById(eventId, token)
                    setEvent(res)
                } else {
                    const res = await myEventById(eventId, token)
                    setEvent(res.event)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getDetail()
    }, [])

    const handleClick = () => navigate('/calendar')

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4} className="mb-5">
                        <Header />
                        <h1 className='title-left my-3'>{event.name}</h1>
                        <div className='main-card pink-shadow'>
                            <div className="division my-3 mx-3">
                                <span className='span-bold me-4'>Fecha</span>
                                <span>{event.start_date} / {event.end_date}</span>
                            </div>
                            <div className="division my-3 mx-3">
                                <span className='span-bold me-4'>Localización</span>
                                <span>{event.location}</span>
                            </div>
                            <div className="my-3 mx-3">
                                <span className='span-bold me-4'>Observaciones</span>
                                <span>{event.comment}</span>
                            </div>
                        </div>
                        <section className=" display-btt my-4">
                            <div className='main-big-bttn pink-bttn cursor' onClick={handleClick}>
                                <div className='emoji-sm'>👈🏽</div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
            <Navigation color='pink' />
        </>
    )
}