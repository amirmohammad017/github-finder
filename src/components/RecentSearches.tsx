import { Clock3 } from 'lucide-react'
type Props = { users: string[]; selected: string; onSelect: (login: string) => void }
export function RecentSearches({ users, selected, onSelect }: Props) { return <aside><h2><Clock3 size={18} /> Recent searches</h2>{users.length ? users.map((item) => <button className={item === selected ? 'recent active' : 'recent'} key={item} onClick={() => onSelect(item)}><img src={`https://github.com/${item}.png?size=80`} />{item}</button>) : <p className="muted">Your searches will appear here.</p>}</aside> }
