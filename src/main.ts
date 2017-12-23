import * as voices from "./modules/synthesisVoices";
import { speak } from "./modules/synthesisSpeak";
import { listen } from "./modules/speechRecognition";
import greetingGrams from "./grammars/testGrams";

async function main() {
    await voices.isReady;

    const esVoice: Function = speak(voices.randVoiceFunc(voices.getVoicesByFilter({lang: 'es'})));
    const enVoice: Function = speak(voices.randVoiceFunc(voices.getVoicesById([0,2,4],
            voices.getVoicesByFilter({ lang: "en"}))));
    const esListen: Function = listen("es-US");
    const enListen: Function = listen("en-US");

    esVoice("¿Cuán creíbles y efectivas pueden ser las sanciones?")
        .then((): void => {
            esListen([greetingGrams.recuerdos])
                .then((e: SpeechRecognitionEvent) => {
                    console.log(e.results[0][0].transcript)
                    enVoice("Okay, what's next?");
                }).catch(console.log);
        }).catch(console.log);
}

main();