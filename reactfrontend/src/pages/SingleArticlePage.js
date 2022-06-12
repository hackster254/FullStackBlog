import React from 'react'
import { useGetOneBlogQuery } from '../services/appApi'
import {useParams} from 'react-router-dom'
import { Container, Spinner, Col } from 'react-bootstrap'

function SingleArticlePage() {
  const {id} = useParams()

  const {data: article, isLoading, isError} = useGetOneBlogQuery(id)
  console.log(article)

  if(isError){
    return(
      <div>
        <h1 className='text-center alert-danger'>An error has occurred</h1>
      </div>
    )
  }
  if(isLoading){
    return(
      <div className='d-flex justify-content-center py-5'>
        <Spinner  animation="border" />
      </div>
    )
  }
  return (
   
    <Container>
      <Col md={8}style={{margin: '0 auto'}}>
        <img src={article.image} style={{width: '100%', maxHeight: '400px', objectFit: 'cover'}} alt="myimage"/>
        <h1>{article.title}</h1>
        <p>By {article?.creator.email}</p>
        <div dangerouslySetInnerHTML={{__html: article?.content}}>

        </div>
      
      </Col>
    </Container>
  )
}

export default SingleArticlePage