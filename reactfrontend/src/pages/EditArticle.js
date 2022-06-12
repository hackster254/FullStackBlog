import React, { useState } from 'react'

import {  useUpdateUserBlogMutation } from '../services/appApi'
import {Editor} from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css"

import {EditorState, ContentState, convertFromHTML, convertToRaw, RichUtils, getDefaultKeyBinding} from 'draft-js'

import draftToHtml from 'draftjs-to-html'

import {useNavigate, useParams} from 'react-router-dom'

import {Col, Container, Form, Row, Button} from 'react-bootstrap'


import './NewArticle.css'
import { useSelector } from 'react-redux'

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
    const data = new FormData(); // eslint-disable-line no-undef
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}


function EditArticle() {
  const {id} = useParams()
  const blogs = useSelector((state) =>state.blogs)




  const blogToEdit = blogs.find((blog)=> blog._id === id)
  const [updateUserBlog, {isLoading, isSuccess}] = useUpdateUserBlogMutation()

  const contentDataState = ContentState.createFromBlockArray(convertFromHTML(blogToEdit.content))
  const editorDataState = EditorState.createWithContent(contentDataState)
  const [editorState, setEditorState] = useState(editorDataState)
  
  
  const [title, setTitle]= useState(blogToEdit.title)
  
  const [url, setUrl]=useState(blogToEdit.image)
  
  const [category,setCategory]=useState('')

 
  const navigate = useNavigate()

  const onHandleKeyBindings = (e) => {
    if (e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
    } else {
      return getDefaultKeyBinding(e);
    }
  };
 

  function handleUpdate(e){
    e.preventDefault()

    const rawContentState = convertToRaw(editorState.getCurrentContent())

    const content = draftToHtml(rawContentState)

    if(!title || !content){
      return alert('Title and content required')
    }
    updateUserBlog({id, title,content})


  }

  function handleEditorChange(state){
    setEditorState(state)
    // we have to convert text to html before sending to html

  }
  if(isLoading){
    return(
      <div className='py-4'>
        <h1 className='text-center'>Updating your article...</h1>
      </div>
    )
  }
  if(isSuccess){
    setTimeout(()=> {
      navigate('/')
    }, 2000)
    return (
      <div>
        <h1 className='text-center alert-info'>Article updated succesfully</h1>
      </div>
    )
  }
  return (
    <Container>
      <Row>
        <Col md={7}>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <h2 className='text-center'>Edit Article</h2>
            <Form.Label>TITLE</Form.Label>
            <Form.Control type="text" placeholder="Enter Blog title" value={title}
            onChange={(e)=> setTitle(e.target.value)}
            />
            
          </Form.Group>
          
          
  <div>

          
      <Editor 
      
      // stripPastedStyles={true}

      editorState={editorState} 
      onEditorStateChange={handleEditorChange}
      wrapperClassName="wrapper-class" 
      editorClassName='editor'
      toolbarClassName='toolbar-class'
      
      />
  
    </div>

  <Form.Select className="mb-4">
   <option>Select Category</option> 
   <option onChange={(e)=>setCategory(e.CurrentTarget.value)} value='phones'>Phones</option>
   <option onChange={(e)=>setCategory(e.currentTarget.value)} value="evs">Electric vehicles</option>
   <option onChange={(e)=>setCategory(e.currentTarget.value)} value="blockchain">Cryptos</option>
   <option onChange={(e)=>setCategory(e.currentTarget.value)} value="blockchain">Others</option>
  </Form.Select>
  

  
 
  <Button variant="primary" type="submit" >
   Update article
  </Button>
</Form>
        </Col>
        <Col md={5} className="d-flex justify-content-center align-items-center">
         
         

          <img alt="myimage" src={url} style={{width: '100%', minHeight: '80%vh',objectFit: 'cover'}} />
        </Col>
      </Row>
    </Container>
  )
}

export default EditArticle