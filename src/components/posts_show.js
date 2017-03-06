import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {fetchPost, deletePost} from "../actions/index";
import {bindActionCreators} from "redux";
import {Link} from "react-router";

class ShowPost extends Component {

    static contextTypes = {
        router : PropTypes.object
    }

    componentWillMount(){
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick(){
        this.props.deletePost(this.props.params.id)
        .then(() => {
            this.context.router.push("/")
        });
    }

    render(){
        if(!this.props.post){
            return <div>loading..!</div>
        }

        return(
            <div>
                <Link to="/">Back</Link>
                <button className= "btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
                <h3>{this.props.post.title}</h3>
                <h6>Categories : {this.props.post.categories}</h6>
                <p>{this.props.post.content}</p>
            </div>
        )
    }
}

const mapStateToProps= (state)=> {
    return {
        post : state.posts.post
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchPost, deletePost},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowPost);