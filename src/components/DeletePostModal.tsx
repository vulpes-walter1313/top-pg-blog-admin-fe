type DeletePostModalProps = {
  deletePostFunc: () => void;
  postTitle: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
function DeletePostModal({
  deletePostFunc,
  postTitle,
  show,
  setShow,
}: DeletePostModalProps) {
  if (show) {
    return (
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-slate-800/40">
        <div className="flex w-full max-w-md flex-col gap-6 rounded-lg border border-slate-300 bg-white p-4">
          <h2 className="text-mobh6 lg:text-deskh6">
            Do you really want to delete {postTitle}?
          </h2>
          <div className="flex w-full items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="rounded-lg border-2 border-indigo-600 px-6 py-2 font-semibold text-indigo-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => deletePostFunc()}
              className="rounded-lg border-2 border-red-600 bg-red-600 px-6 py-2 font-semibold text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default DeletePostModal;
