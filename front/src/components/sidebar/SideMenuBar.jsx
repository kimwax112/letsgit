import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  width: 250px;
  align-items: center;
  display: flex;
  margin-top: 30px;
`;

const MenuNav = styled.nav`
  width: 100%;
`;

const MainMenuList = styled.ul`
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  list-style: none;
  line-height: 60px;
  padding-left: 5px;
  border-bottom: 2px solid #799FC4;
  
  &:first-child {
    border-top: 2px solid #799FC4;
  }
`;

const MenuLink = styled.a`
  width: 233px;
  text-decoration: none;
  display: block;
  color: black;
  font-weight: bold;
`;

const SubMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  visibility: hidden;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  ${MenuItem}:hover & {
    max-height: 300px;
    visibility: visible;
    opacity: 1;
    display: block;
  }
`;

export default function SideMenuBar() {
  const menuItems = [
    { main: '상의 Top', sub: ['상의 하위메뉴1', '상의 하위메뉴2', '상의 하위메뉴3', '상의 하위메뉴4', '상의 하위메뉴5'] },
    { main: '아우터 Outer', sub: ['아우터 하위메뉴1', '아우터 하위메뉴2', '아우터 하위메뉴3', '아우터 하위메뉴4', '아우터 하위메뉴5'] },
    { main: '바지 Pants', sub: ['바지 하위메뉴1', '바지 하위메뉴2', '바지 하위메뉴3', '바지 하위메뉴4', '바지 하위메뉴5'] },
    { main: '원피스 Onepiece', sub: ['원피스 하위메뉴1', '원피스 하위메뉴2', '원피스 하위메뉴3', '원피스 하위메뉴4', '원피스 하위메뉴5'] },
    { main: '스커트 Skirt', sub: ['스커트 하위메뉴1', '스커트 하위메뉴2', '스커트 하위메뉴3', '스커트 하위메뉴4', '스커트 하위메뉴5'] },
    { main: '스니커즈 Sneakers', sub: ['스니커즈 하위메뉴1', '스니커즈 하위메뉴2', '스니커즈 하위메뉴3', '스니커즈 하위메뉴4', '스니커즈 하위메뉴5'] },
    { main: '신발 Shoes', sub: ['신발 하위메뉴1', '신발 하위메뉴2', '신발 하위메뉴3', '신발 하위메뉴4', '신발 하위메뉴5'] },
    { main: '가방 Bag', sub: ['가방 하위메뉴1', '가방 하위메뉴2', '가방 하위메뉴3', '가방 하위메뉴4', '가방 하위메뉴5'] },
  ];

  return (
    <MenuContainer>
      <MenuNav>
        <MainMenuList>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <MenuLink href="#">{item.main}</MenuLink>
              <SubMenu>
                {item.sub.map((subItem, subIndex) => (
                  <MenuItem key={subIndex}>
                    <MenuLink href="#">{subItem}</MenuLink>
                  </MenuItem>
                ))}
              </SubMenu>
            </MenuItem>
          ))}
        </MainMenuList>
      </MenuNav>
    </MenuContainer>
  );
}