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

const detectPairs = (hand : Card[]) : Value[] => {
    const detectedPairs : Value[] = [];
    for (let firstCardIndex = 0; firstCardIndex < hand.length; firstCardIndex += 1) {
        for (let secondCardIndex = firstCardIndex + 1; secondCardIndex < hand.length; secondCardIndex += 1) {
            if (hand[firstCardIndex].value === hand[secondCardIndex].value) {
                detectedPairs.push(hand[firstCardIndex].value);
            }
        }
    }
    return detectedPairs;
}

const detectThree = (hand : Card[]) : Value => {
    for (let firstCardIndex = 0; firstCardIndex < hand.length; firstCardIndex += 1) {
        for (let secondCardIndex = firstCardIndex + 1; secondCardIndex < hand.length; secondCardIndex += 1) {
            for (let thirdCardIndex = secondCardIndex + 1; thirdCardIndex < hand.length; thirdCardIndex += 1) {
                if (hand[firstCardIndex].value === hand[secondCardIndex].value && hand[firstCardIndex].value === hand[thirdCardIndex].value) {
                    return hand[firstCardIndex].value;
                }
            }
        }
    }
    return Value.UNSET;
}

const detectOnePair = (hand : Card[]) : Value => {
    const pairs = detectPairs(hand);
    if (pairs.length !== 1) {
        return Value.UNSET
    };
    return pairs[0];
}

const detectTwoPairs = (hand : Card[]) : Value => {
    const pairs = detectPairs(hand);
    if (pairs.length !== 2) {
        return Value.UNSET
    };
    return pairs.sort()[1];
}

export default(hand : Card[]) : IResult => {
    const detectedThree = detectThree(hand);
    if (detectedThree !== Value.UNSET) {
        return {primaryCardValue: detectedThree, type: ResultType.THREE};
    }

    const detectedTwoPairs = detectTwoPairs(hand);
    if (detectedTwoPairs !== Value.UNSET) {
        return {primaryCardValue: detectedTwoPairs, type: ResultType.TWO_PAIRS};
    }

    const detectedPair = detectOnePair(hand);
    if (detectedPair !== Value.UNSET) {
        return {primaryCardValue: detectedPair, type: ResultType.ONE_PAIR};
    }

    hand = hand.sort((left, right) => {
        return right.value - left.value;
    });
    return {primaryCardValue: hand[0].value, type: ResultType.HIGH_CARD};
}
