// WorkflowEditor.jsx
import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
    addEdge,
    Controls,
    MiniMap,
    Background,
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer';
import PrimaryButton from '../../../common/components/ui/buttons/PrimaryButton';
import CustomEdge from '../ui/CustomEdge';
import CustomNode from '../ui/CustomNode';

const initialNodes = [
    { id: '1', type: 'customNode', data: { label: 'Start' }, position: { x: 250, y: 0 } },
    { id: '2', type: 'customNode', data: { label: 'Step 1' }, position: { x: 100, y: 100 } },
    { id: '3', type: 'customNode', data: { label: 'Step 2' }, position: { x: 400, y: 100 } },
    { id: '4', type: 'customNode', data: { label: 'End' }, position: { x: 250, y: 200 } },
];

const WorkflowEditor = ({ onSave }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onEdgeClick = useCallback(
        (id) => {
            setEdges((eds) => eds.filter((edge) => edge.id !== id));
        },
        [setEdges]
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, type: 'custom', data: { onEdgeClick } }, eds)),
        [setEdges, onEdgeClick]
    );

    const handleAddNode = () => {
        const newNode = {
            id: (nodes.length + 1).toString(),
            type: 'customNode',
            data: { label: `Step ${nodes.length + 1}` },
            position: { x: Math.random() * 250, y: Math.random() * 250 },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const onNodesDelete = (deletedNodes) => {
        const deletedNodeIds = new Set(deletedNodes.map((node) => node.id));
        setEdges((eds) => eds.filter((edge) => !deletedNodeIds.has(edge.source) && !deletedNodeIds.has(edge.target)));
    };

    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
    const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

    return (
        <div className="h-[70vh] pb-4">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodesDelete={onNodesDelete}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                deleteKeyCode={46}
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
            <div style={{ marginTop: '10px' }}>
                <button onClick={handleAddNode}>Add Node</button>
                <PrimaryButton text="Save Workflow" type="button" onClick={() => onSave({ nodes, edges })} />
            </div>
        </div>
    );
};

export default WorkflowEditor;
