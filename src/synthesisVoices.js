"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var voices = window.speechSynthesis.getVoices();
var voicesLoaded = false;
window.speechSynthesis.onvoiceschanged = function () {
    voices = window.speechSynthesis.getVoices();
    voicesLoaded = true;
};
var getVoicesByFilter = function (opts, context) {
    if (opts === void 0) { opts = { lang: "es" }; }
    if (context === void 0) { context = voices; }
    return context.filter(function (voice) {
        return Object.keys(opts).reduce(function (truth, filterKey) {
            return truth && (voice[filterKey] === opts[filterKey] || voice[filterKey].indexOf(opts[filterKey]) >= 0);
        }, true);
    });
};
exports.getVoicesByFilter = getVoicesByFilter;
var getVoicesById = function (ids, context) {
    if (context === void 0) { context = voices; }
    return context.filter(function (voice, index) { return ids.includes(index); });
};
exports.getVoicesById = getVoicesById;
var randVoiceFunc = function (voiceList) {
    return function () { return voiceList[Math.floor(Math.random() * voiceList.length)]; };
};
exports.randVoiceFunc = randVoiceFunc;
//# sourceMappingURL=synthesisVoices.js.map