import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

function Contacts() {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userDataString = localStorage.getItem('chat-app-user');
      if (userDataString) {
        try {
          const data = JSON.parse(userDataString);
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
        } catch (error) {
          // Handle error if parsing fails
          console.error('Error parsing user data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const handleLogout = () => {
    localStorage.clear(); // 이 부분이 추가되었습니다.
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동합니다.
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
            <header>
              <div className="image-text">
                <span className="image">
                  <img src={Logo} alt="logo" />
                </span>
                <div className="text header-text">
                  <span className="name">
                    <span style={{ color: '#FCA808' }}>Lawy</span>
                    <span style={{ color: '#1a18b8' }}>dot</span>
                  </span>
                  <span className="profession">My own legal secretary</span>
                </div>
              </div>
              <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
            </header>
            <div className="menu-bar">
              <div className="menu">
                <li className="search-box">
                  <i className="bx bx-search icon"></i>
                  <input type="search" placeholder="Search..." />
                </li>
                <ul className="menu-links">
                  <li className="nav-link">
                    <a href="/">
                      <i className="bx bx-chat icon"></i>
                      <span className="text nav-text">CHATBOT</span>
                    </a>
                  </li>
                  <li className="nav-link">
                    <a href="/postlist">
                      <i className="bx bx-list-ul icon"></i>
                      <span className="text nav-text">HISTORY</span>
                    </a>
                  </li>
                  <li className="nav-link">
                    <a href="/checklist">
                      <i className="bx bx-check-square icon"></i>
                      <span className="text nav-text">CHECK LIST</span>
                    </a>
                  </li>
                  <li className="nav-link">
                    <a href="/lawyer">
                      <i className="bx bx-user-voice icon"></i>
                      <span className="text nav-text">LAWYER</span>
                    </a>
                  </li>
                  <li className="nav-link">
                    <a href="/setAvatar">
                      <i className="bx bx-cog icon"></i>
                      <span className="text nav-text">SETTING</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="botton-content">
                <li className="">
                  <a href="/login" onClick={handleLogout}>
                    <i className="bx bx-log-out icon"></i>
                    <span className="text nav-text">Logout</span>
                  </a>
                </li>
              </div>
            </div>
          </nav>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  height: 80vh;
  background-color: #e7effa;

  /* ==== Sidebar ==== */

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 340px;
    padding: 14px 20px;
    background: #ffffff;
    transition: all 0.5s ease;
    z-index: 100;
  }

  .sidebar.close {
    width: 110px;
  }

  .sidebar .text {
    font-size: 20px;
    font-weight: 500;
    color: black;
    opacity: 1;
  }
  .sidebar.close .text {
    opacity: 0;
  }

  .sidebar .image {
    min-width: 80px;
    display: flex;
    align-items: center;
  }
  .sidebar li {
    height: 50px;
    margin-top: 15px;
    list-style: none;
    display: flex;
    align-items: center;
  }

  .sidebar li .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    font-size: 30px;
  }
  .sidebar li .icon,
  .sidebar li .text {
    color: black;
    transition: all 0.2s ease;
  }

  .sidebar header {
    position: relative;
  }

  .sidebar .image-text img {
    width: 80px;
    border-radius: 6px;
    margin-right: 5px;
  }

  .sidebar header .image-text {
    display: flex;
    align-items: center;
  }

  header .image-text .header-text {
    display: flex;
    flex-direction: column;
  }

  .header-text .name {
    font-weight: 800;
    font-size: 30px;
  }

  .header-text .profession {
    margin-top: 2px;
  }

  .sidebar header .toggle {
    position: absolute;
    top: 50%;
    right: -33px;
    transform: translateY(-50%) rotate(180deg);
    height: 25px;
    width: 25px;
    background-color: #5374e6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #f8f8f8;
    font-size: 25px;
    transition: all 0.3s ease;
  }
  .sidebar.close header .toggle {
    transform: translateY(-50%);
  }
  .sidebar .search-box {
    background: #e7effa;
    border-radius: 10px;
  }
  .search-box input {
    height: 100%;
    width: 100%;
    background: #e7effa;
    outline: none;
    border-radius: 10px;
    border: none;
  }
  .sidebar li a {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    border-radius: 10px;
    transition: all 0.4s ease;
  }
  .sidebar li a:hover {
    background: #5374e6;
  }
  .sidebar li a:hover .icon,
  .sidebar li a:hover .text {
    color: #ffffff;
  }
  .sidebar .menu-bar {
    height: calc(100% - 120px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default Contacts;
