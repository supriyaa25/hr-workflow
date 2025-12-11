import React, { useCallback } from 'react'
import ReactFlow, { Background, Controls, addEdge, Connection, Edge, Node, applyNodeChanges, applyEdgeChanges, OnNodesChange, OnEdgesChange } from 'reactflow'
import 'reactflow/dist/style.css'
import { useWorkflowStore } from '../store/useWorkflowStore'
import { nodeTypes } from './nodeTypes'

export default function WorkflowCanvas() {
  const { nodes, edges, setNodes, setEdges, setSelectedId } = useWorkflowStore()

  const onNodesChange = useCallback<OnNodesChange>((changes)=> {
    setNodes((nds)=> applyNodeChanges(changes as any, nds as any) as any)
  }, [setNodes])

  const onEdgesChange = useCallback<OnEdgesChange>((changes)=> {
    setEdges((eds)=> applyEdgeChanges(changes as any, eds as any) as any)
  }, [setEdges])

  const onConnect = useCallback((c: Connection) => {
    setEdges((eds:Edge[]) => addEdge({ ...c, animated:false, id: `${c.source}-${c.target}-${Math.random()}` } as any, eds))
  }, [setEdges])

  const onNodeClick = useCallback((_:any, node: Node) => setSelectedId(node.id), [setSelectedId])

  return (
    <div style={{ height:'100%', width:'100%' }}>
      <ReactFlow
        nodeTypes={nodeTypes as any}
        nodes={nodes as any}
        edges={edges as any}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
