import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 10px;
  height: 100vh;
`;

export const LayoutContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  min-height: 100%;
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 0 2px gray;
  margin-right: 20px;
  color: var(--primary-color);
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  height: 7vh;
  margin-bottom: 20px;
  box-shadow: 0 0 2px gray;
  background-color: white;
  border-radius: 10px;
`;

export const BodyContainer = styled.div`
  height: 95vh;
  margin-bottom: 20px;
  box-shadow: 0 0 2px gray;
  background-color: white;
  border-radius: 10px;
`;

export const LogoContainer = styled.div`
  h6 {
    font-size: 1.5rem;
    text-align: center;
    margin: 20px 0px;
  }
`;

export const MenuContainer = styled.div`
  margin-top: 50px;
`;

export const MenuItemContainer = styled.div`
  margin-top: 30px;
`;

export const MenuItemLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
`;

export const MenuItemIcon = styled.i`
  font-size: 1.2rem;
  margin: 0 15px;
`;

export const ActiveContainer = styled.div`
  background-color: white;
  padding: 10px;
`;

export const ActiveLink = styled.a`
  color: rgb(51, 1, 1);
`;

export const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: flex-end;
  margin: 0 15px;
`;

export const HeaderContentIcon = styled.i`
  margin-right: 20px;
  font-size: 1.2rem;
`;

export const HeaderContentLink = styled.a`
  text-decoration: none;
  font-size: 1.2rem;
  color: rgb(166, 78, 11);
  margin: 0 10px;
  text-transform: uppercase;
`;
