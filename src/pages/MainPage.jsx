import TopicTematic from '../components/TopicMain/TopicTematic.jsx';
import TopicCard from '../components/TopicMain/TopicCard.jsx';

function MainPage(props) {
    const { res_topics, res_subjects } = props;
    return (
        <main>
            <section className="content">
                <section className="topics">
                    <h2>Последние топики</h2>
                    {res_topics.map(data => <li key={data.topic_id}><TopicCard topic_name={data.title} description={data.text} author={data.author} day={data.date?.day} month={data.date?.month} year={data.date?.year} subject={data.subject} topic_id={data.topic_id}/></li>)}
                </section>
                <aside className="sidebar">
                    <h3>Тематики форума</h3>
                    <ul>
                        {res_subjects.map(data => <li key={data.id}><TopicTematic id={data.id} name={data.name}/></li>)}
                    </ul>
                </aside>
            </section>
        </main>
    );
};

export default MainPage;