import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { Navigation } from '../../common/Navigation/Navigation';
import { getAverage, getMyResults } from '../../services/apiCalls';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveId } from '../../redux/detailResultSlice';
import { Header } from '../../common/Header/Header';

import './Results.css'

export function Results() {
    const { token } = useAuth();
    const [results, setResults] = useState([])
    const [stadistics, setStadistics] = useState({
        average: null,
        ranking: null
    })
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useBackgroundChanger({ color: '#FFEDAE' })

    useEffect(() => {
        const getResults = async () => {
            try {
                const res = await getMyResults(token)
                const orderedResults = (res.data).reverse()
                setResults(orderedResults)
            } catch (error) {
                console.error(error)
            }
        }
        const getMyStadistics = async () => {
            try {
                const res = await getAverage(token)
                setStadistics((prevData) => ({
                    ...prevData,
                    average: res.average,
                    ranking: res.ranking
                }))
            } catch (error) {
                console.error(error)
            }
        }
        getResults()
        getMyStadistics()
    }, [])

    useEffect(() => {
        if (results.length === 0) {
            setMessage('¡Añade tus eventos!')
        } else {
            setMessage('')
        }
    }, [results])

    const detailHandler = (resultId) => {
        dispatch(saveId({id: resultId}))
        navigate('/detailResult')
    }
console.log(results)
console.log(stadistics)
    return (
        <>
            <Container>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                    <Header/>
                        <h2 className='title-left'>Estadística</h2>
                        <div className='elements-row'>
                            <div className='main-card small-card yellow-shadow'>
                                <h1>{stadistics.average}</h1>
                                <span>Mi nota media</span>
                            </div>
                            <div className='main-card small-card yellow-shadow'>
                                <h1>{stadistics.ranking}</h1>
                                <span>Mi media ranking</span>
                            </div>
                        </div>
                        <h2 className='title-left mt-5 mb-0'>Mis resultados</h2>
                        <div className=' elements-row display-btt'>
                            <div className='main-big-bttn yellow-bttn cursor mb-3' />
                        </div>
                        {
                            results.length > 0
                                ? (<>{results.map((result) => (
                                    <div className='elements-row my-1' key={result.id}>
                                        <div className='main-big-bttn yellow-bttn cursor' onClick={() => { detailHandler(result.id) }} />
                                        <div className='main-target px-3 yellow-shadow space elements-row'>
                                            <div>{result.name}</div> <div className='span-bold'>{result.total}</div>
                                        </div>
                                    </div>
                                ))

                                }
                                </>)
                                : (<><h3 className='form-block'>{message}</h3></>)
                        }


                    </Col>
                </Row>
            </Container>
            <Navigation color='yellow' />
        </>
    )
}