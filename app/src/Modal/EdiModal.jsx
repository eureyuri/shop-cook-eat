import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {editFridge, editShopping} from "../api";

function EdiModal({show, onHide, onAdd, list, fridge, id, name, quantity, unit, expire, nonce, setNonce}) {
    const [nameVal, setNameVal] = useState(name)
    const [quantityVal, setQuantityVal] = useState(quantity)
    const [unitVal, setUnitVal] = useState(unit)
    const [expireVal, setExpireVal] = useState(expire)

    // let options = [
    //   { value: 'Chocolate', label: 'Chocolate' },
    //   { value: 'Strawberry', label: 'Strawberry' },
    //   { value: 'Vanilla', label: 'Vanilla' }
    // ]

    return (
         <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Name*/}
                {/*<Select autoFocus options={options} onChange={setName} defaultValue={name} />*/}
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={nameVal} onChange={event => setNameVal(event.target.value)} />
                <br />

                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" value={quantityVal} onChange={event => setQuantityVal(event.target.value)} />
                <br />

                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" name="unit" value={unitVal} onChange={event => setUnitVal(event.target.value)} />
                <br />

                {fridge && (
                    <>
                        <label htmlFor="expire">Expire On</label>
                        <input type="text" id="expire" name="expire" value={expireVal} onChange={event => setExpireVal(event.target.value)} />
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                {
                    list && (
                        <Button variant="primary"
                              onClick={() => {
                                  editShopping(id, nameVal, quantityVal, unitVal).then(() => {
                                      setNonce(nonce + 1)
                                      onHide()
                                  })
                              }}
                        >
                            Change
                        </Button>
                    )
                }

                {
                    fridge && (
                        <Button variant="primary"
                                onClick={() => {
                                  editFridge(id, nameVal, quantityVal, unitVal, expireVal).then(() => {
                                      setNonce(nonce + 1)
                                      onHide()
                                  })
                                }}
                        >
                            Change
                        </Button>
                    )
                }

            </Modal.Footer>
        </Modal>
    );
}

export default EdiModal;