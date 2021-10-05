import React, {useEffect, useState} from 'react';
import {finishShopping, getList} from "./api";
import Item from "./Item";
import AddIcon from "@mui/icons-material/Add";

function ShoppingList({nonce, setNonce, itemToMove, setItemToMove}) {
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [toEdit, setToEdit] = useState('')
    const [items, setItems] = useState([])

    useEffect(() => {
        getList().then(it => {
            setItems(it)
        }).then(() => {
            items.forEach(item => {
                const tempMap = itemToMove
                tempMap.set(item.id, false)
                setItemToMove(tempMap)
            })
        })
    }, [nonce])

    return (
        <div>
            {
                openEdit && (<div>Edit</div>)
            }

            <h2>Shopping List</h2>
            <button onClick={() => setOpenAdd(true)}><AddIcon /></button>
            {
                items.map((item) =>
                    <Item key={item.id}
                          itemId={item.id}
                          name={item.name}
                          quantity={item.quantity}
                          unit={item.unit}
                          nonce={nonce}
                          setNonce={setNonce}
                          itemToMove={itemToMove}
                          setItemToMove={setItemToMove}
                          setOpenEdit={setOpenEdit}
                          setToEdit={setToEdit}
                    />
                )
            }

            <button onClick={() => finishShopping(Array.from(itemToMove.keys()))}>Finish Shopping</button>
        </div>
    );
}

export default ShoppingList;