import React, { Component } from 'react';
import './Home/Home.css'
import {Layout, Menu, Icon,
        Input,Button } from 'antd'
import MsgItems from './comm/msgitem'
const { Header, Content, Sider } = Layout;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users:'',
          poeple:3,
          ws:'',
          message:'',
          MsgList:[]
        }
    }
    // 生命周期函数监听建立长连接
    componentWillMount(){
      let user = sessionStorage.getItem('user')
        if(user===null||user===undefined||user.length<1){
            this.props.history.push('/login')
        }else{
          this.setState({
            users:user
          })
          var ws = new WebSocket('ws://localhost:3030')
          this.setState({
             ws:ws
          })
            ws.onopen=data=>{
              let user = {
                username:this.state.users,
                // username:'1'
              }
              ws.send(JSON.stringify(user))
            }
            ws.onmessage=data=>{
             let online = JSON.parse(data.data)
             if(online.onlinenumber){
              this.setState({
                poeple:online.onlinenumber
              })
             }else{
                  this.setState({
                    MsgList:[...this.state.MsgList,online],
                    message:''
                  },()=>{const {scrollHeight} = this.conNode;
                  this.conNode.scrollTop = scrollHeight})
             }
            }
        }
        window.addEventListener('beforeunload', this.beforeunload);
    }
    componentDidMount(){
      
      if (this.conNode) {
        const {scrollHeight} = this.conNode;
        this.conNode.scrollTop = scrollHeight
        // this.conNode.addEventListener('scroll', this.onScrollHandle.bind(this));
      }
    }
    // componentWillUnmount() {
    //   if (this.conNode) {
    //     this.conNode.removeEventListener("scroll", () => {
    //       this.onScrollHandle(this);
    //     });
    //   }
    // }
    // 浏览器窗口关闭与刷新监听
    beforeunload=(e)=>{
        e = window.event||e;
    　  e.returnValue=("离开吗？");
    }
    // 聊天窗口位置滚动监听
    // 发送信息至服务端
    EnterMsg=()=>{
      if(this.state.message.trim().length<1){
        this.setState({
          message:''
        })
        return false
      }
      let SendMsg = {
          msg:this.state.message,
          user:this.state.users,
          delver:1
      }
     this.state.ws.send(JSON.stringify(SendMsg))

    }
    ChangeArea=(e)=>{
      this.setState({
        message:e.target.value
      })
    }
    render(){ 
        return (
            <div className = "box_big">
            <Layout>
            <Header className="header">
              <div className="logo" >
              欢迎你，<span style={{fontSize:'18px',fontWeight:'bold',cursor:'pointer'}}>{this.state.users}</span>
              </div>
              <div className="peplo">
              当前在线人数：<span style={{fontSize:'18px',fontWeight:'bold',cursor:'pointer'}}>{this.state.poeple}</span>
              </div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px',textAlign:'center',height:'64px'}}
              >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Header>
            <Layout className="box_second">
              <Sider className="box_left" width="15%"  breakpoint="md"
      collapsedWidth='0'
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                <Menu.Item key="1"> <Icon type="mail" />Navigation One</Menu.Item>
                <Menu.Item key="2"> <Icon type="mail" />Navigation One</Menu.Item>
                <Menu.Item key="3"> <Icon type="mail" />Navigation One</Menu.Item>
                </Menu>
              </Sider>
              <Layout className="box_right">
                <div className="box_context" ref = {e=>this.conNode=e}>
                  <MsgItems MList={this.state.MsgList} Iusr = {this.state.users}/>  
                </div>
                <Content className="box_input" >
                  <Content className="input_herder" >
                    <Icon type="compass" />
                    <Icon type="compass" />
                    <Icon type="compass" />
                    <Icon type="compass" />
                  </Content>
                  <Input.TextArea placeholder="可以在此输入..." value={this.state.message} onChange={this.ChangeArea} onPressEnter={this.EnterMsg}/>
                  <Button className="enter_btn" type="primary" onClick={this.EnterMsg}>发送</Button>
                </Content>
            </Layout>
            </Layout>
          </Layout>
          </div>
         )
    }
}
export default Home;