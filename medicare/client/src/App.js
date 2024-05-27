import './App.css';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Viewer from './components/PDFViewer';
import Uploads from './components/Uploads';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <>
      {/* <h1>Hello Clerk!</h1>
      <SignedIn>
        <UserButton afterSignOutUrl={window.location.href} />
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal' />
      </SignedOut> */}
      <Navbar />
      {/* <Viewer /> */}
      <Uploads />
    </>
  );
}

export default App;
