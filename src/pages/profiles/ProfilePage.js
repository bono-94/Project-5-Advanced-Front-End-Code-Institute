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
      <div className="text-right">
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      </div>
      
      <Row noGutters className="px-4 text-center">
      <Col lg={3} className={`text-lg-left ${profile?.is_owner ? "mb-5 mt-lg-0" : "mb-5 mt-5"}  d-flex justify-content-center `}>
          <Image
            className={`${styles.ProfileImage}`}
            roundedCircle
            src={profile?.image}
          />
        </Col>

        
        
        <Col lg={9} className="mt-lg-0">
          <h3 className="m-2 mt-0">{profile?.owner}</h3>
          {profile?.first_name !== null && profile?.first_name !== undefined && profile?.first_name !== "null" && (
            <div className="text-break mb-xl-4 mb-xxl-5">
              ({profile?.first_name})
            </div>
          )}
          
          <div className="d-block d-sm-none mt-4">
            <Row className="justify-content-center no-gutters mb-4 mb-2">
            
              <Col xs={6} sm={3} className="my-2">
                <div><strong>{profile?.following_count}</strong></div>
                <div className="text-white me-2">following</div>
              </Col>
              <Col xs={6} sm={3} className="my-2">
                <div><strong>{profile?.posts_count}</strong></div>
                <div className="text-white me-2">knowl3dg3</div>
              </Col>
              
              <Col xs={6} sm={3} className="my-2">
                <div><strong>{profile?.followers_count}</strong></div>
                <div className="text-white me-2">followers</div>
              </Col>
              
              <Col xs={6} sm={3} className="my-2">
                <div><strong>{profile?.containers_count}</strong></div>
                <div className="text-white me-2">containers</div>
              </Col>
            </Row>
          </div>
            <div className="d-none d-sm-block mt-4">
            <Row className="justify-content-center no-gutters mb-4 mb-2">
  
              <Col xs={6} sm={3} className="my-2">
                <div><strong>{profile?.following_count}</strong></div>
                <div className="text-white me-2">following</div>
              </Col>
              <Col xs={6} sm={3} className="my-2">
                <div><strong>{profile?.followers_count}</strong></div>
                <div className="text-white me-2">followers</div>
              </Col>
              <Col xs={6} sm={3} className="my-2">
                <div><strong>{profile?.posts_count}</strong></div>
                <div className="text-white me-2">knowl3dg3</div>
              </Col>
              
              <Col xs={6} sm={3} className="my-2">
                <div><strong>{profile?.containers_count}</strong></div>
                <div className="text-white me-2">containers</div>
              </Col>
            
            </Row>
          </div>
            
          
          {profile?.profile_quote !== null && profile?.profile_quote !== undefined && profile?.profile_quote !== "null" && (
            <div className="mb-4 font-italic">
              <hr className="mb-sm-4"></hr>
              {profile?.profile_quote}
              <hr className="mt-sm-4"></hr>
            </div>
          )}
          
          {profile?.location !== null && profile?.location !== undefined && profile?.location !== "null" && (
            <div className="mb-2 text-left">
              <strong className=" text-white">Location: </strong> {profile?.location}
            </div>
          )}
          {profile?.age && <div className="mb-2 text-left"><strong className="text-white">Age: </strong> {profile?.age}</div>}
          {console.log("Bio Value:", profile?.bio)}
          {profile?.bio !== null && profile?.bio !== undefined && profile?.bio !== "null" && (
            <div className="mb-2 mt-1 text-left">
              <strong className="text-white mb-sm-3">Bio: </strong>{profile?.bio}
              <hr></hr>
            </div>
          )}
          {currentUser &&
                  !is_owner &&
                  (profile?.following_id ? (
                    <Button
                      className={`${btnStyles.Button} bg-secondary p-1 mb-0 mt-2 text-light`}
                      onClick={() => handleUnfollow(profile)}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      className={`${btnStyles.Button} bg-white p-1 mb-0 mt-2 text-dark`}
                      onClick={() => handleFollow(profile)}
                    >
                      Follow
                    </Button>
                  ))}
          {profile?.website && (
            <div className="mb-4 mt-4 pb-sm-2">
              <strong className="text-white">Website: </strong>{" "}
              <a href={profile?.website} target="_blank" rel="noopener noreferrer">
                {profile?.website}
              </a>
            </div>
          )}
          </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      {profilePosts.results.length ? (
        <div className={styles.ProfilePageTitle}>
        <h4 className="text-center pb-4 pb-lg-5 mt-5">
        Knowl3dg3 by {profile?.owner}
        </h4>
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
        </div>
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row fluid className="m-lg-5 mb-5">
      <Col className="py-0 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={`pt-1 mt-5 mt-lg-0 ${styles.PostEffect}`}>
          {hasLoaded ? (
            <>
              <div className={`${styles.ProfilePage} ${appStyles.Content}`}>{mainProfile}</div>
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col xl={1} className="d-none d-xl-block p-0 p-lg-2">
        {/* Empty Col for space */}
      </Col>
      <Col lg={4} xl={3} className="d-none d-lg-block p-0 p-lg-2 align-end border-">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
