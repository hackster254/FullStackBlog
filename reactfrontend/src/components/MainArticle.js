import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function MainArticle({article}) {
    const {title, image,content, _id} = article
    console.log(article)
  return ( 
      <>
    <Row className="pb-4">
        <Col md={6} className="main-article__image-container">
            <img src={image} alt="imageshown" style={{ width: '100%', maxHeight: 300, objectFit: 'cover'}} />

        </Col>
        <Col md={6}>
            <h2>{title}</h2>
            {/* this will render preview */}
            <div dangerouslySetInnerHTML={{__html: content?.substring(0, 200)}} />

            <LinkContainer to={`/articles/${_id}`}>
            <Button variant="info">Read more

            </Button>
            </LinkContainer>
        </Col>
    </Row>
    </>
  )
}

export default MainArticle