export interface Ingredients {
    ingredient: string,
    amount: string
}

export interface Recepie {
    name: string,
    summary: string,
    category: string,
    time: number,
    ingredients: Ingredients[],
    instructions: string,
    photoUrl: string,
    createdBy: string
}
