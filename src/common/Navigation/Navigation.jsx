import React from "react"
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap"
import { useAuth } from '../../hooks/useAuth';
import { logout } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import './Navigation.css'

///////////////////////////////////

export function Navigation({ color }) {
    const { role } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const colorNavbar = (role === 3) && `${color}-navbar`

    const handleLogout = () => {
        navigate('/login')
        dispatch(logout())       
    }

    return (
        <>
            <Navbar key='lg' expand='lg' className="mb-3" fixed="bottom">
                <Container fluid className={colorNavbar}>
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
                                <Nav.Link href="/calendar">Calendario</Nav.Link>
                                <Nav.Link href="/results">Resultados</Nav.Link>
                                <Nav.Link href="/profile">Mi perfil</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}