import Card, {Suit, Value} from './Card';

import sut, {ResultType} from './ResultEvaluator';

it('can be called without creashing', () => {
    sut([
        new Card().setCard(Suit.CLUBS, Value.n6),
        new Card().setCard(Suit.CLUBS, Value.n2),
        new Card().setCard(Suit.CLUBS, Value.n3),
        new Card().setCard(Suit.CLUBS, Value.n4),
        new Card().setCard(Suit.CLUBS, Value.n5)
    ]);
});

it('properly detects high card', () => {
    expect(sut([
        new Card().setCard(Suit.CLUBS, Value.n6),
        new Card().setCard(Suit.HEARTS, Value.n10),
        new Card().setCard(Suit.DIAMONDS, Value.Q),
        new Card().setCard(Suit.CLUBS, Value.n4),
        new Card().setCard(Suit.CLUBS, Value.n5)
    ])).toEqual({primaryCardValue: Value.Q, type: ResultType.HIGH_CARD});
});

it('properly detects pair', () => {
    expect(sut([
        new Card().setCard(Suit.HEARTS, Value.n5),
        new Card().setCard(Suit.CLUBS, Value.n2),
        new Card().setCard(Suit.CLUBS, Value.n3),
        new Card().setCard(Suit.CLUBS, Value.n4),
        new Card().setCard(Suit.CLUBS, Value.n5)
    ])).toEqual({primaryCardValue: Value.n5, type: ResultType.ONE_PAIR});
});

it('properly detects two pairs', () => {
    expect(sut([
        new Card().setCard(Suit.HEARTS, Value.Q),
        new Card().setCard(Suit.CLUBS, Value.A),
        new Card().setCard(Suit.CLUBS, Value.n3),
        new Card().setCard(Suit.DIAMONDS, Value.n3),
        new Card().setCard(Suit.CLUBS, Value.Q)
    ])).toEqual({primaryCardValue: Value.Q, type: ResultType.TWO_PAIRS});
});

it('properly detects three', () => {
    expect(sut([
        new Card().setCard(Suit.HEARTS, Value.Q),
        new Card().setCard(Suit.CLUBS, Value.n2),
        new Card().setCard(Suit.CLUBS, Value.A),
        new Card().setCard(Suit.DIAMONDS, Value.Q),
        new Card().setCard(Suit.CLUBS, Value.Q)
    ])).toEqual({primaryCardValue: Value.Q, type: ResultType.THREE});
});

it('properly detects flush', () => {
    expect(sut([
        new Card().setCard(Suit.HEARTS, Value.Q),
        new Card().setCard(Suit.HEARTS, Value.n2),
        new Card().setCard(Suit.HEARTS, Value.n10),
        new Card().setCard(Suit.HEARTS, Value.K),
        new Card().setCard(Suit.HEARTS, Value.n3)
    ])).toEqual({primaryCardValue: Value.K, type: ResultType.FLUSH});
});
