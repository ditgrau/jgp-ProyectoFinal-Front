import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { updateConfirmation, userUnconfirmed } from '../../services/apiCalls';
import { capitalizeFirstLetter } from '../../utils/functions';
import { Header } from '../../common/Header/Header';
import { NavAdmin } from '../../common/Navigation/NavAdmin';
import { useNavigate } from 'react-router-dom';
import './Admin.css'


export function Control() {
    const { token, nameUser, role} = useAuth();
    const formattedName = capitalizeFirstLetter(nameUser)
    useBackgroundChanger({ color: '#F1F1F1' })
    const [confirming, setConfirming] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        (role === 3) && navigate('/home')
        const getUnconfirmed = async () => {
            try {
                const res = await userUnconfirmed(token);
                setUsers(res.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUnconfirmed()
    }, [confirming])

    useEffect(() => {
        if (users.length === 0) {
            setMessage('¡No hay usuarios por confirmar!')
        } else {
            setMessage('')
        }
    }, [users])

    //confirmacion de usuarios con el click
    const confirmHandler = (id) => {
        updateConfirmation({ confirmed: true }, id, token)
            .then(res => setConfirming(!confirming))
    }

    // navegacion de los botones
    const navCalendar = () => navigate('/agenda');
    const navNewEvent = () => navigate('/newEvent');
    const navUsers = () => navigate('/users');
    const navPodium = () => navigate('/podium');

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4} className='mb-5'>
                        <Header />
                        <h1 className='title-left my-4'> Hola, {formattedName}</h1>
                        <h2 className='title-left mx-2 my-3'>Usuarios por confirmar</h2>
                        {
                            users.length > 0
                                ? (<>{users.map((user) => (
                                    <div className='elements-row space' key={user.id}>
                                        <div className='main-target px-3 grey-shadow'>
                                            <span className='span-bold'>{user.name} {user.surname}</span>
                                            {user.group.length > 0
                                                && (<> {user.group.map((g, i) => (
                                                    <div className='ms-4' key={i}>
                                                        <span>{g.name}</span>
                                                    </div>
                                                ))}
                                                </>)
                                            }
                                            <span>{user.group.name}</span>
                                        </div>
                                        <div className='main-small-bttn green-bttn cursor' onClick={() => { confirmHandler(user.id) }}>
                                            <div className='emoji-xs'>✔️</div>
                                        </div>
                                    </div>
                                ))
                                }
                                </>)
                                : (<>
                                    <h3>{message}</h3>
                                    <div className='register-row mt-3 ms-3 centered'>
                                        <div className='main-big-bttn blue-bttn cursor elements-column m-3' onClick={navCalendar}>
                                            <div className='emoji'>🗓️</div>
                                            <span className='title-left small-text mt-2'>Eventos</span>
                                        </div>
                                        <div className='main-big-bttn blue-bttn cursor elements-column m-3' onClick={navNewEvent}>
                                            <div className='emoji'>➕</div>
                                            <span className='title-left small-text mt-2'>Nuevo</span>
                                        </div>
                                        <div className='main-big-bttn blue-bttn cursor elements-column m-3' onClick={navUsers}>
                                            <div className='emoji'>🙂</div>
                                            <span className='title-left small-text mt-2'>Usuarios</span>
                                        </div>
                                        <div className='main-big-bttn blue-bttn cursor elements-column m-3' onClick={navPodium}>
                                            <div className='emoji'>🏅</div>
                                            <span className='title-left small-text mt-2'>Podium</span>
                                        </div>
                                    </div>
                                </>)
                        }
                    </Col>
                </Row>
            </Container>
            <NavAdmin />
        </>
    )
}
