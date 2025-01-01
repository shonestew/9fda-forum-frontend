import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import CommentsPage from './pages/CommentsPage.jsx';

function AppRoutes() {
    const res_topics = axios.get("http://127.0.0.1:8080/get_topics/");
    const res_subjects = [
        {
            id: 1,
            name: "Бред",
        },
        {
            id: 2,
            name: "Психология",
        },
    ];
    return useRoutes([
        {
            path: "/",
            element: <MainPage res_topics={res_topics} res_subjects={res_subjects}/>,
        },
        {
            path: "/topics/1",
            element: <CommentsPage title="Я еблан" description="Выбор правильной темы для исследования — это первый и один из самых важных шагов на пути к успешной научной работе. Тема должна быть актуальной, интересной и соответствовать вашим научным интересам. Важно учитывать доступность материалов для исследования, а также возможности проведения экспериментов или анализа данных. Также стоит подумать о практическом значении работы и ее вклад в развитие определенной области науки. В этой статье мы рассмотрим несколько важных факторов, которые помогут вам выбрать идеальную тему для исследования." day="1" month="3" year="2012" subject="Бред"/>,
        },
      ]);
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
