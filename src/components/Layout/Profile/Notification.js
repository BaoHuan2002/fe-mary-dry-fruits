import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Button from '@/components/Button/ButtonIndex';

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const Notification = () => {
    return (
        <div>
            <h2 className={cx('profile-detail-heading')}>Notification</h2>
            <div className={cx('profile-noti')}>
                <span>
                    <FontAwesomeIcon icon={icon({ name: 'bell', style: 'solid' })} className={cx('profile-icon')} />
                </span>
                <span className={cx('profile-text')}>You don't have notification </span>
            </div>
            <div className={cx('profile-btn')}>
                <Button text={'Continue Shopping'} blackText link={'/product'} />
            </div>
        </div>
    );
};

export default Notification;
