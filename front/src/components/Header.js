import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';

import UserDel from './user/UserDel';

import { UserStateContext, DispatchContext } from '../App';
// import { Navbar } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: 'LOGOUT' });
    // 기본 페이지로 돌아감.
    navigate('/');
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container className='my-2' id='my-nav-container'>
        <Navbar.Brand className='my-2' id='logo'>
          <h2>careerCare</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav activeKey={location.pathname} className='ms-auto'>
            {isLogin && (
              <Nav.Item id='my-nav-item' className='mx-1 px-1'>
                <Nav.Link onClick={() => navigate('/search')}>
                  유저 검색
                </Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item id='my-nav-item' className='mx-1 px-1'>
              <Nav.Link onClick={() => navigate('/')}>나의 페이지</Nav.Link>
            </Nav.Item>
            <Nav.Item id='my-nav-item' className='mx-1 px-1'>
              <Nav.Link onClick={() => navigate('/network')}>네트워크</Nav.Link>
            </Nav.Item>

            {isLogin && (
              <>
                <Nav.Item id='my-nav-item'>
                  <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Nav.Item>
                <NavDropdown
                  className='ms-1'
                  title={<BsPersonCircle size='2rem' />}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item href='#action/3.4'>
                    <UserDel />
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
