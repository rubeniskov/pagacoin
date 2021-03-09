import {
  PopulateAction,
  SetAnswerAction,
  CleanAction,
} from './store/actions'

export enum ETriviaQuestionType {
  BOOLEAN = "boolean",
}

export enum ETriviaQuestionDifficulty {
  HARD = "hard",
}

export type TriviaQuestion = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
}

export type TriviaOptions = {
  url?: string,
  amount?: number
  difficulty?: ETriviaQuestionDifficulty
  type?: string
}

export type TriviaAnswer = String

export type TriviaData = {
  answers: Array<TriviaAnswer>,
  questions: Array<TriviaQuestion>
}

export type TriviaState = TriviaData

export type TriviaAction = PopulateAction | SetAnswerAction | CleanAction

export type TriviaResult = {
  error: Error,
  loading: boolean,
  data: TriviaData
}

export type TriviaApi = TriviaResult & {
  setAnswer: (answer: TriviaAnswer) => void,
  playAgain: () => void
}
