import './App.css';
import ShoppingList from "./ShoppingList";
import {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FridgeList from "./FridgeList";

function App() {
    const [nonce, setNonce] = useState(0)
    const [tab, setTab] = useState('list')
    const [itemToMove, setItemToMove] = useState(new Map())

  return (
    <div className="App mt-5">
        <header className="App-header">
            <h1>Shop Cook Eat!</h1>
        </header>

        <div className="container px-5">
            <div className="tab-content mt-4" id="myTabContent">
                {tab === 'list' && (
                    <div className="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
                        <ShoppingList nonce={nonce}
                                      setNonce={setNonce}
                                      itemToMove={itemToMove}
                                      setItemToMove={setItemToMove}
                        />
                    </div>
                )}
                {tab === 'fridge' && (
                    <div className="tab-pane fade show active" id="fridge" role="tabpanel" aria-labelledby="fridge-tab">
                        <FridgeList nonce={nonce} setNonce={setNonce} />
                    </div>
                )}
            </div>
        </div>

        <footer className="footer">
            <nav>
                <div id="buttonGroup" className="nav btn-group selectors" role="tablist">
                    <button id="list"
                            type="button"
                            className={`btn btn-success ${tab === 'list' ? 'button-active' : 'button-inactive'}`}
                            onClick={() => setTab('list')}
                    >
                       <div className="selector-holder">
                          <ListAltIcon />
                          <span>List</span>
                       </div>
                    </button>
                    <button id="fridge"
                            type="button"
                            className={`btn btn-secondary ${tab === 'fridge' ? 'button-active' : 'button-inactive'}`}
                            onClick={() => setTab('fridge')}
                    >
                       <div className="selector-holder">
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
