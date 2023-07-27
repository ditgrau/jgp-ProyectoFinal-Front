import React, { useEffect, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Header } from "../../common/Header/Header";
import { Navigation } from "../../common/Navigation/Navigation";
import { addResult } from "../../services/apiCalls";

import './Results.css'
import { Link, useNavigate } from "react-router-dom";

export function AddResult() {
    useBackgroundChanger({ color: '#FFEDAE' })
    const [data, setData] = useState({})
    const { token } = useAuth();
    const navigate = useNavigate()

    const inputHandler = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addResult(data, token)
            if (res.success === true) {
                navigate('/results')
            } else {
                console.log(res)
            }
            console.log(res)
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => navigate('/results')

    return (
        <>
            <Container>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                        <Header />
                        <h2 className='title-left mt-5'>Nuevo resultado</h2>
                        <form className='main-form'>
                            <div className='elements-column input-reg'>
                                <h3 className="mt-3 title-left">Nombre de la competición</h3>
                                <input
                                    type='name'
                                    className='main-input input-yellow-shadow input-reg'
                                    placeholder='Nombre'
                                    name={'name'}
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className='register-column'>
                                <h3 className="mt-3 title-left">Notas</h3>
                                <div className='register-row'>
                                    <input
                                        type='name'
                                        className='main-input input-yellow-shadow input-reg'
                                        placeholder='D'
                                        name={'difficulty'}
                                        onChange={(e) => inputHandler(e)}
                                    />
                                    <input
                                        type='name'
                                        className='main-input input-yellow-shadow input-reg'
                                        placeholder='A'
                                        name={'artistic'}
                                        onChange={(e) => inputHandler(e)}
                                    />
                                    <input
                                        type='name'
                                        className='main-input input-yellow-shadow input-reg'
                                        placeholder='E'
                                        name={'execution'}
                                        onChange={(e) => inputHandler(e)}
                                    />
                                    <input
                                        type='name'
                                        className='main-input input-yellow-shadow input-reg'
                                        placeholder='Total'
                                        name={'total'}
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                            </div>
                            <div className='elements-column'>
                                <h3 className="mt-3 title-left">Posición ranking</h3>
                                <input
                                    type='name'
                                    className='main-input input-yellow-shadow input-reg'
                                    placeholder='Ranking'
                                    name={'ranking'}
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                        </form>
                        <section className=" display-btt me-4 mt-5 elements-row">
                            <div className='main-big-bttn yellow-bttn cursor'
                                onClick={handleSubmit}>
                                    <div className='emoji-sm'>👍🏿</div>
                                </div>
                            <div className='main-big-bttn yellow-bttn cursor' onClick={handleClick}>
                                <div className='emoji-sm'>👈🏽</div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
            <Navigation color='yellow' />
        </>
    )
}