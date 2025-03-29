const ListConvo = ({convo}) => {
    return (
        <div className = "bot-response-container">
            <br/>
            Conversation:
            {convo.map((item, index) => (
                <div key={index}>
                    {index +1}. 
                    User: {item.pro}
                    <br/>
                    Food Bot: {item.res}
                    <br />
                    <br/>
                </div>
            ))}
        </div>
    )
}

export default ListConvo