import { parse, v4 as uuidv4 } from 'uuid';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Layout/Loading';
import Container from '../Layout/Container';
import ProjectForm from '../projects/ProjectForm';
import ServiceForm from '../projects/service/ServiceForm';
import ServiceCard from '../projects/service/ServiceCard';
import Message from '../Layout/Message';

function Project() {
    const { id } = useParams();

    const [project, setProject] = useState({});
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setServices(data.services || []);
            })
            .catch(err => console.log(err));
    }, [id]);

    function editPost(project) {
        setMessage('');
        setType('');

        if (parseFloat(project.budget) < parseFloat(project.cost)) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage('Projeto atualizado');
                setType('success');
            })
            .catch(err => console.log(err));
    }

    function createService(service) {
        setMessage('');
        setType('');

        service.cost = parseFloat(service.cost);
        const currentCost = parseFloat(project.cost) || 0;
        const newCost = currentCost + service.cost;

        const budget = parseFloat(project.budget) || 0;

        console.log("Novo custo:", newCost);
        console.log("Orçamento do projeto:", budget);

        if (newCost > budget) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço');
            setType('error');
            return false;
        }

        service.id = uuidv4();
        const servicesUpdated = [...project.services, service];
        const projectUpdated = {
            ...project,
            services: servicesUpdated,
            cost: newCost
        };

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data);
                setServices(servicesUpdated);
                setShowServiceForm(false);
                setMessage('Serviço adicionado');
                setType('success');
            })
            .catch(err => console.log(err));
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter((service) => service.id !== id);
        const projectUpdated = {
            ...project,
            services: servicesUpdated,
            cost: parseFloat(project.cost) - parseFloat(cost)
        };

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data);
                setServices(servicesUpdated);
                setMessage('Serviço removido');
                setType('success');
            })
            .catch(err => console.log(err));
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p><span>Categoria: </span> {project.category.name}</p>
                                    <p><span>Total de Orçamento: </span> R${project.budget}</p>
                                    <p><span>Total utilizado: </span> R${project.cost}</p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2> Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm &&
                                    <ServiceForm handleSubmit={createService} btnText="Adicionar Serviço" projectData={project} />
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;
