import React, { useEffect, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { resultDetail } from "../../redux/detailResultSlice";
import { useSelector, useDispatch } from "react-redux";
import { saveId } from '../../redux/detailResultSlice';
import { getMyResults, getResultById } from "../../services/apiCalls";
import { Header } from "../../common/Header/Header";
import { useNavigate } from "react-router-dom";

export function DetailResult() {
    useBackgroundChanger({ color: '#FFEDAE' })
    const { token } = useAuth();
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
        const dataResult = async () => {
            try {
                const res = await getResultById(resultId, token);
                setData(res)
                console.log(res)
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

    return (
        <>
            <Container className='p-0'>
                <Row className='main-row mb-5'>
                    <Col xs={11} sm={8} md={7} lg={5} xl={4}>
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
                            <div className="elements-row">
                                <div className="elements-column">
                                    <h3 className="title-left">Ranking</h3>
                                    <div className='main-card small-card yellow-shadow'>
                                        <h1>{data.ranking}</h1>
                                    </div>
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
                                                <div className='main-big-bttn yellow-bttn cursor' onClick={() => { detailHandler(res.id) }} />
                                                <div className='main-target px-3 yellow-shadow space elements-row'>
                                                    <div>{res.name}</div> <div className='span-bold'>{res.total}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>)

                            }
                        </section>
                    </Col>
                </Row>
            </Container>

        </>
    )
}