type IconProps = { className?: string };

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function MenuIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M4 5h16M4 12h16M4 19h16" /></svg>; }
export function SearchIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.34-4.34" /></svg>; }
export function UserIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><circle cx="12" cy="7" r="4" /><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /></svg>; }
export function HeartIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M2 9.5a5.5 5.5 0 0 1 9.59-3.68.56.56 0 0 0 .82 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.49 5.31a2 2 0 0 1-3 .02L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>; }
export function BagIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M16 10a4 4 0 0 1-8 0M3.1 6.03h17.8M3.4 5.47A2 2 0 0 0 3 6.67V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.67a2 2 0 0 0-.4-1.2l-2-2.67A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" /></svg>; }
export function CloseIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M18 6 6 18M6 6l12 12" /></svg>; }
export function PlusIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M5 12h14M12 5v14" /></svg>; }
export function ShieldIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM9 12l2 2 4-4" /></svg>; }
export function RefreshIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M21 12a9 9 0 0 0-15.74-6.26L3 8M3 3v5h5M3 12a9 9 0 0 0 15.74 6.26L21 16M16 16h5v5" /></svg>; }
export function TruckIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>; }
export function MessageIcon({ className }: IconProps) { return <svg className={className} viewBox="0 0 24 24" {...base}><path d="M22 17a2 2 0 0 1-2 2H6.83a2 2 0 0 0-1.42.59l-2.2 2.2A.71.71 0 0 1 2 21.29V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" /></svg>; }
