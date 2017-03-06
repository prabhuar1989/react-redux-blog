import React, { Component, PropTypes } from "react";
import {reduxForm} from "redux-form"; // similar to connect function
import {bindActionCreators} from "redux";
import {Link} from "react-router";

import {createPost} from "../actions/index";



class NewPost extends Component {
    static contextTypes = {
        router : PropTypes.object
    }

    onSubmit(props){
        this.props.createPost(props)
            .then(() => {
                //blog post has been created, navigatethe user tothe index page..
                //we navigate by calling this.context.router.push with the 
                //new path to navigate to..
                this.context.router.push("/");
            });
    }

    render(){
        const {fields : { title, categories, content }, handleSubmit } = this.props;
        //console.log("title", title);
        return(
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a new Post !</h3>
                <div className = {`form-group ${title.touched && title.invalid ? "has-danger" : "" }`}>
                    <label>Title</label>
                    <input type= "text" className = "form-control" {...title} />
                    <div className = "text-help">
                        {title.touched ? title.error : ""}
                    </div>
                </div>

                <div className = {`form-group ${categories.touched && categories.invalid ? "has-danger" : "" }`}>
                    <label>Categories</label>
                    <input type= "text" className = "form-control" {...categories}/>
                    <div className = "text-help">
                        {categories.touched ? categories.error : ""}
                    </div>
                </div>

                <div className = {`form-group ${content.touched && content.invalid ? "has-danger" : "" }`}>
                    <label>Content</label>
                    <textarea className = "form-control" {...content}/> 
                    <div className = "text-help">
                        {content.touched ? content.error : ""}
                    </div>
                </div>

                <button type="submit" className = "btn btn-primary">Submit</button>
                <Link to="/" className = "btn btn-danger">Cancel</Link>
            </form>
        );
    }
}


function validate(values){
    const errors = {};

    if(!values.title){
        errors.title = "Enter the title !";
    }
    if(!values.categories){
        errors.categories = "Enter the category !"
    }
    if(!values.content){
        errors.content = "Enter some content !"
    }

    return errors;
}


const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({createPost},dispatch);
}

//connect : first argument is mapStateToProps , second is mapDispatchToProps
//reduxForm: first argument is formConfig, second is mapstateToProps, third is mapDispatchToProps
export default reduxForm({
   form : "NewPostForm",
   fields : ["title","categories","content"],
   validate
},null,mapDispatchToProps)(NewPost);

