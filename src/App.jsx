import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import CommentsPage from './pages/CommentsPage.jsx';

function AppRoutes() {
    const [resTopics, setResTopics] = useState(null); // Для хранения полученных данных
    const [isLoading, setIsLoading] = useState(true); // Для отслеживания статуса загрузки

    useEffect(() => {
        // Делаем запрос только один раз при монтировании компонента
        axios.get("http://localhost:8080/get_topics")
            .then(response => {
                setResTopics(response.data); // Сохраняем результат в состоянии
                setIsLoading(false); // Загрузка завершена
            })
            .catch(error => {
                console.error('Ошибка при запросе:', error);
                setIsLoading(false); // Загрузка завершена с ошибкой
            });
    }, []); // Пустой массив зависимостей: запрос делается один раз

    // Пока данные загружаются, показываем индикатор загрузки
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    const resSubjects = [
        { id: 1, name: "Бред" },
        { id: 2, name: "Психология" }
    ];

    // Если данные загружены, рендерим маршруты
    const routes = useRoutes([
        {
            path: "/",
            element: <MainPage res_topics={resTopics} res_subjects={resSubjects} />,
        },
        {
            path: "/topics/1",
            element: <CommentsPage title="Я еблан" description="Выбор правильной темы для исследования — это первый и один из самых важных шагов на пути к успешной научной работе." day="1" month="3" year="2012" subject="Бред" />,
        },
    ]);

    return routes; // Возвращаем маршруты, как JSX
};

function App() {
    return (
    <>
      <header>
        <h1>9FDA</h1>
        <nav>
            <ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/">О форуме</a></li>
                <li><a href="/">Контакты</a></li>
            </ul>
        </nav>
    </header>
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
    <footer>
        <p>&copy; 2024 Форум</p>
    </footer>
    </>
  );
};

export default App;