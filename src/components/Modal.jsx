import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, title, children, actions }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h2>{title}</h2>
      {open ? children : null}
      <form method="dialog" className="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.body
  );
}
