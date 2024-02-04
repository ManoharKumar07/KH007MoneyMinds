import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h2>OpenRosca</h2>
      {roscaDetails ? (
        <>
          <p>Rosca ID: {roscaDetails._id}</p>
          <p>Rosca Name: {roscaDetails.roscaName}</p>
          {/* Add more details as needed */}
        </>
      ) : (
        <p>Loading rosca details...</p>
      )}
    </div>
  );
};

export default OpenRosca;
