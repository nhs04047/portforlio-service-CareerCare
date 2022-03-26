import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';
import '../../index.css';

import ProfileImg from './ProfileImg';

function UserCard({
  user,
  setIsEditing,
  setEditingPw,
  isEditable,
  isNetwork,
  setIsEditProfile,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <Card.Link
        className='mt-3'
        id='cardLink'
        onClick={() => {
          if (isNetwork) {
            navigate(`/users/${user.id}`);
            console.log('log');
          }
        }}
      >
        <Card id='networkUser' className='mr-1 mb-3  py-1'>
          <link
            href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
            rel='stylesheet'
            type='text/css'
          />
          <Card.Body>
            <Row className='justify-content-md-center'>
              <ProfileImg profileUrl={user?.profileImgPath} />
            </Row>
            <div id='cardContents'>
              <Card.Title id='cardTitle'>{user?.name}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted' id='cardEmail'>
                {user?.email}
              </Card.Subtitle>
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
                        onClick={() => setIsEditProfile(true)}
                      >
                        프로필 사진 변경
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
              {/* {isNetwork && (
                <Card.Link
                  className='mt-3'
                  id='cardLink'
                  href='#'
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  포트폴리오
                </Card.Link>
              )} */}
            </div>
          </Card.Body>
        </Card>
      </Card.Link>
    </div>
  );
}

export default UserCard;
