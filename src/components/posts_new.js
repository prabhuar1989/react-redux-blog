import React, { Component, PropTypes } from "react";
import {reduxForm} from "redux-form"; // similar to connect function
import {bindActionCreators} from "redux";
import {Link} from "react-router";
import _ from "lodash";

import {createPost} from "../actions/index";


const FIELDS = {
    title : {
       type : "input",
       label : "Title for the post" 
    },
    categories : {
        type : "input",
        label : "Enter a category"
    },
    content : {
        type : "textarea",
        label : "Enter some content"
    }
}

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

    renderField(fieldObject, fieldName){
        const fieldHelper = this.props.fields[fieldName];
        return(
             <div key={fieldName} className = {`form-group ${fieldHelper.touched && fieldHelper.invalid ? "has-danger" : "" }`}>
                    <label>{fieldObject.label}</label>
                    <fieldObject.type type= "text" className = "form-control" {...fieldHelper} />
                    <div className = "text-help">
                        {fieldHelper.touched ? fieldHelper.error : ""}
                    </div>
             </div>
        );
    }

    render(){
        const { handleSubmit } = this.props;
       
         /*IMP NOTE : the map function always passes the value (first param) and key (second param) for each element of the array to the 
         callback-function  declared as the parameter*/

        return(
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a new Post !</h3>
                { _.map(FIELDS, this.renderField.bind(this))}
                <button type="submit" className = "btn btn-primary">Submit</button>
                <Link to="/" className = "btn btn-danger">Cancel</Link>
            </form>
        );
    }
}


function validate(values){
    const errors = {};

    _.each(FIELDS, (type, field) => {
        if(!values[field]){
            errors[field] = `Enter the ${field}`;
        }
    })

    return errors;
}


const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({createPost},dispatch);
}

//connect : first argument is mapStateToProps , second is mapDispatchToProps
//reduxForm: first argument is formConfig object, second is mapstateToProps, third is mapDispatchToProps
export default reduxForm({
   form : "NewPostForm",
   fields : _.keys(FIELDS),
   validate
},null,mapDispatchToProps)(NewPost);

