// speak :: (() -> SSVoice) -> String ->  Promise (String)
const speak = (voiceFunc: Function) => (sentence: string) => (): Promise<string> =>
    new Promise((resolve, reject) => {
        console.log('preparing to say: ' + sentence);
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = voiceFunc();
        
        window.speechSynthesis.speak(utterance);
        console.log(`just started staying ${sentence}`);
        utterance.onend = () => {
            console.log('utterance ending');
            resolve(sentence);
        }
    
        utterance.onerror = reject;
    }
);

export { speak };