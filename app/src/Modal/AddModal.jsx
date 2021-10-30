import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import AsyncSelect from 'react-select/async'
import {getFood} from "../api";
import debounce from 'lodash.debounce';

function AddModal({show, onHide, onAdd, list, fridge}) {
    const [name, setName] = useState('')
    const [nameSpec, setNameSpec] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState(null)
    const [expireDate, setExpireDate] = useState(null)
    const [boughtDate, setBoughtDate] = useState(null)
    const [tab, setTab] = useState('bought')

    const onChange = value => {
        setName(value);
    };

    const _loadSuggestions = (query, callback) => {
       getFood(query)
           .then(resp => {
               const res = []
               resp.forEach(item => {
                   res.push({value: item, label: item})
               })
               return res
           })
           .then(resp => callback(resp))
    };
    const loadSuggestions = debounce(_loadSuggestions, 1000);

    return (
         <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                {list && (<Modal.Title>Add Item</Modal.Title>) }
                {fridge && (<Modal.Title>Add Fridge</Modal.Title>)}
            </Modal.Header>
            <Modal.Body>
                {/*Name*/}
                <label htmlFor="name">Name</label>
                <AsyncSelect
                    autoFocus
                    cacheOptions
                    defaultOptions
                    value={name}
                    loadOptions={loadSuggestions}
                    onChange={onChange}
                    aria-labelledby={'name'}
                />

                {
                    name['value'] === 'Other' &&
                        <input type="text" id="name" name="name" onChange={event => setNameSpec(event.target.value)} />
                }

                <br />

                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" onChange={event => setQuantity(event.target.value)} />
                <br />

                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" name="unit" onChange={event => setUnit(event.target.value)} />
                <br />

                {fridge && (
                    <>
                        <button variant="primary" onClick={() => setTab('bought')}>Bought On</button>
                        <button variant="primary" onClick={() => setTab('expire')}>Expire On</button>
                        <br />
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
                                  name['value'] === 'Other' ? onAdd(nameSpec, quantity, unit) : onAdd(name['value'], quantity, unit)
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
                                  name['value'] === 'Other' ? onAdd(nameSpec, quantity, unit, expireDate, boughtDate) : onAdd(name['value'], quantity, unit, expireDate, boughtDate)
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

export default AddModal;