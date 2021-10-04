import logo from './logo.svg';
import './App.css';
import Shelf from "./Shelf";
import {useState} from "react";
import {addItem} from "./api";

function App() {
    const [title, setTitle] = useState('')
    const [nonce, setNonce] = useState(0)

  return (
    <div className="App mt-5">
        <header className="App-header">
            <h1>Shelf</h1>
        </header>

        <div className="container mt-4 px-5">

            <div className="row">
                <div className="col-md-8 offset-md-2 row justify-content-center add">
                    <div className="col-auto">
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            placeholder={"Item Name"}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={title === ''}
                            onClick={() => {
                                addItem(title).then(() => {
                                    setTitle('')
                                    setNonce(nonce + 1)
                                })
                            }}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <ul className="nav nav-tabs nav-fill mt-4 col-md-8" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                            type="button" role="tab" aria-controls="home" aria-selected="true">
                        List
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                            type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Archive
                    </button>
                </li>
            </ul>

            <div className="tab-content mt-4" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <Shelf nonce={nonce} setNonce={setNonce} />
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <Shelf nonce={nonce} setNonce={setNonce} archive />
                </div>
            </div>
        </div>

    </div>
  );
}

export default App;
