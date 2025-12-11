import { get } from './client'
export const getAutomations = () => get<{id:string;label:string;params:string[]}[]>('/automations')
