import * as voices from "./modules/synthesisVoices";
import { speak } from "./modules/synthesisSpeak";
import { listen } from "./modules/speechRecognition";
import greetingGrams from "./grammars/testGrams";

async function main() {
    await voices.init;

    const esVoice: Function = speak(voices.randVoiceFunc(voices.getVoicesByFilter({lang: 'es'})));
    const enVoice: Function = speak(voices.randVoiceFunc(voices.getVoicesById([0,2,4],
            voices.getVoicesByFilter({ lang: "en"}))));

    esVoice("¿Cuán creíbles y efectivas pueden ser las sanciones?")
        .then((): void => {
            listen("es-US")([greetingGrams.recuerdos])
                .then((e: SpeechRecognitionEvent) => {
                    console.log(e.results[0][0].transcript)
                    enVoice("Okay, what's next?");
                }).catch(console.log);
        }).catch(console.log);
}

main();