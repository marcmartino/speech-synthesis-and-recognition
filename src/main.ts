import * as voices from './modules/synthesisVoices';
import { speak } from './modules/synthesisSpeak';

setTimeout((): void => {
    //console.log(voices);
    //console.log(speak);

    const esVoice: Function = speak(voices.randVoiceFunc(voices.getVoicesByFilter()));
    const enVoice: Function = speak(voices.randVoiceFunc(voices.getVoicesById([0,2,4],
            voices.getVoicesByFilter({ lang: "en"}))));

    /*esVoice("Me saqué un 10 en inglés. ¿Y vos?")
        .then((e): void => {
            console.log('said');
            console.log(e);
            speak(enVoice, "Okay, what's next?");
        })
        .catch(console.log);
        */

    var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
    var recognition = new (SpeechRecognition || webkitSpeechRecognition)();
    var speechRecognitionList = new (SpeechGrammarList || webkitSpeechGrammarList)();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    var diagnostic = document.querySelector('.output');
    var bg = document.querySelector('html');

    document.body.onclick = function() {
        recognition.start();
        console.log('Ready to receive a color command.');
    }

    recognition.onresult = function(event) {
        var color = event.results[0][0].transcript;
        diagnostic.textContent = 'Result received: ' + color;
        bg.style.backgroundColor = color;
    }

}, 500);