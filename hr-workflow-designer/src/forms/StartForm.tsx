import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWorkflowStore } from '../store/useWorkflowStore'
import type { WFNode } from '../types/workflow'

const Schema = z.object({
  title: z.string().min(1, 'Required'),
})
type F = z.infer<typeof Schema>

export default function StartForm({ node }:{ node: WFNode }){
  const { setNodes } = useWorkflowStore()
  const { register, handleSubmit, reset } = useForm<F>({
    resolver: zodResolver(Schema),
    defaultValues: { title: String(node.data.title || 'Start') }
  })

  const onSubmit = (values:F)=>{
    setNodes((nds)=> nds.map(n=> n.id===node.id ? { ...n, data: { ...n.data, ...values }} : n ))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Edit Start</h3>
      <label>Title<input {...register('title')} /></label>
      <button type="submit">Save</button>
    </form>
  )
}
