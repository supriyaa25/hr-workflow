export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if(!res.ok) throw new Error(`${res.status}`)
  return res.json()
}
export const get = <T>(url:string)=> api<T>(url)
export const post = <T>(url:string, body:any)=> api<T>(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
