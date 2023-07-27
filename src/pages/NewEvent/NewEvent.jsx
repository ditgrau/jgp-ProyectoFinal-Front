import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { getAllEventTypes, getAllGroups, getUserById, newEvent, usersByGroupId } from '../../services/apiCalls';
import '../Control/Admin.css'
import { Link, useNavigate } from 'react-router-dom';
import { NavAdmin } from '../../common/Navigation/NavAdmin';

export function NewEvent() {
    const { token } = useAuth();
    useBackgroundChanger({ color: '#F1F1F1' })
    const navigate = useNavigate();

    const [dataEvent, setDataEvent] = useState({});
    const [dataGroup, setDataGroup] = useState('');
    const [message, setMessage] = useState('');
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [gimnasts, setGimnasts] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState([]);
    const [names, setNames] = useState([]);


    //de inicio: llamada a la api para el renderizado de los dos selectores 
    useEffect(() => {
        const selectorEvents = async () => {
            try {
                const res = await getAllEventTypes(token);
                setEvents(res.data);
            } catch (error) {
                console.error(error)
            }
        };
        const selectorGroups = async () => {
            try {
                const res = await getAllGroups(token);
                setGroups(res);
            } catch (error) {
                console.error(error)
            }
        };
        selectorEvents();
        selectorGroups();
    }, []);

    // construyendo el body de la request con la info de los inputs
    const inputHandler = (e) => {
        setDataEvent((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    // set del estado como parte del body de la request
    const handleEvent = (e) => {
        setDataEvent((prevState) => ({
            ...prevState,
            event_type_id: e.target.value,
            'pdf_path': null,
        }))
    };

    // el condicional hace reset de estado para cuando deselecciona grupo
    useEffect(() => {
        const getUsersByGroup = async () => {
            try {
                if (dataGroup !== "") {
                    const res = await usersByGroupId(dataGroup, token);
                    setGimnasts(res.data);
                } else {
                    setGimnasts([])
                }
            } catch (error) {
                console.error(error)
            }
        };
        getUsersByGroup()
    }, [isActive])

    // este handle trae el id del grupo para el filtrado de gimnastas, setea estado para efecto toggle
    const handleGroup = (e) => {
        setDataGroup(e.target.value),
            setIsActive(!isActive)
    }


    const handleGimnasts = (e) => {
        const userId = e.target.value;
        const nameUser = e.target.name;
        setSelected((prevSelected) => [...prevSelected, userId]);

        getUserById(userId, token)
            .then((res) => setNames((prevNames) => [...prevNames, res.name]))
            .catch((error) => console.log("Error fetching user data:", error));

        console.log(userId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await newEvent(dataEvent, token)
            if (res.success === true) {
                console.log(res)
                setMessage('¡Evento registrado!')
                setTimeout(() => navigate('/agenda'), 2000)
            } else {
                console.log(res.error)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4} className='my-5'>
                        <h2 className='title-left my-3'>Nuevo evento</h2>
                        <form className='main-form'>
                            <input type='name' className='main-input input-reg' placeholder='Título del evento'
                                name={'name'} onChange={(e) => inputHandler(e)}
                            />
                            <select onChange={handleEvent} className='main-input input-reg'>
                                <option value="">Tipo de evento</option>
                                {events.map((e) => {
                                    return <option key={e.id} value={e.id} name={e.name}>{e.name}</option>
                                })}
                            </select>
                            <div className='elements-row input-reg'>
                                <div className='elements-column'>
                                    <span className='span-bold title-left mb-2'>Empieza</span>
                                    <input type='date' className='main-input input-reg'
                                        name={'start_date'} onChange={(e) => inputHandler(e)} />
                                </div>
                                <div className='elements-column'>
                                    <span className='span-bold title-left mb-2'>Termina</span>
                                    <input type='date' className='main-input input-reg'
                                        name={'end_date'} onChange={(e) => inputHandler(e)} />
                                </div>
                            </div>
                            <input type='text' className='main-input input-reg' placeholder='Localización'
                                name={'location'} onChange={(e) => inputHandler(e)}
                            />
                            <input type='text' className='main-input input-reg big-box' placeholder='Añadir comentario'
                                name={'comment'} onChange={(e) => inputHandler(e)}
                            />
                            <span className='span-bold title-left mb-2'>Asignar a:</span>
                            <select onChange={handleGroup} className='main-input input-reg'>
                                <option value="">Selecciona grupo</option>
                                {groups.map((g) => {
                                    return <option key={g.id} value={g.id}>{g.name}</option>
                                })}
                            </select>
                            <select onChange={handleGimnasts} className='main-input input-reg'>
                                <option value="">Selecciona gimnastas</option>
                                {
                                    gimnasts.length > 0 && (<>
                                        {gimnasts.map((gim) => {
                                            return <option key={gim.id} value={gim.user_id}>{gim.user.name} {gim.user.surname}</option>
                                        })}
                                    </>)
                                }
                            </select>
                            <input
                                type='name' className='main-input input-reg' placeholder='Nombre'
                                name={'name'}
                            // onChange={(e) => inputHandler(e)}
                            />

                        </form>
                        <div className='elements-row display-btt me-3'>
                            <Link>
                                <div className='main-big-bttn pink-bttn cursor display-btt'
                                onClick={handleSubmit}
                                ></div>
                            </Link>
                        </div>
                        <span className='span-bold'>{message}</span>
                        <>
                            {
                                names.length > 0
                                && (<>
                                {names.map((name, i)=>(
                                    <span className='tag mx-1' key={i}>{name}</span>
                                ))}
                                </>)
                            }
                        </>
                    </Col>
                </Row>
            </Container>
            <NavAdmin />
        </>
    )
}
