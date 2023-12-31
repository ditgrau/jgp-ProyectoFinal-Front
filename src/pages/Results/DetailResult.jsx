import React, { useEffect, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { resultDetail } from "../../redux/detailResultSlice";
import { useSelector, useDispatch } from "react-redux";
import { saveId } from '../../redux/detailResultSlice';
import { deleteResult, getMyResults, getResultById } from "../../services/apiCalls";
import { Header } from "../../common/Header/Header";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../../common/Navigation/Navigation";

export function DetailResult() {
    useBackgroundChanger({ color: '#FFEDAE' })
    const { token , role } = useAuth();
    const dataSlice = useSelector(resultDetail)
    const resultId = dataSlice.data.id
    const [data, setData] = useState({})
    const [results, setResults] = useState({})
    const [arrayid, setArrayid] = useState([])
    const [threeRes, setThreeRes] = useState([])
    const [active, setActive] = useState([])
    const [restore, setRestore] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        (role === 1) && navigate('/control')
        const dataResult = async () => {
            try {
                const res = await getResultById(resultId, token);
                setData(res)
            } catch (error) {
                console.error(error);
            }
        }
        const getResults = async () => {
            try {
                const res = await getMyResults(token)
                setResults(res.data)
                setArrayid(res.idResults)

            } catch (error) {
                console.error(error)
            }
        }
        dataResult()
        getResults()
    }, [restore])

    useEffect(() => {
        const index = arrayid.indexOf(resultId);
        if (index !== -1) {
            arrayid.splice(index, 1);
            setArrayid(arrayid.slice(0, 3));
            setActive(!active)
        }
    }, [results])

    useEffect(() => {
        const resultsArray = [];
        const threeResults = async () => {
            for (const id of arrayid) {
                try {
                    const res = await getResultById(id, token);
                    resultsArray.push(res);
                } catch (error) {
                    console.error(error);
                }
            }
            setThreeRes(resultsArray)
        }
        threeResults();
    }, [active])

    const detailHandler = (resultId) => {
        dispatch(saveId({ id: resultId }))
        setRestore(!restore)
    }

    const handleClick = () => navigate('/results')

    const deleteHandler = (id) => {
        deleteResult(id, token)
            .then(() => navigate('/results'))
    }

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4} className="mb-5">
                        <Header />
                        <section className="elements-column my-3">
                            <h1 className='title-left'>{data.name}</h1>
                            <div className="elements-row my-4">
                                <div className="elements-column">
                                    <h3 className="title-left">D</h3>
                                    <div className='main-card small-card yellow-shadow'>
                                        <span>{data.difficulty}</span>
                                    </div>
                                </div>
                                <div className="elements-column">
                                    <h3 className="title-left">A</h3>
                                    <div className='main-card small-card yellow-shadow'>
                                        <span>{data.artistic}</span>
                                    </div>
                                </div>
                                <div className="elements-column">
                                    <h3 className="title-left">E</h3>
                                    <div className='main-card small-card yellow-shadow'>
                                        <span>{data.execution}</span>
                                    </div>
                                </div>
                                <div className="elements-column">
                                    <h3 className="title-left">Total</h3>
                                    <div className='main-card small-card yellow-shadow'>
                                        <h3>{data.total}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row-delete">
                                <div className="elements-column">
                                    <h3 className="title-left">Ranking</h3>
                                    <div className='main-card small-card yellow-shadow'>
                                        <h1>{data.ranking}</h1>
                                    </div>
                                </div>
                                <div className='main-big-bttn green-bttn cursor mb-2' onClick={() => { deleteHandler(resultId) }}>
                                        <div className='emoji'>🗑️</div>
                                </div>
                            </div>
                        </section>
                        <section className="elements-column my-3">
                            {
                                threeRes.length > 0
                                && (<>
                                    <h1 className='title-left my-4'>Otros resultados</h1>
                                    {
                                        threeRes.map((res) => (
                                            <div className='elements-row my-1' key={res.id}>
                                                <div className='main-big-bttn yellow-bttn cursor' onClick={() => { detailHandler(res.id) }}>
                                                    <div className='emoji-sm'>🔎</div>
                                                </div>
                                                <div className='main-target px-3 yellow-shadow space elements-row'>
                                                    <div>{res.name}</div> <div className='span-bold'>{res.total}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>)

                            }
                        </section>
                        <section className=" display-btt me-4">
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