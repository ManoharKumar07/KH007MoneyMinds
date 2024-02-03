import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Abouttab = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <AbouttabStyled>
      <div className="about-container">
        <div className="about-description">
          <h2>Hello, {user.name}...</h2>
          <h4>Welcome to ROSCA</h4>
          <p>
            A ROSCA, or Rotating Savings and Credit Association, is a financial
            arrangement where a group of individuals come together to save and
            borrow collectively. Each member contributes a fixed amount
            regularly, and one member receives the total sum periodically. This
            communal approach to financial management fosters trust,
            collaboration, and provides a source of funds for various needs
            within the community. The rotation continues until each member has
            received their share. ROSCAs are known for promoting financial
            inclusion and supporting economic empowerment.
          </p>
        </div>
      </div>
    </AbouttabStyled>
  );
};

const AbouttabStyled = styled.div`
  .about-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    .about-description {
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      width: 100%;

      h2,
      h4 {
        margin-bottom: 20px;
      }

      h4 {
        font-size: 1.2rem;
        font-weight: 600;
        color: #4caf50;
      }

      p {
        margin-top: 10px;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
`;

export default Abouttab;
