import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createNote } from "../../lib/api";
import type { CreateNoteData } from "../../lib/api";

import css from "./NoteForm.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(tags).required("Required"),
});

interface NoteFormProps {
  onCancel: () => void;
}

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Note created!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
    onError: () => toast.error("Failed to create note"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        mutation.mutate(values);
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <label>
            Title
            <Field name="title" className={css.input} />
            {errors.title && touched.title && (
              <div className={css.error}>{errors.title}</div>
            )}
          </label>

          <label>
            Content
            <Field name="content" as="textarea" className={css.textarea} />
            {errors.content && touched.content && (
              <div className={css.error}>{errors.content}</div>
            )}
          </label>

          <label>
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
            <button type="button" onClick={onCancel} className={css.cancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
