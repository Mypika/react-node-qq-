import React, { Component } from 'react';
class MsgItems extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    render() { 
        return (
           <ul>
                {this.props.MList.map((Item,index)=>{
                    return <li key={index}>
                    {Item.username?(<p style={{textAlign:"center"}}>{Item.username}<span>加入聊天</span></p>):(
                        <div className={this.props.Iusr===Item.user?"i_user":"p_user"}>
                        <p>{Item.user}<span>{Item.time}</span></p>
                            <font>{Item.msg}</font>
                        </div> )}
                </li>
                })
                }
            </ul>
            );
            
    }
}
 
export default MsgItems;