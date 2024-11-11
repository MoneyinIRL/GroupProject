import styles from './movie.module.css';
import Card from './card';
import Image from 'next/image'
import { movieProps } from './types';


export default function Movie({movie}: movieProps){
    return (
        <Card className={styles.movieItem}>
            <Image className = {styles.movieImg} 
                src={movie.imageUrl}
                alt={movie.imageUrl}
                width={100}
                height={100}
                priority
            
            
            />
            <div className={styles.movieTitle}>
                <h1>{movie.title}</h1>


                
                
                


            </div>
            <div className={styles.movieSynopsis}>
                <p>{movie.synopsis}</p>


            </div>


            



        </Card>




    )




}


