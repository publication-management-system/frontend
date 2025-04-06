import React from "react";
import {Card} from "../../../card/card.tsx";
import './loadingcard.css'

export const LoadingCard = (): React.JSX.Element => {
    return (
        <Card className={'loading_bg_skeleton loading-card'}>
        </Card>
    )
}