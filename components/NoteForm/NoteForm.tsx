// "use client";

// import {
//   Formik,
//   Form,
//   Field,
//   ErrorMessage as FormikErrorMessage,
// } from "formik";
// import * as Yup from "yup";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createNote } from "../../lib/api";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import { Note } from "../../types/note";
// import css from "./NoteForm.module.css";

// interface NoteFormProps {
//   onClose: () => void;
//   onCancel?: () => void; // тепер є опційно
// }

// export default function NoteForm({ onClose, onCancel }: NoteFormProps) {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       onClose();
//     },
//   });

//   return (
//     <Formik
//       initialValues={{ title: "", content: "", tag: "" }}
//       validationSchema={Yup.object({
//         title: Yup.string().required("Title is required"),
//         content: Yup.string().required("Content is required"),
//         tag: Yup.string().required("Tag is required"),
//       })}
//       onSubmit={(values: Omit<Note, "id">) => mutation.mutate(values)}
//     >
//       {() => (
//         <Form className={css.form}>
//           <label htmlFor="title">Title</label>
//           <Field id="title" name="title" />
//           <FormikErrorMessage name="title">
//             {(msg) => <ErrorMessage>{msg}</ErrorMessage>}
//           </FormikErrorMessage>

//           <label htmlFor="content">Content</label>
//           <Field id="content" name="content" as="textarea" />
//           <FormikErrorMessage name="content">
//             {(msg) => <ErrorMessage>{msg}</ErrorMessage>}
//           </FormikErrorMessage>

//           <label htmlFor="tag">Tag</label>
//           <Field id="tag" name="tag" />
//           <FormikErrorMessage name="tag">
//             {(msg) => <ErrorMessage>{msg}</ErrorMessage>}
//           </FormikErrorMessage>

//           <div className={css.buttons}>
//             <button type="submit">Save</button>
//             <button type="button" onClick={onCancel || onClose}>
//               Cancel
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }

"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createNote } from "../../lib/api";
// import { Note } from "../../types/note";
import css from "./NoteForm.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

interface NoteFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: (typeof tags)[number];
}

const initialValues: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().max(500, "Max 500 characters"),
  tag: Yup.mixed<(typeof tags)[number]>()
    .oneOf(tags)
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Note created!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError: () => toast.error("Failed to create note"),
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    mutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Title
            <Field name="title" className={css.input} />
            {errors.title && touched.title && (
              <div className={css.error}>{errors.title}</div>
            )}
          </label>

          <label className={css.label}>
            Content
            <Field name="content" as="textarea" className={css.textarea} />
            {errors.content && touched.content && (
              <div className={css.error}>{errors.content}</div>
            )}
          </label>

          <label className={css.label}>
            Tag
            <Field name="tag" as="select" className={css.select}>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            {errors.tag && touched.tag && (
              <div className={css.error}>{errors.tag}</div>
            )}
          </label>

          <div className={css.actions}>
            <button type="submit" className={css.button}>
              Create note
            </button>
            <button type="button" onClick={onClose} className={css.cancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// import { createNote } from "../../lib/api";
// import type { CreateNoteData } from "../../lib/api";

// import css from "./NoteForm.module.css";

// const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

// const validationSchema = Yup.object({
//   title: Yup.string().required("Required"),
//   content: Yup.string().max(500),
//   tag: Yup.string().oneOf(tags).required("Required"),
// });

// interface NoteFormProps {
//   onCancel: () => void;
// }

// const initialValues: CreateNoteData = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// export default function NoteForm({ onCancel }: NoteFormProps) {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       toast.success("Note created!");
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       onCancel();
//     },
//     onError: () => toast.error("Failed to create note"),
//   });

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values, actions) => {
//         mutation.mutate(values);
//         actions.resetForm();
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form className={css.form}>
//           <label>
//             Title
//             <Field name="title" className={css.input} />
//             {errors.title && touched.title && (
//               <div className={css.error}>{errors.title}</div>
//             )}
//           </label>

//           <label>
//             Content
//             <Field name="content" as="textarea" className={css.textarea} />
//             {errors.content && touched.content && (
//               <div className={css.error}>{errors.content}</div>
//             )}
//           </label>

//           <label>
//             Tag
//             <Field name="tag" as="select" className={css.select}>
//               {tags.map((tag) => (
//                 <option key={tag} value={tag}>
//                   {tag}
//                 </option>
//               ))}
//             </Field>
//             {errors.tag && touched.tag && (
//               <div className={css.error}>{errors.tag}</div>
//             )}
//           </label>

//           <div className={css.actions}>
//             <button type="submit" className={css.button}>
//               Create note
//             </button>
//             <button type="button" onClick={onCancel} className={css.cancel}>
//               Cancel
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }
