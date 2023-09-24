import React from "react"
import styles from "../styles/PostItem.module.css";


function PostItem(props) {
    return (
        props.savedPosts.map(post => {
            // Extra task destructuring 
            const {title, name, image, description} = post
            return <div className={styles.SearchItem} key={title}>
                <p>{title}</p>
                <p>{name}</p>
                <img src={image} alt="random"/>
                <p>{description}</p>
            </div>
            }
        )
    )
}

export default PostItem;