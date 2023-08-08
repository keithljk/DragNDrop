import { ChangeEventHandler, DragEventHandler, KeyboardEventHandler, useRef, useState } from "react"
import Card from "../../components/Caed/Card"
import './Board.css'

const pe_a = {
    pointerEvents: 'all'
} as React.CSSProperties
const w_25 = {
    width: '280px'
}

const Board = () => {
    const textareaRef = useRef(null)
    const [isNew, setIsNew] = useState('')
    const [newValue, setNewValue] = useState('')
    const [datas, setDatas] = useState([{
    name: 'Requests',
    cards: [{
        name: 'Landing page',
        date: 'Dec 15',
        principal: '',
        comment: 4
    }, {
        name: 'Feature image for blog',
        date: 'Jan 16',
        principal: '',
        comment: 1
    }]
  },{
    name: 'In Production',
    cards: [{
        name: 'New Favicon',
        date: 'Nov 1',
        principal: '',
        comment: 5
    }, {
        name: 'Welcome modal',
        date: 'Dec 24',
        principal: '',
        comment: 2
    },{
        name: 'Photo for company bios',
        date: 'Dec 15',
        principal: '',
        comment: 0
    }]
  }])

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    console.log(e)
    const dataTransfer = e.dataTransfer.getData("text")
    const targetCard = JSON.parse(dataTransfer) as {
        name: string,
        date: string,
        principal: string,
        comment: number
    }

    const fake = document.querySelector("#new")
    const fakeParent = fake?.parentNode as HTMLDivElement
    const fakeChild = fakeParent.children
    const dragCard = document.querySelector(".dragging")
    const dragParent = dragCard?.parentNode as HTMLDivElement

    let index = -1
    for(let i = 0; i < fakeChild.length; i++){
        if(fakeChild[i].id === 'new'){
            //  會有一個上方的div
            index = i - 1
            break;
        }
    }

    const a = datas.map((data) => {
        const originIndex = data.cards.findIndex((card) => card.name === dragCard?.id)

        if(data.name === fakeParent.id){
            //目的地board
            if(data.name === dragParent.id){
                    //於原本所在的board沒動
                if(originIndex === index){
                    return {...data}
                }else{
                    //於原本所在的board換位置
                    const exceptTarget = [...data.cards.slice(0, originIndex), ...data.cards.slice(originIndex + 1)]
                    return {
                        name: data.name,
                        cards: [...exceptTarget.slice(0, index), targetCard, ...exceptTarget.slice(index)]
                    }
                }
            }else{
                return {
                    name: data.name,
                    cards: [...data.cards.slice(0, index), targetCard, ...data.cards.slice(index)]
                }
            }
        }else{
            //非目的地board
            if(originIndex !== -1){
                //原本所在的board
                return {
                    name: data.name,
                    cards: [...data.cards.slice(0, originIndex), ...data.cards.slice(originIndex + 1)]
                }
            }else{
                //其他無相關的board
                return {...data}
            }
        }
    })
    
    fake?.remove()
    console.log(a)
    setDatas(a)
  }
  const handleDragEnter: DragEventHandler<HTMLDivElement>  = (e) => {
    cancelDefault(e)

    const div = e.target as HTMLDivElement
    if(div.id === 'new')return

    document.querySelector("#new")?.remove()

    const newDiv = document.createElement('div')
    newDiv.id = 'new'
    newDiv.className = 'card fake'
    if(div.className === 'board'){
        div.appendChild(newDiv)
    }else{
        div.parentNode?.insertBefore(newDiv, div)
    }
  }
  const cancelDefault: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }
  const handlePlus = (boardName: string) => {
    setIsNew(boardName)
  }

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNewValue(e.target.value)
  }
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if(e.key === 'Enter'){
        isNew === 'newBoard' ? newBoardHandler() : newCardHandler()
    }
  }
  const newCardHandler = () => {
    setDatas(datas.map((data) => {
        if(data.name === isNew){
            return {
                name: data.name,
                cards: [
                    ...data.cards,
                    {
                        name: newValue,
                        date: '',
                        principal: '',
                        comment: 0
                    }
                ]
            }
        }else{
            return {...data}
        }
    }))
    handleCancelNewValue()
  }
  const newBoardHandler = () => {
    setDatas([
        ...datas,
        {
            name: newValue,
            cards: []
        }
    ])
    handleCancelNewValue()
  }
  const handleCancelNewValue = () => {
    setIsNew('')
    setNewValue('')
  }

  return (
    <div className="container">
        {
            datas.map((data) => 
                <div
                    key={data.name}
                    id={data.name}
                    className="board"
                    onDragEnter={handleDragEnter}
                    onDragOverCapture={cancelDefault}
                    onDragLeaveCapture={cancelDefault}
                    onDropCapture={handleDrop}
                >
                    <div className="d_flex jc_sb">
                        {data.name}
                        <div className="d_flex ai_c" style={{...pe_a}}>
                            <button className="board_button d_flex ai_c jc_c" onClick={() => handlePlus(data.name)}>
                                <i className="gg-math-plus"></i>
                            </button>
                            <button className="board_button d_flex ai_c jc_c">
                                <i className="gg-more-alt"></i>
                            </button>
                        </div>
                    </div>

                    {data.cards.map((card) =>
                        <Card data={card} key={card.name} />
                    )}

                    {
                        isNew === data.name && 
                        <div className="card">
                            <textarea
                                ref={textareaRef}
                                autoFocus
                                rows={2}
                                cols={10}
                                className="textarea"
                                value={newValue}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                            <div style={{...pe_a}}>
                                <button className="mr_5" onClick={newCardHandler}>OK</button>
                                <button onClick={handleCancelNewValue}>Ｘ</button>
                            </div>
                        </div>
                    }
                </div>
        )}
        <div>
            {
                isNew === 'newBoard' ?
                    <div className="card" style={{...w_25}}>
                        <textarea
                            ref={textareaRef}
                            autoFocus
                            rows={2}
                            cols={10}
                            className="textarea"
                            value={newValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        <div style={{...pe_a}}>
                            <button className="mr_5" onClick={newBoardHandler}>OK</button>
                            <button onClick={handleCancelNewValue}>Ｘ</button>
                        </div>
                    </div> :
                    <button onClick={() => handlePlus('newBoard')}>New Board</button>
            }
        </div>
    </div>
  )
}

export default Board