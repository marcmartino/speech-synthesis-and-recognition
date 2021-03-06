import { removeAccents } from './languageTools';
import { indexOf } from 'lodash';
import { pluck, flatten, filter, contains, prop, compose, map, head } from 'ramda';
// import { curry } from '@typed/curry';

type LangShortCode = ('en-AU' | 'en-CA' | 'en-GH' | 'en-GB' | 'en-IN' | 'en-IE' | 'en-KE' | 'en-NZ' | 'en-NG' | 'en-PH' | 'en-ZA' | 'en-TZ' | 'en-US' | 'es-AR' | 'es-BO' | 'es-CL' | 'es-CO' | 'es-CR' | 'es-EC' | 'es-SV' | 'es-ES' | 'es-US' | 'es-GT' | 'es-HN' | 'es-MX' | 'es-NI' | 'es-PA' | 'es-PY' | 'es-PE' | 'es-PR' | 'es-DO' | 'es-UY' | 'es-VE');

const listen = (lang: LangShortCode = 'en-US') => (grammars: string[] = []) => (condition: (SpeechRecognitionEvent) => boolean = () => true): Promise<SpeechRecognitionEvent> =>
  new Promise((resolve, reject) => {

    var recognition = new webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.grammars = genGrammarList(grammars);

    recognition.start();
    recognition.onresult = (e) => {    
      if (condition(e)) {
        console.log(`${e.results[0][0].transcript} found`);
        resolve(e);
      } else {
        console.log(`${e.results[0][0].transcript} does not match listening predicate`);
        reject(e);
      }
    };

    recognition.onnomatch = reject;
    recognition.onerror = reject;
    recognition.onend = reject;
  });

const justListen = (lang: LangShortCode = 'en-US') => listen(lang)();

const listenFor = (lang: LangShortCode = 'en-US') => (grammars: string[]) => (expected: string[]): Promise<SpeechRecognitionEvent> =>
  listen(lang)(grammars)(isRecognizedWordInList(expected));

const listenForWords = (lang: LangShortCode) => (expectedWords: string[]):Promise<SpeechRecognitionEvent> =>
  listenFor(lang)([wordListToGrammar(expectedWords)])(expectedWords);

const listenWithOptions = (lang: LangShortCode) => (expectedWordsAndPaths: WordListenRoute[]): Promise<SpeechRecognitionEvent> =>
  listenForWords(lang)(flatten(pluck('words', expectedWordsAndPaths)))
    .then(routeListenWordCondition(expectedWordsAndPaths));

const routeListenWordCondition = (wordsAndPaths: WordListenRoute[]) => (speechEvent: SpeechRecognitionEvent): Promise<SpeechRecognitionEvent> =>
  new Promise((resolve, reject) => {    
    const filteredWord = filterRouteObj(speechEvent[0][0].transcript)(wordsAndPaths);

    if (filteredWord) {
      filteredWord.promise(speechEvent)
        .then(resolve)
        .catch(reject);
    } else {
      reject(speechEvent);
    }
  });

const filterRouteObj = (word: string): (routingOptions: WordListenRoute[]) => WordListenRoute => 
  head(
    filter(
      compose(
        contains(removeAccents(word)),
        map(removeAccents),
        prop('words')),
    )
  );

const wordListToGrammar = (words: string[]): string => `#JSGF V1.0;grammar Generic;public <Generic> = <generic>;<generic> = ( ${words.join(' | ')} );`;

//TODO: should be lowercasing here
const isRecognizedWordInList = (words: string[]) => (e: SpeechRecognitionEvent): boolean => 
  indexOf(words.map(removeAccents), removeAccents(e.results[0][0].transcript)) >= 0;

const genGrammarList = (grammars: string[]): SpeechGrammarList => {
  let grammarList = new webkitSpeechGrammarList();
  grammars.forEach((gram: string) => {
    grammarList.addFromString(gram, 1);
  });

  console.log('Generating a grammar list on the following array');
  console.log(grammars);
  return grammarList;
};

export { listen, justListen, listenFor, listenForWords, listenWithOptions };

interface WordListenRoute {
    words: string[];
    promise: (SpeechRecognitionEvent) => Promise<any>;
}