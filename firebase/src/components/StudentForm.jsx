import React from "react";

function StudentForm({ studentForm, handleChange, handleSubmit, editId }) {
  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <h3>{editId ? "Update Record" : "Add New Student"}</h3>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={studentForm.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={studentForm.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cnic"
        placeholder="CNIC (e.g. 35202-xxxxxxx-x)"
        value={studentForm.cnic}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={studentForm.phoneNumber}
        onChange={handleChange}
        required
      />
      <button type="submit" className="save-btn">
        {editId ? "Update Data" : "Submit Data"}
      </button>
    </form>
  );
}

export default StudentForm;
