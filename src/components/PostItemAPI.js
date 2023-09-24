import React from "react"
import styles from "../styles/PostItem.module.css";


function PostItem(props) {
    return (
        props.savedPosts.map(post => {
            const {id, type, user, webformatURL, tags} = post
            return <div className={styles.SearchItem} key={id}>
                <p>{type}</p>
                <p>{user}</p>
                <img src={webformatURL} alt="random"/>
                <p>{tags}</p>
            </div>
            }
        )
    )
}

export default PostItem;