import * as voices from "./modules/synthesisVoices";
import { speak } from "./modules/synthesisSpeak";
import { listenForWords } from "./modules/speechRecognition";
import * as transcripts from "./modules/flashcardTranscripts";
import testCards from "./devAssets/testCards";

async function main() {
  await voices.isReady;

  const esSpeak = speak(voices.randVoiceFunc(
    voices.getVoicesByFilter({lang: 'es'})));
  const enSpeak = speak(voices.randVoiceFunc(
    voices.getVoicesByFilter({ lang: "en"})));
  const esListen: Function = listenForWords("es-US");
  const enListen: Function = listenForWords("en-US");

  
  const promptCardDefs = transcripts.definition({nativeSpeak: enSpeak, learnedSpeak: esSpeak, nativeListen: enListen});

  promptCardDefs(testCards[0])
    .then(() => promptCardDefs(testCards[1]))
    .then(() => promptCardDefs(testCards[2]))
    .catch(() => console.log('cards failed'));

}

main();