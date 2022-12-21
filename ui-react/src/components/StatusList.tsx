import { FC, useEffect } from "react"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { GetStatusesEnum, StatusesActionCreators } from "../store/reduce/statuses/action-creators"
import StatusCard from "./StatusCard"


interface StatusListProps {
    name: string
}

const StatusList: FC<StatusListProps> = ({name}) => {
    const { error, isLoading, statuses } = useTypedSelector(state => state.statuses)
    const { loadStatuses } = useActions(StatusesActionCreators)
    useEffect(() => {
        if(name=="task"){
            loadStatuses(GetStatusesEnum.BY_TASK)
        }
        else{
            loadStatuses(GetStatusesEnum.BY_PROJECT)
        }
    }, [])
    return (
        <>
            {
                statuses.map(t =>
                    <div key={t.id} style={{margin:15}}>
                        <StatusCard status={t} name={name} />
                    </div>
                )
            }
        </>
    )
}

export default StatusList