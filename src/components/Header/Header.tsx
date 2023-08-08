import NavBar from "../NavBar/NavBar"
import SubHeader from "../SubHeader/SubHeader"
import reactLogo from '../../assets/react.svg'
import './Header.css'
import Avatar from "../Avatar/Avatar"

const Header = () => {
  return (
    <div>
        <div className="d_flex jc_sb header_container">
            <div className="d_flex left_content">
                <img src={reactLogo} alt="" />

                <div>
                  <b className="title">Websit Launch Assets</b>
                  <NavBar />
                </div>
            </div>

            <Avatar />
        </div>

        <SubHeader />
    </div>
  )
}

export default Header