import * as voices from "./modules/synthesisVoices";
import { speak } from "./modules/synthesisSpeak";
import { listen, listenForWords } from "./modules/speechRecognition";
import greetingGrams from "./grammars/testGrams";

async function main() {
  await voices.isReady;

  const esSpeak: Function = speak(voices.randVoiceFunc(
    voices.getVoicesByFilter({lang: 'es'})));
  const enSpeak: Function = speak(voices.randVoiceFunc(
    voices.getVoicesByFilter({ lang: "en"})));
  const esListen: Function = listenForWords("es-US");
  const enListen: Function = listenForWords("en-US");

  
  esSpeak('Hola!')()
    .then(enSpeak("Okay, what's next?"))
  
    .then(enSpeak('complete'))
    .catch(console.log);
}

main();