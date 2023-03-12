import { useAuth } from '../Contexts/AppContext'
import { logout } from '../Functions/Functions'

export default function Body() {

    const { currentBoard, dispatch } = useAuth()

    
    return (
        <div className=' px-4 py-6 md:px-10 overflow-x-scroll flex min-h-[80vh] md:ml-[300px]'>
            {currentBoard.columns.map(column=>{
                return (
                    <div key={column.id} className='min-w-[17.5rem] flex flex-col mr-8 h-full text-white overflow-y-scroll'>
                        <div className='flex items-center gap-2 tracking-[2.4px] font-semibold text-[0.75rem] text-[#828fa3]'>
                            <div className='h-[15px] w-[15px] bg-[#49C4E5] rounded-full'></div>
                            <h3>{`${column.name.toUpperCase()}(${column.tasks.length})`}</h3>
                        </div>
                        <div className='mt-6'>
                            {
                                column.tasks.map((task)=>{
                                    const number = task.subtasks.filter(item=>item.isCompleted).length

                                    return (
                                        <div key={task.id} className='flex text-left flex-col w-full min-h-[5.5rem] bg-[#2B2C37] border-[1px] py-6 px-4 border-[#8686861a] rounded-lg shadow-lg shadow-[#364e7e1a] mb-6 transition delay-200 ease-in hover:opacity-40'>
                                            <h4 className='text-[0.9375rem] font-semibold text-white mb-2  clamp overflow-hidden text-ellipsis'>{task.title}</h4>
                                            <p className='text-[0.75rem] font-semibold text-[#828fa3]'>{`${number} of ${task.subtasks.length} subtasks`}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
