import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div>
            <img
              src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1672733292/Standard_Collection_8_hkeehs.png"
              alt="website login"
              className="website-logo"
            />
          </div>
          <ul className="link-list-items">
            <li>
              <input type="search" />
            </li>
            <li>
              <Link to="/" className="link-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="link-item">
                profile
              </Link>
            </li>
            <li>
              <button type="button"> Logout </button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header
