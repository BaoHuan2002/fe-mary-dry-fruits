import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect, useState } from 'react';
import Title from '../Main/Title/Title_Index';
import ContactItem from './Contact_Item';
import ContactLocation from './Contact_Location';
import ContactForm from './Contact_Form';
import Loading from '../Loading/Loading';

import classNames from 'classnames/bind';
import styles from './Contact_Us.module.scss';

const cx = classNames.bind(styles);

const ContactIndex = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        window.scroll(0, 0);
    }, []);

    return (
        <>
            {loading ? <Loading /> : null}
            <div className={cx('contact-container')}>
                <div className={cx('contact-wrapper')}>
                    <Title heading={'Contact us'} description={'We are always ready to receive comments from you.'} />
                    <div className={cx('contact-info')}>
                        <ContactItem
                            title={'Phone'}
                            info={'Toll-Free:1800 1779'}
                            icon={
                                <FontAwesomeIcon
                                    icon={icon({ name: 'phone', style: 'solid' })}
                                    className={cx('contact-icon')}
                                />
                            }
                        />
                        <ContactItem
                            title={'Email'}
                            info={'marudryfruits@gmail.com'}
                            icon={
                                <FontAwesomeIcon
                                    icon={icon({ name: 'envelope', style: 'solid' })}
                                    className={cx('contact-icon')}
                                />
                            }
                        />
                        <ContactItem
                            title={'Address'}
                            info={'35/6 Đường D5, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh'}
                            icon={
                                <FontAwesomeIcon
                                    icon={icon({ name: 'location-dot', style: 'solid' })}
                                    className={cx('contact-icon')}
                                />
                            }
                        />
                    </div>
                    <div className={cx('contact-location')}>
                        <ContactLocation />
                        <ContactForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactIndex;
