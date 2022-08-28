import React from "react";
import Header from "../components/Header";
import Messages from "../components/Messages";
function username() {
    const username = window.location.pathname.substring(6)
    return username
}
function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }
export default class ChatPage extends React.Component {
     constructor() {
        super();
        this.state = {
            member: {
                username: username(),
                avatarColor: randomColor()
            },
            messages: [],
            currentMessage: ''
        }
        this.drone = new window.Scaledrone("mfM1Pg6Kpi96fBbw", {
            data: this.state.member
          }); 
    } 
    componentDidMount = () => {
          this.drone.on('open', error => {
            if (error) {
              return console.error(error);
            }
            const member = {...this.state.member};
            member.id = this.drone.clientId;
            this.setState({member});
          })
        const room = this.drone.subscribe("observable-room");
        room.on('data', (data, member) => {
            const messages = this.state.messages;
            messages.push({member, text: data});
            this.setState({messages});
          });
    }
    createMessage = (e) => {
        const value= e.target.value;  
        this.setState({
            currentMessage: value,
        })
    }
    submitMessage = () => { 
        this.setState({currentMessage:''}) 
        this.drone.publish({
            room: "observable-room",
            message: this.state.currentMessage
          });
    }
    onKeyDown = (e) => {
        if(e.keyCode === 13) {
            this.submitMessage()
        }
    }
    render() {
        return(
            <>
            <Header username={this.state.member.username} avatar={this.state.member.avatarColor}/>
            <Messages data={this.state.messages} id={this.state.member.id} />
            <div className="input-container">
                <input autoFocus={true} type="text" value={this.state.currentMessage} onChange={this.createMessage} onKeyDown={this.onKeyDown}/>
                <button className="send-button" onClick={this.submitMessage}>Send</button>
            </div>
            </>
        )
    }
}
