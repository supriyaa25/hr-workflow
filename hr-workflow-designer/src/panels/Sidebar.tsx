import { useWorkflowStore } from '../store/useWorkflowStore'

export default function Sidebar(){
  const addNode = useWorkflowStore(s=> s.addNode)
  const del = useWorkflowStore(s=> s.deleteSelected)
  return (
    <div>
      <h3>Nodes</h3>
      <div className="sidebar-group">
        <div className="button-row">
          <button onClick={()=> addNode('start')}>+ Start</button>
          <button onClick={()=> addNode('task')}>+ Task</button>
          <button onClick={()=> addNode('approval')}>+ Approval</button>
          <button onClick={()=> addNode('automated')}>+ Automated</button>
          <button onClick={()=> addNode('end')}>+ End</button>
        </div>
      </div>
      <hr/>
      <div className="sidebar-group">
        <h4>Selection</h4>
        <div className="button-row">
          <button className="delete-btn" onClick={del}>Delete selected</button>
        </div>
      </div>
      <p style={{opacity:.7}}>Tip: Click a node to edit in the right panel. Drag to reposition. Connect by dragging edges.</p>
    </div>
  )
}
