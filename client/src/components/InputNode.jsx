import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';

export default function InputNode({ data }) {
  const onChange = (evt) => {
    if (data.onChange) {
      data.onChange(evt.target.value);
    }
  };

  return (
    <div className="custom-node">
      <div className="node-header">
        <MessageSquare size={16} />
        Input Prompt
      </div>
      <div className="node-content">
        <textarea
          value={data.value}
          onChange={onChange}
          placeholder="Type your prompt here..."
          className="nodrag"
        />
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
