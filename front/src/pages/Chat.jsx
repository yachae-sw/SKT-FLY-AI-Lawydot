import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import Welcometothe from '../components/Welcometothe';

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showWelcome, setShowWelcome] = useState(true); // 상태 추가

  // user 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
      }
    };

    fetchUserData();
  }, []);

  // avatar 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);
          } catch (error) {
            // Handle error if axios request fails
            console.error('Error fetching data:', error);
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };

    fetchData();
  }, [currentUser]);

  // Welcometothe에서 ChatContainer로 전환하는 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000); // 10초 후에 상태 변경

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
        {showWelcome ? (
          <Welcometothe currentUser={currentUser} />
        ) : (
          <ChatContainer currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: #e7effa;
  .container {
    height: 90vh;
    width: 95vw;
    border-radius: 10px;
    background-color: #e7effa;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
