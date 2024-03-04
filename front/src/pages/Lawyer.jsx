import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Contacts from '../components/Contacts';
import lawyer1 from '../assets/lawyer1.png';
import lawyer2 from '../assets/lawyer2.png';
import lawyer3 from '../assets/lawyer3.png';

function Checklist() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

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

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} />
        <div className="lawyercontainer">
          <PostContainer>
            <img src={lawyer1} alt="lawyer1" />
            <div className="post-text">
              <div className="post-title">
                <h2>[천지훈 변호사]</h2>
              </div>
              <div className="post-facts">
                <p>
                  <strong>전문 분야:</strong> 부동산 / 임대차 / 금전 / 계약 전문
                </p>
              </div>
              <span style={{ color: '#ABABAB' }}>너무 당황해 마세요, 오직 의뢰인 편에서 함께합니다.</span>
            </div>
          </PostContainer>
          <PostContainer>
            <img src={lawyer2} alt="lawyer2" />
            <div className="post-text">
              <div className="post-title">
                <h2>[조들호 변호사]</h2>
              </div>
              <div className="post-facts">
                <p>
                  <strong>전문 분야:</strong> 손해배상 / 계약일반 / 매매 전문
                </p>
              </div>
              <span style={{ color: '#ABABAB' }}>든든한 가족처럼 당신 편이 되겠습니다.</span>
            </div>
          </PostContainer>
          <PostContainer>
            <img src={lawyer3} alt="lawyer3" />
            <div className="post-text">
              <div className="post-title">
                <h2>[우영우 변호사]</h2>
              </div>
              <div className="post-facts">
                <p>
                  <strong>전문 분야:</strong> 민사 전문
                </p>
              </div>
              <span style={{ color: '#ABABAB' }}>친절, 하나하나 꼼꼼히 상담해드립니다</span>
            </div>
          </PostContainer>
        </div>
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
  .lawyercontainer {
    overflow-y: auto;
  }
`;

const LinkWrapper = styled.div`
  a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: #666;
    }
  }
`;
const PostContainer = styled.div`
  width: 65vw;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  justify-content: space-between; /* Adjust this according to your need */
  align-items: center; /* Adjust this according to your need */

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-color: #5374e6;
    border-width: 3px;
  }
  .post-text {
    flex: 1;
    margin-left: 30px; /* 이미지와의 간격 조절 */
  }
  .post-title {
    margin-bottom: 10px;
    .h2 {
      color: #333;
      font-size: 1.5rem;
    }
  }
  .post-facts {
    margin-bottom: 20px;
    .p {
      color: #555;
      font-size: 1.2rem;
      line-height: 1.6;
    }
    strong {
      font-weight: 100px;
    }
  }

  .span {
    display: block;
    margin-top: 15px;
    font-size: 1rem;
    color: #777;
  }
`;
export default Checklist;
