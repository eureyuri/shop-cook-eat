import React from 'react';
import {deleteFridgeItem} from "./api";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import './item.css'

function FridgeItem({itemId, name, quantity, unit, nonce, setNonce, setOpenEdit, setToEdit}) {
    const deleteItem = itemId => {
        deleteFridgeItem(itemId).then(setNonce(nonce + 1))
    }

    return (
        <div className={'row item mb-2'}>
            <div>
                <label htmlFor={name}>{`${quantity} ${unit === null ? '' : unit} ${name}`}</label>
            </div>
            <div>
                <EditIcon onClick={() => {
                    setToEdit(itemId)
                    setOpenEdit(true)
                }} />
                <DeleteOutlineIcon onClick={() => deleteItem(itemId)} />
            </div>

        </div>
    );
}

export default FridgeItem;