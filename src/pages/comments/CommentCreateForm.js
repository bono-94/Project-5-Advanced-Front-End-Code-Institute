import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setPost, setComments, owner, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null); // State to handle errors

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        title,
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setTitle("");
      setContent("");
    } catch (err) {
      setError("An error occurred while posting your comment.");
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} sm={5} lg={2}>
          {/* Avatar column */}
          <Link to={`/profile/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <p>{owner}</p>
        </Col>
        <Col xs={12} sm={9}>
          {/* Title and content column */}
          <Form.Group>
            <Form.Control
              className={styles.Form}
              type="text"
              placeholder="Comment title"
              value={title}
              onChange={handleChangeTitle}
            />
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <Form.Control
                className={styles.Form}
                placeholder="Share your opinion here..."
                as="textarea"
                value={content}
                onChange={handleChange}
                rows={2}
              />
            </InputGroup>
          </Form.Group>
          <button
            className={`${styles.Button} btn d-block ml-auto`}
            disabled={!content.trim()}
            type="submit"
          >
            Post
          </button>
        </Col>
      </Row>
    </Form>
  );
}

export default CommentCreateForm;
