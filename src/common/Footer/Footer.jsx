import React from "react"
import { Navbar } from "react-bootstrap"

import './Footer.css'

export function Footer() {
    return (
        <>
            <Navbar key='lg' expand='lg' className='footer px-3' fixed="bottom">
                <div>
                    <span>Designed by Ditgrau</span>
                </div>
                <div>
                    <a href='https://www.linkedin.com/in/ditgrau/' target="_blank" rel="noopener noreferrer" className="mx-2">Linkedin</a>
                    <a href='https://github.com/ditgrau' target="_blank" rel="noopener noreferrer" className="mx-2">Github</a>
                </div>
            </Navbar>
        </>
    )
}