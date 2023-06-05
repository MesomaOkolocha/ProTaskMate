import { useAuth } from '../Contexts/AppContext'
import useWindowDimensions from '../Hooks/windowDimensions'
import NewColumn from './NewColumn'
import Column from './Column'
import { GoPlus } from 'react-icons/go'
import { DragDropContext } from 'react-beautiful-dnd'

export default function Body() {

    const { Boards, dispatch, currentBoard, sideBarShown, isLightToggled } = useAuth()
    

    const {height} = useWindowDimensions()
    const newHeight = height-96
    const style = {
        height: newHeight
    }

    function dragEnd(result: any){
        console.log(result)
        const {destination, source, draggableId} = result

        if(!destination){
            return;
        }

        if (
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) {
            return;
        }

        if(
            destination.droppableId === source.droppableId &&
            destination.index !== source.index
        ) {
            if(currentBoard){
                const newBoard = {
                    ...currentBoard,
                    columns: currentBoard.columns.map(col=>{
                        if(col.id.toString()===source.droppableId){
                            const newTasks = [...col.tasks]
                            const findTask = newTasks.find(task=>task.id.toString() === draggableId) || newTasks[0]
                            newTasks.splice(source.index, 1)
                            newTasks.splice(destination.index, 0, findTask)
                            return {
                                ...col,
                                tasks: newTasks
                            }
                        }else return col
                    })
                } 

                const newBoards = Boards?.map(board=>{
                    if(board.id === currentBoard.id){
                        return newBoard
                    }else return board
                })

                dispatch({
                    type: 'setBoards',
                    payload:{
                        BoardsPayload: newBoards
                    }
                })
            }
        }
        if(destination.droppableId !== source.droppableId){
            if(currentBoard){
                const newBoard = {
                    ...currentBoard,
                    columns: currentBoard.columns.map(col=>{
                        if(col.id.toString()===destination.droppableId){
                            const newTasks = [...(col.tasks || [])]
                            const findTask = currentBoard.columns.find(col=>col.id.toString() === source.droppableId)?.tasks.find(task=>task.id.toString()===draggableId) || col.tasks[0]
                            findTask.statusId =col.id
                            findTask.status= col.name
                            newTasks.splice(destination.index, 0, findTask)
                            return {
                                ...col,
                                tasks: newTasks
                            }
                        }else if(col.id.toString()===source.droppableId){
                            return {
                                ...col,
                                tasks: col.tasks.filter(item=>item.id.toString()!==draggableId)
                            }
                        }else return col
                    })
                } 
    
                const newBoards = Boards?.map(board=>{
                    if(board.id === currentBoard.id){
                        return newBoard
                    }else return board
                })
    
                dispatch({
                    type: 'setBoards',
                    payload:{
                        BoardsPayload: newBoards
                    }
                })
            }
        }
    }

    if(!Boards || Boards.length===0){
        return (
            <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} delay-100 transition-all ease-linear flex flex-col items-center justify-center w-full px-4 ${sideBarShown && 'md:ml-[300px]'} scrollbar`} style={style}>
                <p className='text-center text-white font-semibold text-[1.1rem]'>Your dashboard is empty. Create a new board to get started</p>
                <button onClick={()=>{
                    dispatch({
                        type: 'setCreateBoardModalTrue'
                    })
                }} className='flex text-white font-bold p-3 rounded-full items-center gap-1 mt-3 bg-[#635fc7]'>
                    <i className='text-[0.6rem]'><GoPlus /></i>
                    <p>Create New board</p>
                </button>
            </div>
        )
    }

    return (
        <DragDropContext onDragEnd={dragEnd}>
        <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} delay-100 transition-all ease-linear px-4 py-6 md:px-10 w-full overflow-x-scroll bodyScrollbarH flex ${sideBarShown && 'md:ml-[300px]'} scrollbar`} style={style}>
            {currentBoard?.columns?.map((column, index)=>{
                return (
                    <Column key={column.id} column={column} index={index}/>
                )
            })}
            <NewColumn />
        </div>
        </DragDropContext>
    )
}
