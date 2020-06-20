import React, { Component } from 'react'
import {connect} from 'umi'
import {NavBar,List,InputItem,Grid,Icon} from 'antd-mobile'
import '../../assets/css/index.css'
import Cookies from 'js-cookie';

const Item = List.Item
class Chat extends Component{
   state=  {
       content:'',
       isShow:false
   } 
handel = ()=>{s

    const from = this.props.user._id
    const to = this.props.match.params.userid
    const {content} = this.state
    this.props.dispatch({
        type:'message/getMessageAsync',    
        payload:{from,to,content}
    })
    this.setState({content:'',isShow:false})
}
componentDidMount(){

    const targetId = this.props.match.params.userid
    window.scrollTo(0,document.body.scrollHeight)
   const initEmoji = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂',
                     '🙃','😉','😌','😍','😘','😗','😙','😚','😋','😛','😝',
                     '😜','😏','😒','😞','😔','😟','😕', '🙃','😉','😌','😍',
                     '😜','😏','😒','😞','😔','😟','😕', '🙃','😉','😌','😍']
   this.emojis = initEmoji.map(emoji=>({text:emoji}))

   if(this.props.user.type==''){
    this.props.dispatch({
        type:'message/getChatMsgAsync',    
    })
    this.props.dispatch({
        type:'user/getUserAsync',    
    })
   }     
   this.props.dispatch({
        type:'message/doReadMessages',
        payload:targetId
   })
}
componentDidUpdate(){
    //输入框输入信息后自动滑动到底部
    window.scrollTo(0,document.body.scrollHeight)
}
    toggleShow = ()=>{
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow){

            //异步分发resize时间，解决表情包bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0);
        }
    }
    render(){

        const {user} = this.props
        const {users,chatMsgs} = this.props.chat

        const meId = user._id
        if(!users[meId]){
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId,targetId].sort().join('_')
        const msgs = chatMsgs.filter(msg=>msg.chat_id==chatId)
        const targetHead = users[targetId].header
        const targetIcon =targetId?require(`../../assets/images/head/${targetHead}.jpg`):null
        const mytHead = users[meId].header
        const myIcon =mytHead?require(`../../assets/images/head/${mytHead}.jpg`):null
        return (
            <div id='chat_page'>
                <NavBar className='sticky-header' icon ={<Icon type='left' />} onLeftClick={()=>this.props.history.goBack()} >{users[targetId].username}</NavBar>

                <List style={{marginBottom:50,paddingTop:50}}>
                    {msgs.map(msg =>{
                        if(targetId===msg.from){  //对方发给我的
                           return (<Item
                           key= {msg._id}
                           thumb={targetIcon}
                           >{msg.content}</Item>
                           )
                        }else{     //我发给对方的
              
                           return (<Item
                            key= {msg._id}
                            className="chat-me"
                            
                            >
                              <span className='xiix'><span className="text">{msg.content}</span><img style={{width:30,height:30}} src={myIcon} alt=""/></span>
                            </Item>
                           )
                        }
                    })}
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                    value={this.state.content}
                    onChange={val=>this.setState({content:val})}
                    placeholder="请输入 "
                    extra = { <span><span style={{marginRight:10,marginBottom:2}} onClick={this.toggleShow}>😀</span><span onClick={this.handel}>发送</span></span> 

                }
                    />
                  {this.state.isShow?( <Grid
                 data={this.emojis}
                 columnNum={8}
                 carouselMaxRow={4}
                 isCarousel={true}
                 onClick={item=>this.setState({content:this.state.content+item.text})}
                />):null}

                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {chat:state.message,user:state.user.user}
}
export default connect(mapStateToProps)(Chat)