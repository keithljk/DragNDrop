import { DragEventHandler, MouseEventHandler, useRef, useState } from "react"
import './Card.css'
import reactLogo from '../../assets/react.svg'

const Card = ({data}: {data: {
  name: string,
  date: string,
  principal: string,
  comment: number
}}) => {
  const [isMoved, setIsMoved] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const cardRef = useRef(null)

  // const a = useCallback(() => {
  //   const div = cardRef.current as HTMLDivElement | null
  //   if(div){
  //     // console.log(`position: ${position.x},${position.y}`)
  //     div.style.transform = `translate(${position.x}px, ${position.y}px)`
  //     // console.log(`position2: ${position.x},${position.y}`)
  //   }
  // }, [position])
  // useEffect(() => a, [a])

  const handleMouseMoveCapture: MouseEventHandler<HTMLDivElement> = (e) => {
    // console.log(`${e.movementX},${e.movementY}`)
    // const aw = e.target as HTMLDivElement
    // aw.classList.add('dragging')
    setIsMoved(true)
    const div = cardRef.current as HTMLDivElement | null
    
    if(div){
      // div.style.transform = `translate(${-100000}px, ${-10000}px)`
    }
    // console.log(e)
    // const aw = e.target as HTMLDivElement
    // console.log(aw.clientHeight)
    // console.log(aw.clientWidth)
    
    // if(isMoved){
    //   // console.log(`${e.movementX},${e.movementY}`)
    //   setPosition({
    //     x: position.x + e.movementX,
    //     y: position.y + e.movementY
    //   })
    // }
  }
  const handleStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.dataTransfer.setData('text', JSON.stringify(data))
    // const div = cardRef.current as HTMLDivElement | null

    // if(div){
    //   console.log(div.id)
      
    // }
  }
  const handleEnd: DragEventHandler<HTMLDivElement> = (e) => {
    // const aw = e.target as HTMLDivElement
    // aw.classList.remove('dragging')
    
    const div = cardRef.current as HTMLDivElement | null
    setIsMoved(false)
    if(div){
      
    //   div.classList.remove('dragging')
      // div.style.transform = `translate(${0}px, ${0}px)`
      // div.style.position = ''
      // div.style.zIndex = ''
      // div.style.pointerEvents = 'none'
    }
  }

  return (
    <div
      className={`card ${isMoved ? 'dragging' : ''}`}
      ref={cardRef}
      id={data.name}
      draggable
      onDragStartCapture={handleStart}
      onDragCapture={handleMouseMoveCapture}
      onDragEndCapture={handleEnd}
    >
      <div>
        {data.name}
      </div>
        
      <div className="status">
        <div className='d_flex ai_c'>
          <img src={reactLogo} alt="" />
          <div className="p_5">{data.date}</div>
        </div>

        

        <div className="icon_bar">
          <span className="p_5">{data.comment}</span>
          <i className="gg-comment"></i>
        </div>
      </div>
    </div>
  )
}

export default Card