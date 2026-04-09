// calculating Percentage of student.
function calculatePercentage(){
    const totalMarksRef = document.querySelector("#totalMarks")
    const obtainedMarksRef = document.querySelector("#obtMarks")

    const totMarks = Number(totalMarksRef.value)
    const obtMarks = Number(obtainedMarksRef.value);

    const percentage = (obtMarks/totMarks)*100;
    
    const totalPercentageDivRef = document.querySelector("#totalPercentage")
    totalPercentageDivRef.innerHTML = `Your percentage is ${percentage}`
}

// calculating BMI.

function calculateBMI() {

    const weightRef = document.querySelector("#weightHuman");
    const heightRef = document.querySelector("#heightHuman");

    // typecasting
    
    const weightTypecast = Number(weightRef.value);
    const heightTypecast = Number(heightRef.value);

    // conversions

    const heightMeter = heightTypecast / 100;

    // calculations 

    const calculatedBMI =  weightTypecast / (heightMeter * heightMeter); 

    // taking refrences of the resut div and storing location in resultBMIDivRef...
    
    const resultBMIDivRef = document.querySelector("#resultBMI");
    
    // displaying Results in the html div...

    resultBMIDivRef.innerHTML = `Your Body Mass Index is ${calculatedBMI} `
}

// Adding Products in Html by using java script's Dom function.

const products = ["Home", "About Us", "Contact Us", "Visit Us"];

const fruitRef = document.querySelector("#fruitNames");

products.map((fruit) => {
    const tagsRef = document.createElement("h4");
    tagsRef.innerHTML = fruit;

    fruitRef.appendChild(tagsRef);
})
// we can use any tags 