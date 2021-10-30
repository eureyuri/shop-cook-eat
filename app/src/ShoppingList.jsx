import React, {useEffect, useState} from 'react';
import {addItem, finishShopping, getList} from "./api";
import Item from "./Item";
import AddIcon from "@mui/icons-material/Add";
import AddModal from "./Modal/AddModal";

function ShoppingList({nonce, setNonce, itemToMove, setItemToMove}) {
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [toEdit, setToEdit] = useState('')
    const [items, setItems] = useState([])

    const onAdd = (name, quantity, unit) => {
        addItem(name, quantity, unit).then(() => setNonce(nonce + 1))
    }

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

            {openAdd && <AddModal list show={openAdd} onHide={() => setOpenAdd(false)} onAdd={onAdd} />}

        </div>
    );
}

export default ShoppingList;