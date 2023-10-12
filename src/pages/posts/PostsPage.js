import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

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
    <div className={styles.ScrollableContainer} fluid>
      <Container className={styles.PostsPage} fluid>
          <Row fluid>
            <Col><Sidebar /></Col>
            <Col xs={9}>
            <Row className="h-100">
              <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <div className="mt-3">
                  <Row>
                    <Col lg={1}>
                    <i
                      className={`fas fa-sort ${styles.SortIcon}`}
                      onClick={() => setShowSortingOptions(!showSortingOptions)} // Toggle dropdown visibility
                    />
                    </Col>
                    <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} sm={4} lg={8}>
                      <i className={`fas fa-search ${styles.SearchIcon}`} />
                      <Form
                        className={styles.SearchBar}
                        onSubmit={(event) => event.preventDefault()}
                      >
                        <Form.Control
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          type="text"
                          className="mr-sm-2"
                          placeholder="Search posts..."
                        />
                      </Form>
                    </Col>
                  </Row>
                </div>
                {/* End of search bar */}
                {/* Sorting options */}
                <div className="mt-3">
                  <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} lg={8}>
                    {/* Dropdown for sorting options */}
                    {showSortingOptions && (
                      <ListGroup className={styles.SortingDropdown}>
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
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
            </Col>
          </Row>
        </Container>
    </div>
  );
}

export default PostsPage;