import images from '@/assets';
import classNames from 'classnames/bind';
import styles from './Title_Index.module.scss';

const cx = classNames.bind(styles);

const TitleIndex = ({ heading, description }) => {
    return (
        <div className={cx('title-container')}>
            <h2 className={cx('title-heading')}>{heading}</h2>
            <p className={cx('title-description')}>{description}</p>
            <img src={images.star_image} alt="start" />
        </div>
    );
};

export default TitleIndex;
