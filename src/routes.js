import React from "react";
import { Route, IndexRoute } from "react-router";

import PostsIndex from "./components/posts_index";
import NewPost from "./components/posts_new";
import ShowPost from "./components/posts_show";
import App from "./components/app";



export default (
    <Route path="/" component={App}>
        <IndexRoute component = {PostsIndex}/>
        <Route path ="posts/new" component = {NewPost} />
        <Route path="posts/:id" component ={ShowPost} />
    </Route>
);