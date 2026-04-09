
try {
    function getweather() {
        const weatherDivRef = document.querySelector("#weatherDisplay");
        const cityRef = document.querySelector("#city");

        const cityName = cityRef.value;

        const weatherPromise = fetch(`https://p2pclouds.up.railway.app/v1/learn/weather?city=${cityName}`)


        weatherPromise
            .then((data) => {
                console.log(data);
                return data.json()
            }).then((data) => {
                weatherDivRef.innerHTML = `${cityName} weather is ${data.current.temp_c} celcius`
            }).catch((error) => {
                console.log(error)
            })
    }

}
catch (err) {
    const weatherDivRef = document.querySelector("#weatherDisplay");
    weatherDivRef.innerHTML = `Something Went Wrong `
}









// google chatbot  (Using Api)
async function getChatbotAnswer() {
    try {
        const queryRef = documnent.querySelector(("#query"));
        const query = queryRef.value;
        const chatbotPromise = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent", 
        {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-goog-api-key": "AIzaSyDe0Sv7KdMxteTSO547jdD6xjKrPprZaes"
            }
            ,
            body: JSON.stringify({
                "contents": [
                    {
                        "parts": [
                            {
                                "text": "refuse any other query than technology simply refuse it "
                            },
                             {
                                "text": ""
                            },
                        ],
                    }, 
                ],

            })

        },

        );

        const chatbotAnswer = await chatbotPromise.json();
        const reply = chatbotAnswer.candidates[0].content.parts[0].text;
        const answerDivRef = document.querySelector("#answer");
        answerDivRef.innerHTML = reply;

    } catch (err) {
        console.log(err)
    }
}


// details on json

const student = {

    name: "Ahmed",
    age : 19,
    hobbies: ["Playing", "Tech "]
}
//  to convert the object into the string by using json()

const studentJSON = JSON.stringify(student)
console.log(student)
console.log(studentJSON)
//  to convert the string into the object by using json()

console.log(JSON.parse(studentJSON))















// set TimeOut works one time only

// setTimeout(()=>{
//     console.log("Iam Ahmed")
// },5000)

// set interval is used for reptative alerts
// setInterval(()=>{
//     alert("Are You here ?")
// },3000)
// promises in JS


// const weatherInfo = new Promise((resolve, reject) => {

// })



// weatherInfo.then((response) => {
//     console.log("success Function")
//     console.log(response)
// }).catch((error) => {
//     console.log("error Function")
//     console.log(error)
// })


// age check promise
// const ageCheck = new Promise((resolve, reject) => {
//     const age = 19;
//     if (age >= 18) {
//         resolve({ success: true })
//     } else {
//         reject({ success: false })
//     }
// })
// console.log(ageCheck)

// // promise handling

// ageCheck.then((response) => {
//     console.log(response.message);
//     console.log(response.success);
// }).then((error) => {
//     console.log("error function");
//     console.log(error);
// })
