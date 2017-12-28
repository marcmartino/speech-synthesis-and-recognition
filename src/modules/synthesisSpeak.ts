// import { curry } from 'lodash';
import { setTimeout } from 'core-js/library/web/timers';


const speak = (voiceFunc: () => SpeechSynthesisVoice) => (sentence: string): Promise<SpeechSynthesisEvent> => 
    new Promise((resolve, reject) => {
        console.log('preparing to say: ' + sentence);
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = voiceFunc();
        
        window.speechSynthesis.speak(utterance);
        
        utterance.onend = (e: SpeechSynthesisEvent) => {
            console.log('utterance completed');
            return resolve(e);
        }

        // TODO: terrible hack to work around chrome sometimes not triggering onend
        setTimeout(() => {
            resolve();
            speechSynthesis.cancel();
        }, sentence.length * 150);
    
        utterance.onerror = reject;
    }
);

export { speak };