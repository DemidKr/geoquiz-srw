export interface IGame {
    coordinates: number[],
    answer: number[],
    step: number,
    scores: number[],
    answersArray: number[][],
    finalScore: number,
    stepText: string,
    zoomLevel: number,
}

export interface IGameInterface {
    showHint: boolean,
    showStepWindow: boolean,
    showResultWindow: boolean,
}
