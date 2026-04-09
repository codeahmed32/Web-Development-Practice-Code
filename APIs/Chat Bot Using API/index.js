async function getChatBot() {
    try{
        const queryRef= document.querySelector("#query");
        const queryVal = queryRef.value;

        const chatBotPromise = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",

            {
                "method" : "POST",
                "headers": {
                    "Content-Type":"application/json",
                    "x-goog-api-key" : "AIzaSyBg3T1FSgslINDrfFJuo5k13OZtwuVGEZg"
                },
                "body": JSON.stringify({
                    "contents": [
                    {
                        "parts": [
                            {
                                "text": "You are only allowed to answer the medical answers if user enters any other query just simply and politey refuse to answer "
                            },
                             {
                                "text": queryVal
                            },
                        ],
                    }, 
                ],
                })
            }
        )


        const chatBotAnswer = await chatBotPromise.json();
        console.log(chatBotAnswer);
        const chatReply = chatBotAnswer.candidates[0].content.parts[0].text;
        const answerDivRef = document.querySelector("#answer");
        answerDivRef.innerHTML = chatReply;
    }
    catch(err){
    console.log(err);
    const errorDisplay = err.code.message;
    const answerDivRef = document.querySelector("#answer");
    answerDivRef.innerHTML = errorDisplay;
    
}
}

