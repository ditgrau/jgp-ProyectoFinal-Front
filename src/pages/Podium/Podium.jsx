import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useNavigate } from 'react-router-dom';
import { NavAdmin } from '../../common/Navigation/NavAdmin';
import { getAllResults } from '../../services/apiCalls';

export function Podium() {
    useBackgroundChanger({ color: '#F1F1F1' });
    const { token , role } = useAuth();
    const [results, setResults] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        (role === 3) && navigate('/home')
        const getResults = async () => {
            try {
                const res = await getAllResults(token);
                setResults(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getResults();
    }, []);

    const handleNav = () => navigate('/control')

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-2'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4} className='mt-3 mb-5'>
                        <h2 className='title-left mb-3 mt-4'>Resultados</h2>
                        <div className='main-card mb-3'>
                            {
                                (results && results.length > 0)
                                    ? (<>
                                        {
                                            results.map((res) => (
                                                <div className='elements-column division' key={res.id}>
                                                    <div className='space elements-row' >
                                                        <div>{res.user.name} {res.user.surname}</div> <div className='span-bold'>{res.total} | {res.ranking}</div>
                                                    </div>
                                                    <span className='small-text'>{res.name}</span>
                                                </div>
                                            ))
                                        }
                                    </>)
                                    : (<></>)
                            }
                        </div>
                        <div className='elements-row display-btt mb-3'>
                            <div className='main-big-bttn yellow-bttn cursor display-btt'
                                onClick={handleNav}>
                                <div className='emoji'>👈🏾</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <NavAdmin />
        </>
    );
}
