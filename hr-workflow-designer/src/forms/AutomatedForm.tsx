import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { getAutomations } from '../api/automations'
import { useWorkflowStore } from '../store/useWorkflowStore'
import type { WFNode } from '../types/workflow'

const Schema = z.object({
  title: z.string().min(1, 'Required'),
  actionId: z.string().min(1, 'Required'),
  params: z.record(z.string()).optional(),
})
type F = z.infer<typeof Schema>

export default function AutomatedForm({ node }:{ node: WFNode }) {
  const { setNodes } = useWorkflowStore()
  const { register, handleSubmit, watch, setValue } = useForm<F>({
    resolver: zodResolver(Schema),
    defaultValues: { 
      title: String(node.data.title || 'Automation'), 
      actionId: (node.data as any).actionId || '', 
      params: (node.data as any).params || {} 
    }
  })

  const [automations, setAutomations] = useState<{id:string;label:string;params:string[]}[]>([])
  useEffect(()=>{ getAutomations().then(setAutomations) },[])

  const actionId = watch('actionId')
  const selected = useMemo(()=> automations.find(a=> a.id===actionId), [automations, actionId])

  const onSubmit = (values:F)=>{
    setNodes((nds)=> nds.map(n=> n.id===node.id ? { ...n, data: { ...n.data, ...values }} : n ))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Edit Automated</h3>
      <label>Title<input {...register('title')} /></label>
      <label>Action
        <select {...register('actionId')}>
          <option value="">Select...</option>
          {automations.map(a=> <option key={a.id} value={a.id}>{a.label}</option>)}
        </select>
      </label>
      {selected?.params?.map(p=>(
        <label key={p}>{p}<input {...register(`params.${p}` as const)} /></label>
      ))}
      <button type="submit">Save</button>
    </form>
  )
}
