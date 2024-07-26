import styles from './NewProject.module.css';
import ProjectForm from '../projects/ProjectForm';
import { useNavigate } from 'react-router-dom'; // Use useNavigate para redirecionar

function Newproject() {
    const navigate = useNavigate();

    function createPost(project) {
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
           
            navigate('/projects', { message: 'Projeto criado com sucesso' }); 
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={styles.corpo}>
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seus projetos e adicione serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
        </div>
    );
}

export default Newproject;
