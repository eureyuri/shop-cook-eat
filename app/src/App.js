import './App.css';
import Shelf from "./Shelf";
import {useState} from "react";
import {addItem} from "./api";
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import KitchenIcon from '@mui/icons-material/Kitchen';

function App() {
    const [title, setTitle] = useState('')
    const [nonce, setNonce] = useState(0)
    const [openAdd, setOpenAdd] = useState(false)
    const [tab, setTab] = useState('list')

  return (
    <div className="App mt-5">
        <header className="App-header">
            <h1>Shop Cook Eat!</h1>
            <h2>Shopping List</h2>
            <button onClick={() => setOpenAdd(true)}><AddIcon /></button>
        </header>

        <div className="container mt-4 px-5">

            {/*<div className="row">*/}
            {/*    <div className="col-md-8 offset-md-2 row justify-content-center add">*/}
            {/*        <div className="col-auto">*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                className="form-control"*/}
            {/*                value={title}*/}
            {/*                placeholder={"Item Name"}*/}
            {/*                onChange={e => setTitle(e.target.value)}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="col-auto">*/}
            {/*            <button*/}
            {/*                type="submit"*/}
            {/*                className="btn btn-primary"*/}
            {/*                disabled={title === ''}*/}
            {/*                onClick={() => {*/}
            {/*                    addItem(title).then(() => {*/}
            {/*                        setTitle('')*/}
            {/*                        setNonce(nonce + 1)*/}
            {/*                    })*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                Add*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="tab-content mt-4" id="myTabContent">
                {tab === 'list' && (
                    <div className="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
                        <Shelf nonce={nonce} setNonce={setNonce} />
                        HELLO
                    </div>
                )}
                {tab === 'fridge' && (
                    <div className="tab-pane fade show active" id="fridge" role="tabpanel" aria-labelledby="fridge-tab">
                        Hello2
                        <Shelf nonce={nonce} setNonce={setNonce} archive />
                    </div>
                )}
            </div>
        </div>

        <footer class="footer">
            <nav>
                <div id="buttonGroup" class="nav btn-group selectors" role="tablist">
                    <button id="list"
                            // type="button"
                            class={`btn btn-secondary ${tab === 'list' ? 'button-active' : 'button-inactive'}`}
                            onClick={() => setTab('list')}
                    >
                       <div class="selector-holder">
                          <ListAltIcon />
                          <span>List</span>
                       </div>
                    </button>
                    <button id="fridge"
                            // type="button"
                            class={`btn btn-secondary ${tab === 'fridge' ? 'button-active' : 'button-inactive'}`}
                            onClick={() => setTab('fridge')}
                    >
                       <div class="selector-holder">
                          <KitchenIcon />
                          <span>Fridge</span>
                       </div>
                    </button>
                </div>
            </nav>
      </footer>

    </div>
  );
}

export default App;
