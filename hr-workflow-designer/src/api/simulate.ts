import { post } from './client'
import type { Workflow } from '../types/workflow'
export const simulate = (wf: Workflow) => post<{ok:boolean; log:string[]}>('/simulate', wf)
