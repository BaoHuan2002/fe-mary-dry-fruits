import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faBell, faTag, faHeadset } from '@fortawesome/free-solid-svg-icons';
import AccountInformation from './Account_Information';
import OrderComponent from './History_Order/Order_Management';
import CustomerSupport from './Customer_Support';
import Notification from './Notification';

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const ProfileIndex = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleCheckActive = (index) => {
        setActiveTab(index);
    };

    const icons = [faUser, faStore, faBell, faTag, faHeadset];

    const renderComponent = () => {
        switch (activeTab) {
            case 0:
                return <AccountInformation />;
            case 1:
                return <OrderComponent />;
            case 2:
                return <Notification />;
            case 3:
                return <CustomerSupport />;
            default:
                return null;
        }
    };
    return (
        <div className={cx('profile-container')}>
            <div className={cx('profile-wrapper')}>
                <div className={cx('profile-info-user')}>
                    <div className={cx('profile-info-outner-title')}>
                        {[
                            'Account Information',
                            'Order Management',
                            'Notification',
                            'Customer Support',
                        ].map((title, index) => (
                            <div
                                key={index}
                                className={cx('profile-info-title', { active: activeTab === index })}
                                onClick={() => handleCheckActive(index)}
                                id={`tab-${index}`}
                            >
                                <FontAwesomeIcon icon={icons[index]} className={cx('profile-icon')} />
                                {title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('profile-detail-user')}>{renderComponent()}</div>
            </div>
        </div>
    );
};

export default ProfileIndex;
