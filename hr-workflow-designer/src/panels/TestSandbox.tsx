import React from 'react'
import { useWorkflowStore } from '../store/useWorkflowStore'
import { simulate } from '../api/simulate'
import { validateWorkflow } from '../canvas/validators'

export default function TestSandbox(){
  const { nodes, edges } = useWorkflowStore()
  const [log,setLog] = React.useState<string[]>([])
  const [json,setJson] = React.useState('')

  const onRun = async ()=>{
    const wf = { nodes, edges }
    setJson(JSON.stringify(wf, null, 2))
    const errors = validateWorkflow(wf as any)
    if(errors.length){ setLog(errors); return }
    const res = await simulate(wf as any)
    setLog(res.log)
  }

  return (
    <div className="panel">
      <h3>Test / Sandbox</h3>
      <div className="button-row">
        <button onClick={onRun}>Validate & Simulate</button>
      </div>
      <h4>Execution Log</h4>
      <pre>{log.join('\n')}</pre>
      <h4>Serialized Workflow</h4>
      <pre>{json}</pre>
    </div>
  )
}
