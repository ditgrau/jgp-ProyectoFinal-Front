import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { gettingErrors } from '../../utils/errors';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/apiCalls';
import { saveToken, saveUser } from '../../redux/dataSlice';

import '../../App.css'
import './Auth.css'

export function Login() {

    useBackgroundChanger({ color: '#E3D7F8' })

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputHandler = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.email && data.password) {
            logUser();
        } else {
            setError('Rellene todos los campos')
        }
    }

    const logUser = () => {
        login(data)
            .then((res) => {
                dispatch(saveUser(res.data));
                dispatch(saveToken(res.token));
                if (res.data.role_id === 1) {
                    navigate('/control');
                } else
                    navigate('/home');
            })
            .catch((error) => {
                const errorMessage = gettingErrors(error.response.status);
                setError(errorMessage);
            });
    }

    let hidden = (error === '' )? 'hidden' :'' 

    return (
        <Container>
            <Row className='main-row mt-5'>
                <Col xs={11} md={6} className='main-col'>
                    <p className='supertitle'>clabs</p>
                    <h2>Login</h2>
                    <form className='main-form mt-4'>
                        <div className='elements-row'>
                            <div className='main-big-bttn purple-bttn' />
                            <input
                                type='email'
                                className='main-input input-purple-shadow'
                                placeholder='Correo electrónico'
                                name={'email'}
                                value={data.email}
                                onChange={(e) => inputHandler(e)}>
                            </input>
                        </div>
                        <div className='elements-row'>
                            <div className='main-big-bttn purple-bttn' />
                            <input
                                type='password'
                                className='main-input input-purple-shadow'
                                placeholder='Contraseña'
                                name={'password'}
                                value={data.password}
                                onChange={(e) => inputHandler(e)}>
                            </input>
                        </div>
                        <Link>
                            <div className='main-big-bttn check-bttn cursor' onClick={handleSubmit}></div>
                        </Link>
                        <Link to='/register'><span className='link-text'>Regístrate aquí</span></Link>
                        <div className={`infoMessage px-3 mt-4 ${hidden}`}>{error}</div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}