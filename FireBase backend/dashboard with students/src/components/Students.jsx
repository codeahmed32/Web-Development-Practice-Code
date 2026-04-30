import React, { useState, useEffect } from 'react';
import { firestoreconfig } from '../firebase/config';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";

// import { getDocs, collection, addDoc } from 'firebase/firestore';

const Students = () => {
    const [studentForm, setStudentForm] = useState({
        fullName: "",
        cnic: "",
    });
    const [students, setStudents] = useState([]);

    const getStudent = async () => {
        try {
            const collectionRef = collection(firestoreconfig, "students");
            const studentDocs = await getDocs(collectionRef);
            const studentsListLocal = studentDocs.docs.map((document) => ({
                id: document.id, // ID add ki taake delete/edit mein kaam aaye
                ...document.data(),
            }));
            setStudents(studentsListLocal);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getStudent();
    }, []);

    const handleChange = (e) => {
        setStudentForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    async function saveStudent(e) {
        e.preventDefault();
        try {
            const collectionRef = collection(firestoreconfig, "students");
            await addDoc(collectionRef, { ...studentForm });
            setStudentForm({ fullName: "", cnic: "" }); // Form clear
            getStudent(); // List update
            alert("Student Saved!");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-800">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
                    <p className="text-gray-500">Manage your student records efficiently</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-2 pr-4 rounded-full border border-gray-100">
                    <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">A</div>
                    <span className="text-sm font-semibold">Account Settings</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Card: Add Student Form */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold">Registration Form</h2>
                    </div>

                    <form onSubmit={saveStudent} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 ml-1 text-gray-600">Full Name</label>
                            <input
                                type="text"
                                placeholder='Enter Name'
                                name='fullName'
                                value={studentForm.fullName}
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 ml-1 text-gray-600">CNIC Number</label>
                            <input
                                type="text"
                                placeholder='xxxxx-xxxxxxx-x'
                                name='cnic'
                                value={studentForm.cnic}
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">
                            Save Student Record
                        </button>
                    </form>
                </div>

                {/* Right Card: Student List */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold">Enrolled Students</h2>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {students.length === 0 ? (
                            <p className="text-gray-400 text-center py-10 italic">No students found...</p>
                        ) : (
                            students.map((st, index) => (
                                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                                    <div>
                                        <div className="font-bold text-slate-800">{st.fullName}</div>
                                        <div className="text-sm text-gray-500">CNIC: {st.cnic}</div>
                                    </div>
                                    <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-700 transition-all">
                                        Edit Info
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Students;