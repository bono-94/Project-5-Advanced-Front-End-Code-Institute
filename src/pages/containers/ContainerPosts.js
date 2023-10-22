import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/Container.module.css";


function ContainerPosts () {

  const { id } = useParams();
  const [posts, setPosts] = useState({ results: [] });
  const currentUser = useCurrentUser();

  window.scrollTo(0, 0);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: container }, { data: posts }] = await Promise.all([
          axiosReq.get(`/container/${id}`),
          axiosReq.get(`/posts/?containers=${id}`),
        ]);
        setPosts(posts);
      } catch (err) {
        console.error(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row fluid >
      <Container className={`border-0 ${appStyles.Content}`}>
        {posts.results.length ? (
          <div className="mb-3">
            <h4>
            {posts.results.length}{" "}
            {posts.results.length === 1 ? "Post" : "Posts"}
            </h4>              
          </div>
        ) : null}
        {posts.results.length ? (
          <ul>
          {posts.results.map((post) => (
            <li key={post.id} className={styles.ContainerPost}>
              <strong className="text-break">{post.title}</strong> by {post.owner}
            </li>
          ))}
          </ul>
        ) : (
          <div>
            <div>
              <span>No posts yet. Please create knowledge and append it to this container!</span>
            </div>
            <div className="mt-3">
              <span>Alternatively, send us a support request if you already created knowledge.</span>
            </div>
          </div>                  
        )}
      </Container>
    </Row>
  );
}

export default ContainerPosts;
