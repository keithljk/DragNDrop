import './Avatar.css'
import reactLogo from '../../assets/react.svg'

const Avatar = () => {
  return (
    <div className='d_iflex ai_c'>
        <div className='d_flex m_05'>
            <img src={reactLogo} alt="" />
            <img src={reactLogo} alt="" />
        </div>

        <div className='m_05'>|</div>

        <div className='d_iflex ai_c'>
            <div className='search_input d_flex ai_c'>
              <i className="gg-search"></i>
              <input type="text" className='m_05' />
            </div>

            <button className='button plus d_flex ai_c jc_c m_05'>
              <i className="gg-math-plus"></i>
            </button>

            <button className='button question m_05'>？</button>

            <div className='d_flex m_05'>
              <img src={reactLogo} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Avatar