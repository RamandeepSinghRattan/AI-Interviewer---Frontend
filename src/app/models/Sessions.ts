import { QuestionAnswer } from "./QuesAns";

export interface Session {
    jobDescription: string;
    skills: string[];
    experience: number;
    questionAnswers: QuestionAnswer[];
}