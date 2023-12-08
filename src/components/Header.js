import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { BsFillCartDashFill } from "react-icons/bs";
import { Cartstate } from './Context';
import {FaTrash} from "react-icons/fa"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
function Header() {
    const {state:{cart},dispatch,productDispatch}=Cartstate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate=useNavigate()
 return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>

                    <Form.Control
                        type="search"
                        placeholder="Search a product"
                        className="m-auto bg-white text-black"
                        style={{ width: "500px" }}
                        onChange={(e)=>{productDispatch({
                            type:"filterbysearch",
                            payload:e.target.value,
                        })}}
                    />
                    <Button variant="success" onClick={handleShow}>
                    <BsFillCartDashFill/><sup>{cart.length}</sup>
      </Button>

                    <Offcanvas show={show} onHide={handleClose} placement='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Cart Items</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {cart.length > 0 ?
                                cart.map((prod) => {
                                    return (
                                        <div className='d-flex justify-content-evenly align-items-center'>
                                            <img src={prod.image} alt={prod.name} className='h-25 w-25' />
                                            <span>{prod.name}</span>
                                            <span>$ {prod.price}</span>
                                            <span><FaTrash className='text-primary' onClick={()=>dispatch({
                                                type:"removefromcart",
                                                payload:prod
                                            })} /></span>
                                        </div>
                                    )
                                }
                                ) : <p>cart is empty</p>}
                                <Button variant="primary" onClick={()=>navigate('./Cart')}>Go To Cart</Button>
                        </Offcanvas.Body>
                    </Offcanvas>

                </Container>
            </Navbar>

        </div>
    )
}

export default Header
