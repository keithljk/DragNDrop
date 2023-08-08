import './SubHeader.css'

const SubHeader = () => {
  return (
    <div className="d_flex jc_sb sub_container">
        <div className='text_container'>2 tasks completed today</div>

        <div className="d_flex">
            <div className='group'>
                <div className='fake_button'>
                  <i className="gg-check-o"></i>
                  <span>All tasks</span>
                </div>

                <div className='fake_button'>
                  <i className="gg-sort-az"></i>
                  <span>Filter</span>
                </div>

                <div className='fake_button'>
                  <i className="gg-arrows-exchange-v"></i>
                  <span>Sort</span>
                </div>
            </div>

            <div className='group'>
              |
            </div>
            
            <div className='group'>
                <div className='fake_button'>
                  <i className="gg-bolt"></i>
                  <span>Rules</span>
                </div>

                <div className='fake_button'>
                  <i className="gg-toggle-on"></i>
                  <span>Fields</span>
                </div>
            </div>

            <div className='group fake_button'>
              <div>
                <i className="gg-more-alt"></i>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SubHeader