import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Layout/Loading';
import Container from '../Layout/Container';

function Project () {
    const { id } = useParams()

    const [project, setProject] = useState([])

    useEffect(() => {

        fetch('http://localhost:5000/projects/${id}', {
            method :'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
        })
    }, [id])

    return <>{project.name ? (
        <div>
            <Container customClass="column">
                <div>
                    <h1>projeto: {project.name}</h1>
                    <buttom>Editar projeto</buttom>
                </div>
            </Container>
        </div>
    ) : ( 
        <Loading />
    )}
    </>
}

export default Project