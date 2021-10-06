import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

function EdiModal({show, onHide, onAdd, list, fridge}) {
    const [name, setName] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState(null)
    const [expireDate, setExpireDate] = useState(null)
    const [boughtDate, setBoughtDate] = useState(null)
    const [tab, setTab] = useState('bought')

    let options = [
      // { value: 'Chocolate', label: 'Chocolate' },
      // { value: 'Strawberry', label: 'Strawberry' },
      // { value: 'Vanilla', label: 'Vanilla' }
    ]

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
                <input type="text" id="name" name="name" onChange={event => setName(event.target.value)} />

                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" onChange={event => setQuantity(event.target.value)} />

                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" name="unit" onChange={event => setUnit(event.target.value)} />

                {fridge && (
                    <>
                        <button variant="primary" onClick={() => setTab('bought')}>Bought On</button>
                        <button variant="primary" onClick={() => setTab('expire')}>Expire On</button>
                    </>
                )}

                {fridge && tab === 'bought' && (
                    <>
                        <label htmlFor="bought">Bought On</label>
                        <input type="text" id="bought" name="bought" onChange={event => setBoughtDate(event.target.value)} />
                    </>
                )}

                {fridge && tab === 'expire' && (
                    <>
                        <label htmlFor="expire">Expire On</label>
                        <input type="text" id="expire" name="expire" onChange={event => setExpireDate(event.target.value)} />
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                {
                    list && (
                        <Button variant="primary"
                              onClick={() => {
                                  onAdd(name, quantity, unit)
                                  onHide()
                              }}
                        >
                            Add
                        </Button>
                    )
                }

                {
                    fridge && (
                        <Button variant="primary"
                              onClick={() => {
                                  onAdd(name, quantity, unit, expireDate, boughtDate)
                                  onHide()
                              }}
                        >
                            Add
                        </Button>
                    )
                }

            </Modal.Footer>
        </Modal>
    );
}

export default EdiModal;