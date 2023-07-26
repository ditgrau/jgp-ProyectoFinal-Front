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
    const colorNavbar = (role === 1) ? 'grey-navbar' : `${color}-navbar`

    const handleLogout = () => {
        navigate('/login')
        dispatch(logout())       
    }

    return (
        <>
            <Navbar key='lg' expand='lg' className={colorNavbar} fixed="bottom">
                <Container fluid>
                    <Navbar.Brand href="#">Link a home</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton/>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}