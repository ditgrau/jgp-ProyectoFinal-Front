import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { profile } from '../../services/apiCalls';
import { capitalizeFirstLetter } from '../../utils/functions';

import './Profile.css'


export function Profile() {
    const { token } = useAuth();
    const [user, setUser] = useState({
        info :{
            birth_date: '',
            dni: '',
            contact_email: '',
            first_phone: '',
            second_phone: '',
        },
        data: {
            email: '',
            group: {
                name: '',
            }
        }
    });
    const [fullname, setFullname] = useState({
        name: '',
        surname: ''
    })

    const navigate = useNavigate()

    useBackgroundChanger({ color: '#c8edbb' })

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const res = await profile(token);
                setFullname({
                    name: capitalizeFirstLetter(res.data.name),
                    surname: capitalizeFirstLetter(res.info.surname),
                })
                setUser(res);
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
        getMyProfile()
    }, [])

    return (
        <Container className='p-0'>
            <Row className='main-row mb-5'>
                <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                    <h2 className='title-profile'>Datos del perfil</h2>
                    <div className='main-card green-shadow'>
                        <h3>{fullname.name} {fullname.surname}</h3>
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
                            <span> {user.data.group.name}</span>
                        </div>
                    </div>
                    <h2 className='title-profile'>Datos de contacto</h2>
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
                    <div className='register-row mt-4 display-btt'>
                    <div className='main-big-bttn green-bttn' />
                    <div className='main-big-bttn green-bttn' />
                    </div>

                </Col>
            </Row>
        </Container>
    )
}
