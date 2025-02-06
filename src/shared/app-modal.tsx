import React, { Dispatch, SetStateAction } from 'react';

interface ModalProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDialogElement>> {
  open: boolean;
  children: React.ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  contentBoxStyles?: React.CSSProperties;
}

const AppModal: React.FC<ModalProps> = ({
  open,
  children,
  setOpen,
  contentBoxStyles,
}) => {
  const handleClose = () => setOpen(false);

  if (!open) return null;
  return (
    <dialog className="fixed inset-0 z-[100000] border border-primary flex items-center justify-center m-auto" open={open}>
      <div
        className="fixed inset-0 z-100 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-md p-4 w-1/2 max-w-lg"
          style={contentBoxStyles}
          onClick={e => e.stopPropagation()}
        >
          <div className="my-6 md:px-6 px-1">{children}</div>
        </div>
      </div>
    </dialog>
  );
};

export default AppModal;