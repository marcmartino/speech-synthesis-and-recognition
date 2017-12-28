declare module FlashCards {
    export interface Sentence {
        sentence: string;
        translated: string;
    }
    export interface Card {
        phrase: string;
        definition: string;
        sentences: Sentence[];
    }
}