import * as voices from './synthesisVoices';
import { speak } from './synthesisSpeak';

setTimeout((): void => {
    console.log(voices);
    console.log(speak);

    const esVoice: Function = voices.randVoiceFunc(voices.getVoicesByFilter());
    const enVoice: Function = voices.randVoiceFunc(voices.getVoicesById([0,2,4],
            voices.getVoicesByFilter({ lang: "en"})));

    speak(esVoice, "Me saqué un 10 en inglés. ¿Y vos?")
        .then((e): void => {
            console.log('said');
            console.log(e);
            speak(enVoice, "Okay, what's next?");
        })
        .catch(console.log);
}, 500);