import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';
import "../../index.css";

function UserCard({ user, setIsEditing, setEditingPw, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
        <Card id="networkUser" className='cardBody'>
          <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css' rel='stylesheet' type='text/css' />
          <Card.Body>
            <Row className='justify-content-md-center'>
              <Card.Img
                style={{ width: '10rem', height: '8rem' }}
                className='mb-4'
                src='http://placekitten.com/200/200'
                alt='랜덤 고양이 사진 (http://placekitten.com API 사용)'
              />
            </Row>
            <div id='cardContents'>
              <Card.Title id='cardTitle'>{user?.name}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted' id='cardEmail'>{user?.email}</Card.Subtitle>
              <Card.Text>{user?.description}</Card.Text>
            {isEditable && (
              <Col>
                <Row className='mt-3 text-center text-info'>
                  <Col sm={{ span: 20 }}>
                    <Button
                      variant='outline-info'
                      size='sm'
                      onClick={() => setIsEditing(true)}
                    >
                      편집
                    </Button>
                    <Button
                      className='ms-2'
                      variant='outline-info'
                      size='sm'
                      onClick={() => setEditingPw(true)}
                    >
                      비번변경
                    </Button>
                  </Col>
                </Row>
              </Col>
            )}
            {isNetwork ? (
              <Card.Link
                className='mt-3'
                id='cardLink'
                onClick={() => navigate(`/users/${user.id}`)}
              >
                포트폴리오
              </Card.Link>) : null
            }
            </div>
        </Card.Body>
      </Card>
  );
}

export default UserCard;
