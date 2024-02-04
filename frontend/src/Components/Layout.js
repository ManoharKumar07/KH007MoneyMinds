import React, { useState, useEffect } from "react";
import { InnerLayout } from "../styles/Layouts";
import { rosca } from "../utils/Icons";
import styled from "styled-components";
import {
  MainContainer,
  LayoutContainer,
  SidebarContainer,
  ContentContainer,
  HeaderContainer,
  BodyContainer,
  HeaderContentContainer,
  HeaderContentIcon,
} from "../styles/LayoutStyles";
import { useSelector } from "react-redux";
import { Badge, Tabs } from "antd";
import Hometab from "./Hometab";
import Createtab from "./Createtab";
import Abouttab from "./Abouttab";
import Complainttab from "./Complainttab";
import axios from "axios";
import OpenRosca from "./OpenRosca";

const RoscaSymbol = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-left: 65px;
  margin-top: 20px;
`;

const RoscaName = styled.div`
  padding: 10px;
  margin: 20px 0;
  border-bottom: 2px solid var(--primary-color2);
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Layout = () => {
  const [tab, setTab] = useState(1);
  const { user } = useSelector((state) => state.user);
  const [roscas, setRoscas] = useState([]);

  useEffect(() => {
    // Fetch the list of user-specific roscas
    const fetchRoscas = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/user/getspecific",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setRoscas(response.data.userRoscas);
        }
      } catch (error) {
        console.error("Error fetching user roscas:", error);
      }
    };

    fetchRoscas();
  }, []);

  const displayData = () => {
    switch (tab) {
      case 1:
        return <Hometab />;
      case 2:
        return <Createtab />;
      case 3:
        return <Abouttab />;
      case 4:
        return <Complainttab />;
      case 5:
        return <OpenRosca tab={tab} setTab={setTab} />;
      default:
        return <Hometab />;
    }
  };

  return (
    <MainContainer>
      <InnerLayout>
        <LayoutContainer>
          <SidebarContainer>
            <RoscaSymbol>{rosca}</RoscaSymbol>

            {roscas &&
              roscas.map((rosca, index) => (
                <RoscaName key={rosca._id} onClick={() => setTab(5)}>
                  {rosca.roscaName}
                </RoscaName>
              ))}
          </SidebarContainer>
          <ContentContainer>
            <HeaderContainer>
              <HeaderContentContainer style={{ cursor: "pointer" }}>
                <Badge count={user?.notifcation?.length ?? 0}>
                  <HeaderContentIcon className="fa-solid fa-bell"></HeaderContentIcon>
                </Badge>
                <span>{user?.name}</span>
              </HeaderContentContainer>
            </HeaderContainer>
            <Tabs
              onChange={(key) => setTab(Number(key))}
              activeKey={String(tab)}
              className="ml-5"
            >
              <Tabs.TabPane tab="Home" key={1} />
              <Tabs.TabPane tab="Create" key={2} />
              <Tabs.TabPane tab="About" key={3} />
              <Tabs.TabPane tab="Raise a Complaint" key={4} />
            </Tabs>
            <BodyContainer>{displayData()}</BodyContainer>
          </ContentContainer>
        </LayoutContainer>
      </InnerLayout>
    </MainContainer>
  );
};

export default Layout;
