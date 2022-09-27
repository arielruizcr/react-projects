import React, { useCallback } from 'react'
import TodoItem from '../TodoItem'
import { useDispatch, useSelector } from 'react-redux'

const TodoList = ({ list, removeItem }) => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items)

    const onClickRemove = useCallback((item) => {
        // Acción de eliminar un item 
        console.log("Borrando item", item)
        // removeItem(item)
        dispatch({type: 'REMOVE_ITEM', payload: item})
    }, [removeItem])
    
    return (
        <div>
            {items && items.map(i => <TodoItem key={i.item} {...i} onClickRemove={onClickRemove}></TodoItem>)}
        </div>
    )
}
/*
const mapStateToProps = state => {
    return {
        list: state.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeItem: value => dispatch({type: 'REMOVE_ITEM', payload: value})
    }
}
*/
// export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default TodoList
