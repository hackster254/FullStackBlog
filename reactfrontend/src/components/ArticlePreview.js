import React from 'react'

import {Card, Button, ButtonGroup} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import art from '../assets/blog-images/art.jpg'
import { useDeleteUserBlogsMutation } from '../services/appApi'

function ArticlePreview({article, currentUserBlog}) {
    const {title, image,content,category, _id} = article

    const [deleteUserBlogs, {isLoading}] = useDeleteUserBlogsMutation()


    const handleDelete =()=>{
      deleteUserBlogs(_id)

    }
  return (
    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={image || art} 
  
  style={{maxHeight: 200, objectFit: 'cover'}} alt="image"
  />
  <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>
      <div dangerouslySetInnerHTML={{__html: content?.substring(0, 50) + "..."}} />
    </Card.Text>
    <LinkContainer to={`/articles/${_id}`}>
        <Button  variant="info">View</Button>
    </LinkContainer>
    <br/>
    {currentUserBlog &&(
      <>
      <ButtonGroup className='mt-2 d-flex' horizontal>
        <LinkContainer to={`/articles/${_id}/edit`}>
          <Button variant='warning'>Edit</Button>

        </LinkContainer>
        <Button onClick={handleDelete} variant="danger" >{isLoading ? 'Deleting the article .....': 'Delete'}</Button>
        
      </ButtonGroup>
        </>
    )}
    
  </Card.Body>
</Card>
  )
}

export default ArticlePreview