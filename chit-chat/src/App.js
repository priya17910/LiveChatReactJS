import './App.css';
import socketIO from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Join from './component/Join/Join.js';
import Chat from './component/Chat/Chat';


// const ENDPOINT = 'http://localhost:4000';
// const socket = socketIO(ENDPOINT, {
//   transports: [
//     'websocket'
//   ]
// });


function App() {

    // socket.on("connect", () => {

    // });

    return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path="/" element={<Join />} />
                <Route path="/chat/:value" element={<Chat />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
