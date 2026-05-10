import { useEffect, useState } from "react";
import "./App.css";
import {collection,addDoc,onSnapshot,deleteDoc,doc,updateDoc,} from "firebase/firestore";
import { firestoreConfig } from "./firebase/config";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Modal from "./components/Modal";

function App() {
  const [studentForm, setStudentForm] = useState({
    firstName: "",
    lastName: "",
    cnic: "",
    phoneNumber: "",
  });
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const collectionRef = collection(firestoreConfig, "students");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setStudents(snapshot.docs.map((d) => ({ ...d.data(), id: d.id })));
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setStudentForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditTrigger = (student) => {
    setStudentForm({ ...student });
    setEditId(student.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setStudentForm({ firstName: "", lastName: "", cnic: "", phoneNumber: "" });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(firestoreConfig, "students", editId), {
          ...studentForm,
        });
      } else {
        await addDoc(collection(firestoreConfig, "students"), {
          ...studentForm,
        });
      }
      closeModal();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="app-container">
      <h1>Student Database</h1>

      <button className="add-data-btn" onClick={() => setIsModalOpen(true)}>
        + Add Data
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <StudentForm
          studentForm={studentForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editId={editId}
        />
      </Modal>

      <hr />

      <StudentList
        students={students}
        handleEditTrigger={handleEditTrigger}
        deleteStudent={(id) => deleteDoc(doc(firestoreConfig, "students", id))}
      />
    </div>
  );
}

export default App;
