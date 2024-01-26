import React from "react";

const ContactInfoModal = ({ contact, infoShow, handleInfoClose }) => {
  return (
    <div
      className={`modal-overlay ${infoShow ? "show" : ""}`}
      onClick={handleInfoClose}
    >
      <div className={`modal ${infoShow ? "show" : ""}`}>
        <div className="modal-header">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <h2>Contact Information</h2>
        </div>
        <div className="modal-body">
          <p>
            <strong>ID:</strong> {contact.id}
          </p>
          <p>
            <strong>Phone Number:</strong> {contact.phone}
          </p>
          <p>
            <strong>Country:</strong> {contact.country.name}
          </p>
          <p>
            <strong>Description:</strong> Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoModal;
