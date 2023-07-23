import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { updateConfirmation, userUnconfirmed } from '../../services/apiCalls';
import { capitalizeFirstLetter } from '../../utils/functions';
import { Navigation } from '../../common/Navigation/Navigation';
import './Admin.css'

export function Control() {
    const { token, nameUser } = useAuth();
    const formattedName = capitalizeFirstLetter(nameUser)
    useBackgroundChanger({ color: '#F1F1F1' })
    const [confirming, setConfirming] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    // const [data, setData] = useState('false');

    useEffect(() => {
        const getUnconfirmed = async () => {
            try {
                const res = await userUnconfirmed(token);
                setUsers(res.data)
                setConfirming(false)
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
        console.log(id)
        console.log(token)
        const data = true;
        console.log(data)
        updateConfirmation(data, id, token)
            .then(res => setConfirming(true))
    }

    console.log(users)
    return (
        <>
        <Container className='p-0'>
            <Row className='main-row mb-5'>
                <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                    <h1 className='title-left'> Hola, {formattedName}</h1>
                    <h2 className='title-left'>Usuarios por confirmar</h2>
                    {
                        users.length > 0
                            ? (<>{users.map((user) => (
                                <div className='elements-row' key={user.id}>
                                    <div className='main-target grey-shadow'>
                                        <span className='span-bold'>{user.name} {user.surname}</span>
                                        <span>{user.group.name}</span>
                                    </div>
                                    <div className='main-small-bttn green-bttn' onClick={() => { confirmHandler(user.id) }} />
                                </div>
                            ))

                            }
                            </>)
                            : (<><h3 className='form-block'>{message}</h3></>)
                    }
                </Col>
            </Row>
        </Container>
        <Navigation/>
        </>
    )
}
