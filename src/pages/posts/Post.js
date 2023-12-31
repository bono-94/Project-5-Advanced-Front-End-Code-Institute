import React, { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";

import Badge from 'react-bootstrap/Badge';
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Post.module.css";


const Post = (props) => {

  const {
    id,
    owner,
    profile_id,
    profile_image,
    containers_count,
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
  const [showFullContent, setShowFullContent] = useState(false);
  const visibleContainersCount = containerNames.length;

  const handleEdit = () => {
    history.push(`/knowledge/${id}/edit`);
    window.scrollTo(0, 0);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/post/${id}/`);
      history.push("/", { successMessage: "Successfully deleted your post!" });
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchContainerNames = async () => {
      try {
        const containerNamePromises = containers.map(async (containerId) => {
          const response = await axiosRes.get(`/container/${containerId}/`);
          const containerData = response.data;
  
          if (containerData.is_public || (!containerData.is_public && containerData.is_owner)) {
            return containerData.container_name;
          }
          return null;
        });
  
        const containerNameResults = await Promise.all(containerNamePromises);
  
        const filteredContainerNames = containerNameResults.filter(name => name !== null);
  
        setContainerNames(filteredContainerNames);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchContainerNames();
  }, [containers]);
  
  return (
    <Card className={styles.Post}>
      <Card.Body className={styles.PostBody}>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profile/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}            
          </Link>
          
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
      <Link to={`/knowledge/${id}`} className="mt-0">
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body className="p-4">
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {sub_title && <div className="text-center mb-3">{sub_title}</div>}
        {topic && (
        <div>
          <strong>Topic:</strong>{" "}
          <Badge className={styles.Badge} variant="dark">
            <span>{topic}</span>
          </Badge>
        </div>
        )}
        {post_category && <div><strong>Post Category:</strong> {post_category}</div>} 
        {location && <div><strong>Location:</strong> {location}</div>}
        <div className="w-100">
          <span className={styles.Date}><strong>Created:</strong> <span>{created_at}</span></span>
        </div>
        <div className="w-100">
          <span className={styles.Date}><strong>Updated:</strong> <span>{updated_at}</span></span>
        </div>
        <hr></hr>
        <div className={styles.ButtonReadMore}>
          {showFullContent ? (
            <div><strong>Content:</strong> <span>{content}</span></div>
          ) : (
            <div><strong>Content:</strong> <span>{content.slice(0, 0)}</span>
            ...
            </div>
          )}
          <button className="mt-2" onClick={() => setShowFullContent(!showFullContent)}>
            {showFullContent ? "Collapse" : "Read more"}
          </button>
        </div>
        <hr></hr>
        {inspiration && <div><strong>Inspiration:</strong> {inspiration}</div>}
        {source && <div><strong>Source:</strong> {source}</div>}
      </Card.Body>
      <Card.Footer className={styles.PostCardFooter}>
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
            <Link to={`/knowledge/${id}`}>
              <i className="far fa-comments" />
              {comments_count}
            </Link>
            <Link to="#" onClick={() => setShowModal(true)}>
              <i className="fas fa-cubes" />
              {visibleContainersCount}
            </Link>
          </div>
      </Card.Footer>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Containers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className={styles.UnstyledList}>
            {containerNames.map((containerName, index) => (
              <li
                key={containers[index]}
                onClick={() => {
                
                  history.push(`/container/${containers[index]}`);
                  setShowModal(false);
                }}
              >
                <i className={`fas fa-box ${styles.HoverBox}`}></i>
                <i className={`fas fa-box-open ${styles.HoverBoxOpen}`}></i>
                {containerName}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default Post;
