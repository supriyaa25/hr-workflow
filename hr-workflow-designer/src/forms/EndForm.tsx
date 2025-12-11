import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWorkflowStore } from '../store/useWorkflowStore'
import type { WFNode } from '../types/workflow'

const Schema = z.object({
  title: z.string().min(1, 'Required'),
  message: z.string().optional(),
  summary: z.boolean().optional(),
})
type F = z.infer<typeof Schema>

export default function EndForm({ node }:{ node: WFNode }){
  const { setNodes } = useWorkflowStore()
  const { register, handleSubmit } = useForm<F>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: String(node.data.title || 'End'),
      message: (node.data as any).message || '',
      summary: (node.data as any).summary || false
    }
  })

  const onSubmit = (values:F)=>{
    setNodes((nds)=> nds.map(n=> n.id===node.id ? { ...n, data: { ...n.data, ...values }} : n ))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Edit End</h3>
      <label>Title<input {...register('title')} /></label>
      <label>Message<input {...register('message')} /></label>
      <label><input type="checkbox" {...register('summary')} /> Show final summary</label>
      <button type="submit">Save</button>
    </form>
  )
}
