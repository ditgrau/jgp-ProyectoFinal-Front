import React from "react"
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap"
import { useAuth } from '../../hooks/useAuth';
import { logout } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import './Navigation.css'

///////////////////////////////////

export function NavAdmin() {
    const { role } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login')
        dispatch(logout())       
    }

    return (
        <>
            <Navbar key='lg' expand='lg' className='grey-navbar mb-3' fixed="bottom">
                <Container fluid>
                    <Navbar.Brand href="/home">
                        <div className="emoji">🏠</div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton/>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/control">Confirmar</Nav.Link>
                                <Nav.Link href="/users">Usuarios</Nav.Link>
                                <Nav.Link href="/agenda">Agenda</Nav.Link>
                                <Nav.Link href="/newEvent">Crear evento</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}