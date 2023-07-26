import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { capitalizeFirstLetter } from '../../utils/functions';
import { Navigation } from '../../common/Navigation/Navigation';
import { getAverage, myLastResults, getClubAverage } from '../../services/apiCalls';
import { Header } from '../../common/Header/Header';

import './Home.css'

export function Home() {
    const [bestResults, setBestResults] = useState([]);
    const [average, setAverage] = useState([]);
    const [clubAvg, setClubAvg] = useState([]);
    const { token, nameUser } = useAuth();
    const navigate = useNavigate();
    const formattedName = capitalizeFirstLetter(nameUser)
    useBackgroundChanger({ color: '#B7DDFF' })

    useEffect(() => {
        const getResults = async () => {
            try {
                const result = await myLastResults(token)
                setBestResults(result.data)
            } catch (error) {
                console.error(error)
            }
        }
        const getMyAverage = async () => {
            try {
                const average = await getAverage(token)
                setAverage(average.average)
            } catch (error) {
                console.error(error)
            }
        }
        const clubAverage = async () => {
            try {
                const club = await getClubAverage(token)
                setClubAvg(club)
            } catch (error) {
                console.error(error)
            }
        }
        clubAverage()
        getResults()
        getMyAverage()
    }, [])

    const handleClick = (id) => {
        if (id === 1) {
            navigate('/results')
        } else if (id === 2) {
            navigate('/calendar')
        }
    }

    return (
        <>
            <Container>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                        <Header />
                        <h1 className='title-left my-4'> Hola, {formattedName}</h1>
                        <h2 className='title-left my-3'>Calendario</h2>
                        <div className='main-card blue-shadow'></div>
                        <div className=' main-big-bttn blue-bttn my-4'>
                            <div className='emoji cursor' onClick={()=>{handleClick(2)}}>🗓️</div>
                        </div>
                        <div className='elements-row'>
                            <div className='elements-column'>
                                <h2 className='title-left'>Mi media</h2>
                                <div className='main-card small-card blue-shadow'>
                                    <h1>{average}</h1>
                                </div>
                            </div>
                            <div className='elements-column'>
                                <h2 className='title-left'>La del club</h2>
                                <div className='main-card small-card blue-shadow'>
                                    <h1>{clubAvg.club}</h1>
                                </div>
                            </div>
                        </div>
                        <h2 className='title-left mb-3 mt-4'>Mis mejores resultados</h2>
                        <div className='main-card blue-shadow'>
                            {
                                bestResults.length > 0 ? (
                                    bestResults.map((result) => (
                                        <div className='py-1 space elements-row' key={result.id}>
                                            <div>{result.name}</div> <div className='span-bold'>{result.total}</div>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                        <div className=' main-big-bttn blue-bttn mt-4'>
                            <div className='emoji cursor' onClick={()=>{handleClick(1)}}>🏅</div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Navigation color='blue' />
        </>
    )
}
