import React from 'react'
import { Container, Spinner, Row, Col } from 'react-bootstrap'
import ArticlePreview from '../components/ArticlePreview'
import {useGetUserBlogsQuery} from '../services/appApi'

function MyArticles() {

  const {data: userArticles, isLoading, isError} = useGetUserBlogsQuery()

  console.log('my articles are: ',userArticles)
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

  if(userArticles.length === 0){
    return(
      <div>
        <h1 className='text-center alert-danger'>You do not have articles yet .</h1>
      </div>
    )
  }
  return (
    
    <Container>
      <h1 className="text-center bold "> My articles</h1>
    
    <Row>
      <Col md={9} className="d-flex justify-content-center flex-wrap gap-4">
        {userArticles.map((article, idx) => <ArticlePreview key={idx} article={article} currentUserBlog={true} />

        )}
      </Col>
    </Row>
    </Container>
  )
}

export default MyArticles