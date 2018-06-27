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

const resultTypeToString = (resultType : ResultType) : string => {
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

export const resultToString = (result : IResult) : string => {
    return resultTypeToString(result.type);
}

interface IDetectorHandler {
    detector: (hand : Card[]) => Value,
    type: ResultType
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

// TODO: Implement other detectors

const detectFlush = (hand : Card[]) : Value => {
    const firstCardSuit = hand[0].suit;
    if (!hand.every(card => card.suit === firstCardSuit)) {
        return Value.UNSET;
    }
    return hand.slice().sort((l, r) => r.value - l.value)[0].value;
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

const detectHighCard = (hand : Card[]) : Value => {
    hand = hand.slice().sort((left, right) => {
        return right.value - left.value;
    });
    return hand[0].value;
}

export default (hand : Card[]) : IResult => {
    const detectorsHandlers : IDetectorHandler[] = [
        {
            detector: detectFlush,
            type: ResultType.FLUSH
        },
        {
            detector: detectThree,
            type: ResultType.THREE
        },
        {
            detector: detectTwoPairs,
            type: ResultType.TWO_PAIRS
        },
        {
            detector: detectOnePair,
            type: ResultType.ONE_PAIR
        },
        {
            detector: detectHighCard,
            type: ResultType.HIGH_CARD
        }
    ]
    for (const handler of detectorsHandlers)
    {        
        const detectionResult = handler.detector(hand);
        if (detectionResult !== Value.UNSET) {
            return {primaryCardValue: detectionResult, type: handler.type};
        }
    };
    throw new Error("Detectors couldn't determine result of game");
}
