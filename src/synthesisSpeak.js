"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_curry_1 = require("lodash.curry");
// speak :: (() -> SSVoice) -> String ->  Promise (String)
var speak = lodash_curry_1.default(function (voiceFunc, sentence) {
    return new Promise(function (resolve, reject) {
        var utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = voiceFunc();
        window.speechSynthesis.speak(utterance);
        utterance.onend = function () { return resolve(sentence); };
        utterance.onerror = reject;
    });
});
exports.speak = speak;
//# sourceMappingURL=synthesisSpeak.js.map