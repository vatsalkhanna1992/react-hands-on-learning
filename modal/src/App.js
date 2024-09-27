import './App.css';
import { useState, useRef } from "react";
import { CustomModal } from './components/CustomModal';
import { DialogModal } from './components/DialogModal';
import './styles.css';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null)

  const openCustomModal = () => {
    setIsOpen(true)
  }

  const openDialogModal = () => {
    const dialog = dialogRef.current

    if (dialog == null) return
    dialog.showModal()
  }

  return (
    <div className="App">
      <button onClick={openCustomModal}>Custom Modal</button>
      <button onClick={openDialogModal}>Dialog Modal</button>


      <DialogModal dialogRef={dialogRef} />
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;
