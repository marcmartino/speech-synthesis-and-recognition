"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// speak :: (() -> SSVoice) -> String ->  Promise (String)
var speak = function speak(voiceFunc, sentence) {
    return new Promise(function (resolve, reject) {
        var utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = voiceFunc();
        window.speechSynthesis.speak(utterance);
        utterance.onend = function () {
            return resolve(sentence);
        };
        utterance.onerror = reject;
    }
    //)
    );
};
exports.speak = speak;
//# sourceMappingURL=synthesisSpeak.js.map