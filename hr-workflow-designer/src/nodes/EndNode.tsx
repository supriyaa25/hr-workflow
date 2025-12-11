import { Handle, Position } from 'reactflow'
export default function EndNode({ data }: any){
  return (
    <div className="node">
      <div className="badge">End</div>
      <div className="node-title">{data?.title || 'End'}</div>
      <Handle type="target" position={Position.Left}/>
    </div>
  )
}
