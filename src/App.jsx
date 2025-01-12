import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import CommentsPage from './pages/CommentsPage.jsx';

function AppRoutes() {
    const [resTopics, setResTopics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [resSubjects, setResSubjects] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topicsResponse, subjectsResponse] = await Promise.all([
                    axios.get("http://localhost:8080/api/v1/get_topics"),
                    axios.get("http://localhost:8080/api/v1/get_subjects")
                ]);
                setResTopics(topicsResponse.data);
                setResSubjects(subjectsResponse.data);
            } catch (error) {
                console.error('Ошибка при запросе:', error);
            } finally {
                setIsLoading(false);
            };
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>
    };

    const Routes = useRoutes([
        {
            path: "/",
            element: <MainPage res_topics={resTopics} res_subjects={resSubjects} />,
        },
        {
            path: "/topics/:id",
            element: <CommentsPage />,
        },
    ]);

    return Routes;
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