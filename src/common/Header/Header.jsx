import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';


import './Header.css'
import { Link } from 'react-router-dom';

export function Header() {
    const { nameUser } = useAuth();
    const [capital, setCapital] = useState('')

    useEffect(() => {
        setCapital((nameUser)[0].toUpperCase());
    }, [])

    console.log(capital)
    return (<>
        <Link to='/profile' className='not-link'>
            <Container className='p-0 tothe-right'>
                <div className='circleProfile '>
                    <p className='supercapital'>{capital}</p>
                </div>
            </Container>
        </Link>
    </>)
}