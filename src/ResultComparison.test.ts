import compareResult from "./ResultComparison"
import {ResultType} from "./ResultEvaluator";

import {Value} from "./Card";

it("should determine winner by result type", () => {
    expect(compareResult({
        primaryCardValue: Value.n3,
        type: ResultType.FOUR
    }, {
        primaryCardValue: Value.K,
        type: ResultType.TWO_PAIRS
    })).toBeTruthy();
})

it("should determine winner by high card", () => {
    expect(compareResult({
        primaryCardValue: Value.n4,
        type: ResultType.THREE
    }, {
        primaryCardValue: Value.K,
        type: ResultType.THREE
    })).toBeFalsy();
})
