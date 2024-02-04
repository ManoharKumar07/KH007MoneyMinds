// Hometab.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px; /* Added padding to provide space around the cards */
`;

const RoscaCard = styled.div`
  width: 30%; /* Set the width to 30% to display 3 cards in a row */
  margin: 16px 0;
  box-sizing: border-box;
`;

const CardContent = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin: 8px 0;
  }

  button {
    background-color: green;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  button {
    margin: 0 4px;
    padding: 8px 12px;
    cursor: pointer;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    border-radius: 4px;
  }

  button.active {
    background-color: #007bff;
    color: #fff;
    border: 1px solid #007bff;
  }
`;

const Hometab = () => {
  const [roscas, setRoscas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const roscasPerPage = 3;

  useEffect(() => {
    // Fetch the list of all roscas
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
      } finally {
        setLoading(false);
      }
    };

    fetchRoscas();
  }, []);

  const indexOfLastRosca = currentPage * roscasPerPage;
  const indexOfFirstRosca = indexOfLastRosca - roscasPerPage;
  const currentRoscas = roscas.slice(indexOfFirstRosca, indexOfLastRosca);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>All Roscas</h2>
      {loading ? (
        <p>Loading...</p>
      ) : roscas.length === 0 ? (
        <p>No roscas found.</p>
      ) : (
        <>
          <Container>
            {currentRoscas.map((rosca) => (
              <RoscaCard key={rosca._id}>
                <CardContent>
                  <h3>{rosca.roscaName}</h3>
                  <p>Size: {rosca.size}</p>
                  <p>Amount: {rosca.amount}</p>
                  <p>Duration: {rosca.duration}</p>
                  <p>Admin: {rosca.isAdmin ? "Yes" : "No"}</p>
                  <p>Members: {rosca.members.length}</p>
                  <button>Join</button>
                </CardContent>
              </RoscaCard>
            ))}
          </Container>
          {/* Basic pagination */}
          <Pagination>
            {[...Array(Math.ceil(roscas.length / roscasPerPage))].map(
              (_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </Pagination>
        </>
      )}
    </div>
  );
};

export default Hometab;
