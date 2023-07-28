import React, { useEffect, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { userDetail } from "../../redux/detailUserSlice";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from '../../utils/functions';
import { deleteUserById, getAllGroups, getAllRoles, getUserById, updateUserRole } from "../../services/apiCalls";
import { NavAdmin } from "../../common/Navigation/NavAdmin";

import '../Control/Admin.css'
import { useNavigate } from "react-router-dom";



export function DetailUser() {
    useBackgroundChanger({ color: '#F1F1F1' })
    const dataSlice = useSelector(userDetail)
    const userId = dataSlice.data.id
    const navigate = useNavigate()
    const { token, role } = useAuth();
    const [data, setData] = useState({});
    const [roleUser, setRoleUser] = useState({});
    const [event, setEvent] = useState({});
    const [group, setGroup] = useState({});
    const [result, setResult] = useState({});
    const [userData, setUserData] = useState({});
    const [fullname, setFullname] = useState({
        name: '',
        surname: ''
    })
    const [editing, setEditing] = useState(false)
    const [groupSelector, setGroupSelector] = useState([])
    const [roleSelector, setRoleSelector] = useState([])
    const [roleId, setRoleId] = useState({})
    const [groupId, setGroupId] = useState({})


    useEffect(() => {
        (role === 3) && navigate('/home')
        const dataUser = async () => {
            try {
                const res = await getUserById(userId, token);
                setData(res)
                setRoleUser(res.role)
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

    useEffect(() => {
        const groupSelector = async () => {
            try {
                const res = await getAllGroups(token);
                setGroupSelector(res)
            } catch (error) {
                console.error(error);
            }
        }
        const roleSelector = async () => {
            try {
                const res = await getAllRoles(token);
                setRoleSelector(res)
            } catch (error) {
                console.error(error);
            }
        }
        roleSelector()
        groupSelector()
    }, [editing])

    const handleClic = () => setEditing(true);

    const handleRole = (e) => {
        setRoleId((prevState) => ({
            ...prevState,
            'role_id': e.target.value,
        }))
    }

    const handleGroup = (e) => {
        setGroupId((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            "user_id": userId
        }))
    }

    const checkClick = () => {
        console.log(roleId)
        console.log(userId)
        console.log(token)
        updateUserRole(roleId, userId, token)
            .then((res) => console.log(res))
    }

    const handleNav = () => navigate('/users')

    const deleteHandler = (id) => {
        deleteUserById(id, token)
            .then(() => navigate('/users'))
    }

    return (<>
        <Container className='p-0'>
            <Row className='main-row mb-5'>
                <Col xs={11} sm={8} md={7} lg={5} xl={4} className="mb-3 mt-5">
                    <div className="elements-column">
                        <h1 className='title-left'>{fullname.name} {fullname.surname}</h1>
                        {editing ? (<>
                            <div className='elements-row display-btt mt-2'>
                                <div className='main-big-bttn green-bttn cursor' onClick={checkClick}>
                                    <div className='emoji-sm'>✔️</div>
                                </div>
                            </div>
                            <select
                                onChange={handleRole}
                                className='main-input input-green-shadow input-reg mt-3'>
                                <option value="">Selecciona role</option>
                                {roleSelector.map((role) => {
                                    return <option key={role.id} value={role.id} name={'role_id'}>{role.name}</option>
                                })}
                            </select>
                        </>)
                            : (<>
                                <span className='title-left' key={roleUser.id}>{roleUser.name}</span>
                                <div className='elements-row display-btt'>
                                    <div className='main-big-bttn green-bttn cursor' onClick={handleClic}>
                                        <div className='emoji'>✏️</div>
                                    </div>
                                    <div className='main-big-bttn green-bttn cursor' onClick={() => { deleteHandler(userId) }}>
                                        <div className='emoji'>🗑️</div>
                                    </div>
                                </div>
                            </>)}
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
                    {editing
                        ? (<>
                            <select
                                onChange={handleGroup}
                                className='main-input input-green-shadow input-reg my-2'>
                                <option value="">Selecciona grupo</option>
                                {groupSelector.map((group) => {
                                    return <option key={group.id} value={group.id} name={'group_id'}>{group.name}</option>
                                })}
                            </select>

                        </>)
                        : (<>
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
                        </>)}
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
                    <div className='elements-row display-btt mb-3'>
                        <div className='main-big-bttn green-bttn cursor display-btt'
                            onClick={handleNav}>
                            <div className='emoji'>👈🏾</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >
        <NavAdmin />
    </>)
}
