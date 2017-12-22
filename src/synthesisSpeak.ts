// speak :: (() -> SSVoice) -> String ->  Promise (String)
const speak = (voiceFunc: Function) => (sentence: string): Promise<string> =>
    new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = voiceFunc();
        
        window.speechSynthesis.speak(utterance);
        utterance.onend = () => resolve(sentence);
        utterance.onerror = reject;
    }
);

export { speak };