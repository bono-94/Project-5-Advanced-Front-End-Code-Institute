import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal"; 

import Post from "./Post";
import Asset from "../../components/Asset";
import Sidebar from '../../components/Sidebar';

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const sortingOptions = [
  { field: "title", label: "Sort by Title (Ascending)" },
  { field: "-title", label: "Sort by Title (Descending)" },
  { field: "topic", label: "Sort by Topic (Ascending)" },
  { field: "-topic", label: "Sort by Topic (Descending)" },
  { field: "post_category", label: "Sort by Post Category (Ascending)" },
  { field: "-post_category", label: "Sort by Post Category (Descending)" },
  { field: "favourites_count", label: "Sort by Favorites Count (Ascending)" },
  { field: "-favourites_count", label: "Sort by Favorites Count (Descending)" },
  { field: "likes_count", label: "Sort by Likes Count (Ascending)" },
  { field: "-likes_count", label: "Sort by Likes Count (Descending)" },
  { field: "comments_count", label: "Sort by Comments Count (Ascending)" },
  { field: "-comments_count", label: "Sort by Comments Count (Descending)" },
  { field: "containers_count", label: "Sort by Containers Count (Ascending)" },
  { field: "-containers_count", label: "Sort by Containers Count (Descending)" },
  { field: "created_at", label: "Sort by Date Posted (Ascending)" },
  { field: "-created_at", label: "Sort by Date Posted (Descending)" },
  { field: "updated_at", label: "Sort by Last Updated (Ascending)" },
  { field: "-updated_at", label: "Sort by Date Updated (Descending)" },
];

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [ordering, setOrdering] = useState(""); 
  const { pathname } = useLocation();
  const [showSortingOptions, setShowSortingOptions] = useState(false);
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  window.scrollTo(0, 0);
  
  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        console.log("ordering:", ordering);
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}&ordering=${ordering}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, ordering, pathname, currentUser]);

  return (
    <div className={`p-0 ${styles.ScrollableContainer}`} fluid>
      <Container className={`p-0 ${styles.PostsPage}`} fluid>
        <Row fluid>
          <Col lg={3} xl={3} className="d-none d-lg-block ps-0 ms-0">
            <Sidebar />
          </Col>
          <Col lg={9} xl={9} xxl={10}>
            <Row fluid className="justify-content-between">
              <div className={`p-0 ${styles.TopNav}`}>
                <button
                  className={`d-lg-none p-0 ${styles.SortIcon} ${styles.MobileNavIcon}`}
                  onClick={handleShowModal}
                >
                  <i className="fas fa-compass fa-3x me-1" />
                </button>
              </div>
              <Col className="ps-1" lg={8}>
                <div className="ms-sm-0 me-sm-0">
                  <PopularProfiles mobile />
                </div>
                <div className={`mt-3 ${styles.SearchBarContainer}`}>
                  <Row fluid className={styles.SortRow}>
                    <h4 className="mt-3 pt-1">Knowl3dg3 Posts</h4>
                    <i
                      className={`fas fa-sort mt-3 ${styles.SortIcon}`}
                      onClick={() => setShowSortingOptions(!showSortingOptions)}
                    />
                  </Row>
                  <Row className={styles.SearchRow} fluid>
                    <Col className="p-0">
                    
                      {/* sm=4 */}
                      <i className={`fas fa-search ${styles.SearchIcon}`} />
                      <Form
                        className={styles.SearchBar}
                        onSubmit={(event) => event.preventDefault()}
                      >
                        <Form.Control
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          type="text"
                          // className="mr-sm-2"
                          placeholder="Search posts..."
                        />
                      </Form>
                    </Col>
                  </Row>
                </div>
                {/* End of search bar */}
                {/* Sorting options */}
                <div>
                  <Col className={`py-2 p-0 p-lg-1 ${styles.ContainerList}`} lg={8}>
                    {/* Dropdown for sorting options */}
                    {showSortingOptions && (
                      <ListGroup className={`bg-dark ${styles.SortingDropdown}`}>
                        {sortingOptions.map((option) => (
                          <ListGroup.Item
                            key={option.field}
                            className={ordering === option.field ? styles.ActiveSortOption : styles.SortOption}
                            onClick={() => {
                              setOrdering(ordering === option.field ? `-${option.field}` : option.field); // Toggle sorting order
                              setShowSortingOptions(false); // Close dropdown
                            }}
                          >
                            <i className={`fas fa-sort-${ordering === option.field ? 'down' : 'up'}`} />
                            {option.label}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                    {/* End of dropdown */}
                  </Col>
                </div>
                {/* End of sorting options */}
                {hasLoaded ? (
                  <>
                    {posts.results.length ? (
                      <InfiniteScroll
                        children={posts.results.map((post) => (
                          <Post key={post.id} {...post} setPosts={setPosts} />
                        ))}
                        dataLength={posts.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!posts.next}
                        next={() => fetchMoreData(posts, setPosts)}
                        className={styles.InfinitePosts}
                      />
                    ) : (
                      <Container className={appStyles.Content}>
                        <Asset src={NoResults} message={message} />
                      </Container>
                    )}
                  </>
                ) : (
                  <Container className={appStyles.Content}>
                    <Asset spinner />
                  </Container>
                )}
              </Col>
              <Col lg={4} className="d-none d-lg-block mt-lg-4">
                <PopularProfiles />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {/* Modal for Mobile Navigation */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Explore Content</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
        <Sidebar />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PostsPage;