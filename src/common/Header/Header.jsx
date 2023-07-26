import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.css'

export function Header() {
    const { nameUser } = useAuth();
    const [capital, setCapital] = useState('')

    useEffect(() => {
        setCapital((nameUser)[0].toUpperCase());
    }, [])

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