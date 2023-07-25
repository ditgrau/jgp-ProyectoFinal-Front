import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { useDispatch } from "react-redux";
import { getAllGroups, getAllUsers, getUserByName, getUsersByGroup } from '../../services/apiCalls';
import '../Control/Admin.css'
import { saveId } from '../../redux/detailUserSlice';
import { useNavigate } from 'react-router-dom';

export function Users() {
    useBackgroundChanger({ color: '#F1F1F1' })
    const { token } = useAuth();
    const [users, setUsers] = useState([])
    const [members, setMembers] = useState([])
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState('');
    const [userFilter, setUserFilter] = useState('');
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await getAllUsers(token)
                setUsers(res)
            }
            catch (error) {
                console.error(error);
            }
        }
        const selectorGroups = async () => {
            const res = await getAllGroups();
            if (Array.isArray(res)) {
                setGroups(res);
            } else {
                console.error(res)
            }
        };
        getUsers();
        selectorGroups();
    }, [])

    useEffect(() => {
        const usersByGroup = async () => {
            try {
                if (groupId !== "") {
                    const res = await getUsersByGroup(groupId, token);
                    setMembers(res.data);
                    setUsers([])
                } else {
                    const res = await getAllUsers(token);
                    setUsers(res);
                    setMembers([])
                }
            } catch (error) {
                console.error(error)
            }
        };
        usersByGroup()
    }, [isActive])

    const handleSelect = (e) => {
        setGroupId(e.target.value)
        setIsActive(!isActive)
    };

    const searchHandler = async () => {
        try {
            const res = await getUserByName(userFilter, token)
            console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    const clickHandler = (UserId) => {
        dispatch(saveId({id: UserId}))
        navigate('/detail')
    }

    const inputHandler = (e) => {
        setUserFilter(e.target.value)
    };

    return (
        <Container className='p-0'>
            <Row className='main-row mb-5'>
                <Col xs={11} sm={8} md={7} lg={5} xl={4}>
                    <h2 className='title-left my-3'>Usuarios</h2>

                    <select onChange={handleSelect} className='main-input input-reg'>
                        <option value="">Grupo</option>
                        {groups.map((group) => {
                            return <option key={group.id} value={group.id}>{group.name}</option>
                        })}
                    </select>

                    <div className='elements-row mt-2 space'>
                        <input
                            type='name'
                            className='main-input input-longer'
                            placeholder='Buscar por nombre' name={'name'}
                            onChange={(e) => inputHandler(e)}
                        />
                        <div className='elements-row'>
                            <div className='main-small-bttn green-bttn cursor' onClick={searchHandler} />
                            <div className='main-small-bttn green-bttn cursor' />
                        </div>
                    </div>
                    <div className='main-card my-4'>
                        {
                            users.length > 0
                                ? (<>{users.map((user) => (
                                    <div className='elements-column my-2 division cursor' key={user.id} onClick={() => {clickHandler(user.id)}}>
                                        <span className='span-bold '>{user.name} {user.surname}</span>
                                        {
                                            (user.group).length > 0
                                            && (<>{
                                                (user.group).map((group, i) => (
                                                    <span key={i}>{group.name}</span>
                                                ))
                                            }</>)
                                        }
                                    </div>
                                ))
                                }
                                </>)
                                : (<>
                                    {
                                        members.length > 0
                                            ? (<>
                                                {members[0].map((mem) => (
                                                    <div className='my-2 division' key={mem.id}>
                                                        <span className='span-bold'>{mem.name}{mem.surname}</span>
                                                    </div>
                                                ))}
                                            </>)
                                            : (<><h3 className='form-block'>No hay users</h3></>)
                                    }
                                </>)
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
