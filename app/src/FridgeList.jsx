import React, {useEffect, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {addFridgeItem, getFridgeList} from "./api";
import FridgeItem from "./FridgeItem";
import AddModal from "./Modal/AddModal";
import {Col, Row} from "react-bootstrap";

export const calcDateDelta = (expire, today) => {
    return parseInt((expire - today) / 1000 / 60 / 60 / 24)
}

function FridgeList({nonce, setNonce}) {
    const [openAdd, setOpenAdd] = useState(false)
    const [items, setItems] = useState([])
    const [expireItems, setExpireItems] = useState([])
    const [fineItems, setFineItems] = useState([])
    const [expiredItems, setExpiredItems] = useState([])

    const FINE = 1
    const EXPIRING = 0
    const EXPIRED = -1

    useEffect(() => {
        getFridgeList().then(it => {
            setItems(it)
        })
    }, [nonce])

    useEffect(() => {
        setFineItems([])
        setExpireItems([])
        setExpiredItems([])

        items.forEach(item => {
            const category = isExpiringSoon(item.expire)
            if (category === EXPIRED)  setExpiredItems(oldArr => [...oldArr, item])
            else if (category === EXPIRING) setExpireItems(oldArr => [...oldArr, item])
            else setFineItems(oldArr => [...oldArr, item])
        })
    }, [items])

    const onAdd = (name, quantity, unit, expireDate, boughtDate) => {
        addFridgeItem(name, quantity, unit, expireDate, boughtDate).then(() => setNonce(nonce + 1))
    }

    const isExpiringSoon = (date) => {
        if (date === null) return FINE

        const expire = new Date(date)
        const today = new Date()
        const delta = calcDateDelta(expire, today)

        if (delta < 0) return EXPIRED
        if (delta <= 4) return EXPIRING
        else return FINE
    }

    return (
        <div>
            <Row className={'row__shopping_list mb-4'}>
                <Col className={'text-start'}>
                    <h2>Fridge</h2>
                </Col>
                <Col xs={4} className={'text-end'}>
                    <button className={'btn btn-success btn-circle'} onClick={() => setOpenAdd(true)}><AddIcon /></button>
                </Col>
            </Row>

            {
                expireItems.length > 0 &&
                <>
                    <h3>Expiring Soon!</h3>
                    {expireItems.map((item) =>(
                        <>
                            <FridgeItem key={item.id}
                                        itemId={item.id}
                                        name={item.name}
                                        quantity={item.quantity}
                                        unit={item.unit}
                                        expire={item.expire}
                                        nonce={nonce}
                                        setNonce={setNonce}
                            />
                        </>
                            )
                    )}
                </>
            }

            {
                expiredItems.length > 0 &&
                <>
                    <h3>---------</h3>
                    <h3>Expired</h3>
                    {expiredItems.map((item) =>(
                        <>
                            <FridgeItem key={item.id}
                                        itemId={item.id}
                                        name={item.name}
                                        quantity={item.quantity}
                                        unit={item.unit}
                                        expire={item.expire}
                                        nonce={nonce}
                                        setNonce={setNonce}
                            />
                        </>
                            )
                    )}
                </>
            }

            {
                fineItems.length > 0 &&
                <>
                    <h3>---------</h3>
                    {fineItems.map((item) =>
                        <>
                            <div>
                                {
                                    item.expire &&
                                    `${new Date(item.expire).getMonth() + 1}/${new Date(item.expire).getDate() + 1}/${new Date(item.expire).getFullYear()}`
                                }
                            </div>
                            <FridgeItem key={item.id}
                                    itemId={item.id}
                                    name={item.name}
                                    quantity={item.quantity}
                                    unit={item.unit}
                                    expire={item.expire}
                                    nonce={nonce}
                                    setNonce={setNonce}
                            />
                        </>

                    )}
                </>
            }

            {openAdd && <AddModal fridge show={openAdd} onHide={() => setOpenAdd(false)} onAdd={onAdd} />}
        </div>
    );
}

export default FridgeList;