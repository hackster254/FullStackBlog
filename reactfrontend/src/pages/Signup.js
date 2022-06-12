import React, {useState} from 'react'
import { Container,Row, Col, Form, Button } from 'react-bootstrap'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Signup.css'
import {useSignupUserMutation} from '../services/appApi'

function Signup() { 
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const [signupUser, {isLoading,data, isError, error} ]= useSignupUserMutation()


    const handleSignup =async (e)=> {
        e.preventDefault()
        // axios
        //     .post("http://localhost:5000/users", {email, password})
        //     .then(res =>console.log(res.data))
        //     .catch(error=> console.log(error))

        await signupUser({email, password}).then(({error})=>{
            if(!error){
                navigate('/')
            }

        })
    }
    if (data){
        console.log('sign up data is: '+data)
    }

  return (
    <Container>
        <Row>
            <Col md={7} className="d-flex align-items-center justify-content-center">
                
                <>
            <Form className="signup__form" onSubmit={handleSignup}>
            <h1 className="text-center">Create your Account </h1>
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
  
  <Button variant="primary" type="submit">
      Submit
  </Button>
  <div className='py-4 text-center'>
      <p>Already have an account? <Link to="/login">Login</Link></p>

  </div>
  </Form>
</>
            </Col>
            <Col md={5}
                className="signup__bg--container">
            
            </Col>
        </Row>
    </Container>
  )
}


export default Signup;