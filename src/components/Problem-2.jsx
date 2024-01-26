// Problem2.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

const Problem2 = () => {
  const [showModal, setShowModal] = useState({
    all: false,
    us: false,
  });
  const [allModalData, setAllModalData] = useState([]);
  const [usData, setUsData] = useState([]);
  const [currentMode, setCurrentMode] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeMode = (mode) => {
    setCurrentMode(mode);
  };
  const handleShow = (mode) => {
    setShowModal(mode);
    setCurrentMode(mode);
  };

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const allResponse = await axios.get(
          "https://contact.mediusware.com/api/contacts/"
        );
        const usResponse = await axios.get(
          "https://contact.mediusware.com/api/country-contacts/United States/"
        );

        const allData = allResponse.data.results.map((item) => ({
          id: item.id,
          phone: item.phone,
          country: item.country,
        }));

        const usData = usResponse.data.results.map((item) => ({
          id: item.id,
          phone: item.phone,
          country: item.country,
        }));

        setAllModalData(allData);
        setUsData(usData);
        // console.log(allData);
        // console.log(usData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => handleShow("all")}
            disabled={isLoading && currentMode === "all"}
          >
            {isLoading && currentMode === "all" ? "Loading..." : "All Contacts"}
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => handleShow("us")}
            disabled={isLoading && currentMode === "us"}
          >
            {isLoading && currentMode === "us" ? "Loading..." : "US Contacts"}
          </button>
        </div>

        {error && <div className="alert alert-danger">{error.message}</div>}

        <Modal
          showModal={showModal}
          handleClose={handleClose}
          currentMode={currentMode}
          changeMode={changeMode}
          allData={allModalData}
          usData={usData}
        />
      </div>
    </div>
  );
};

export default Problem2;
