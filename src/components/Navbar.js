import {Link} from 'react-router-dom'
import styled from '@emotion/styled'

const Header = styled.header`
  width: 100%;
  height: 72px;
  border-bottom: 1px solid var(--line-gray);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Nav = styled.nav`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: right;
  gap: 36px;
  align-items: center;
  > span {
    font-weight: bold;
    cursor: pointer;
  }
`;
const NavBar = ()=>{
    return (
        <Header>
          <Nav>
            <Link to={'/'}>홈</Link>
            <Link to={'/calculator'}>계산기</Link>
            <Link to={'weather'}>날씨</Link>
          </Nav>
        </Header>
      );
}


export default NavBar;