import React, { Component } from "react";
import css from "./css/Content.module.css";
import {savedPosts} from "../posts-2.json";
import PostItem from "./PostItem";
import LoaderTwo from "./LoaderTwo";

export class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                isLoaded: true,
            })
        }, 2000)
    }
    
    render() {
        return (
            <div className={css.Content}>
                
                <div className={css.TitleBar}>
                    <h1>My Photos</h1>
                </div>

                <div className={css.SearchResults}>

                    {/* Part 1: Creating the map function */}

                        {/* {
                    savedPosts.map((post)=>{
                            return <div className={css.SearchItem} key={post.title}>
                                <p>{post.title}</p>
                                <p>{post.name}</p>
                                <img src={post.image} alt="random"/>
                                <p>{post.description}</p>
                                </div>
                        })
                    } */}


                    {/* Part 2: Creating a child component */}

                    {
                        this.state.isLoaded ?
                        <PostItem savedPosts={savedPosts} />
                        : <LoaderTwo />
                    }
                </div>
            </div>
        )
    }
}

export default Content