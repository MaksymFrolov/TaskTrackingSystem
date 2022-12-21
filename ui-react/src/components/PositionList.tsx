import { FC, useEffect } from "react"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { PositionsActionCreators } from "../store/reduce/positions/actions-creators"
import PositionCard from "./PositionCard"


interface PositionListProps {
    id?: number
}

const PositionList: FC<PositionListProps> = ({id}) => {
    const { error, isLoading, positions } = useTypedSelector(state => state.positions)
    const { loadPositions } = useActions(PositionsActionCreators)
    useEffect(() => {
        loadPositions(id)
    }, [])
    return (
        <>
            {
                positions.map(t =>
                    <div key={t.id} style={{margin:15}}>
                        <PositionCard position={t} />
                    </div>
                )
            }
        </>
    )
}

export default PositionList