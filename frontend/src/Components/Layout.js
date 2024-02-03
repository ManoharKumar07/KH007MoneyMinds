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
import { useLocation, useNavigate } from "react-router-dom";
import Hometab from "./Hometab";
import Createtab from "./Createtab";
import Abouttab from "./Abouttab";
import Complainttab from "./Complainttab";
import axios from "axios";

const Layout = ({ children }) => {
  const RoscaSymbol = styled.div`
    width: 50px; /* Adjust the width as needed */
    height: 50px; /* Adjust the height as needed */
    border: 2px solid #333; /* Add a border for distinction */
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
    border-bottom:2px solid var(--primary-color2)
    background-color: #f0f0f0;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #e0e0e0;
    }
  `;

  const [tab, setTab] = useState(1);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [roscas, setRoscas] = useState([]);

  useEffect(() => {
    // Fetch the list of all roscas from the backend on component mount
    const fetchRoscas = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/user/getallrosca"
        );
        if (response.data.success) {
          setRoscas(response.data.roscas);
        }
      } catch (error) {
        console.error("Error fetching roscas:", error);
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
            {/* Display the names of all roscas with the new styled component */}
            {roscas.map((rosca, index) => (
              <RoscaName key={rosca._id}>{rosca.roscaName}</RoscaName>
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
              <Tabs.TabPane tab="Complaint" key={4} />
            </Tabs>
            <BodyContainer>{displayData()}</BodyContainer>
          </ContentContainer>
        </LayoutContainer>
      </InnerLayout>
    </MainContainer>
  );
};

export default Layout;
