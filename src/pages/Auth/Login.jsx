import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from "react-redux";

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
        }
    }

const logUser = () => {
    login(data)
    .then((res)=> {
        dispatch(saveUser(res.data));
        dispatch(saveToken(res.token));
        navigate('/home');
    })
    .catch((error) => setError('No se ha podido establecer la conexión'));
}

    return (
        <Container>
            <Row className='main-row'>
                <Col xs={11} md={6} className='main-col'>
                    <h2>Login</h2>
                    <form className='main-form'
                    // onSubmit={handleSubmit}
                    >
                        <div>
                            <input
                                type='email'
                                className='main-input input-shadow'
                                placeholder='correo electrónico'
                                name={'email'}
                                value={data.email}
                                onChange={(e) => inputHandler(e)}
                            >
                            </input>
                        </div>
                        <div>
                            
                            <input
                                type='password'
                                className='main-input input-shadow'
                                placeholder='password'
                                name={'password'}
                                value={data.password}
                                onChange={(e) => inputHandler(e)}
                            >
                            </input>
                        </div>
                        <Link>
                            <div className='main-big-bttn check-bttn' onClick={handleSubmit}></div>
                        </Link>
                        <Link to='/register'><span className='link-text'>Regístrate aquí</span></Link>
                        {/* <div className="errorText">{badRequest}</div> */}
                    </form>
                </Col>
            </Row>
        </Container>
    )
}