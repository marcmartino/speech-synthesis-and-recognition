/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var voices = __webpack_require__(1);
var synthesisSpeak_1 = __webpack_require__(2);
setTimeout(function () {
    console.log(voices);
    console.log(synthesisSpeak_1.speak);
    var esVoice = voices.randVoiceFunc(voices.getVoicesByFilter());
    var enVoice = voices.randVoiceFunc(voices.getVoicesById([0, 2, 4], voices.getVoicesByFilter({ lang: "en" })));
    synthesisSpeak_1.speak(esVoice, "Me saqué un 10 en inglés. ¿Y vos?").then(function (e) {
        console.log('said');
        console.log(e);
        synthesisSpeak_1.speak(enVoice, "Okay, what's next?");
    }).catch(console.log);
}, 500);
//# sourceMappingURL=main.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var voices = window.speechSynthesis.getVoices();
var voicesLoaded = false;
window.speechSynthesis.onvoiceschanged = function () {
    voices = window.speechSynthesis.getVoices();
    voicesLoaded = true;
};
var getVoicesByFilter = function getVoicesByFilter(opts, context) {
    if (opts === void 0) {
        opts = { lang: "es" };
    }
    if (context === void 0) {
        context = voices;
    }
    return context.filter(function (voice) {
        return Object.keys(opts).reduce(function (truth, filterKey) {
            return truth && (voice[filterKey] === opts[filterKey] || voice[filterKey].indexOf(opts[filterKey]) >= 0);
        }, true);
    });
};
exports.getVoicesByFilter = getVoicesByFilter;
var getVoicesById = function getVoicesById(ids, context) {
    if (context === void 0) {
        context = voices;
    }
    return context.filter(function (voice, index) {
        return ids.includes(index);
    });
};
exports.getVoicesById = getVoicesById;
var randVoiceFunc = function randVoiceFunc(voiceList) {
    return function () {
        return voiceList[Math.floor(Math.random() * voiceList.length)];
    };
};
exports.randVoiceFunc = randVoiceFunc;
//# sourceMappingURL=synthesisVoices.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map