import React, { useState } from 'react';
const StudentsDisplay = ({ regStudents }) => {
  return (
    <div>
      {regStudents.map((students, index) => {
        return (
          <div key={index}>{students}</div>
        )
      })}
      <h3>Registered Students</h3>
    </div>
  )
}
export default StudentsDisplay;
