import React, { useState } from 'react'

import { useCreateBlogMutation } from '../services/appApi'
import {EditorState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {useNavigate} from 'react-router-dom'




import {Col, Container, Form, Row, Button, Spinner} from 'react-bootstrap'
import axios from 'axios'

import art from '../assets/blog-images/art.jpg'
import './NewArticle.css'


function NewArticle() {
  const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())
  const [title, setTitle]= useState('')
  const [image, setImage]=useState(null)
  const [url, setUrl]=useState('')
  const [uploadingImg, setUploadingImg]= useState(false)
  const [category,setCategory]=useState('')

  const navigate = useNavigate()

  const [createBlog, {isLoading, isSuccess}] = useCreateBlogMutation()

  function handlePublish(e){
    e.preventDefault()
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    //console.log(rawContentState)
    const content = draftToHtml(rawContentState)
    //console.log(content)
    console.log("image before publishing"+JSON.stringify(image))

    if(!title|| !image || !content){
      return alert('Fields missing. Title, image and content required')
    }
    //create article
    createBlog({title, content, image: url, category}).then(({error})=> {
      if(!error){
        //alert post created
        alert('Post created !')
      } else {
        console.log(error)
      }
    })


  }

  function handleEditorChange(state){
    setEditorState(state)
    // we have to convert text to html before sending to html

  }

  async function uploadImage() {
    console.log(JSON.stringify( image))
    
    if(!image) { return}
    setUrl('')
    const data = new FormData()
    
    console.log('image is: '+ JSON.stringify(image))

    data.append("file", image)
    //data.append("cloud_name","hacksterinc")
    
    data.append("upload_preset", 'cdxb6d1z')
    
    setUploadingImg(true)
    // await fetch(
      
    //   "https://api.cloudinary.com/v1_1/hacksterinc/image/upload", {
    //     method: "post",
    //     body: data,
    //     headers: {
    //       "content-type": 'multipart/form-data'
    //     }
    //   }
    // )
    axios.post("https://api.cloudinary.com/v1_1/hacksterinc/image/upload", data)
    // .then((res)=> {
    //   //res.json()
    //   console.log('res is : ',res)

    // })
    .then((data)=> {
      console.log('posting data to cloudinary below')
      console.log(data)
      setUploadingImg(false)
      setUrl(data.data.url)
      console.log("url is  : ",url)

     
    })
    .catch(err=> {
      setUploadingImg(false)
      console.log('error gottens is: '+ err)
    })
  }

  async function handleImageValidation(e){
    e.preventDefault()

    const file = await e.target.files[0]
    
    if(file.size > 1048576){
      setImage(null)
      return alert('File is too big, choose image 1mb or less')
    }else {
      setImage(file)
      //setImage(URL.createObjectURL(e.target.files[0]))
    }

  }

  

  if(isLoading){
    return(
      <div className='py-4'>
        <h1 className='text-center'>Creating your article...</h1>
      </div>
    )
  }
  if(isSuccess){
    setTimeout(()=> {
      navigate('/')
    }, 2000)
    return (
      <div>
        <h1 className='text-center alert-info'>Article created succesfully</h1>
      </div>
    )
  }
  return (
    <Container>
      <Row>
        <Col md={7}>
        <Form onSubmit={handlePublish}>
  <Form.Group className="mb-3">
    <Form.Label>TITLE</Form.Label>
    <Form.Control type="text" placeholder="Enter Blog title" value={title}
    onChange={(e)=> setTitle(e.target.value)}
    />
    
  </Form.Group>
  <Editor 
  
  stripPastedStyles={true}

   editorState={editorState} 
   onEditorStateChange={handleEditorChange}
  wrapperClassName="wrapper mb-4" editorClassName='editor'
  toolbarClassName='toolbar'
  
  
  />

  <Form.Select>
   <option>Select Category</option> 
   <option onChange={(e)=>setCategory(e.CurrentTarget.value)} value='phones'>Phones</option>
   <option onChange={(e)=>setCategory(e.currentTarget.value)} value="evs">Electric vehicles</option>
   <option onChange={(e)=>setCategory(e.currentTarget.value)} value="blockchain">Cryptos</option>
   <option onChange={(e)=>setCategory(e.currentTarget.value)} value="blockchain">Others</option>
  </Form.Select>
  <div>
    {!url &&<p className='alert alert-info'>Please upload an image for publishign your article</p>}
  </div>

  <div className='my-4'>
  <input type="file" onChange={handleImageValidation}  accept="image.png, image.jpeg"></input>
  <Button onClick={uploadImage} disabled={uploadingImg || !image} >Upload</Button>
  

  </div>
 
  <Button variant="primary" type="submit" disabled={uploadingImg || !url}>
   Create article
  </Button>
</Form>
        </Col>
        <Col md={5} className="d-flex justify-content-center align-items-center">
          {uploadingImg &&(
            <div className='text-center'>
              <Spinner  animation="border" role="status" />
              <br />

              <p className='py-2'>uploading image</p>

            </div>
          )}
          <div>
            {!url && !uploadingImg && <img src={art} style={{width: '100%', minHeight: '80%vh',objectFit: 'cover'}} />}
          </div>

          {url && (<img src={url} style={{width: '100%', minHeight: '80%vh',objectFit: 'cover'}} />)}
        </Col>
      </Row>
    </Container>
  )
}

export default NewArticle