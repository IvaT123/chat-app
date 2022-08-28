export default function Header(props) {
    return (
        <header>
            <h1>My Chat App</h1>
            {props !== undefined &&
            <div className="active-user">
                <span className="avatar" style={{backgroundColor: props.avatar, marginTop:".5em"}}></span>
                <p>{props.username}</p>
            </div>}
        </header>
    )
}