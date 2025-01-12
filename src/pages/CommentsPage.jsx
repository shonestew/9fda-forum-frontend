import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopicComment from "../components/TopicComments/TopicComment.jsx";
import axios from "axios";

function CommentsPage() {
    const { id } = useParams();
    console.log("Айди:", id);
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');
    const [yourMessage, setYourMessage] = useState(null);
    const [topicMessages, setTopicMessages] = useState([]);
    const [props, setProps] = useState([]);

    // Загрузка данных с сервера
    useEffect(() => {
        async function fetchData() {
            try {
                const topicMessagesTemp = await axios.get(`http://localhost:8080/api/v1/get_topic_info/${id}`);
                const propsTemp = await axios.get(`http://localhost:8080/api/v1/get_topics_one/${id}`);
                setTopicMessages(topicMessagesTemp.data);
                setProps(propsTemp.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        }
        fetchData();
    }, [id]); // Загрузка данных при изменении id

    const newMessage = async (e) => {
        e.preventDefault();
        let date = new Date();
        // Можно добавить запрос для сохранения комментария на сервере
        setYourMessage(
            <TopicComment 
                author={nickname} 
                text={message} 
                day={date.getDate()} 
                month={date.getMonth() + 1} 
                year={date.getFullYear()} 
            />
        );
    };

    return (
        <main>
            <section className="topic-page">
                <div className="topic-info">
                    {props[0] && (
                        <>
                            <h2>{props[0].title}</h2>
                            <p className="description">{props[0].description}</p>
                            <p className="info">
                                Автор: {props[0].author} | Дата: {props[0].date.day}.{props[0].date.month}.{props[0].date.year} | Тема: {props[0].date.subject}
                            </p>
                        </>
                    )}
                </div>
                <section className="comments">
                    <h3>Комментарии</h3>
                    <ul>
                        {topicMessages.length > 0 ? (
                            topicMessages.map((data, index) => (
                                <li key={index}>
                                    <TopicComment 
                                        author={data.author} 
                                        text={data.text} 
                                        day={data.date.day} 
                                        month={data.date.month} 
                                        year={data.date.year} 
                                    />
                                </li>
                            ))
                        ) : (
                            <p>Здесь пока ничего нету...</p>
                        )}
                        {yourMessage}
                    </ul>
                    <h3>Добавить комментарий</h3>
                    <form className="comment-form" onSubmit={newMessage}>
                        <label htmlFor="nickname">Никнейм:</label>
                        <input 
                            type="text" 
                            id="nickname" 
                            name="nickname" 
                            placeholder="Ваш ник" 
                            required 
                            onChange={(e) => setNickname(e.target.value)} 
                        />
                        <label htmlFor="message">Сообщение:</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            placeholder="Ваш комментарий" 
                            required 
                            onChange={(e) => setMessage(e.target.value)} 
                        ></textarea>
                        <button type="submit">Отправить</button>
                    </form>
                </section>
            </section>
        </main>
    );
}

export default CommentsPage;