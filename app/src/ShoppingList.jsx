import React, {useEffect, useState} from 'react';
import {addItem, finishShopping, getList} from "./api";
import Item from "./Item";
import AddIcon from "@mui/icons-material/Add";
import AddModal from "./Modal/AddModal";
import {Col, Row} from "react-bootstrap";

function ShoppingList({nonce, setNonce, itemToMove, setItemToMove}) {
    const [openAdd, setOpenAdd] = useState(false)
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
        <>
            <Row className={'row__shopping_list mb-4'}>
                <Col className={'text-start'}>
                    <h2>Shopping List</h2>
                </Col>
                <Col xs={4} className={'text-end'}>
                    <button className={'btn btn-success btn-circle'} onClick={() => setOpenAdd(true)}><AddIcon /></button>
                </Col>
            </Row>

            {
                items.map((item) =>
                    <Row>
                        <Item key={item.id}
                              itemId={item.id}
                              name={item.name}
                              quantity={item.quantity}
                              unit={item.unit}
                              nonce={nonce}
                              setNonce={setNonce}
                              itemToMove={itemToMove}
                              setItemToMove={setItemToMove}
                        />
                    </Row>
                )
            }

            <Row className={'mt-4 mx-2'}>
                <button
                    onClick={() => {
                        const toMove = []
                        itemToMove.forEach((v, k) => {
                            if (v) toMove.push(k)
                        })
                        finishShopping(toMove).then(() => setNonce(nonce + 1))
                    }}
                    className={'btn btn-success finish_shopping py-2'}
                >
                    Finish Shopping
                </button>
            </Row>

            {openAdd && <AddModal list show={openAdd} onHide={() => setOpenAdd(false)} onAdd={onAdd} />}

        </>
    );
}

export default ShoppingList;