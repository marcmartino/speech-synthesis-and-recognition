type LangShortCode = ('en-AU' | 'en-CA' | 'en-GH' | 'en-GB' | 'en-IN' | 'en-IE' | 'en-KE' | 'en-NZ' | 'en-NG' | 'en-PH' | 'en-ZA' | 'en-TZ' | 'en-US' | 'es-AR' | 'es-BO' | 'es-CL' | 'es-CO' | 'es-CR' | 'es-EC' | 'es-SV' | 'es-ES' | 'es-US' | 'es-GT' | 'es-HN' | 'es-MX' | 'es-NI' | 'es-PA' | 'es-PY' | 'es-PE' | 'es-PR' | 'es-DO' | 'es-UY' | 'es-VE');

const listen = (lang: LangShortCode = 'en-US') => (grammars: string[] = []): Promise<SpeechRecognitionEvent> =>
        new Promise((resolve, reject) => {

    var recognition = new webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.grammars = genGrammarList(grammars);

    recognition.start();
    recognition.onresult = resolve;
    recognition.onerror = reject;
});

const genGrammarList = (grammars: string[]): SpeechGrammarList => {
  let grammarList = new webkitSpeechGrammarList();
  grammars.forEach((gram: string) => {
    grammarList.addFromString(gram, 1);
  });

  return grammarList;
};

const justListen = (lang: LangShortCode = 'en-US') => listen(lang)();

export { listen, justListen };