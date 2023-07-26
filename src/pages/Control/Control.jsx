import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { updateConfirmation, userUnconfirmed } from '../../services/apiCalls';
import { capitalizeFirstLetter } from '../../utils/functions';
import { Header } from '../../common/Header/Header';
import { NavAdmin } from '../../common/Navigation/NavAdmin';

import './Admin.css'
import { useNavigate } from 'react-router-dom';

export function Control() {
    const { token, nameUser } = useAuth();
    const formattedName = capitalizeFirstLetter(nameUser)
    useBackgroundChanger({ color: '#F1F1F1' })
    const [confirming, setConfirming] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
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

    const confirmHandler = (id) => {
        updateConfirmation({ confirmed: true }, id, token)
            .then(res => setConfirming(!confirming))
    }

    const handleClic = () => navigate('/newEvent')

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4} className='mb-4'>
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
                                : (<><h3 className='form-block'>{message}</h3></>)
                        }
                        <h2 className='title-left mx-2 mt-4'>Crear nuevo</h2>
                        <div className='register-row mt-3 ms-3'>
                            {/* <div className='main-big-bttn blue-bttn cursor' onClick={()=>{handleClic(1)}}>
                                <div className='emoji'>🙂</div>
                            </div> */}
                            <div className='main-big-bttn blue-bttn cursor' onClick={handleClic}>
                                <div className='emoji'>🗓️</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <NavAdmin />
        </>
    )
}
