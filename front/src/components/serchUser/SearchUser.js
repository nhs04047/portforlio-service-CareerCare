import React, { useState } from "react";
import { Form, Container, Row } from "react-bootstrap";
import UserCard from "../user/UserCard";
import Network from "../user/Network";
import * as Api from "../../api";

function SearchUser() {
  const [searchUser, setSerachUser] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [searchUI, setSearchUI] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const res = await Api.get(`userlist/search/${searchUser}`);
    setFiltered(res.data);
    setSerachUser("");
    setSearchUI(true);
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-5 mt-5' style={{width: "50%", float:"none", margin:"0 auto"}}>
        <Form.Control
          id="searchForm"
          type='text'
          autoComplete='on'
          placeholder='유저 이름을 입력하세요.'
          onChange={(e) => setSerachUser(e.target.value)}
          value={searchUser}
        />
      </Form.Group>
    </Form>

    {searchUI ? (
    <Container fluid>
      <Row xs="auto" className="jusify-content-center" >
        {filtered.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>) : <Network />}
    </>

  );
}

export default SearchUser;
