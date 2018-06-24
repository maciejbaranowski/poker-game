import Card, {Value} from "./Card";

export enum ResultType {
    HIGH_CARD,
    ONE_PAIR,
    TWO_PAIRS,
    THREE,
    STRAIGHT,
    FLUSH,
    FULL_HOUSE,
    FOUR,
    STRAIGHT_FLUSH,
    ROYAL_FLUSH
}

export interface IResult {
    type : ResultType,
    primaryCardValue : Value
}

const resultTypeToString = (resultType : ResultType) => {
    switch (resultType) {
        case ResultType.HIGH_CARD:
            return "Nic!";
        case ResultType.ONE_PAIR:
            return "Para";
        case ResultType.TWO_PAIRS:
            return "Dwie pary";
        case ResultType.THREE:
            return "Trójka";
        case ResultType.STRAIGHT:
            return "Strit";
        case ResultType.FLUSH:
            return "Kolor";
        case ResultType.FULL_HOUSE:
            return "Full";
        case ResultType.FOUR:
            return "Kareta";
        case ResultType.STRAIGHT_FLUSH:
            return "Poker";
        case ResultType.ROYAL_FLUSH:
            return "Poker królewski";
    }
    throw Error("UNKNOWN RESULTTYPE");
}

export const resultToString = (result : IResult) => {
    // TODO: implement displaying high card
    return resultTypeToString(result.type);
}

const detectPair = (hand : Card[]) : Value => {
    for (let firstCardIndex = 0; firstCardIndex < hand.length; firstCardIndex += 1) {
        for (let secondCardIndex = firstCardIndex + 1; secondCardIndex < hand.length; secondCardIndex += 1) {
            if (hand[firstCardIndex].value === hand[secondCardIndex].value) {
                return hand[firstCardIndex].value;
            }
        }
    }
    return Value.UNSET;
}

export default(hand : Card[]) : IResult => {
    console.log(hand);
    if (detectPair(hand) !== Value.UNSET) {
        return {primaryCardValue: detectPair(hand), type: ResultType.ONE_PAIR};
    }
    hand = hand.sort((left, right) => {
        return right.value - left.value;
    });
    return {primaryCardValue: hand[0].value, type: ResultType.HIGH_CARD};
}
