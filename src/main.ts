import * as voices from "./modules/synthesisVoices";
import { speak } from "./modules/synthesisSpeak";
import { listenForWords, listenWithOptions } from "./modules/speechRecognition";
import * as transcripts from "./modules/flashcardTranscripts";
import testCards from "./devAssets/testCards";

async function main() {
  await voices.isReady;

  const esSpeak = speak(voices.randVoiceFunc(
    voices.getVoicesByFilter({lang: 'es'})));
  const enSpeak = speak(voices.randVoiceFunc(
    voices.getVoicesByFilter({ lang: "en"})));
  const esListen = listenForWords("es-US");
  const enListen = listenForWords("en-US");

  const esListenOpt = listenWithOptions('es-US');

  
  const promptCardDefs = transcripts.definition({nativeSpeak: enSpeak, learnedSpeak: esSpeak, nativeListen: enListen});
  const promptCardReverseDefs = transcripts.reverseDefinition({nativeSpeak: enSpeak, learnedSpeak: esSpeak, learnedListen: esListen});

  /*promptCardReverseDefs(testCards[0])
    /*.then(() => promptCardDefs(testCards[1]))
    .then(() => promptCardReverseDefs(testCards[2]))
    .then(() => esSpeak('Has acabado con todo tus palabras.'))*/
    //.catch(() => console.log('cards failed'));

    esSpeak('Bienvenido').then(() => 
      esListenOpt([
        {words: ['hola', 'alo', 'oye'], promise: () => esSpeak('hola chico')},
        {words: ['horario', 'siguiente', 'adelante'], promise: () => esSpeak('otra cosas')}
      ]))
      .then(() => esSpeak('vámonos'))
      .catch(() => esSpeak('mensaje de error'));

}

main();