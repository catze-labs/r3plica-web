import clsx from "clsx";
import { ComponentProps, ComponentPropsWithRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export interface ModalProps
  extends Omit<ComponentPropsWithRef<"div">, "title"> {
  open?: boolean;
  title?: React.ReactNode;
  onClose?: () => void;
}

const FixedBackground = () => (
  <div className="fixed top-0 left-0 bottom-0 right-0 bg-black-dark opacity-80 z-30"></div>
);

const CloseButton: React.FC<ComponentProps<"button">> = ({
  className,
  ...props
}) => (
  <button
    className={clsx([
      "absolute top-4 right-4 w-8 h-8 flex justify-center items-center bg-gray-light",
      className,
    ])}
    {...props}
  >
    <XMarkIcon className="text-yellow" />
  </button>
);

const Modal: React.FC<ModalProps> = ({
  open = true,
  title = "",
  children,
  className,
  onClose,
  ...props
}) => {
  return (
    <div className={clsx([open ? "block" : "hidden"])}>
      <FixedBackground />
      <div
        {...props}
        className={clsx([
          "fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4",
          className,
        ])}
      >
        <div className="bg-gray-dark px-5 max-w-[100%] sm:px-10 pt-14 pb-7 rounded-lg flex flex-col gap-8 relative">
          <CloseButton onClick={() => onClose?.()} />
          <h2 className="text-2xl font-bold min-w-[320px] text-center text-yellow">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
