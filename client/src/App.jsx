import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';
import { Play, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

import InputNode from './components/InputNode';
import ResultNode from './components/ResultNode';

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'inputNode',
    position: { x: 100, y: 200 },
    data: { value: '' }
  },
  {
    id: '2',
    type: 'resultNode',
    position: { x: 500, y: 180 },
    data: { response: '', loading: false }
  }
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#38bdf8', strokeWidth: 2 }
  }
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [status, setStatus] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const showStatus = (type, text) => {
    setStatus({ type, text });
    setTimeout(() => setStatus(null), 3000);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#38bdf8', strokeWidth: 2 },
          },
          eds
        )
      ),
    []
  );

  const handleInputChange = (id, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, value } }
          : node
      )
    );
  };

  const nodesWithHandlers = nodes.map((node) =>
    node.type === 'inputNode'
      ? {
          ...node,
          data: {
            ...node.data,
            onChange: (val) => handleInputChange(node.id, val),
          },
        }
      : node
  );

  const getPromptValue = () =>
    nodes.find((n) => n.type === 'inputNode')?.data?.value || '';

  const getResponseValue = () =>
    nodes.find((n) => n.type === 'resultNode')?.data?.response || '';

  const runFlow = async () => {
    if (isRunning) return;

    const prompt = getPromptValue();
    if (!prompt.trim()) {
      showStatus('error', 'Enter a prompt first.');
      return;
    }

    setIsRunning(true);

    setNodes((nds) =>
      nds.map((node) =>
        node.type === 'resultNode'
          ? { ...node, data: { ...node.data, loading: true, response: '' } }
          : node
      )
    );

    try {
      const res = await axios.post(`${API_BASE}/ask-ai`, { prompt });

      const aiResponse = res.data?.response || 'No response';

      setNodes((nds) =>
        nds.map((node) =>
          node.type === 'resultNode'
            ? {
                ...node,
                data: { ...node.data, loading: false, response: aiResponse },
              }
            : node
        )
      );

      showStatus('success', 'AI response received!');
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.details ||
        'Failed to fetch AI response';

      setNodes((nds) =>
        nds.map((node) =>
          node.type === 'resultNode'
            ? {
                ...node,
                data: {
                  ...node.data,
                  loading: false,
                  response: `Error: ${errorMsg}`,
                },
              }
            : node
        )
      );

      showStatus('error', errorMsg);
    } finally {
      setIsRunning(false);
    }
  };

  const saveInteraction = async () => {
    const prompt = getPromptValue();
    const response = getResponseValue();

    if (!prompt || !response || response.startsWith('Error')) {
      showStatus('error', 'Valid prompt & response required.');
      return;
    }

    try {
      await axios.post(`${API_BASE}/save`, { prompt, response });
      showStatus('success', 'Saved to database!');
    } catch (err) {
      showStatus('error', 'Failed to save.');
    }
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <h1>AI Flow Builder</h1>
        <div className="action-panel">
          <button className="btn primary" onClick={runFlow} disabled={isRunning}>
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run Flow'}
          </button>

          <button className="btn success" onClick={saveInteraction}>
            <Save size={16} />
            Save
          </button>
        </div>
      </div>

      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls />
      </ReactFlow>

      {status && (
        <div className={`status ${status.type}`}>
          {status.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {status.text}
        </div>
      )}
    </div>
  );
}