import React from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';

function PostItem({ title, body, author }) {
  // author가 문자열인 경우에만 시간을 변환하도록 체크
  const formattedAuthor = typeof author === 'string' ? new Date(author).toLocaleString() : author;

  return (
    <PostContainer>
      <div className="post-title">
        <h2>[{title}]</h2>
      </div>
      <div className="post-facts">
        <p>
          <strong>상황:</strong> {body}
        </p>
      </div>
      <span style={{ color: '#ABABAB' }}>
        from: <Markdown>{formattedAuthor}</Markdown>
      </span>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 65vw;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-color: #5374e6;
    border-width: 3px;
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

export default PostItem;
