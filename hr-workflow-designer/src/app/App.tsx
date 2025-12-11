import { useEffect } from 'react'
import WorkflowCanvas from '../canvas/WorkflowCanvas'
import NodeFormPanel from '../panels/NodeFormPanel'
import TestSandbox from '../panels/TestSandbox'
import Sidebar from '../panels/Sidebar'

export default function App(){
  useEffect(()=>{
    if (import.meta.env.DEV) {
      import('../mocks/browser').then(({ worker }) => worker.start())
        .catch((e)=> console.warn('MSW failed to start', e))
    }
  },[])

  return (
    <div className="layout">
      <aside><Sidebar /></aside>
      <main><WorkflowCanvas /></main>
      <section>
        <NodeFormPanel />
        <TestSandbox />
      </section>
    </div>
  )
}
