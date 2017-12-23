

const listen = (lang: string = 'en-US'): Promise<SpeechRecognitionEvent> => new Promise((resolve, reject) => {
    var recognition = new (SpeechRecognition || webkitSpeechRecognition)();
    recognition.lang = lang;
    recognition.interimResults = false;

    recognition.start();
    recognition.onresult = resolve;
    recognition.onerror = reject;
});

export { listen };