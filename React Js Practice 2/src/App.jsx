import React from 'react'
import Header from './components/Header'
import StudentsDisplay from './components/StudentsDisplay'
import { useState } from 'react'

const App = () => {

    // Percentage Calculation useStates
    const [obtMarks, setObtMarks] = useState(0)
    const [totMarks, setTotMarks] = useState(0)
    const [percentage, setPercentage] = useState(0)
    function calculatePercentage(e) {
        e.preventDefault();

        const userPercentage = (obtMarks * 100) / totMarks;
        setPercentage(userPercentage)
    }

    // Area Calculate

    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)
    const [result, setResult] = useState(0)
    function calculateArea(e) {
        e.preventDefault();

        const calculatedArea = length * width;
        setResult(calculatedArea);
    }

    // Shares Calculation

    const [totalAMT, setAMT] = useState(0)
    const [noOfshares, setShares] = useState(0)
    const [perShare, setPerShare] = useState(0)

    function calculateShares(e) {
        e.preventDefault();

        const calculatedShares = totalAMT / noOfshares;
        setPerShare(calculatedShares)

    }

    // Students Display
    const registeredStudents = ["Ahmed", "Ali", "Abdullah", "Farooqs", "Muhammad"];


    // BMI Calculation

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmiCalculate, setCalculate] = useState(0);

    function calculateBMI(e) {
        if (weight > 0 && height > 0) {


            e.preventDefault();

            const heightMeters = height / 100;
            const heightSquare = heightMeters * heightMeters;
            const calculatedBMI = weight / heightSquare
            setCalculate(calculatedBMI);


        }
    }

    // Todo list 

    const [todos, setTodos] = useState([]);

    //Todo's Delete Functionality

    function deleteTodo(todoToDelete) {
        const filterTodos = todos.filter((td) => td != todoToDelete);

        setTodos(filterTodos); // ✅ IMPORTANT FIX
    }
    // Todo's Edit Funcionality
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");

    function startEdit(index, currentText) {
        setEditingIndex(index);
        setEditText(currentText);
    }
    function saveEdit(index) {
        const updatedTodos = [...todos];
        updatedTodos[index] = editText;
        setTodos(updatedTodos);
        setEditingIndex(null);
        setEditText("");
    }








    return (
        <div>
            {/* Main Headngs */}
            <h1>This is The Main App.jsx File </h1>
            <p>Linking all of the components to this main file</p>

            {/* Percentage Calculation */}
            <h3>Percentage Calculate</h3>

            <form onSubmit={calculatePercentage}>
                <div>
                    <input type="number" name="obtmarks" id="obtmarks" placeholder="Enter Obtained Marks"
                        onChange={(e) => { setObtMarks(Number((e.target.value))) }} />
                </div>
                <div>
                    <input type="number" name="totalMarks" id="totalMarks" placeholder="Enter total Marks"
                        onChange={(e) => { setTotMarks(Number((e.target.value))) }} />
                </div>
                <button>Calculate Percentage </button>

            </form>
            <div>your calculated percenatage is {percentage}</div>

            {/* End ...  */}

            {/* Area Starts */}
            <h3>Area Calculate</h3>
            <form onSubmit={calculateArea}>
                <input type="number" name="length" id="length" placeholder="Enter Length" onChange={(e) => { setLength(Number(e.target.value)) }} />
                <input type="number" name="Width" id="width" placeholder="Enter Width" onChange={(e) => { setWidth(Number(e.target.value)) }} />
                <button> Calculate Area</button>
                <div>The Calculated Area is {result}</div>
            </form>

            {/* End ... */}

            {/* Shares Distribution Calculation */}
            <h3>Shares Distribution</h3>
            <form onSubmit={calculateShares}>
                <input type="number" name="totalAmount" id="totalAmount" placeholder="What is your total Amount" onChange={(e) => { setAMT(Number((e.target.value))) }} />
                <input type="number" name="noOfshares" id="noOfshares" placeholder="What is the Total no of shares" onChange={(e) => { setShares(Number((e.target.value))) }} />
                <button>Calculate</button>
                <div>Per Share Is {perShare}</div>
            </form>
            {/* End ... */}

            {/* Students  Display by using map functionality in react*/}
            <h3>Displaying Students</h3>
            <StudentsDisplay regStudents={registeredStudents} />

            {/* End ...*/}

            {/* Passing From one file to other */}

            <Header officeName={"Abdullah"} />
            <Header officeName={"Ali"} />
            {/* End ... */}

            {/* BMI Calculator */}
            <h3>BMI Calculation</h3>
            <form onSubmit={calculateBMI}>
                <div>
                    <input type="number" id="userWeight" name="userWeight" placeholder="Enter Your Weight in (Kg)'s"
                        onChange={(e) => { setWeight(Number(e.target.value)) }} />
                </div>

                <div>
                    <input type="number" id="userHeight" name="userHeight" placeholder="Enter Your height (m)"
                        onChange={(e) => { setHeight(Number(e.target.value)) }} />
                </div>
                <button>Calculate BMI</button>
                <div>Your BMI is {bmiCalculate}</div>
            </form>


            <AddTodo setTodos={setTodos} />
            <div className="todo-div">
                <div className="todo-container">
                    {todos.map((td, index) => {
                        return (
                            <div className="todo-div">
                                <div className="todo-container">
                                    <h3>{td}</h3>
                                </div>

                                {/* Edit mode inp tag */}
                                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                <button onClick={() => saveEdit(index)}>Save</button>

                                {/* Normal Mode Inp tag */}
                                <button className="btn-edit" onClick={(e) => startEdit(index, td)}>Edit</button>
                                <button className="btn-delete" onClick={(e) => deleteTodo(td)}>Delete</button>
                            </div>
                        )
                    })}

                </div>
            </div >


        </div>
    )
}
export default App;
