import SaveGame from '../save-game/SaveGame'
import './header.scss'

export default function Header() {
  return (
    <header className='f-header'><span>Farm</span> <SaveGame/></header>
  )
}
