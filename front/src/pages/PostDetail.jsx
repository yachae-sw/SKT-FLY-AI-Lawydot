// PostDetail.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import { postoneRoute } from '../utils/APIRoutes';
import Markdown from 'markdown-to-jsx';

function PostDetail() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [post, setPost] = useState(null);
  const postsEndRef = useRef(null);

  let { postId } = useParams();

  useEffect(() => {
    postsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [post]);

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

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResult = await axios.post(postoneRoute, { postId: postId });
        const post = postResult.data.postoneList;
        setPost(post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} />
        <div className="postbox">
          {post && (
            <>
              <div className="post-title">
                <p>{post.SituationSummary_answer}</p>
              </div>

              <div className="post-context-name">
                <span>관련 법률</span>
                <p>{post.casename_answer}</p>
              </div>

              <div className="post-context-name">
                <span>해결 절차</span>
                <p>
                  <Markdown>{post.procedure_answer}</Markdown>
                </p>
              </div>

              <div className="post-context-name">
                <span>필요 서류</span>
                <p>
                  <Markdown>{post.documentLists_answer}</Markdown>
                </p>
              </div>
              <div className="post-context-name">
                <span>유사 판례</span>
                <div className="sim-context">
                  <p>
                    {post.situationSummary_result[0].courtNm} ({post.situationSummary_result[0].caseNo})
                  </p>
                  <p>{post.situationSummary_result[0].facts}</p>
                </div>
                <div className="sim-context">
                  <p>
                    {post.situationSummary_result[1].courtNm} ({post.situationSummary_result[1].caseNo})
                  </p>
                  <p>{post.situationSummary_result[1].facts}</p>
                </div>
                <div className="sim-context">
                  <p>
                    {post.situationSummary_result[2].courtNm} ({post.situationSummary_result[2].caseNo})
                  </p>
                  <p>{post.situationSummary_result[2].facts}</p>
                </div>
              </div>
            </>
          )}
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
  background-color: #e7effa;
  .container {
    height: 90vh;
    width: 95vw;
    border-radius: 10px;
    background-color: #e7effa;
    display: grid;
    grid-template-columns: 25% 75%;
    margin-right: 50px;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  .postbox {
    padding: 20px;
    overflow-y: auto;
    /* 웹킷 기반 브라우저의 스크롤바에 대한 스타일 */
    &::-webkit-scrollbar {
      width: 8px; /* 스크롤바의 너비를 조정합니다. */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #d4d4d4; /* 스크롤바의 색상을 설정합니다. */
      border-radius: 10px; /* 스크롤바의 모서리를 둥글게 만듭니다. */
    }

    &::-webkit-scrollbar-track {
      background-color: #f0f0f0; /* 스크롤바의 배경색을 설정합니다. */
    }
    .post-title {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      margin-bottom: 50px;
    }

    .post-context-name {
      margin-bottom: 50px;
      border-bottom: 2px solid #ababab;
      font-weight: bold;
      font-size: 22px;
      background: #ffffff;
      padding: 10px;
      border-radius: 10px;
      border: 3px solid #1a18b8;
      span {
        position: relative;
        top: -25px; /* 원하는 만큼 위로 올립니다. */
        font-weight: bold;
        font-size: 22px;
        background: #5374e6;
        padding: 10px;
        border-radius: 10px;
        border: 3px solid #1a18b8;
        color: #ffffff;
      }

      p {
        margin: 18px;
        font-size: 18px;
      }
    }

    .sim-context {
      padding-top: 10px;
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 20px;
      background: #ffffff;
      padding: 5px;
      border-radius: 10px;
      p {
        margin-top: 20px;
        font-size: 20px;
      }
    }
  }
`;

export default PostDetail;
