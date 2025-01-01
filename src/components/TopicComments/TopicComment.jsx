function TopicComment(props) {
    return (
        <div className="comment-card">
            <p><strong>{props.author}</strong>: {props.text}</p>
            <p className="info">Дата: {props.day}.{props.month}.{props.year}</p>
        </div>
    );
};

export default TopicComment;