function getFirst15Words(text) {
    const words = text.split(' ');
    const first20Words = words.slice(0, 15);
    return first20Words.join(' ') + (words.length > 15 ? '...' : '');
};

function TopicCard(props) {
    const url = "topics/" + props.topic_id;
    return (
        <div className="topic-card">
            <h3><a href={url}>{props.topic_name}</a></h3>
            <p className="description">{getFirst15Words(props.description)}</p>
            <p className="info">Автор: {props.author} | Дата: {props.day}.{props.month}.{props.year} | Тема: {props.subject}</p>
        </div>
    );
};

export default TopicCard;