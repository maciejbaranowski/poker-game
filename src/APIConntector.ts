import axios from "axios";
import Card from "./Card"

export default class APIConnector {
    private deckId = 0;
    public async initializeDeck() {
        const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/")
        this.deckId = response.data.deck_id;
    }
    public async drawCardFromDeck(count : number = 5) : Promise<Card[]> {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${count}`);
        if (response.data.success) {
            return response.data.cards.map((cardDescription : any) => {
                return new Card(cardDescription.suit, cardDescription.value, cardDescription.image);
            });
        } else {
            alert("Nie ma więcej kart w talii!");
        }
        return [];
    }
}