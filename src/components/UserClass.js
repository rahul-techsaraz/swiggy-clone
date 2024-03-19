import {Component} from "react";

class UserClass extends Component {
    constructor(props) {
        super(props)
       // console.log(props)
        this.handleCount = this.handleCount.bind(this)
        this.state = {
            count: 0,
            count1: 10,
             userInfo:{}
        }
        console.log(this.props.name+'Child construcrtor')
    }
      fetch = () => {
    console.log('fetch')
    }
    fetch1 = () => {
    console.log('fetch1')
}
   async componentDidMount() {
        const data = await fetch('https://api.github.com/users/rahul-1703');
        const json = await data.json();
       this.setState({ userInfo: json })
       this.timer = setInterval(() => {
           console.log('setInterval')
       },1000)
    }
    componentDidUpdate(prevProps,prevState) {
        if (this.state.count !== prevState.count  ) {
            //execute some block of code
            this.fetch();
        }
        if (this.state.count1 !== prevState.count1) {
            this.fetch1()
            
        }
    }
     handleCount = () => {
    this.setState({count:this.state.count+1,count1:this.state.count1+1})
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    
    render() {
        
       
        return (
            <>
                <h1>{this.state.count}+{ this.state.count1}</h1> 
               <button onClick={this.handleCount}>Increament</button>
                <div className="user-card">
                    <img src ={this.state.userInfo.avatar_url} /> 
                    <h3>{ this.state.userInfo.name}</h3>
                    <h4>Repo Link: { this.state.userInfo.repos_url }</h4>
                    
        </div>
            </>
       )
   }
}
export default UserClass;

/**
 * contructor
 * render
 *    -JSX
 * componentDidMount
 */
/**
 * Parent Constructor
 * Parent Render
 * 
 * Child Constructor
 * Child Render
 * Child Component Did Mount
 * 
 * Parent DidMount
 */