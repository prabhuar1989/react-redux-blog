import React, {Component} from"react";
import {fetchPosts} from "../actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Link} from "react-router";

class PostsIndex extends Component {

    componentWillMount(){
        //console.log("This will be a good time to call an action creator : FetchPosts");
        this.props.fetchPosts();

    }

    renderPosts(){
        return this.props.posts.map((post) => {
            return (
                <li className = "list-group-item" key={post.id}>
                    <Link to = {`posts/${post.id}`}>
                    <span className = "pull-xs-right" >{post.categories}</span>
                    <strong>{post.title}</strong>
                    </Link>
                </li>
            );
        })
    }

    render(){
        return(
            <div>
                <div className = "text-xs-right">
                    <Link to="/posts/new" className = "btn btn-primary">Add a post</Link>
                </div>
                <h3>Welcome to Ashwin's blog !!</h3>
                <ul className = "list-group">
                    {this.renderPosts()}
                </ul>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { posts : state.posts.all };
}

const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({fetchPosts},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);

