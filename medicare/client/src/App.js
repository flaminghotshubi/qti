import './App.css';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Viewer from './components/PDFViewer';
import PDFParserReact from './components/Upload';

function App() {
  return (
    <>
      <Navbar />
      <Viewer />
    </>
  );
}

export default App;
