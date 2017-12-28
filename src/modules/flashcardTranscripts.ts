import { map, compose, concat, split, trim, flatten } from 'ramda';
import { indexOf } from 'lodash';
import * as testCards from './../devAssets/testCards';

interface SpeakersAndListeners {
    nativeSpeak: (string) => Promise<SpeechSynthesisEvent>;
    learnedSpeak: (string) => Promise<SpeechSynthesisEvent>;
    nativeListen: Function;
}

const askForSentence: string[] = ['Can I have a sentence?', 'Can you use it in a sentence?', 'sentence'];

const definition = ({nativeSpeak, learnedSpeak, nativeListen}: SpeakersAndListeners) =>
 (card: FlashCards.Card): Promise<any> =>
    learnedSpeak(`¿Qué significa '${card.phrase}'?`)
        .then(() => nativeListen(concat(askForSentence, wordDefToResponseOptions(card.definition))))
        .then((e) => {
            if (askForSentence.indexOf(e[0][0].transcript) > -1) {
                return learnedSpeak(card.sentences[0].sentence)
                    .then(() => definition({nativeSpeak, learnedSpeak, nativeListen})(card));
            }
            return learnedSpeak('¡Buen trabajo!');
        })
        .catch(() => (learnedSpeak('Inténtalo de nuevo.'), definition({nativeSpeak, learnedSpeak, nativeListen})(card)));

// TODO: would be nice to add 'to something or to something else' combinations into this array
const wordDefToResponseOptions: (string) => string[] = compose(
        flatten,
        map((defOption: string): string[] => defOption.indexOf('to ') === 0 ? [defOption, defOption.substr(3)] : [defOption]),
        //trim,
        split(',')
    );

export { definition };