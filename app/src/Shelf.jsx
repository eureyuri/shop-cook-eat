import React, {useEffect, useState} from 'react';
import {getList} from "./api";
import Item from "./Item";

function Shelf({nonce, setNonce, archive}) {
    const [items, setItems] = useState([])
    useEffect(() => {
        getList().then(items => setItems(items))
    }, [nonce])

    return (
        <div>
            {
                !archive ? items.map(item => !item.archive &&
                    <Item key={item.id} itemId={item.id} title={item.title} nonce={nonce} setNonce={setNonce} />
                ) : items.map(item => item.archive &&
                    <Item key={item.id} itemId={item.id} title={item.title} nonce={nonce} setNonce={setNonce} archive />
                )
            }
        </div>
    );
}

export default Shelf;