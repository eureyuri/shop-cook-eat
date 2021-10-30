import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Select from 'react-select'

function AddModal({show, onHide, onAdd, list, fridge}) {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState(null)

    const options = [
      { value: 'Chocolate', label: 'Chocolate' },
      { value: 'Strawberry', label: 'Strawberry' },
      { value: 'Vanilla', label: 'Vanilla' }
    ]

    const handleName = (selected) => {
        setName(selected.value);
    }

    return (
         <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                {list && (<Modal.Title>Add Item</Modal.Title>) }
                {fridge && (<Modal.Title>Add Fridge</Modal.Title>)}
            </Modal.Header>
            <Modal.Body>
                Name
                <Select options={options} onChange={handleName} />

                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" onChange={event => setQuantity(event.target.value)} />

                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" name="unit" onChange={event => setUnit(event.target.value)} />
            </Modal.Body>
            <Modal.Footer>
              {/*<Button variant="secondary" onClick={onHide}>*/}
              {/*  Close*/}
              {/*</Button>*/}
              <Button variant="primary"
                      onClick={() => {
                          onAdd(name, quantity, unit)
                          onHide()
                      }}
              >
                Add
              </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddModal;