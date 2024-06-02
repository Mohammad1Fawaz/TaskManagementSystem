// CustomNode.jsx
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomNode = ({ data }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #777', borderRadius: '5px' ,width :'200px' , height:'200px' ,textAlign :'center' }}>
            {data.label}
            <Handle type="source" position={Position.Top} style={{ background: '#555', width: '20px', height: '20px', textAlign :'center' }} />
            <Handle type="source" position={Position.Right} style={{ background: '#555', width: '20px', height: '20px', textAlign: 'center' }} />
            <Handle type="source" position={Position.Bottom} style={{ background: '#555', width: '20px', height: '20px', textAlign: 'center' }} />
            <Handle type="source" position={Position.Left} style={{ background: '#555', width: '20px', height: '20px', textAlign: 'center' }} />
            <Handle type="target" position={Position.Top} style={{ background: '#555', width: '20px', height: '20px', textAlign: 'center' }} />
            <Handle type="target" position={Position.Right} style={{ background: '#555', width: '20px', height: '20px', textAlign: 'center' }} />
            <Handle type="target" position={Position.Bottom} style={{ background: '#555', width: '20px', height: '20px', textAlign: 'center' }} />
            <Handle type="target" position={Position.Left} style={{ background: '#555', width: '20px', height: '20px', textAlign: 'center' }} />
        </div>
    );
};

export default CustomNode;
