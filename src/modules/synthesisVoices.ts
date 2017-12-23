interface VoiceFilterOptions {
    voiceURI?: string;
    name?: string;
    lang?: string;
    localService?: boolean;
    default?: boolean;
}

const isReady = new Promise((resolve, reject) => {
    window.speechSynthesis.onvoiceschanged = (): void => {
        voices = window.speechSynthesis.getVoices();
        resolve();
    };
});

let voices: SpeechSynthesisVoice[] = window.speechSynthesis.getVoices();

const getVoicesByFilter = (opts: VoiceFilterOptions = {lang: "es"},
    context: SpeechSynthesisVoice[] = voices): SpeechSynthesisVoice[] => 
        context.filter((voice: SpeechSynthesisVoice) => 
            Object.keys(opts).reduce((truth: boolean, filterKey): boolean => 
                truth && (voice[filterKey] === opts[filterKey] || voice[filterKey].indexOf(opts[filterKey]) >= 0),
                true));

const getVoicesById = (ids: number[], context: SpeechSynthesisVoice[] = voices): SpeechSynthesisVoice[] => 
    context.filter((voice, index) => ids.includes(index));

const randVoiceFunc = (voiceList: SpeechSynthesisVoice[]) =>
    (): SpeechSynthesisVoice => voiceList[Math.floor(Math.random() * voiceList.length)];

export { isReady, getVoicesByFilter, getVoicesById, randVoiceFunc };