export type NodeKind = 'start' | 'task' | 'approval' | 'automated' | 'end'

export interface BaseNodeData { title?: string }
export interface StartData   extends BaseNodeData { meta?: Record<string,string> }
export interface TaskData    extends BaseNodeData { description?: string; assignee?: string; dueDate?: string; custom?: Record<string,string> }
export interface ApprovalData extends BaseNodeData { approverRole?: 'Manager'|'HRBP'|'Director'; autoApproveThreshold?: number }
export interface AutomatedData extends BaseNodeData { actionId?: string; params?: Record<string,string> }
export interface EndData     extends BaseNodeData { message?: string; summary?: boolean }

export type NodeData = StartData | TaskData | ApprovalData | AutomatedData | EndData

export interface WFNode {
  id: string
  type: NodeKind
  position: { x:number; y:number }
  data: NodeData
}

export interface WFEdge {
  id: string
  source: string
  target: string
}

export interface Workflow {
  nodes: WFNode[]
  edges: WFEdge[]
}
