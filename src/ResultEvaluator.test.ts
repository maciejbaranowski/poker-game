import Card, { Suit, Value } from './Card';

import sut from './ResultEvaluator';

it('can be called without creashing', () => {
  sut([
      new Card().setCard(Suit.CLUBS, Value.n6),
      new Card().setCard(Suit.CLUBS, Value.n2),
      new Card().setCard(Suit.CLUBS, Value.n3),
      new Card().setCard(Suit.CLUBS, Value.n4),
      new Card().setCard(Suit.CLUBS, Value.n5),
  ]);
});
