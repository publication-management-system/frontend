import React, {useEffect, useRef, useState} from "react";
import {Toast, ToastSettings} from "../../../components/toast/toast";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation";
import {authenticatedClient} from "../../../data/client";
import {useParams} from "react-router-dom";
import {GraphData} from "../../../data/scraping";
import ForceGraph2D from "react-force-graph-2d";

import './sessionvisualizerpage.css';

export const SessionVisualizerPage = (): React.JSX.Element => {
    const [toastSettings, setToastSettings] = useState<ToastSettings>({
        open: false,
        message: '',
        type: "success"
    });

    const { sessionId, source } = useParams<{ sessionId: string; source: string }>();
    const [graphData, setGraphData] = useState<GraphData>();
    const graphRef = useRef(null);
    const [makeItFit, setMakeItFit] = useState(true);

    const typeColors: Record<string, string> = {
        AUTHOR: "#e63946",
        CITATION: "#2a9d8f",
        DOCUMENT: "#457b9d"
    };

    const fetchGraphVisualizer = async () => {
        try {
            const response = await authenticatedClient.get(
                `/api/scraped-entities/visualizer/${sessionId}?source=${source}`
            );
            setGraphData(response.data);
        } catch (error: any) {
            setToastSettings({
                open: true,
                message: error?.message || 'Failed to load graph data.',
                type: "error"
            });
        }
    };

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force("charge")?.strength(-400);
        }
    }, [graphData]);

    useEffect(() => {
        fetchGraphVisualizer();
    }, []);

    return (
        <>
            <div className="session-visualizer-layout">
                <AuthenticatedNavigation />
                <div className="session-graph-container">
                    <ForceGraph2D
                        ref={graphRef}
                        graphData={graphData}
                        backgroundColor="#1e1e2f"
                        nodeLabel="name"
                        linkColor={() => "rgba(255,255,255,0.3)"}
                        linkWidth={2}
                        d3Force="charge"
                        d3ForceOptions={{
                            strength: -800
                        }}
                        nodeCanvasObject={(node, ctx, globalScale) => {
                            const label = node.name || node.id;
                            const type = node.type || "UNKNOWN";
                            const color = typeColors[type] || "#ccc";

                            const radius = 12;
                            const fontSize = 10 / globalScale;

                            ctx.beginPath();
                            ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false);
                            ctx.fillStyle = color;
                            ctx.fill();

                            ctx.font = `${fontSize}px Sans-Serif`;
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillStyle = "#ffffff";

                            const lines = [
                                label.length > 16 ? label.slice(0, 14) + "…" : label,
                                type.toLowerCase()
                            ];

                            lines.forEach((text, i) => {
                                const yOffset = (i - 0.5) * fontSize * 1.6;
                                ctx.fillText(text, node.x!, node.y! + yOffset);
                            });
                        }}
                        onEngineStop={() => {
                            if (makeItFit) {
                                graphRef.current.zoomToFit(400);
                                setMakeItFit(false);
                            }
                        }}
                    />
                </div>
            </div>

            <Toast
                open={toastSettings.open}
                onToastClose={() => setToastSettings({ ...toastSettings, open: false })}
                message={toastSettings.message}
                type={toastSettings.type}
            />
        </>
    );
};
