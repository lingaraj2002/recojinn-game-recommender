const StorePopup = ({ stores, onClose }) => {
  if (!stores || stores.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 text-white w-[90%] max-w-md rounded-xl p-5 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">Choose Store</h2>

        {/* Store List */}
        <div className="flex flex-col gap-3">
          {stores.map(
            (store, i) =>
              store.url && (
                <button
                  key={i}
                  onClick={() => {
                    if (store.url) {
                      window.open(store.url, "_blank");
                    }
                  }}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-left"
                >
                  🛒 {store.name}
                </button>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePopup;
