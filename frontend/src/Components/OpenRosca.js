import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Badge } from "antd";

const SidebarContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  width: 300px; /* Adjust the width as needed */
  height: 100%; /* Take entire height */
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  margin-bottom: 10px;
`;

const MemberList = styled.ul`
  flex: 1; /* Take remaining height */
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; /* Add scrollbar if content overflows */
`;

const MemberItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OpenRosca = ({ roscaId, tab, setTab }) => {
  const [roscaDetails, setRoscaDetails] = useState(null);

  useEffect(() => {
    const fetchRoscaDetails = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/user/openrosca/${roscaId}`
        );

        if (response.data.success) {
          setRoscaDetails(response.data.rosca);
        }
      } catch (error) {
        console.error("Error fetching rosca details:", error);
      }
    };

    fetchRoscaDetails();
  }, [roscaId]);

  return (
    <SidebarContainer>
      {roscaDetails ? (
        <>
          <Heading>Rosca Name: {roscaDetails.roscaName}</Heading>

          <h3>Members</h3>
          <MemberList>
            {roscaDetails.members.map((member, index) => (
              <MemberItem key={index}>
                {member.name ? (
                  <>
                    <span>{member.name}</span>
                    <Badge
                      status={member.payment ? "success" : "error"}
                      text={member.payment ? "Paid" : "Unpaid"}
                    />
                  </>
                ) : (
                  "No Member Name"
                )}
              </MemberItem>
            ))}
          </MemberList>
        </>
      ) : (
        <p>Loading rosca details...</p>
      )}
    </SidebarContainer>
  );
};

export default OpenRosca;
