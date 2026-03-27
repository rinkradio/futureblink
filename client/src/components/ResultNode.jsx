import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Sparkles } from 'lucide-react';

export default function ResultNode({ data }) {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Left} id="a" />
      <div className="node-header">
        <Sparkles size={16} className={data.loading ? 'animate-spin' : ''} />
        AI Response
      </div>
      <div className="node-content">
        <div className="result-text">
          {data.loading ? 'Thinking...' : (data.response || 'Run flow to see response')}
        </div>
      </div>
    </div>
  );
}
