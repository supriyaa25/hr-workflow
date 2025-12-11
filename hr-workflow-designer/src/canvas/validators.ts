import type { Workflow } from '../types/workflow'

export function validateWorkflow({nodes,edges}: Workflow){
  const errors:string[] = []
  const startNodes = nodes.filter(n=> n.type==='start')
  if(startNodes.length!==1) errors.push('Exactly one Start node is required.')
  const incomingCount = edges.reduce((m:any,e)=> ((m[e.target]??=0, m[e.target]++), m), {} as Record<string,number>)
  if(startNodes[0] && (incomingCount[startNodes[0].id]??0)>0) errors.push('Start node cannot have incoming edges.')
  if(!nodes.some(n=> n.type==='end')) errors.push('At least one End node is required.')
  if(hasCycle(nodes.map(n=>n.id), edges)) errors.push('Cycle detected in workflow.')
  return errors
}
function hasCycle(ids:string[], edges:{source:string;target:string}[]){
  const g = edges.reduce((m:any,e)=> ((m[e.source]??=[]).push(e.target),m), {} as Record<string,string[]>)
  const state:Record<string,0|1|2> = {}
  const dfs=(v:string):boolean=>{
    state[v]=1
    for(const w of (g[v]||[])){
      if(state[w]===1) return true
      if(!state[w] && dfs(w)) return true
    }
    state[v]=2; return false
  }
  return ids.some(id=> !state[id] && dfs(id))
}
