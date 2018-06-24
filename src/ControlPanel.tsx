import * as React from 'react';
import {Button} from "react-bootstrap"

interface IControlPanelProps {
    onCardPick : () => void,
    onTenCardsPick : () => void,
    enabled : boolean
}
const ControlPanel = (props : IControlPanelProps) => {
    const pickCardLabel = props.enabled
        ? "Weź kartę"
        : "Czekaj...";
    const pickTenCardsLabel = props.enabled
        ? "Weź 10 kart"
        : "Czekaj...";
    return <div>
        <Button bsStyle="primary" onClick={props.onCardPick} disabled={!props.enabled}>{pickCardLabel}</Button>
        <Button bsStyle="primary" onClick={props.onTenCardsPick} disabled={!props.enabled}>{pickTenCardsLabel}</Button>
    </div>
}

export default ControlPanel;