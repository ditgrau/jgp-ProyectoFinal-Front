import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { useBackgroundChanger } from '../../hooks/useBackgroundChanger';
import { getAllGroups, getAllUsers } from '../../services/apiCalls';
import '../Control/Admin.css'

export function Users() {
    useBackgroundChanger({ color: '#F1F1F1' })
    const { token } = useAuth();
    const [users, setUsers] = useState({})
    const [groups, setGroups] = useState([]);
    const [groupFilter, setGroupFilter] = useState('');
    const [userFilter, setUserFilter] = useState('');
    console.log(token)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await getAllUsers(token)
                setUsers(res)
                console.log(res)
            }
            catch (error) {
                console.error(error);
            }
        }
        getUsers();
    }, [])
    console.log(users)
    useEffect(() => {
        const selectorGroups = async () => {
            const res = await getAllGroups();
            if (Array.isArray(res)) {
                setGroups(res);
            } else {
                console.error(res)
            }
        };
        selectorGroups();
    }, []);

    const handleSelect = (e) => {
        setGroupFilter((prevState) => ({
            ...prevState,
            group: e.target.value,
        }))
    };

    const inputHandler = (e) => {
        setUserFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
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
                            className='main-input'
                            placeholder='Nombre' name={'name'}
                            onChange={(e) => inputHandler(e)}
                        />
                        <div className='elements-row'>
                            <div className='main-small-bttn green-bttn' />
                            <div className='main-small-bttn green-bttn' />
                        </div>
                    </div>
                    <div className='main-card my-4'>
                        {
                            users.length > 0
                                ? (<>{users.map((user) => (
                                    <div className='elements-column my-2 division' key={user.id}>
                                        <span className='span-bold'>{user.name} {user.surname}</span>
                                        {
                                            (user.group).length > 0
                                            && (<>{
                                                (user.group).map((group) => (
                                                    <span>{group.name}</span>
                                                ))
                                            }</>)
                                        }
                                    </div>
                                ))

                                }
                                </>)
                                : (<><h3 className='form-block'></h3></>)
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
