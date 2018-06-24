enum Suit {
    HEARTS,
    CLUBS,
    SPADES,
    DIAMONDS
}

enum Value {
    n2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    n9,
    n10,
    J,
    Q,
    K,
    A
}

export default class Card {
    public toggled : boolean = false;
    private suit : Suit;
    private value : Value;
    private imageUrl : string;
    constructor(suit : string, type : string, imageUrl : string) {
        this.suit = this.convertStringToSuit(suit);
        this.value = this.convertStringToValue(type);
        this.imageUrl = imageUrl;
    }
    public toString() {
        return this
            .suit
            .toString() + this
            .value
            .toString();
    }
    public getImageUrl() {
        return this.imageUrl;
    }
    private convertStringToSuit(suit : string) : Suit {
        switch(suit) {
            case "HEARTS":
                return Suit.HEARTS
            case "CLUBS":
                return Suit.CLUBS
            case "SPADES":
                return Suit.SPADES
            case "DIAMONDS":
                return Suit.DIAMONDS
        }
        console.error("UNKOWN SUIT: " + suit);
        return Suit.HEARTS;
    }
    private convertStringToValue(value : string) : Value {
        switch(value) {
            case "2":
                return Value.n2
            case "3":
                return Value.n3
            case "4":
                return Value.n4
            case "5":
                return Value.n5
            case "6":
                return Value.n6
            case "7":
                return Value.n7
            case "8":
                return Value.n8
            case "9":
                return Value.n9
            case "10":
                return Value.n10
            case "JACK":
                return Value.J
            case "QUEEN":
                return Value.Q
            case "KING":
                return Value.K
            case "ACE":
                return Value.A
        }
        console.error("UNKNOWN VALUE: ", value);
        return Value.A;
    }
};