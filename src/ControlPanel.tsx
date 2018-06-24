import * as React from 'react';
import {Alert, Button, ButtonGroup} from "react-bootstrap"
import {GameState} from './GameState';

const getLabel = (props : IControlPanelProps) : string => {
    if (!props.enabled) {
        return "Czekaj...";
    }
    switch (props.currentGameState) {
        case GameState.EMPTY_HAND:
            return "Weź 5 kart"
        case GameState.INITIAL_CARDS:
            return "Wymień wybrane karty"
        case GameState.AFTER_CHANGE:
            return "Zagraj ponownie"
    }
    throw Error("GameState label not found!");
}

const getHandler = (props : IControlPanelProps) : (() => void) => {
    switch (props.currentGameState) {
        case GameState.EMPTY_HAND:
            return props.onInitialPick
        case GameState.INITIAL_CARDS:
            return props.onChangeCards
        case GameState.AFTER_CHANGE:
            return props.onReplay
    }
    throw Error("GameState label not found!");
}

interface IControlPanelProps {
    onInitialPick : () => void,
    onChangeCards : () => void,
    onReplay : () => void,
    enabled : boolean,
    currentGameState : GameState,
    status: string,
}
const ControlPanel = (props : IControlPanelProps) => {
    return <ButtonGroup vertical={true} block={true}>
        <Button bsStyle="primary" onClick={getHandler(props)} disabled={!props.enabled}>{getLabel(props)}</Button>
        <Alert bsStyle="warning" hidden={props.status===""}>{props.status}</Alert>
    </ButtonGroup>
}

export default ControlPanel;
