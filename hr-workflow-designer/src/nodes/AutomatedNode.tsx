import { Handle, Position } from 'reactflow'
export default function AutomatedNode({ data }: any){
  return (
    <div className="node">
      <div className="badge">Automated</div>
      <div className="node-title">{data?.title || 'Automation'}</div>
      <div className="node-sub">{data?.actionId || 'Select action'}</div>
      <Handle type="target" position={Position.Left}/>
      <Handle type="source" position={Position.Right}/>
    </div>
  )
}
