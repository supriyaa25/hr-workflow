import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWorkflowStore } from '../store/useWorkflowStore'
import type { WFNode } from '../types/workflow'

const Schema = z.object({
  title: z.string().min(1, 'Required'),
  approverRole: z.enum(['Manager','HRBP','Director']).default('Manager'),
  autoApproveThreshold: z.coerce.number().optional(),
})
type F = z.infer<typeof Schema>

export default function ApprovalForm({ node }:{ node: WFNode }){
  const { setNodes } = useWorkflowStore()
  const { register, handleSubmit } = useForm<F>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: String(node.data.title || 'Approval'),
      approverRole: (node.data as any).approverRole || 'Manager',
      autoApproveThreshold: (node.data as any).autoApproveThreshold || undefined,
    }
  })

  const onSubmit = (values:F)=>{
    setNodes((nds)=> nds.map(n=> n.id===node.id ? { ...n, data: { ...n.data, ...values }} : n ))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Edit Approval</h3>
      <label>Title<input {...register('title')} /></label>
      <label>Approver Role
        <select {...register('approverRole')}>
          <option>Manager</option>
          <option>HRBP</option>
          <option>Director</option>
        </select>
      </label>
      <label>Auto-Approve Threshold<input type="number" step="1" {...register('autoApproveThreshold')} /></label>
      <button type="submit">Save</button>
    </form>
  )
}
