
import { useState } from "react";
import { Area } from "./components/Area";
import WeatherAPP from "./components/WeatherAPP";
import ExpenseTracker from "./components/ExpenseManager";

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmiCalculate, setCalculate] = useState(0);
  
// calculate BMI Function
  function calculateBMI(e) {
    if (weight > 0 && height > 0) {


      e.preventDefault();

      const heightMeters = height / 100;
      const heightSquare = heightMeters * heightMeters;
      const calculatedBMI = weight / heightSquare
      setCalculate(calculatedBMI);


    }
  }


// calculate Area Function

  return (

    // BMI Calculate  
    <div>
      <h2>
        Making Bmi Calculator using React js.
      </h2>


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

      {/* Area Calculate */}
      <Area/>


      {/* Weather App */}
      <WeatherAPP/>

      {/* Expense Manager */}
      <ExpenseTracker/>


    </div>
  )
}
export default App;