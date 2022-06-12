import React from 'react'
import {useGetAllBlogsQuery} from '../services/appApi'
import { Container, Row, Spinner, Col, ListGroup } from 'react-bootstrap'
import MainArticle from '../components/MainArticle'

import ArticlePreview from '../components/ArticlePreview'
import { LinkContainer } from 'react-router-bootstrap'


function Home() {

  const {data: articles, isLoading, isError}= useGetAllBlogsQuery()
  console.log(articles)
  

   const sidebarArticles = articles?.slice(0,4)|| []
  
  console.log('side bar articles', sidebarArticles)

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
      <div className='banner'>
        <h1 className='banner_title'>MERN BLOG AND PODCAST</h1>
      </div>
      <Row>
         <MainArticle article={articles[articles.length -1]}/>
         <Col md={9} className="blog-main d-flex pb-4 flex-wrap gap-4">
           {articles.map((article, idx)=> (
          <ArticlePreview article={article} key={idx} />
           //<p>{article.title}</p>
           
           )
           
           )}
         </Col>
         <Col md={3} className="blog-sidebar py-4">
         <ListGroup variant="flush">
           <h2>Latest articles</h2>
           {sidebarArticles.map((article, idx)=> (
             <LinkContainer to={`/articles/${article._id}`} key={idx}>
             <ListGroup.Item>{article.title}</ListGroup.Item>
             </LinkContainer>
           
           ))}
            
         
          </ListGroup>
         </Col>
        </Row>
        


    </Container>
  )
}

export default Home