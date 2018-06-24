import * as React from 'react';

import APIConnector from "./APIConntector"
import Card from "./Card"
import ControlPanel from "./ControlPanel"
import HandPanel from "./HandPanel"

import 'bootstrap/dist/css/bootstrap.css';
import {Col, Grid, Row} from "react-bootstrap";

interface IAppState {
  playerHand : Card[];
  processing : boolean;
}

class App extends React.Component < any,
IAppState > {
  private api : APIConnector;

  constructor(props : any) {
    super(props);
    this.state = {
      playerHand: [],
      processing: true
    }
    this.api = new APIConnector;
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
    this
      .api
      .initializeDeck();
    this.setState({processing: false});
  }
  private drawCardFromDeck = (count : number = 1) => {
    this.setState({
      processing: true
    }, () => {
      this
        .api
        .drawCardFromDeck(count)
        .then(cards => {
          this.setState({
            playerHand: [
              ...this.state.playerHand,
              ...cards
            ]
          }, () => {
            this.setState({processing: false});
          });
        })
    })
  }
}

export default App;
