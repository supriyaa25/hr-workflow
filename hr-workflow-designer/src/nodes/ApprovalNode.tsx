import { Handle, Position } from 'reactflow'
export default function ApprovalNode({ data }: any){
  return (
    <div className="node">
      <div className="badge">Approval</div>
      <div className="node-title">{data?.title || 'Approval'}</div>
      <div className="node-sub">{data?.approverRole || 'Manager'}</div>
      <Handle type="target" position={Position.Left}/>
      <Handle type="source" position={Position.Right}/>
    </div>
  )
}
