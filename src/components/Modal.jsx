import React, { useState, useEffect } from "react";

const Modal = ({
  showModal,
  handleClose,
  currentMode,
  changeMode,
  allData,
  usData,
}) => {
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const modalData = currentMode === "all" ? allData : usData;

  useEffect(() => {
    // Update data to display when modalData changes
    setDataToDisplay(Array.isArray(modalData) ? modalData : []);
  }, [modalData, onlyEvenChecked]);

  const handleOnlyEvenChange = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = dataToDisplay.filter((item) => {
    // Filter by phone number or country name if the search term is not empty
    if (searchTerm.trim() !== "") {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        item.phone.toLowerCase().includes(searchTermLowerCase) ||
        item.country.name.toLowerCase().includes(searchTermLowerCase)
      );
    }
    return true; // If search term is empty, include all data
  });

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-switch-btn-container">
              <button
                type="button"
                className={`btn btn-link modal-btn-a ${
                  showModal === "all" || currentMode === "all" ? "active" : ""
                }`}
                onClick={() => changeMode("all")}
              >
                Modal A
              </button>
              <button
                type="button"
                className={`btn btn-link modal-btn-b ${
                  showModal === "us" || currentMode === "United States"
                    ? "active"
                    : ""
                }`}
                onClick={() => changeMode("United States")}
              >
                Modal B
              </button>
            </div>

            <button
              type="button"
              className="btn btn-link modal-btn-c"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="searchInput" className="form-label">
                Search:
              </label>
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Enter your search term"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Phone</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.phone}</td>
                    <td>{item.country.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <label>
              <input
                type="checkbox"
                checked={onlyEvenChecked}
                onChange={handleOnlyEvenChange}
              />{" "}
              Only Even
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
