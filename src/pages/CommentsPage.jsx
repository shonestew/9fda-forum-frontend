import { useState } from "react";
import TopicComment from "../components/TopicComments/TopicComment.jsx";
import axios from "axios";

async function CommentsPage(props) {
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');
    const [yourMessage, setYourMessage] = useState(null);

    const topicMessages = await axios.get(`https://localhost:8080/api/v1/topics/${props.topic_id}`)
    const newMessage = (e) => {
        e.preventDefault();
        setYourMessage(<TopicComment author={nickname} text={message} day="2" month="4" year="2044"/>);
    };
    return (
        <main>
            <section className="topic-page">
                <div className="topic-info">
                    <h2>{props.title}</h2>
                    <p className="description">{props.description}</p>
                    <p className="info">Автор: {props.author} | Дата: {props.day}.{props.month}.{props.year} | Тема: {props.subject}</p>
                </div>
                <section className="comments">
                    <h3>Комментарии</h3>
                        {topicMessages}
                        {yourMessage || "Здесь пока ничего нету..."}  
                    <h3>Добавить комментарий</h3>
                    <form className="comment-form">
                        <label for="nickname">Никнейм:</label>
                        <input type="text" id="nickname" name="nickname" placeholder="Ваш ник" required onChange={(e) => setNickname(e.target.value)}/>
                        <label for="message">Сообщение:</label>
                        <textarea id="message" name="message" placeholder="Ваш комментарий" required onChange={(e) => setMessage(e.target.value)}></textarea>
                        <button type="submit" onClick={newMessage}>Отправить</button>
                    </form>
                </section>
            </section>
        </main>
    );
};

export default CommentsPage;