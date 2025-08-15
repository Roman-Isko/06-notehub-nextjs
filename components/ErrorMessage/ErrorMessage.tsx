// import css from "./ErrorMessage.module.css";

// interface ErrorMessageProps {
//   children: React.ReactNode;
// }

// export default function ErrorMessage({ children }: ErrorMessageProps) {
//   return <div className={css.error}>{children}</div>;
// }

// components/ErrorMessage/ErrorMessage.tsx
import css from "./ErrorMessage.module.css";

export interface ErrorMessageProps {
  message?: string;
  children?: React.ReactNode;
}

export default function ErrorMessage({ message, children }: ErrorMessageProps) {
  if (!message && !children) return null;
  return <div className={css.error}>{message || children}</div>;
}

//////////

// components/ErrorMessage/ErrorMessage.tsx
// import { ErrorMessage as FormikErrorMessage } from "formik";
// import css from "./ErrorMessage.module.css";

// interface ErrorMessageProps {
//   name: string; // ім'я поля форми
// }

// export function ErrorMessage({ name }: ErrorMessageProps) {
//   return (
//     <FormikErrorMessage name={name} component="div" className={css.error} />
//   );
// }

//////////

// import css from "./ErrorMessage.module.css";

// interface ErrorMessageProps {
//   message: string;
// }

// export default function ErrorMessage({ message }: ErrorMessageProps) {
//   return <div className={css.error}>{message}</div>;
// }

///

// export default function ErrorMessage() {
//   return <p className={css.error}>Oops! Something went wrong.</p>;
// }

///

/////

// import { ErrorMessage as FormikErrorMessage } from "formik";
// import css from "./ErrorMessage.module.css";

// interface ErrorMessageProps {
//   name: string; // ім’я поля форми
// }

// export default function ErrorMessage({ name }: ErrorMessageProps) {
//   return (
//     <FormikErrorMessage name={name} component="div" className="text-red-500" />
//   );
// }

//////
