import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useAuth } from '../../hooks/useAuth';
import { Navigation } from '../../common/Navigation/Navigation';
import { getMyResults } from '../../services/apiCalls';

import './Results.css'

export function Results() {
    const { token } = useAuth();
    const [results, setResults] = useState([])
    const [message, setMessage] = useState('')

    useBackgroundChanger({ color: '#FFEDAE' })

    useEffect(() => {
        const getResults = async () => {
            try {
                const res = await getMyResults(token)
                setResults(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getResults()
    }, [])
    console.log(results)

    useEffect(() => {
        if (results.length === 0) {
            setMessage('¡Añade tus eventos!')
        } else {
            setMessage('')
        }
    }, [results])

    const detailHandler = (id) => {
        console.log(id)
    }

    return (
        <>
            <Container>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                        <h2 className='title-left'>Estadística</h2>
                        <h2 className='title-left'>Mis resultados</h2>
                        {
                            results.length > 0
                                ? (<>{results.map((result) => (
                                    <div className='elements-row my-1' key={result.id}>
                                        <div className='main-big-bttn green-bttn cursor' onClick={() => {detailHandler(result.id) }} />
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