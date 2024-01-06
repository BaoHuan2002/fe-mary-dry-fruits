import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Benefit.module.scss';

const cx = classNames.bind(styles);

function BenefitItem({ title, description, icon }) {
    const handleClickTitle = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={cx('benefit-container')}>
            <div className={cx('benefit-outner-icon')}>
                <div className={cx('benefit-icon',)}>{icon}</div>
            </div>
            <div className={cx('benefit-wrapper')}>
                <Link to="/" className={cx('benefit-title')} onClick={handleClickTitle}>
                    {title}
                </Link>
                <p className={cx('benefit-description')}>{description}</p>
            </div>
        </div>
    );
}

export default BenefitItem;
