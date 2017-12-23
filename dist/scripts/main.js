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


var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var voices = __webpack_require__(1);
var synthesisSpeak_1 = __webpack_require__(2);
var speechRecognition_1 = __webpack_require__(3);
var testGrams_1 = __webpack_require__(4);
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var esVoice, enVoice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, voices.init];
                case 1:
                    _a.sent();
                    esVoice = synthesisSpeak_1.speak(voices.randVoiceFunc(voices.getVoicesByFilter({ lang: 'es' })));
                    enVoice = synthesisSpeak_1.speak(voices.randVoiceFunc(voices.getVoicesById([0, 2, 4], voices.getVoicesByFilter({ lang: "en" }))));
                    esVoice("¿Cuán creíbles y efectivas pueden ser las sanciones?").then(function () {
                        speechRecognition_1.listen("es-US")([testGrams_1.default.recuerdos]).then(function (e) {
                            console.log(e.results[0][0].transcript);
                            enVoice("Okay, what's next?");
                        }).catch(console.log);
                    }).catch(console.log);
                    return [2 /*return*/];
            }
        });
    });
}
main();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var init = new Promise(function (resolve, reject) {
    window.speechSynthesis.onvoiceschanged = function () {
        voices = window.speechSynthesis.getVoices();
        resolve();
    };
});
exports.init = init;
var voices = window.speechSynthesis.getVoices();
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
// speak :: (() -> SSVoice) -> String ->  Promise (String)
var speak = function speak(voiceFunc) {
    return function (sentence) {
        return new Promise(function (resolve, reject) {
            var utterance = new SpeechSynthesisUtterance(sentence);
            utterance.voice = voiceFunc();
            window.speechSynthesis.speak(utterance);
            utterance.onend = function () {
                return resolve(sentence);
            };
            utterance.onerror = reject;
        });
    };
};
exports.speak = speak;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var listen = function listen(lang) {
    if (lang === void 0) {
        lang = 'en-US';
    }
    return function (grammars) {
        if (grammars === void 0) {
            grammars = [];
        }
        return new Promise(function (resolve, reject) {
            var recognition = new webkitSpeechRecognition();
            recognition.lang = lang;
            recognition.interimResults = false;
            recognition.grammars = genGrammarList(grammars);
            recognition.start();
            recognition.onresult = resolve;
            recognition.onerror = reject;
        });
    };
};
exports.listen = listen;
var genGrammarList = function genGrammarList(grammars) {
    var grammarList = new webkitSpeechGrammarList();
    grammars.forEach(function (gram) {
        grammarList.addFromString(gram, 1);
    });
    return grammarList;
};
var justListen = function justListen(lang) {
    if (lang === void 0) {
        lang = 'en-US';
    }
    return listen(lang)();
};
exports.justListen = justListen;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "recuerdos": "#JSGF V1.0; grammar greeting; public <greeting> = hola | oye | mira",
    "greetings": "#JSGF V1.0; grammar greeting; public <greeting> = hello | hi | sup"
};

/***/ })
/******/ ]);