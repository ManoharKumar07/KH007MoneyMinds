import React, { useState, useEffect } from "react";
import { InnerLayout } from "../styles/Layouts";
import { dollar } from "../utils/Icons";
import { useGlobalContext } from "../context/globalContext";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Fund = ({ active, setActive }) => {
  const user = useSelector((state) => state.user.user);
  const { totalBalance } = useGlobalContext();
  const [typingEffect, setTypingEffect] = useState("");
  const moneyMindsText = "MoneyMinds";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypingEffect(moneyMindsText.substring(0, index));
      index++;
      if (index > moneyMindsText.length) {
        clearInterval(interval);
      }
    }, 100);
  }, []);

  return (
    <FundStyled>
      <InnerLayout>
        <div className="fundcontainer">
          <div className="fundbalance">
            <h2>Total Fund Balance </h2>
            <p>
              {dollar} {user.fundbalance}
            </p>
          </div>
          <div className="balance">
            <h2>Total Balance</h2>
            <p>
              {dollar} {totalBalance() - (user?.fundbalance || 0)}
            </p>
          </div>

          <div className="FundDesc">
            <h1>Hello, {user.name}....</h1>
            <h3>Welcome to {typingEffect}</h3>
            <p>
              Embark on a journey towards financial empowerment with MoneyMinds
              Fund. Invest your surplus balance securely, allowing us to
              strategically utilize funds for business expansion and stock
              investments. Earn competitive interest rates, fostering financial
              growth effortlessly. At MoneyMinds, we believe in inclusivity,
              providing a gateway for individuals, regardless of financial
              knowledge, to generate passive income. Manage your expenses
              seamlessly and join us in reshaping financial futures. Your
              prosperity begins here with MoneyMinds Fund.
            </p>

            <button onClick={() => setActive(7)} className="add-money-button">
              Add Money
            </button>
          </div>
        </div>
      </InnerLayout>
    </FundStyled>
  );
};

const FundStyled = styled.div`
  .fundcontainer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 2rem;

    .FundDesc {
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      width: 100%;
      grid-column: span 4;

      h1,
      h3 {
        margin-block: 20px;
      }

      h3 {
        overflow: hidden;
        white-space: nowrap;
        margin: 0;
        letter-spacing: 0.15em;
        animation: typing 2s steps(20, end), blink-caret 0.5s step-end infinite;
      }

      p {
        margin-top: 10px;
        font-size: 1rem;
        font-weight: 500;
      }

      button.add-money-button {
        background-color: #4caf50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 8px;
        margin: 20px auto;
      }
    }

    .fundbalance,
    .balance {
      grid-column: span 2;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      p {
        font-size: 3.5rem;
        font-weight: 700;
      }
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

export default Fund;
