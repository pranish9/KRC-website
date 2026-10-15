import { Zap, Lamp, Wrench, ShieldCheck, Lightbulb, Headset } from 'lucide-react'

export const ICONS = { Zap, Lamp, Wrench, ShieldCheck, Lightbulb, Headset }
export const getIcon = (name) => ICONS[name] || Zap
