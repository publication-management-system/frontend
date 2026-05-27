import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import { parse } from "graphology-gexf/browser";
import { random } from "graphology-layout";
import { useEffect } from "react";

import { getGephiGraph } from "./api";

import "@react-sigma/core/lib/style.css";

const FA2_SETTINGS = {
    gravity: 0.0003,
    scalingRatio: 50,
    slowDown: 10,
    barnesHutOptimize: true,
    barnesHutTheta: 1.0,
    adjustSizes: true,
    linLogMode: false,
    strongGravityMode: false,
};

function GraphLoader() {
    const loadGraph = useLoadGraph();
    useEffect(() => {
        getGephiGraph().then((xml) => {
            const graph = parse(Graph, xml);
            random.assign(graph);
            loadGraph(graph);
        });
    }, [loadGraph]);
    return null;
}

function LiveLayout() {
    const { start, kill } = useWorkerLayoutForceAtlas2({ settings: FA2_SETTINGS });
    useEffect(() => {
        start();
        return kill;
    }, [start, kill]);
    return null;
}

export default function GraphView() {
    return (
        <SigmaContainer style={{ height: "100%", width: "100%" }}>
            <GraphLoader />
            <LiveLayout />
        </SigmaContainer>
    );
}
