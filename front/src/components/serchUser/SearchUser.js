import React, { useState, useEffect, useCallback } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import UserCard from '../user/UserCard';
import Network from '../user/Network';
import * as Api from '../../api';

function SearchUser() {
  const [searchUser, setSerachUser] = useState('');
  const [searchOption, setSearchOption] = useState('default');
  const [filtered, setFiltered] = useState([]);
  const [searchUI, setSearchUI] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearched(true);
  };

  const handleSearch = useCallback(async () => {
    if (!searchUser || !isSearched) {
      return;
    }
    const res = await Api.get(`userlist/search/${searchUser}/${searchOption}`);
    setFiltered(res.data);
    setSearchUI(true);
  }, [isSearched, searchOption, searchUser]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchOption(e.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchOption, isSearched]);

  return (
    <>
      <Row className='justify-content-center my-5'>
        <Col lg='1' className='mx-2 mt-2'>
          <select
            // align='end'
            title='정렬'
            id='dropdown-menu-align-end'
            // className='ms-5'
            // style={{ position: 'absolute', top: '20%', left: '12%' }}
            onChange={handleChange}
          >
            <option value='default'>기본</option>
            <option value='asc'>이름 (오름차순)</option>
            <option value='desc'>이름 (내림차순)</option>
            <option value='likes'>좋아요</option>
            <option value='updatedAt'>최근 업데이트</option>
          </select>
        </Col>
        <Col lg='6'>
          <Form onSubmit={handleSubmit}>
            <Form.Group
            // className='mb-5 mt-5'
            // style={{ width: '50%', float: 'none', margin: '0 auto' }}
            >
              <Form.Control
                id='searchForm'
                type='text'
                autoComplete='on'
                placeholder='유저 이름을 입력하세요.'
                onChange={(e) => {
                  setSerachUser(e.target.value);
                  setIsSearched(false);
                }}
                value={searchUser}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {searchUI ? (
        <Container>
          <Row xs='auto' className='jusify-content-center'>
            {filtered.map((user) => (
              <UserCard key={user.id} user={user} isNetwork />
            ))}
          </Row>
        </Container>
      ) : (
        <Network />
      )}
    </>
  );
}

export default SearchUser;
