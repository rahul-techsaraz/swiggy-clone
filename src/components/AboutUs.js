import { Outlet } from "react-router-dom";
import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

class AboutUs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo:{}
        }
        console.log('Parent Constructor')
    }
    //Mounting
    


    //UPDATE
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    render() {
        console.log('Parent render')
        return (
              <>
            <h1 onClick={() => this.setState({count:this.state.count+1})}>This is About us</h1>
                <UserClass name={"first"} />
                {/* <User /> */}
                
                
            
        </>
        )
    }
}
/**
 * Parent Constructor
 * Parent render
 * first Child Constructor
 * first Child Render
 * second Child Constructor
 * second Child Constroctor
 * third Child Constructor
 * third Child Render 
 * third Child Componmenm......
 * second Child ComponentDidMount
 * first Child ComponentDidMount
 * Parent DidComponentMount
 * 
 * 
 * 
 */







export default AboutUs;