export interface Recepie {
    name: string;
    shortName: string;
    headline: string;
    summary: string;
    category: string;
    time: number;
    serves: number;
    ingredients: string[];
    instructions: string[];
    photoUrl: string;
    createdBy: string;
    _id: string;
}
