// CustomEdge.jsx
import React from 'react';
import { getBezierPath, getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data
}) => {
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    });

    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY
    });

    return (
        <>
            <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
            <foreignObject
                x={edgeCenterX - 10}
                y={edgeCenterY - 10}
                width={20}
                height={20}
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <button
                        onClick={() => data.onEdgeClick(id)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: 'black',
                            color: 'red',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 0,
                            fontSize: '12px',
                        }}
                    >
                        x
                    </button>
                </div>
            </foreignObject>
        </>
    );
};

export default CustomEdge;
