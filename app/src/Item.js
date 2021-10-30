import React from 'react';
import {deleteItem} from "./api";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import './item.css'

function Item({itemId, name, quantity, unit, nonce, setNonce, itemToMove, setItemToMove, setOpenEdit, setToEdit}) {
    const deleteListItem = itemId => {
        deleteItem(itemId).then(setNonce(nonce + 1))
    }

    const updateItemToMove = id => {
        const tempMap = itemToMove
        tempMap.set(id, !tempMap.get(id))
        setItemToMove(tempMap)
    }

    return (
        <div className={'row item mb-2'}>
            <div>
                <input type={'checkbox'}
                       id={name}
                       name={name}
                       onClick={() => updateItemToMove(itemId)}
                />
                <label htmlFor={name}>{`${quantity} ${unit === null ? '' : unit} ${name}`}</label>
            </div>
            <div>
                <EditIcon onClick={() => {
                    setToEdit(itemId)
                    setOpenEdit(true)
                }} />
                <DeleteOutlineIcon onClick={() => deleteListItem(itemId)} />
            </div>

        </div>
    );
}

export default Item;