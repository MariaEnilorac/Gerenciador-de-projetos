import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Message from '../Layout/Message';
import styles from './Projects.module.css';
import Container from "../Layout/Container";
import Loading from "../Layout/Loading";
import LinkButton from "../Layout/LinkButton";
import ProjectsCards from "../projects/ProjectsCards";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then(data => {
            setProjects(data);
            setRemoveLoading(true);
        })
        .catch(err => console.error('Fetch error:', err));
    }, []);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage('Projeto removido com sucesso');
        })
        .catch(err => console.error('Fetch error:', err));
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => (
                    <ProjectsCards 
                        id={project.id} 
                        name={project.name} 
                        budget={project.budget} 
                        category={project.category ? project.category.name : 'Sem categoria'} 
                        key={project.id}
                        handleRemove={removeProject}
                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há Projetos cadastrados</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;
