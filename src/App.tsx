import * as React from 'react';

import APIConnector from "./APIConntector"
import Card from "./Card"
import ControlPanel from "./ControlPanel"
import {GameState} from "./GameState"
import HandPanel from "./HandPanel"

import 'bootstrap/dist/css/bootstrap.css';
import {Col, Grid, Row} from "react-bootstrap";
import ResultEvaluator, {resultToString} from './ResultEvaluator';

interface IAppState {
  playerHand : Card[];
  processing : boolean;
  gameState : GameState;
  status : string;
}

class App extends React.Component < any,
IAppState > {
  private api : APIConnector;

  constructor(props : any) {
    super(props);
    this.state = {
      gameState: GameState.EMPTY_HAND,
      playerHand: [],
      processing: true,
      status: ""
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
          <h1>Mała gra w pokera</h1>
        </Row>
        <Row>
          <Col sm={4}>
            <ControlPanel
              currentGameState={this.state.gameState}
              onInitialPick={() => {
              this.drawCardFromDeck();
              this.setState({gameState: GameState.INITIAL_CARDS});
            }}
              onChangeCards={async() => {
              await this.changeSelectedCards();
              this.setState({gameState: GameState.AFTER_CHANGE});
              this.displayResult();
            }}
              onReplay={() => {
              this.initializeDeck();
              this.setState({gameState: GameState.EMPTY_HAND, playerHand: [], status: ""})
            }}
              enabled={!this.state.processing}
              status={this.state.status}/></Col>
          <Col sm={8}>
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
    this.setState({
      processing: true
    }, () => {
      this
        .api
        .initializeDeck();
    });
    this.setState({processing: false});
  }
  private drawCardFromDeck = (count : number = 5) => {
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
  private changeSelectedCards = async() => {
    const cardsLeft = this
      .state
      .playerHand
      .filter(card => {
        return !card.toggled;
      });
    this.setState({playerHand: cardsLeft})
    const numberOfNewCards = 5 - cardsLeft.length;
    await this.drawCardFromDeck(numberOfNewCards);
  }
  private displayResult = () => {
    this.setState({
      status: `Twój układ to: ${resultToString(ResultEvaluator(this.state.playerHand))}.`
    });
  }
}

export default App;
