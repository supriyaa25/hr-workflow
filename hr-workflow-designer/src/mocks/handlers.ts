import { http, HttpResponse } from 'msw'

function simulate({nodes,edges}:{nodes:any[];edges:any[]}){
  const byId = Object.fromEntries(nodes.map((n:any)=>[n.id,n]))
  const outgoing = edges.reduce((m:any,e:any)=>((m[e.source]??=[]).push(e.target),m), {})
  const start = nodes.find((n:any)=> n.type==='start')
  const out:string[] = []
  if(!start) return ['No Start node']
  let q=[start.id]; const seen=new Set<string>()
  while(q.length){
    const id=q.shift()!
    if(seen.has(id)) { out.push(`Cycle detected at ${id}`); break; }
    seen.add(id)
    const n=byId[id]; out.push(`Execute ${String(n.type).toUpperCase()}: ${n.data?.title ?? n.id}`)
    for(const t of (outgoing[id]||[])) q.push(t)
  }
  return out
}

export const handlers = [
  http.get('/automations', () =>
    HttpResponse.json([
      { id: 'send_email',   label: 'Send Email',        params: ['to','subject'] },
      { id: 'generate_doc', label: 'Generate Document', params: ['template','recipient'] },
      { id: 'slack_alert',  label: 'Slack Alert',       params: ['channel','text'] },
    ])
  ),
  http.post('/simulate', async ({ request }) => {
    const body = await request.json() as { nodes:any[]; edges:any[] }
    const log = simulate(body)
    return HttpResponse.json({ ok:true, log })
  }),
]
