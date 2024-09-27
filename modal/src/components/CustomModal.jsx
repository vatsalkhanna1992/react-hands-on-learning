export const CustomModal = ({isOpen, setIsOpen}) => {

  function closeModal() {
    setIsOpen(false)
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal()
  })

  return (
    <div className={`modal-overlay ${isOpen && "show"}`}>
      <div className="modal">
        <p>This is a <strong>CUSTOM</strong> modal</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  )
}
