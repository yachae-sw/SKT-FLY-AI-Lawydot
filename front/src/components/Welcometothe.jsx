import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import welcomeimg from '../assets/hi.png';

function Welcometothe() {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('chat-app-user');
      if (storedUser) {
        setUserName(JSON.parse(storedUser).username);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container>
      <img src={welcomeimg} alt="hi" />
      <br />
      <h1>
        Welcome, <span>{userName}</span>의 법률 개인 비서 Lawydot 입니다!
      </h1>
      <br />
      <h2>당신이 처한 상황을 말씀해 주세요!</h2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  img {
    height: 30rem;
  }
  span {
    color: #1a18b8;
  }
`;

export default Welcometothe;
