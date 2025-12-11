import { Handle, Position } from 'reactflow'
export default function TaskNode({ data }: any){
  return (
    <div className="node">
      <div className="badge">Task</div>
      <div className="node-title">{data?.title || 'Task'}</div>
      <div className="node-sub">{data?.assignee ? `@${data.assignee}` : 'Unassigned'}</div>
      <Handle type="target" position={Position.Left}/>
      <Handle type="source" position={Position.Right}/>
    </div>
  )
}
