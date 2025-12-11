import { useWorkflowStore } from '../store/useWorkflowStore'
import StartForm from '../forms/StartForm'
import TaskForm from '../forms/TaskForm'
import ApprovalForm from '../forms/ApprovalForm'
import AutomatedForm from '../forms/AutomatedForm'
import EndForm from '../forms/EndForm'

export default function NodeFormPanel(){
  const { nodes, selectedId } = useWorkflowStore()
  const node = nodes.find(n=> n.id===selectedId)
  if(!node) return <div className="panel">Select a node to edit</div>

  const map = {
    start: <StartForm node={node} />,
    task: <TaskForm node={node} />,
    approval: <ApprovalForm node={node} />,
    automated: <AutomatedForm node={node} />,
    end: <EndForm node={node} />,
  } as const

  return <div className="panel">{map[node.type]}</div>
}
