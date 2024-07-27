import styles from './Home.module.css'
import savings from '../../img/Bear.gif'
import { Link } from 'react-router-dom'
import LinkButton from '../Layout/LinkButton'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao  <span>Bear</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto"></LinkButton>
            <img src={savings} alt="Costs"/>
        </section>
    )
}

export default Home