
// const nameRef = document.querySelector("#name");
// function changeName(){
    // nameRef.innerHTML = "And Abdullah is my second name...";
// make buttons for calculating area, BMI, dark mode
// const areaRef = document.querySelector("#Areares");
// function calculateArea() {
//     let length = Number(prompt("Enter length :"));
//     let width = Number(prompt("Enter width :"));
//     const calculateArea = length * width;
//     areaRef.innerHTML = `Calculated Area is : ${calculateArea}`
// }

const bmiRef = document.querySelector("#bmiRes");

function calculateBMI() {
    let weight = parseFloat(prompt("Enter Your weight (Kg):"));
    let heightCm = parseFloat(prompt("Enter Your height (centimeters):"));
    let meterHeight = heightCm / 100;
    const totalBMI = weight / (meterHeight*meterHeight);
    bmiRef.innerHTML = `Calculated BMI is : ${totalBMI}`

}

const ageRef = document.querySelector("#ageCal");
function calculateAge(){
    let currentYear = Number(prompt("Enter the current On going year : "));
    let yearBorn = Number(prompt("Enter The year You Born : "));
    const calculatedAge = currentYear - yearBorn;
    ageRef.innerHTML = `Your Age is : ${calculatedAge}`
}

// const arRef = document.querySelector("#resl")s
function areaCal() {
    // this is used to take refrence  
    const lenRef = document.querySelector("#lenght")
    const widRef = document.querySelector("#width")
     // this is used to show value 
    const length = Number(lenRef.value);
    const width = Number(widRef.value);

    const area = length*width
    const resultsDivRef = document.querySelector("#results");
    resultsDivRef.innerHTML = `Area is ${area}m^2`
    

}

// } 
