import React,{Component} from 'react';
import './App.css';
// import {Router,Route} from 'react-router-dom';
import {Card,
        Input,
        Button,
        message} from 'antd'

// import page1 from './page/page1'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        user:''
    })
  }
  logins = e =>{
    if(this.state.user.length<1){
      message.error('请输入用户名',0.5);
    }else{
      sessionStorage.setItem('user',this.state.user)
      message.success('登录成功',1.5);
      this.props.history.replace('/',this.state.user)
    }
  }
  change = e=>{
    this.setState({
      user:e.target.value
    })
  }
  render() { 
    return ( 
          <div className = "box_card">
            <Card title="请输入你的大名" style={{ width: 400 }}>
            <Input placeholder="Please enter your name"  size="large" value = {this.state.user} onChange = {this.change.bind(this)}/>
            <p className="p_btn"><Button onClick={this.logins.bind(this)} type="primary" >登入</Button></p>
            </Card>
          </div>
     );
  }
}
export default App;
