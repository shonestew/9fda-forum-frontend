import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopicComment from "../components/TopicComments/TopicComment.jsx";
import axios from "axios";

function CommentsPage() {
    const { id } = useParams();
    const [nickname, setNickname] = useState('');
    const [comment, setComment] = useState('');
    const [yourComment, setYourComment] = useState(null);
    const [topicMessages, setTopicComments] = useState([]);
    const [topicOne, setTopicOne] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const topicMessages = await axios.get(`http://localhost:8080/api/v1/get_topic_info/${id}`);
                const topicOne = await axios.get(`http://localhost:8080/api/v1/get_topics_one/${id}`);
                setTopicComments(topicMessages.data);
                setTopicOne(topicOne.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            };
        };
        fetchData();
    }, [id]);

    const newComment = async (e) => {
        e.preventDefault();
        let date = new Date();
        await axios.post("http://localhost:8080/api/v1/send_comment/", {
            author: nickname,
            text: comment,
            date: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            },
            topic_id: id,
        });
        setYourComment(
            <TopicComment 
                author={nickname} 
                text={comment} 
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
                    {topicOne[0] && (
                        <>
                            <h2>{topicOne[0].title}</h2>
                            <p className="description">{topicOne[0].description}</p>
                            <p className="info">
                                Автор: {topicOne[0].author} | Дата: {topicOne[0].date.day}.{topicOne[0].date.month}.{topicOne[0].date.year} | Тема: {topicOne[0].subject}
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
                        {yourComment}
                    </ul>
                    <h3>Добавить комментарий</h3>
                    <form className="comment-form" onSubmit={newComment}>
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
                            onChange={(e) => setComment(e.target.value)} 
                        ></textarea>
                        <button type="submit">Отправить</button>
                    </form>
                </section>
            </section>
        </main>
    );
}

export default CommentsPage;