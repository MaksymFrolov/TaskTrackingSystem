import { FC, useEffect } from "react"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { GetTasksEnum, TasksActionCreators } from "../store/reduce/tasks/action-creators"
import TaskCard from "./TaskCard"


interface TaskListProps {
    name?: string
    id?: number
}

const TaskList: FC<TaskListProps> = ({name,id}) => {
    const { error, isLoading, tasks } = useTypedSelector(state => state.tasks)
    const { loadTasks } = useActions(TasksActionCreators)
    useEffect(() => {
        switch (name) {
            case "manager":
                loadTasks(GetTasksEnum.BY_MANAGER_ID, id)
                break;
            case "project":
                loadTasks(GetTasksEnum.BY_PROJECT_ID, id)
                break;
            case "user":
                loadTasks(GetTasksEnum.BY_USER_ID, id)
                break;

            default:
                loadTasks(GetTasksEnum.ALL_TASK)
                break;
        }
        
    }, [])
    return (
        <>
            {
                tasks.map(t =>
                    <div key={t.id} style={{margin:15}}>
                        <TaskCard task={t} />
                    </div>
                )
            }
        </>
    )
}

export default TaskList