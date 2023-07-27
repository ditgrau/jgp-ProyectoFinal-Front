import React from "react"
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap"

import './Footer.css'
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <>
            <Navbar key='lg' expand='lg' className='footer px-3' fixed="bottom">
                <div>
                    <span>Designed by Ditgrau</span>
                </div>
                <div>
                    <Link to='https://www.linkedin.com/in/ditgrau/' className="mx-2">
                        Linkedin
                    </Link>
                    <Link to='https://github.com/ditgrau' className="mx-2">
                        Github
                    </Link>
                </div>

            </Navbar>
        </>
    )
}