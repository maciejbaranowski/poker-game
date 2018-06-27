import * as React from 'react';

import APIConnector from "./APIConntector"
import Card from "./Card"
import ControlPanel from "./ControlPanel"
import {GameState} from "./GameState"
import HandPanel from "./HandPanel"

import 'bootstrap/dist/css/bootstrap.css';
import {Col, Grid, Row} from "react-bootstrap";
import compareResult from './ResultComparison';
import ResultEvaluator, {resultToString} from './ResultEvaluator';

interface IAppState {
  playerHand : Card[];
  oponentHand : Card[];
  processing : boolean;
  gameState : GameState;
  status : string[];
}

class App extends React.Component < any,
IAppState > {
  private api : APIConnector;
  constructor(props : any) {
    super(props);
    this.state = {
      gameState: GameState.EMPTY_HAND,
      oponentHand: [],
      playerHand: [],
      processing: true,
      status: []
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
              onInitialPick={async() => {
              await this.addCardFromDeckForPlayer();
              this.setState({gameState: GameState.INITIAL_CARDS});
            }}
              onChangeCards={async() => {
              await this.changeSelectedCards();
              await this.setStateAsync({gameState: GameState.AFTER_CHANGE});
              this.displayPlayerResult();
            }}
              onShowOponent={async() => {
              await this.addCardFromDeckForOponent();
              this.displayOponentResult();
              this.displayFinalResult();
              this.setState({gameState: GameState.OPONENT_CHECKED});
            }}
              onReplay={() => {
              this.initializeDeck();
              this.setState({gameState: GameState.EMPTY_HAND, playerHand: [], oponentHand: [], status: []})
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
            <br/>
            <HandPanel
              cards={this.state.oponentHand}
              onCardClicked={() => {
              return;
            }}/>
          </Col>
        </Row>
      </Grid>
    );
  }
  private setStateAsync = async(state : any) => {
    return new Promise((resolve) => {
      this.setState(state, () => {
        resolve();
      })
    })
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
  private addCardFromDeckForPlayer = async(count : number = 5) => {
    const cards = await this.drawCardFromDeck(count);
    return new Promise((resolve) => {
      this.setState({
        playerHand: [
          ...this.state.playerHand,
          ...cards
        ]
      }, () => {
        this.setState({processing: false});
        resolve();
      })
    });
  }
  private addCardFromDeckForOponent = async(count : number = 5) => {
    const cards = await this.drawCardFromDeck(count);
    return new Promise((resolve) => {
      this.setState({
        oponentHand: [
          ...this.state.oponentHand,
          ...cards
        ]
      }, () => {
        this.setState({processing: false});
        resolve();
      })
    });
  }
  private drawCardFromDeck = async(count : number = 5) : Promise < Card[] > => {
    return new Promise < Card[] > ((resolve) => {
      this.setState({
        processing: true
      }, () => {
        this
          .api
          .drawCardFromDeck(count)
          .then(cards => {
            resolve(cards);
          })
      })
    });
  }
  private changeSelectedCards = async() => {
    const cardsLeft = this
      .state
      .playerHand
      .filter(card => {
        return !card.toggled;
      });
    await this.setStateAsync({playerHand: cardsLeft})
    const numberOfNewCards = 5 - cardsLeft.length;
    await this.addCardFromDeckForPlayer(numberOfNewCards);
  }
  private displayPlayerResult = async () => {
    await this.setStateAsync({
      status: [...this.state.status, `Twój układ to: ${resultToString(ResultEvaluator(this.state.playerHand))}.`]
    });
  }
  private displayOponentResult = async () => {
    await this.setStateAsync({
      status: [...this.state.status, `Układ przeciwnika to: ${resultToString(ResultEvaluator(this.state.oponentHand))}.`]
    });
  }
  private displayFinalResult = async () => {
    const finalResult = (compareResult(ResultEvaluator(this.state.playerHand), ResultEvaluator(this.state.oponentHand))) 
                      ? "Wygrałeś!" : "Przeciwnik wygrał!";
    await this.setStateAsync({
      status: [...this.state.status, finalResult]
    })
  }
}

export default App;
