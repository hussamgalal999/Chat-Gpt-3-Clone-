const conversationHistoryContainer = document.querySelector('.conversation-history');
const answerSectionContainer = document.querySelector('.answer-section');
const inputTextarea = document.querySelector('#input-textarea');
const sendBtn = document.querySelector('#send-btn');
const newChatBtn = document.querySelector('#new-chat-btn');

let conversationHistory = [];

newChatBtn.addEventListener('click', () => {
    conversationHistory = [];
    conversationHistoryContainer.innerHTML = '';
    answerSectionContainer.innerHTML = '';
});

sendBtn.addEventListener('click', () => {
    const userInput = inputTextarea.value.trim();
    if (userInput) {
        const response = generateResponse(userInput);
        conversationHistory.push({ type: 'question', text: userInput });
        conversationHistory.push({ type: 'response', text: response });
        renderConversationHistory();
        inputTextarea.value = '';
    }
});

async function generateResponse(userInput) {
    // Replace with your actual OpenAI API key
    const apiKey = 'YOUR_OPENAI_API_KEY';

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // Or another suitable model
                prompt: userInput,
                max_tokens: 100, // Adjust as needed
                temperature: 0.7, // Adjust for creativity
            })
        });
        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Oops, something went wrong. Please try again later.';
    }
}

function renderConversationHistory() {
    conversationHistoryContainer.innerHTML = '';
    conversationHistory.forEach((item) => {
        const html = `
            <div class="${item.type === 'question' ? 'question' : 'response'}">
                <p>${item.text}</p>
            </div>
        `;
        conversationHistoryContainer.innerHTML += html;
    });
}
