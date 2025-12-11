import { create } from 'zustand'
import type { WFNode, WFEdge } from '../types/workflow'

type S = {
  nodes: WFNode[]
  edges: WFEdge[]
  selectedId?: string
  setNodes: (updater: (n: WFNode[]) => WFNode[] | WFNode[]) => void
  setEdges: (updater: (e: WFEdge[]) => WFEdge[] | WFEdge[]) => void
  setSelectedId: (id?: string) => void
  addNode: (type: WFNode['type']) => void
  deleteSelected: () => void
}

const makeId = () => Math.random().toString(36).slice(2, 9)

export const useWorkflowStore = create<S>((set, get) => ({
  nodes: [
    { id: 'start-1', type: 'start', position: { x: 100, y: 200 }, data: { title: 'Start' } },
    { id: 'end-1', type: 'end', position: { x: 600, y: 200 }, data: { title: 'End' } },
  ],
  edges: [],
  selectedId: undefined,
  setNodes: (u) => set((s)=> ({ nodes: typeof u==='function'? (u as any)(s.nodes) : u })),
  setEdges: (u) => set((s)=> ({ edges: typeof u==='function'? (u as any)(s.edges) : u })),
  setSelectedId: (id)=> set({ selectedId:id }),
  addNode: (type)=> set((s)=>{
    const id = `${type}-${makeId()}`
    const x = 200 + Math.round(Math.random()*300)
    const y = 120 + Math.round(Math.random()*240)
    const title = type[0].toUpperCase()+type.slice(1)
    const data:any = { title }
    if(type==='approval') data.approverRole = 'Manager'
    return { nodes: [...s.nodes, { id, type, position:{x,y}, data }] }
  }),
  deleteSelected: ()=> set((s)=>{
    if(!s.selectedId) return {}
    return {
      nodes: s.nodes.filter(n=> n.id!==s.selectedId),
      edges: s.edges.filter(e=> e.source!==s.selectedId && e.target!==s.selectedId),
      selectedId: undefined
    }
  }),
}))
