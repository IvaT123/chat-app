import React from "react";

export default class Messages extends React.Component {
  messagesEndRef = React.createRef();

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
    render() { 
        const { data, id } = this.props;
        const messages = data.map((message, i) => {
          const isCurent = message.member.id === id
          const position = isCurent ? "message-container current-user" : "message-container";
          const direction = !isCurent ? "username-container guest-user" : "username-container";
          const messageBubble = isCurent ? "message current-user-color" : "message guest-user-color";
            return <li className={position} key={i}>
                    <p className="username">{message.member.clientData.username}</p>
                    <div className={direction}>
                      <div className={messageBubble}>{message.text}</div>
                      <span className="avatar" style={{backgroundColor: message.member.clientData.avatarColor}}></span>
                    </div>
                </li>
        })
        return(
                <ul className="display">
                    {messages}
                    <li ref={this.messagesEndRef}></li>
                </ul>
            
        )
    }
}