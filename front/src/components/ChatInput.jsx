import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Container>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <div className="text-input">
          <input
            type="text"
            placeholder="옵션에 없는 내용이라면 여기에 질문하거나 메시지를 입력해주세요"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
        </div>
        <div className="text-input-button">
          <button type="submit">
            <i class="bx bx-send"></i>
          </button>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  .input-container {
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    width: 75%;
    .text-input {
      padding-left: 40px;
    }
    input {
      width: 300%;
      height: 60%;
      color: black;
      border: none;
      font-size: 20px;
      box-sizing: border-box;
      outline: none;
    }
    .text-input-button {
      display: flex;
      align-items: center;
      button {
        padding: 7px;
        border-radius: 30px;
        background: #1a18b8;
        border: none;
        cursor: pointer;
        .bx-send {
          font-size: 28px;
          color: #ffffff;
        }
      }
    }
  }
`;

export default ChatInput;
