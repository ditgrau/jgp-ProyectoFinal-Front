import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { profile, updateProfile } from '../../services/apiCalls';
import { capitalizeFirstLetter } from '../../utils/functions';
import { Navigation } from '../../common/Navigation/Navigation';
import { Header } from '../../common/Header/Header';
import { NavAdmin } from '../../common/Navigation/NavAdmin';

import './Profile.css'

export function Profile() {
    const { token, role } = useAuth();
    const [user, setUser] = useState({
        info: {
            birth_date: '',
            dni: '',
            contact_email: '',
            first_phone: '',
            second_phone: '',
        },
        data: {
            email: '',
            group: ['']
        }
    });
    const [fullname, setFullname] = useState({
        name: '',
        surname: ''
    })
    const [body, setBody] = useState({});
    const [editing, setEditing] = useState(false)
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    if (role === 1) {
        useBackgroundChanger({ color: '#F1F1F1' })
    } else {
        useBackgroundChanger({ color: '#c8edbb' })
    }

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const res = await profile(token);
                setFullname({
                    name: capitalizeFirstLetter(res.data.name),
                    surname: capitalizeFirstLetter(res.data.surname),
                })
                setUser(res);
            } catch (error) {
                console.error(error);
            }
        }
        getMyProfile()
    }, [editing])

    const inputHandler = (e) => {
        setBody((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const handleClic = () => setEditing(true);
    const handleNavigate = () => navigate('/home');

    const handleUpdate = async () => {
        try {
            const res = await updateProfile(body, token)
            if (res.success === true) {
                setMessage('¡Datos actualizados!')
                setEditing(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                        <Header />
                        <h2 className='title-left my-3'>Datos del perfil</h2>
                        {editing
                            ? (<><form className='main-form'>
                                <input
                                    type='name'
                                    className='main-input input-green-shadow input-reg'
                                    placeholder={fullname.name} name={'name'}
                                    onChange={(e) => inputHandler(e)}
                                />
                                <input
                                    type='surname'
                                    className='main-input input-green-shadow input-reg'
                                    placeholder={fullname.surname} name={'surname'}
                                    onChange={(e) => inputHandler(e)}
                                />
                                <div className='elements-row input-reg'>
                                    <span className='text-register'>Fecha de nacimiento</span>
                                    <input
                                        type='date'
                                        className='main-input input-green-shadow input-reg' name={'birth_date'}
                                        onChange={(e) => inputHandler(e)} />
                                </div>
                                <input
                                    type='dni'
                                    className='main-input input-green-shadow input-reg'
                                    placeholder={user.info.dni} name={'dni'}
                                    onChange={(e) => inputHandler(e)} />
                            </form>
                                <div className='prof-card'>
                                    <div>
                                        <span className='span-bold'>Grupo</span>
                                        {user.data.group.length > 0
                                            && (<> {user.data.group.map((g, i) => (
                                                <div className='ms-4' key={i}>
                                                    <span>{g.name}</span>
                                                </div>
                                            ))}
                                            </>)
                                        }
                                    </div>
                                </div></>
                            )
                            : (
                                <div className='main-card green-shadow'>
                                    <h2>{fullname.name} {fullname.surname}</h2>
                                    <div>
                                        <span className='span-bold'>Fecha de nacimiento</span>
                                        <span> {user.info.birth_date}</span>
                                    </div>
                                    <div>
                                        <span className='span-bold'>DNI</span>
                                        <span> {user.info.dni}</span>
                                    </div>
                                    <div>
                                        <span className='span-bold'>Email</span>
                                        <span> {user.data.email}</span>
                                    </div>
                                    <div>
                                        <span className='span-bold'>Grupo</span>
                                        {user.data.group.length > 0
                                            && (<> {user.data.group.map((g, i) => (
                                                <div className='ms-4' key={i}>
                                                    <span>{g.name}</span>
                                                </div>
                                            ))}
                                            </>)
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <h2 className='title-left mt-5 mb-3'>Datos de contacto</h2>
                        {editing
                            ? (<form className='main-form'>
                                <input
                                    type='email'
                                    className='main-input input-green-shadow input-reg'
                                    placeholder={user.info.contact_email} name={'contact_email'}
                                    onChange={(e) => inputHandler(e)} />
                                <div className='register-row input-reg'>
                                    <input
                                        type='first_phone'
                                        className='main-input input-green-shadow input-reg'
                                        placeholder={user.info.first_phone} name={'first_phone'}
                                        onChange={(e) => inputHandler(e)} />
                                    <input
                                        type='second_phone'
                                        className='main-input input-green-shadow input-reg'
                                        placeholder={user.info.second_phone} name={'second_phone'}
                                        onChange={(e) => inputHandler(e)} />
                                </div>
                            </form>)
                            : (
                                <>
                                    <div className='main-card green-shadow'>
                                        <div>
                                            <span className='span-bold'>Email</span>
                                            <span> {user.info.contact_email}</span>
                                        </div>
                                        <div>
                                            <span className='span-bold'>Móvil 1</span>
                                            <span> {user.info.first_phone}</span>
                                        </div>
                                        <div>
                                            <span className='span-bold'>Móvil 2</span>
                                            <span> {user.info.second_phone}</span>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {editing
                            ? (<>
                                <div className='register-row mt-4 display-btt'>
                                    <div className='main-big-bttn green-bttn cursor' onClick={handleUpdate}>
                                        <div className='emoji-sm'>👍🏻</div></div>
                                </div>
                            </>)
                            : (<>
                                <div className='register-row mt-4 display-btt'>
                                    <div className='main-big-bttn green-bttn cursor' onClick={handleClic}>
                                        <div className='emoji'>✏️</div>
                                    </div>
                                    <div className='main-big-bttn green-bttn cursor' onClick={handleNavigate}>
                                        <div className='emoji'>👈🏻</div>
                                    </div>
                                </div>
                            </>
                            )
                        }
                        <h3 className='form-block'>{message}</h3>
                    </Col>
                </Row>
            </Container>
            {
                role === 1
                    ? (<>
                        <NavAdmin />
                    </>)
                    : (<>
                        <Navigation color='green' />
                    </>)
            }
        </>
    )
}
