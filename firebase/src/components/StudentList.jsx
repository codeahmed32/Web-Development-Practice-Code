import React from "react";

function StudentList({ students, handleEditTrigger, deleteStudent }) {
  return (
    <div className="student-list">
      {students.map((st) => (
        <div key={st.id} className="student-card">
          <p>
            <strong>Name:</strong> {st.firstName} {st.lastName}
          </p>
          <p>
            <strong>CNIC:</strong> {st.cnic}
          </p>
          <p>
            <strong>Phone:</strong> {st.phoneNumber}
          </p>

          <div className="actions">
            <button
              onClick={() => handleEditTrigger(st)}
              style={{ backgroundColor: "#ffcc00", marginRight: "8px" }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteStudent(st.id)}
              style={{ backgroundColor: "#ff4d4d", color: "white" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {students.length === 0 && (
        <p>No records found. Click "Add Data" to start.</p>
      )}
    </div>
  );
}

export default StudentList;
