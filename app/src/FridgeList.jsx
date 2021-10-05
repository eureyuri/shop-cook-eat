import React, {useEffect, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {getFridgeList} from "./api";
import Item from "./Item";
import FridgeItem from "./FridgeItem";

function FridgeList({nonce, setNonce}) {
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [items, setItems] = useState([])
    const [toEdit, setToEdit] = useState('')

    useEffect(() => {
        getFridgeList().then(it => {
            setItems(it)
        })
    }, [nonce])

    return (
        <div>
            <h2>Fridge</h2>
            <button onClick={() => setOpenAdd(true)}><AddIcon /></button>
            {
                items.map((item) =>
                    <FridgeItem key={item.id}
                          itemId={item.id}
                          name={item.name}
                          quantity={item.quantity}
                          unit={item.unit}
                          nonce={nonce}
                          setNonce={setNonce}
                          setOpenEdit={setOpenEdit}
                          setToEdit={setToEdit}
                    />
                )
            }
        </div>
    );
}

export default FridgeList;