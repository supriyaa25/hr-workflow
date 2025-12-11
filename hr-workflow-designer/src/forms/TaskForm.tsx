import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWorkflowStore } from '../store/useWorkflowStore'
import type { WFNode } from '../types/workflow'

const Schema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().optional(),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
})
type F = z.infer<typeof Schema>

export default function TaskForm({ node }:{ node: WFNode }){
  const { setNodes } = useWorkflowStore()
  const { register, handleSubmit } = useForm<F>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: String(node.data.title || 'Task'),
      description: (node.data as any).description || '',
      assignee: (node.data as any).assignee || '',
      dueDate: (node.data as any).dueDate || '',
    }
  })

  const onSubmit = (values:F)=>{
    setNodes((nds)=> nds.map(n=> n.id===node.id ? { ...n, data: { ...n.data, ...values }} : n ))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Edit Task</h3>
      <label>Title<input {...register('title')} /></label>
      <label>Description<input {...register('description')} /></label>
      <label>Assignee<input {...register('assignee')} /></label>
      <label>Due Date<input type="date" {...register('dueDate')} /></label>
      <button type="submit">Save</button>
    </form>
  )
}
