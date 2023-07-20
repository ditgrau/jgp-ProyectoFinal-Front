import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';

import '../../App.css'
import './Auth.css'
import { Link } from 'react-router-dom';
import { getAllGroups, register } from '../../services/apiCalls';

export function Register() {
    useBackgroundChanger({ color: '#E3D7F8' })
    const [groups, setGroups] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const selectorGroups = async () => {
            const res = await getAllGroups();
            if (Array.isArray(res)) {
                setGroups(res);
            } else {
                console.error(res)
            }
        };
        selectorGroups();
    }, []);

    const handleSelect = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            group: e.target.value,
        }))
    };

    const inputHandler = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(userData);
        } catch (error) {
            console.error(error);
        }

        console.log(userData);
        return (
            <Container>
                <Row className='main-row'>
                    <Col xs={11} md={4}>
                        <h2>Registro</h2>
                        <form className='main-form'>
                            <div className='register-row'>
                                <div className='main-big-bttn purple-bttn' />
                                <h3>Información gimnasta</h3>
                            </div>
                            <input
                                type='name'
                                className='main-input input-purple-shadow input-reg'
                                placeholder='Nombre'
                                name={'name'}
                                onChange={(e) => inputHandler(e)}
                            />
                            <input
                                type='surname'
                                className='main-input input-purple-shadow input-reg'
                                placeholder='Apellidos'
                                name={'surname'}
                                onChange={(e) => inputHandler(e)}
                            />
                            <div className='elements-row input-reg'>
                                <span className='text-register'>Fecha de nacimiento</span>
                                <input
                                    type='date'
                                    className='main-input input-purple-shadow input-reg'
                                    name={'birth_date'}
                                    onChange={(e) => inputHandler(e)} />
                            </div>
                            <input
                                type='dni'
                                className='main-input input-purple-shadow input-reg'
                                placeholder='DNI'
                                name={'dni'}
                                // value={data.email}
                                onChange={(e) => inputHandler(e)} />
                            <select onChange={handleSelect} className='main-input input-purple-shadow input-reg'>
                                <option value="">Selecciona grupo</option>
                                {groups.map((group) => {
                                    return <option key={group.id} value={group.id}>{group.name}</option>
                                })}
                            </select>
                            <div className='register-row form-block'>
                                <div className='main-big-bttn purple-bttn' />
                                <h3>Información de contacto</h3>
                            </div>
                            <input
                                type='email'
                                className='main-input input-purple-shadow input-reg'
                                placeholder='Email contacto'
                                name={'contact_email'}
                                onChange={(e) => inputHandler(e)} />
                            <div className='register-row input-reg'>
                                <input
                                    type='first_phone'
                                    className='main-input input-purple-shadow input-reg'
                                    placeholder='Móvil 1'
                                    name={'first_phone'}
                                    onChange={(e) => inputHandler(e)} />
                                <input
                                    type='second_phone'
                                    className='main-input input-purple-shadow input-reg'
                                    placeholder='Móvil 2'
                                    name={'second_phone'}
                                    onChange={(e) => inputHandler(e)} />
                            </div>
                            <div className='register-row form-block'>
                                <div className='main-big-bttn purple-bttn' />
                                <h3>Información de acceso</h3>
                            </div>
                            <input
                                type='email'
                                className='main-input input-purple-shadow input-reg'
                                placeholder='Email registro'
                                name={'email'}
                                onChange={(e) => inputHandler(e)} />
                            <input
                                type='password'
                                className='main-input input-purple-shadow input-reg'
                                placeholder='Contraseña'
                                name={'password'}
                                onChange={(e) => inputHandler(e)} />
                            <Link>
                                <div className='main-big-bttn check-bttn' onClick={handleSubmit}></div>
                            </Link>
                            {/* <div className="errorText">{badRequest}</div> */}
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}