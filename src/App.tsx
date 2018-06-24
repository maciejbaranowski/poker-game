import axios from "axios";
import * as React from 'react';

import Card from "./Card"
import ControlPanel from "./ControlPanel"
import HandPanel from "./HandPanel"

import 'bootstrap/dist/css/bootstrap.css';
import {Col, Grid, Row} from "react-bootstrap";

interface IAppState {
  deckId : number;
  playerHand : Card[];
  processing : boolean;
}

class App extends React.Component < any,
IAppState > {
  constructor(props : any) {
    super(props);
    this.state = {
      deckId: 0,
      playerHand: [],
      processing: true
    }
  }
  public componentDidMount() {
    this.initializeDeck();
  }
  public render() {
    return (
      <Grid className="App">
        <Row>
          <Col xs={4}>
            <ControlPanel
              onCardPick={() => this.drawCardFromDeck()}
              onTenCardsPick={() => {
              this.drawCardFromDeck(10);
            }}
              enabled={!this.state.processing}/></Col>
          <Col xs={8}>
            <HandPanel
              cards={this.state.playerHand}
              onCardClicked={(index) => {
              const hand = this.state.playerHand;
              hand[index].toggled = !hand[index].toggled;
              this.setState({playerHand: hand})
            }}/>
          </Col>
        </Row>
      </Grid>
    );
  }
  private initializeDeck = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
      .then((response) => {
        this.setState({
          deckId: response.data.deck_id
        }, () => {
          this.setState({processing: false})
        })
      }, console.log);
  }
  private drawCardFromDeck = (count : number = 1) => {
    this.setState({
      processing: true
    }, () => {
      axios
        .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=${count}`)
        .then((response) => {
          if (response.data.success) {
            for (const cardDescription of response.data.cards) {
              const card = new Card(cardDescription.suit, cardDescription.value, cardDescription.image);
              this.setState({
                playerHand: [
                  ...this.state.playerHand,
                  card
                ]
              });
            }
          } else {
            alert("Nie ma więcej kart w talii!");
          }
          this.setState({processing: false})
        })
    })

  }
}

export default App;
