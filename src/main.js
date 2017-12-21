"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var voices = require("./synthesisVoices");
var synthesisSpeak_1 = require("./synthesisSpeak");
setTimeout(function () {
    console.log(voices);
    console.log(synthesisSpeak_1.speak);
    var esVoice = voices.randVoiceFunc(voices.getVoicesByFilter());
    var enVoice = voices.randVoiceFunc(voices.getVoicesById([0, 2, 4], voices.getVoicesByFilter({ lang: "en" })));
    synthesisSpeak_1.speak(esVoice, "Me saqué un 10 en inglés. ¿Y vos?")
        .then(function (e) {
        console.log('said');
        console.log(e);
        synthesisSpeak_1.speak(enVoice, "Okay, what's next?");
    })
        .catch(console.log);
}, 500);
//# sourceMappingURL=main.js.map