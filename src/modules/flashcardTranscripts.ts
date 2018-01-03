import { map, compose, concat, split, trim, flatten, replace, ____ } from 'ramda';
import { indexOf } from 'lodash';


interface SpeakersAndListeners {
    nativeSpeak: (phrase: string) => Promise<SpeechSynthesisEvent>;
    learnedSpeak: (phrase: string) => Promise<SpeechSynthesisEvent>;
    nativeListen?: (listenForWords: string[]) => Promise<SpeechRecognitionEvent>;
    learnedListen?: (listenForWords: string[]) => Promise<SpeechRecognitionEvent>;
}

const askForSentence: string[] = ['Can I have a sentence?', 'can i get a sentence', 'Can you use it in a sentence?', 'sentence'];
const askForSentenceEs: string[] = ['una oración', 'oración'];

const definition = ({nativeSpeak, learnedSpeak, nativeListen}: SpeakersAndListeners) =>
 (card: FlashCards.Card): Promise<SpeechSynthesisEvent> =>
    learnedSpeak(`¿Qué significa '${card.phrase}'?`)
        .then(() => nativeListen(concat(askForSentence, wordDefToResponseOptions(card.definition))))
        .then((e) => {
            if (askForSentence.indexOf(e.results[0][0].transcript) > -1) {
                return learnedSpeak(card.sentences[0].sentence)
                    .then(() => definition({nativeSpeak, learnedSpeak, nativeListen})(card));
            }
            return learnedSpeak('¡Buen trabajo!');
        })
        .catch(() => (learnedSpeak('Inténtalo de nuevo.'),
            definition({nativeSpeak, learnedSpeak, nativeListen})(card)));

const reverseDefinition = ({nativeSpeak, learnedSpeak, learnedListen}: SpeakersAndListeners) =>
 (card: FlashCards.Card): Promise<SpeechSynthesisEvent> =>
    nativeSpeak(`What is the word or phrase that means '${card.definition}'?`)
        .then(() => learnedListen(concat(askForSentenceEs, wordDefToResponseOptions(card.phrase))))
        .then((e) => {
            if (askForSentenceEs.indexOf(e.results[0][0].transcript) > -1) {
                return learnedSpeak(sentenceToCloze(card.phrase, card.sentences[0].sentence))
                    .then(() => reverseDefinition({nativeSpeak, learnedSpeak, learnedListen})(card));
            }
            return learnedSpeak('¡Buen trabajo!');
        })
        .catch(() => (learnedSpeak('Inténtalo de nuevo.'), 
            reverseDefinition({nativeSpeak, learnedSpeak, learnedListen})(card)));

// TODO: would be nice to add 'to something or to something else' combinations into this array
const wordDefToResponseOptions: (string) => string[] = compose(
        flatten,
        map((defOption: string): string[] => defOption.indexOf('to ') === 0 ? [defOption, defOption.substr(3)] : [defOption]),
        //trim,
        split(',')
    );

const sentenceToCloze = (phrase: string, sentence: string): string => replace(phrase, ",,,,,", sentence);

export { definition, reverseDefinition };