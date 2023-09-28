import React, { useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    favourites_count,
    favourite_id,
    title,
    sub_title,
    topic,
    location,
    content,
    inspiration,
    source,
    containers,
    image,
    updated_at,
    created_at,
    postPage,
    setPosts,
    post_category
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [containerNames, setContainerNames] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    history.push(`/post/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/post/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleFavourite = async () => {
    try {
      const { data } = await axiosRes.post("/favourites/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, favourites_count: post.favourites_count + 1, favourite_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnFavourite = async () => {
    try {
      await axiosRes.delete(`/favourites/${favourite_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, favourites_count: post.favourites_count - 1, favourite_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    // Fetch container names based on the container IDs
    const fetchContainerNames = async () => {
      try {
        const containerNamePromises = containers.map(async (containerId) => {
          const response = await axiosRes.get(`/container/${containerId}/`);
          return response.data.container_name;
        });

        const containerNameResults = await Promise.all(containerNamePromises);
        setContainerNames(containerNameResults);
      } catch (err) {
        // Handle errors if necessary
        console.error(err);
      }
    };

    // Call the function to fetch container names
    fetchContainerNames();
  }, [containers]);

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profile/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}            
          </Link>
          <div>
              <span>Created:{created_at}</span>
              <span>Updated:{updated_at}</span>
            </div>
          <div className="d-flex align-items-center">
            
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/post/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
      {title && <Card.Title className="text-center">{title}</Card.Title>}
    {sub_title && <div><strong>Sub Title:</strong> {sub_title}</div>}
    {topic && <div><strong>Topic:</strong> {topic}</div>}
    {location && <div><strong>Location:</strong> {location}</div>}
    {content && <div><strong>Content:</strong> {content}</div>}
    {inspiration && <div><strong>Inspiration:</strong> {inspiration}</div>}
    {source && <div><strong>Source:</strong> {source}</div>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}

          {favourite_id ? (
            <span onClick={handleUnFavourite}>
              <i className={`fas fa-star ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleFavourite}>
              <i className={`far fa-star ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to favourite posts!</Tooltip>}
            >
              <i className="far fa-star" />
            </OverlayTrigger>
          )}
          {favourites_count}

          <Link to={`/post/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Containers
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Containers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {containerNames.map((containerName, index) => (
                <li
                  key={containers[index]}
                  onClick={() => {
                    // Handle the click action here (e.g., navigate to container)
                    history.push(`/container/${containers[index]}`);
                    setShowModal(false); // Close the modal
                  }}
                >
                  <i className="fas fa-box-open"></i> {containerName}
                </li>
              ))}
            </ul>
          </Modal.Body>
        </Modal>
      </Card.Footer>
    </Card>
  );
};

export default Post;
