import Card, { Value } from "./Card";

enum ResultType {
    HIGH_CARD,
    ONE_PAIR,
    TWO_PAIRS,
    THREE,
    STRAIGHT,
    FLUSH,
    FULL_HOUSE,
    FOUR,
    STRAIGHT_FLUSH,
    ROYAL_FLUSH,
}

export interface IResult {
    type: ResultType,
    primaryCardValue : Value
}

export default (hand : Card[]): IResult => {
    hand = hand.sort();
    console.log("Your Cards:", hand);
    return {
        primaryCardValue: Value.Q,
        type: ResultType.FLUSH
    };
}

