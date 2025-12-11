import { Handle, Position } from 'reactflow'
export default function StartNode({ data }: any){
  return (
    <div className="node">
      <div className="badge">Start</div>
      <div className="node-title">{data?.title || 'Start'}</div>
      <Handle type="source" position={Position.Right}/>
    </div>
  )
}
