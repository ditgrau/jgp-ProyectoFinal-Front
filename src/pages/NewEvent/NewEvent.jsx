import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { getAllEvents } from '../../services/apiCalls';
import '../Control/Admin.css'
import { Link } from 'react-router-dom';

export function NewEvent() {
    const { token } = useAuth();
    useBackgroundChanger({ color: '#F1F1F1' })
    const [dataEvent, setDataEvent] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const selectorEvents = async () => {
            try {
                const res = await getAllEvents(token);
                if (Array.isArray(res)) {
                    setEvents(res);
                } else {
                    console.log(res)
                }
            } catch (error) {
                console.error(error)
            }
        };
        selectorEvents();
    }, []);

    const inputHandler = (e) => {
        setDataEvent((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const handleEvent = (e) => {
        setDataEvent((prevState) => ({
            ...prevState,
            event_type_id: e.target.value,
        }))
    };

    return (
        <Container className='p-0'>
            <Row className='main-row mb-5'>
                <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                    <h2 className='title-left my-3'>Nuevo evento</h2>
                    <form className='main-form'>
                        <input
                            type='name'
                            className='main-input input-reg'
                            placeholder='Título del evento'
                            name={'name'}
                            onChange={(e) => inputHandler(e)}
                        />
                        <select onChange={handleEvent} className='main-input input-reg'>
                            <option value="">Tipo de evento</option>
                            {events.map((e) => {
                                return <option key={e.id} value={e.id}>{e.name}</option>
                            })}
                        </select>
                        <div className='elements-row input-reg'>
                            <div className='elements-column'>
                                <span className='span-bold title-left mb-2'>Empieza</span>
                                <input
                                    type='date'
                                    className='main-input input-reg'
                                    name={'start_date'}
                                    onChange={(e) => inputHandler(e)} />
                            </div>
                            <div className='elements-column'>
                                <span className='span-bold title-left mb-2'>Termina</span>
                                <input
                                    type='date'
                                    className='main-input input-reg'
                                    name={'end_date'}
                                    onChange={(e) => inputHandler(e)} />
                            </div>
                        </div>
                        <input
                            type='text'
                            className='main-input input-reg'
                            placeholder='Localización'
                            name={'location'}
                            onChange={(e) => inputHandler(e)}
                        />
                        <input
                            type='text'
                            className='main-input input-reg big-box'
                            placeholder='Añadir comentario'
                            name={'comment'}
                            onChange={(e) => inputHandler(e)}
                        />
                        {/* <span className='span-bold'>Asignar a:</span>
                        <select onChange={handleSelect} className='main-input input-purple-shadow input-reg'>
                            <option value="">Selecciona grupo</option>
                            {groups.map((group) => {
                                return <option key={group.id} value={group.id}>{group.name}</option>
                            })}
                        </select>
                        <input
                            type='name'
                            className='main-input input-purple-shadow input-reg'
                            placeholder='Nombre'
                            name={'name'}
                        // onChange={(e) => inputHandler(e)}
                        /> */}
                        
                    </form>
                    <div className='elements-row display-btt me-3'>
                            <Link>
                                <div className='main-big-bttn pink-bttn cursor display-btt'
                                // onClick={handleSubmit}
                                ></div>
                            </Link>
                        </div>
                </Col>
            </Row>
        </Container>
    )
}