import React, { useEffect, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { userDetail } from "../../redux/detailUserSlice";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from '../../utils/functions';

import '../Control/Admin.css'
import { getUserById } from "../../services/apiCalls";

export function DetailUser() {
    useBackgroundChanger({ color: '#F1F1F1' })
    const dataSlice = useSelector(userDetail)
    const userId = dataSlice.data.id
    const { token } = useAuth();
    const [data, setData] = useState({});
    const [role, setRole] = useState({});
    const [event, setEvent] = useState({});
    const [group, setGroup] = useState({});
    const [result, setResult] = useState({});
    const [userData, setUserData] = useState({});
    const [fullname, setFullname] = useState({
        name: '',
        surname: ''
    })
    useEffect(() => {
        const dataUser = async () => {
            try {
                const res = await getUserById(userId, token);
                setData(res)
                setRole(res.role)
                setEvent(res.event)
                setGroup(res.group)
                setResult(res.result)
                setUserData(res.user_data)
                setFullname({
                    name: capitalizeFirstLetter(res.name),
                    surname: capitalizeFirstLetter(res.surname),
                })
            } catch (error) {
                console.error(error);
            }
        }
        dataUser()
    }, [])

    return (<>
        <Container className='p-0'>
            <Row className='main-row mb-5'>
                <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                    <div className="elements-column">
                        <h1 className='title-left'>{fullname.name} {fullname.surname}</h1>
                        <span className='title-left' key={role.id}>{role.name}</span>
                    </div>
                    <div className='main-card my-4'>
                        <div className="elements-row my-1">
                            <span className='title-left span-bold'>Fecha de nacimiento</span>
                            <span className='title-left'>{userData.birth_date}</span>
                        </div>
                        <div className="elements-row my-1">
                            <span className='title-left span-bold'>Email</span>
                            <span className='title-left'>{data.email}</span>
                        </div>
                        <div className="elements-row my-1">
                            <span className='title-left span-bold'>DNI</span>
                            <span className='title-left'>{userData.dni}</span>
                        </div>
                    </div>
                    <h2 className='title-left'>Datos de contacto</h2>
                    <div className='main-card my-4'>
                        <div className="elements-row my-1">
                            <span className='title-left span-bold'>Email</span>
                            <span className='title-left'>{userData.contact_email}</span>
                        </div>
                        <div className="elements-row my-1">
                            <span className='title-left span-bold'>Móvil 1</span>
                            <span className='title-left'>{userData.first_phone}</span>
                        </div>
                        <div className="elements-row my-1">
                            <span className='title-left span-bold'>Móvil 2</span>
                            <span className='title-left'>{userData.second_phone}</span>
                        </div>
                    </div>
                    <h2 className='title-left'>Grupos</h2>
                    <div className='main-card my-4'>
                        {group.length > 0 ? (
                            <>
                                {group.map((g) => (
                                    <div className="elements-row my-1" key={g.id}>
                                        <span className='title-left span-bold'>Grupo </span>
                                        <span className='title-left'>{g.name}</span>
                                    </div>
                                ))}
                            </>
                        ) : (<><span className='title-left span-bold'>No pertenece a ningún grupo </span></>)}
                    </div>
                    <h2 className='title-left'>Calendario</h2>
                    <div className='main-card my-4'>
                        {event.length > 0 ? (
                            <>
                                {event.map((e) => (
                                    <div className="elements-column my-2 division" key={e.id}>
                                        <span className='title-left span-bold'>{e.name}</span>
                                        <span className='title-left'>{e.start_date} / {e.end_date}</span>
                                    </div>
                                ))}
                            </>
                        ) : (<><span className='title-left span-bold'>No pertenece a ningún grupo </span></>)}
                    </div>
                    <h2 className='title-left'>Resultados</h2>
                    <div className='main-card my-4'>
                        {result.length > 0 ? (
                            <>
                                {result.map((r) => (
                                    <div className="elements-row my-2 division space" key={r.id}>
                                        <span className='title-left'>{r.name}</span>
                                        <span className='title-left span-bold'>{r.total} | {r.ranking}</span>
                                    </div>
                                ))}
                            </>
                        ) : (<><span className='title-left span-bold'>No pertenece a ningún grupo </span></>)}
                    </div>

                </Col>
            </Row>
        </Container>
    </>)
}
