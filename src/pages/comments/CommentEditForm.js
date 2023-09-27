import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
  const { id, content, title, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);
  const [formTitle, setFormTitle] = useState(title);

  const handleChangeContent = (event) => {
    setFormContent(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setFormTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        title: formTitle.trim(),
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                title: formTitle.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          className={styles.Form}
          type="text"
          value={formTitle}
          onChange={handleChangeTitle}
          placeholder="Edit your comment title..."
        />
      </Form.Group>
      <Form.Group className="pr-1">
        <Form.Label>Content</Form.Label>
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChangeContent}
          rows={4}
          placeholder="Edit your comment content..."
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
