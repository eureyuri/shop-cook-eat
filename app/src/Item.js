import React, {useState} from 'react';
import {deleteItem} from "./api";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import './item.css'
import EdiModal from "./Modal/EdiModal";
import {Col} from "react-bootstrap";

function Item({itemId, name, quantity, unit, nonce, setNonce, itemToMove, setItemToMove}) {
    const [openEdit, setOpenEdit] = useState(false)

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
            <Col xs={1} className={'text-start'}>
                <input type={'checkbox'}
                       id={name}
                       name={name}
                       onClick={() => updateItemToMove(itemId)}
                />
            </Col>
            <Col xs={7}>
                <label htmlFor={name}>{`${name} ${quantity} ${unit === null ? '' : unit}`}</label>
            </Col>
            <Col xs={4} className={'text-end'}>
                <EditIcon onClick={() => {
                    setOpenEdit(true)
                }} />
                <DeleteOutlineIcon onClick={() => deleteListItem(itemId)} />
            </Col>

            {openEdit &&
                <EdiModal
                    list
                    show={openEdit}
                    onHide={() => setOpenEdit(false)}
                    id={itemId}
                    name={name}
                    quantity={quantity}
                    unit={unit}
                    nonce={nonce}
                    setNonce={setNonce}
                />
            }
        </div>
    );
}

export default Item;