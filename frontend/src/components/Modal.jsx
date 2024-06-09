const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-grey-900 opacity-95">
            <div className="absolute top-[30%] right-[40%] bg-light-white p-4 rounded-lg z-10 text-right">
              <button
                className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2"
                onClick={onClose}
              >
                X
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
