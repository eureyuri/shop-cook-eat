import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {archiveItem, deleteItem, updateItem} from "./api";

function Item({itemId, title, nonce, setNonce, archive}) {
    const [newTitle, setNewTitle] = useState(title)

    const updateTitle = (itemId, newTitle) => {
        updateItem(itemId, newTitle).then(setNonce(nonce + 1))
    }

    const deleteTitle = itemId => {
        deleteItem(itemId).then(setNonce(nonce + 1))
    }

    const archiveTitle = itemId => {
        archiveItem(itemId).then(setNonce(nonce + 1))
    }

    return (
        <div className={'row item mb-2'}>
            <input type={'text'} value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <Button
                variant={'outline-primary'}
                onClick={() => updateTitle(itemId, newTitle)}
            >
                Update
            </Button>
            {!archive &&
                <Button
                    variant={'outline-secondary'}
                    onClick={() => archiveTitle(itemId)}
                >
                    Archive
                </Button>
            }
            <Button
                variant={'outline-danger'}
                onClick={() => deleteTitle(itemId)}
            >
                Delete
            </Button>
        </div>
    );
}

export default Item;