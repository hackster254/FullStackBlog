import React, {useState} from 'react'
import { Container,Row, Col, Form, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import './Login.css'
import {useLoginUserMutation} from '../services/appApi'
function Login() {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // create states for the mutations
    const [loginUser, {isLoading, data, isSuccess, isError, error}] = useLoginUserMutation()
    const handleLogin =  (e)=> {
        e.preventDefault()
        // axios.post("http://localhost:5000/users/login", {email, password})
        // .then(res=>console.log(res.data))
        // .catch(err=> console.log(err.message))
        loginUser({email,password}).then(({error}) =>{
            if(!error){
                navigate('/')
            }
        })
        

    }
    if(data){
        console.log('data from login is: '+JSON.stringify( data))
    }
    

  return (
    <Container>
        <Row>
            <Col md={7} className="d-flex align-items-center justify-content-center">
                
                <>
            <Form className="login__form" onSubmit={handleLogin}>
            <h1 className="text-center">Login</h1>
            {isError &&(<p className='alert alert-danger'>{error.data}</p>)}

        <Form.Group>
            <Form.Label>
                Email Address
            </Form.Label>
            <Form.Control type="email" placeholder="Enter your email.." value={email} 
                onChange={(e)=>setEmail(e.target.value)}
            />
            
        </Form.Group>    
  <Form.Label htmlFor="inputPassword5">Password</Form.Label>
  <Form.Control
    type="password"
    id="inputPassword5"
    aria-describedby="passwordHelpBlock"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
  />
  <Form.Group>
  <Form.Text id="passwordHelpBlock" muted>
    Your password must be 8-20 characters long, contain letters and numbers, and
    must not contain spaces, special characters, or emoji.
  </Form.Text>
  </Form.Group>
  
  <Button variant="primary" type="submit" disabled={isLoading}>
      Submit
  </Button>
  <div className='py-4 text-center'>
      <p>Don't have an account? <Link to="/signup">SignUp</Link></p>

  </div>
  </Form>
</>
            </Col>
            <Col md={5}
                className="login__bg--container">
            
            </Col>
        </Row>
    </Container>
  )
}

export default Login