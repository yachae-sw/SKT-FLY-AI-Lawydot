import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Contacts from '../components/Contacts';

function Checklist() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  const data = [
    { id: 0, title: '주변 시세, 적정 전세가율 확인, 무허가·불법건축물 여부 확인' },
    { id: 1, title: '등기부등본(계약 전·후)확인, 부채증명원 (금융회사 금저당권 설정시) 확인' },
    { id: 2, title: '임대인 세금 체납 여부 확인' },
    { id: 3, title: '임대인 신분 확인' },
    { id: 4, title: '공인중개사 정상 영업 여부 확인' },
    { id: 5, title: '주택임대차표준계약서 사용' },
    { id: 6, title: '전입세대열람, 확정일자 부여 현황 확인' },
    { id: 7, title: '전입신고, 주택임대차신고, 확정일자 신청' },
    { id: 8, title: '전세보증금반환보증 가입(강력 권고)' },
  ];

  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        // Assuming setCurrentUser function is defined or used elsewhere
        // setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = data.map((el) => el.id);
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} />
        <div className="postcontainer">
          <StyledTable>
            <thead>
              <tr>
                <th colSpan="2">부동산 관련 사기 방지를 위한 핵심 체크리스트</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => (
                <tr key={key}>
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                      checked={checkItems.includes(item.id)}
                    />
                  </td>
                  <td className="title-cell">{item.title}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>

          <GlossaryBox>
            <h1>용어 정리</h1>
            <p>
              <strong>깡통전세 (Empty Shell Lease):</strong> 깡통전세는 집주인이 돈을 다 써서, 보증금을 다시 돌려줄 수
              없는 상황을 말해요. 보증금을 돌려받을 수 없는 집을 의미해요.
            </p>
            <p>
              <strong>근저당(Mortgage):</strong> 근저당은 집을 담보로 돈을 빌리는 거에요. 집값보다 더 많은 돈을 빌릴 때
              사용하는 거죠.
            </p>
            <p>
              <strong>대항력(Leverage):</strong> 대항력은 누군가에게 거래 내용을 주장할 수 있는 권리를 줘요. 임차인이 이
              권리를 가지면서 거래 내용을 바꿀 수 있어요.
            </p>
            <p>
              <strong>우선변제권(Right of First Refusal):</strong> 이 권리는 집을 팔 때 먼저 사는 권리에요. 집을 팔면서
              먼저 사고 싶어하는 사람이 있으면, 그 사람에게 먼저 팔아줘야 해요.
            </p>
            <p>
              <strong>전세권(Leasehold):</strong> 전세권은 집을 빌려서 살고 있다는 걸 공식적으로 알리는 것이에요.
              집주인이 낸 전세금을 돌려받을 권리를 가지는 거죠.
            </p>
            <p>
              <strong>전세보증보험(Lease Guarantee Insurance):</strong> 이 보험은 집을 빌릴 때 보증금을 보호해주는
              보험이에요.
            </p>
            <p>
              <strong>임대차보증금 반환보증보험(Lease Deposit Return Guarantee Insurance):</strong> 이 보험은 임대인이
              보증금을 돌려주지 않을 때 임차인을 보호해주는 보험이에요.
            </p>
            <p>
              <strong>신탁 사기(Trust Fraud):</strong> 신탁 사기는 집을 다른 사람한테 맡기고, 그 사람이 집을 파는 거죠.
              이렇게 한 건 불법이에요.
            </p>
          </GlossaryBox>
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
    width: 8px; /* 스크롤바 너비 */
  }

  .postcontainer::-webkit-scrollbar-track {
    background: #f0f0f0; /* 스크롤바의 배경색 */
  }

  .postcontainer::-webkit-scrollbar-thumb {
    background-color: #d4d4d4; /* 스크롤바 색 */
    border-radius: 10px; /* 스크롤바의 모서리 반경 */
  }
`;

const StyledTable = styled.table`
  width: 90%;
  text-align: center;
  margin-top: 100px;
  border-collapse: collapse;
  border-radius: 10px;
  th,
  td {
    padding: 15px;
    border: 2px solid #1a18b8;
    font-size: 20px;
  }

  th {
    background-color: #5374e6;
    color: #fff;
  }

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    vertical-align: middle;
  }

  .checkbox-cell {
    text-align: center;
  }

  .title-cell {
    text-align: left;
  }
`;

const GlossaryBox = styled.div`
  width: 90%;
  margin-top: 270px;
  margin-bottom: 100px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  h1 {
    text-align: center; // h1을 중앙 정렬
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 10px;
    background-color: #5374e6;
    color: #ffffff;
  }
  p {
    margin-bottom: 20px;
    line-height: 1.5;
    font-size: 20px;
  }
`;

export default Checklist;
