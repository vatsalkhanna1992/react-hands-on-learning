export const DialogModal = ({dialogRef}) => {

  function closeModal() {
    const dialog = dialogRef.current

    if (dialog == null) return
    dialog.close()
  }

  function closeModalThroughKey(e) {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  return (
    <dialog ref={dialogRef} onKeyDown={closeModalThroughKey}>
      <p>This is a <strong>DIALOG</strong> modal</p>
      <button onClick={closeModal}>Close</button>
    </dialog>
  )
}
