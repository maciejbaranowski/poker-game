import {IResult} from "./ResultEvaluator"

export default (left : IResult, right : IResult) : boolean => {
    if (left.type !== right.type) {
        return left.type > right.type;
    }
    return left.primaryCardValue > right.primaryCardValue;
}