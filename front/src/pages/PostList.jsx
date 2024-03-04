// PostList.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import PostItem from '../components/PostItem';
import { postsRoute } from '../utils/APIRoutes';

function PostList() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [posts, setPosts] = useState([]);
  const postsEndRef = useRef(null);

  useEffect(() => {
    postsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [posts]);

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
    const fetchPosts = async () => {
      try {
        const postResult = await axios.post(postsRoute, { userId: currentUser._id });
        const posts = postResult.data.postList;
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (currentUser?._id) {
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} />
        <div className="postcontainer">
          {posts.map((post) => (
            <LinkWrapper key={post._id}>
              <Link to={`/post/${post._id}`}>
                <PostItem title={post.casename_answer} body={post.SituationSummary_answer} author={post.createdAt} />
              </Link>
            </LinkWrapper>
          ))}
          <div className="scroll1" ref={postsEndRef} />
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
  .postcontainer {
    overflow-y: auto;
  }

  .postcontainer::-webkit-scrollbar {
    width: 8px; /* Chrome, Safari, Opera 등 웹킷 기반 브라우저 스크롤바 너비 조정 */
  }

  .postcontainer::-webkit-scrollbar-thumb {
    background-color: #d4d4d4; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모서리 둥글게 */
  }

  .postcontainer::-webkit-scrollbar-track {
    background-color: #f0f0f0; /* 스크롤바 배경색 */
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

export default PostList;
