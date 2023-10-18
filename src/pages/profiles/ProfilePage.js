import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Badge from 'react-bootstrap/Badge';

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  window.scrollTo(0, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profile/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left mt-2 mb-5 mt-lg-0">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6} className="mt-lg-0">
          <h3 className="m-2">{profile?.owner}</h3>
          {profile?.first_name !== null && profile?.first_name !== undefined && profile?.first_name !== "null" && (
            <div className="mb-4">
              ({profile?.first_name})
            </div>
          )}
          <hr></hr>
          <Row className="justify-content-center no-gutters mb-4 mb-2">
            <Col xs={4} sm={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={4} sm={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={4} sm={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
            <Col xs={4} sm={3} className="my-2">
              <div>{profile?.containers_count}</div>
              <div>containers</div>
            </Col>
          </Row>
          <hr></hr>
          {profile?.profile_quote !== null && profile?.profile_quote !== undefined && profile?.profile_quote !== "null" && (
            <div className="mb-4 font-italic">
              {profile?.profile_quote}
            </div>
          )}
          
          {profile?.location !== null && profile?.location !== undefined && profile?.location !== "null" && (
            <div className="mb-2 text-left">
              <strong>Location: </strong> {profile?.location}
            </div>
          )}
          {profile?.age && <div className="mb-2 text-left"><strong>Age: </strong> {profile?.age}</div>}
          {console.log("Bio Value:", profile?.bio)}
          {profile?.bio !== null && profile?.bio !== undefined && profile?.bio !== "null" && (
            <div className="mb-2 mt-4 text-left">
              <strong>Bio: </strong>{profile?.bio}
            </div>
          )}
          {profile?.website && (
            <div className="mb-4 mt-4 ">
              <strong>Website: </strong>{" "}
              <a href={profile?.website} target="_blank" rel="noopener noreferrer">
                {profile?.website}
              </a>
            </div>
          )}
          </Col>
          <Col lg={3} className="text-lg-right">
            {currentUser &&
              !is_owner &&
              (profile?.following_id ? (
                <Button
                  className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                  onClick={() => handleUnfollow(profile)}
                >
                  unfollow
                </Button>
              ) : (
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Black}`}
                  onClick={() => handleFollow(profile)}
                >
                  follow
                </Button>
              ))}
          </Col>
          {profile?.content && <Col className="p-3 p-md-5">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <h4 className="text-center pt-3 pb-4 pb-lg-5">{profile?.owner}'s posts</h4>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row fluid className="mt-lg-4 mb-5 justify-content-between">
      <Col className="py-0 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={`pt-1 mt-4 mt-lg-0 ${appStyles.Content}`}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} xl={3} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
