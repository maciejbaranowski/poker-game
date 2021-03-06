import * as React from 'react';

import Card from "./Card"
interface ICardViewProps {
    card: Card,
    onClick : () => any
}
const CardView = (props: ICardViewProps) => {
    const topOffset = props.card.toggled ? "20px" : "0px";
    return <div style={{float:"left", width: "50px", top: topOffset, position: "relative"}} onClick={props.onClick}><img src={props.card.getImageUrl()}/></div>
}

interface IHandPanelProps {
    cards : Card [],
    onCardClicked : (c:number) => any
}
const HandPanel = (props : IHandPanelProps) => {
    const cards = props
        .cards
        .map((card : Card, index : number) => {
            return <CardView key={index} card={card} onClick={()=> {props.onCardClicked(index)}}/>
        });
    return <div style={{display: "flex"}}>{cards}</div>
}

export default HandPanel;