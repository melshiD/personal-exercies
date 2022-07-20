import classes from './Banner.module.css';
import Image from 'next/image';
import bannerImage from '../public/images/about-banner-desktop.jpg';

const Banner = (props) => {
    // const bannerImage = props.image;

    return(
        <div className={classes['image-container']}>
            <picture className={classes.image} >
                <Image src={bannerImage} />
            </picture>
        </div>
        
    )
}

export default Banner;