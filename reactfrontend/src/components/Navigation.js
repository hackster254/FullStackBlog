import React from 'react'
import {useSelector} from 'react-redux'
import {Nav, NavDropdown, Container, Navbar, Button} from 'react-bootstrap'

import {LinkContainer} from 'react-router-bootstrap'
import { useLogoutUserMutation } from '../services/appApi'


import MenuIcon from '@mui/icons-material/Menu';



function Navigation({loggedIn}) {
  const {user }= useSelector((state)=> state.user)
  const [logoutUser, {isLoading}] = useLogoutUserMutation()

  const handleLogout=(e)=>{
    e.preventDefault()
    console.log('button clicked')
    logoutUser().then(({error})=> {
      if(!error){
        console.log('logged out')
      }
    })

  }
  return (
    <>
    <Navbar bg="light" variant='light' expand="lg" sticky="top">
  <Container>
    <LinkContainer to="/">
    <Navbar.Brand href="#home">Blog and Podcast</Navbar.Brand>
    </LinkContainer>


    
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label='Toggle navigation' >

        <MenuIcon />
    </Navbar.Toggle>
   
    <Navbar.Collapse  id="basic-navbar-nav">
      <Nav className="ms-auto">
        <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        

        <LinkContainer to="/login">
         
          <Nav.Link className="btn btn-primary text-white">{loggedIn ? 'Logged In' : 'Login'}</Nav.Link>
        </LinkContainer>
        
        {user &&(
          <NavDropdown title={user.email} id="basic-nav-dropdown">
            <LinkContainer to="/new-article">
            <NavDropdown.Item href="#action/3.1">New Article</NavDropdown.Item>
            </LinkContainer>
          <LinkContainer to="/articles/me">
          <NavDropdown.Item href="#action/3.2">My articles</NavDropdown.Item>
          </LinkContainer>
          
         
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4"
         
          ><Button onClick={handleLogout} variant='outline-danger'>
            Logout </Button></NavDropdown.Item>
        </NavDropdown>
        )}
        
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
  )
}

export default Navigation