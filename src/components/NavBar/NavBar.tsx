import { useState } from "react";
import './NavBar.css'

const NavBar = () => {
  const [states] = useState(['List', 'Board', 'Timeline', 'Calender', 'Progress', 'Forms', 'More'])
  const [isActived, setIsActived] = useState('Board')
  return (
    <nav>
        <ul className="navigator">
          {
            states.map(state =>
              <li
                className={isActived === state ? 'isActived' : ''}
                key={state}
                onClick={() => setIsActived(state)}>
                  <a href="#">{state}</a>
              </li>
            )
          }
        </ul>
    </nav>
  )
}

export default NavBar