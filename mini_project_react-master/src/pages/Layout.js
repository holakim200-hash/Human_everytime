import React, { useEffect, useState } from "react"; // useEffect, useState 추가
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Header,
  LogoContainer,
  UserInfoArea,
  Wrapper,
  Sidebar,
  UniversityName,
  MenuList,
  MainContent,
  ContentCard,
} from "../style/LayoutStyle";

const Layout = () => {
  const navigate = useNavigate();
  // ★ 실제 로그인 유저 이름을 담을 상태
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    // ★ 시간표 때 썼던 로직 그대로 사용: localStorage에서 유저 정보 가져오기
    const savedData = localStorage.getItem("loginUser");
    if (savedData) {
      const user = JSON.parse(savedData);
      // 백엔드에서 준 로그인 응답에 'name' 필드가 있다고 가정합니다.
      setUserName(user.name || "홍길동");
    }
  }, []);

  const handleLogout = () => {
    // ★ 로그아웃 시 localStorage 비우기
    localStorage.removeItem("loginUser");
    navigate("/"); // 로그인 화면으로 이동
  };

  return (
    <>
      <Header>
        <LogoContainer>
          <span>에브리휴먼타임</span>
        </LogoContainer>
        <UserInfoArea>
          {/* ★ 수정 포인트: 이름을 클릭하면 /mypage로 이동하도록 Link로 감쌉니다. */}
          <Link to="/member" className="user-name-link">
            {userName}님
          </Link>
          <span> / </span>
          <Link to="/" onClick={handleLogout}>
            로그아웃
          </Link>
        </UserInfoArea>
      </Header>

      <Wrapper>
        <Sidebar>
          <UniversityName>휴먼 대학교</UniversityName>
          <MenuList>
            <li>
              <Link to="/timetable">시간표</Link>
            </li>
            <li>
              <Link to="/board">게시판</Link>
            </li>
            <li>
              <Link to="/calculator">학점계산기</Link>
            </li>
            <li>
              <Link to="/library">열람실 예약</Link>
            </li>
            <li>
              <Link to="/bookmarket">책방</Link>
            </li>
            <li>
              <Link to="/sudoku">스도쿠</Link>
            </li>
          </MenuList>
        </Sidebar>

        <MainContent>
          <ContentCard>
            <Outlet />
          </ContentCard>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default Layout;
