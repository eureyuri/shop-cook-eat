import React, {useState} from 'react';
import {deleteFridgeItem} from "./api";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import './item.css'
import EdiModal from "./Modal/EdiModal";
import {Col} from "react-bootstrap";
import {calcDateDelta} from "./FridgeList";

function FridgeItem({itemId, name, quantity, unit, expire, nonce, setNonce}) {
    const [openEdit, setOpenEdit] = useState(false)

    const deleteItem = itemId => {
        deleteFridgeItem(itemId).then(setNonce(nonce + 1))
    }

    return (
        <>
            <div className="row expiration_date">
                {calcDateDelta(new Date(expire), new Date())} day
            </div>

            <div className={'row item mb-2'} xs={8}>
                <Col>
                    <label htmlFor={name}>{`${quantity} ${unit === null ? '' : unit} ${name}`}</label>
                </Col>
                <Col className={'text-end'} xs={4}>
                    <EditIcon onClick={() => {
                        setOpenEdit(true)
                    }} />
                    <DeleteOutlineIcon onClick={() => deleteItem(itemId)} />
                </Col>

                {openEdit &&
                    <EdiModal
                        fridge
                        show={openEdit}
                        onHide={() => setOpenEdit(false)}
                        id={itemId}
                        name={name}
                        quantity={quantity}
                        unit={unit}
                        expire={expire}
                        nonce={nonce}
                        setNonce={setNonce}
                    />
                }
            </div>
        </>
    );
}

export default FridgeItem;