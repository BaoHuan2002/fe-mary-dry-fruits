import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@/components/Button/ButtonIndex';

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const CustomerSupport = () => {
    const [support, setSupport] = useState('');
    const [isButtonClickable, setButtonClickable] = useState(true);

    const handleSendSupport = () => {
        if (!support) {
            if (!isButtonClickable) {
                return;
            }
            setButtonClickable(false);

            setTimeout(() => {
                toast.error("You don't enter support request", {
                    autoClose: 2000,
                });
            }, 500);
        } else {
            if (!isButtonClickable) {
                return;
            }

            setButtonClickable(false);
            setSupport('');

            setTimeout(() => {
                toast.success('Send Request Support Success', {
                    autoClose: 2000,
                });
            }, 500);
        }
    };

    useEffect(() => {
        const enableButton = () => {
            setButtonClickable(true);
        };

        const timeoutId = setTimeout(enableButton, 1000);

        return () => clearTimeout(timeoutId);
    }, [support]);

    return (
        <div>
            <h2 className={cx('profile-detail-heading')}>Customer Support</h2>
            <div className={cx('profile-help')}>
                <textarea
                    id="help"
                    className={cx('profile-help-textarea')}
                    rows="7"
                    cols="80"
                    placeholder="Please send your problem to us"
                    onChange={(e) => setSupport(e.target.value)}
                    value={support}
                ></textarea>
            </div>
            <div className={cx('profile-help-btn')} onClick={() => handleSendSupport()}>
                <Button text={'Send'} blackText />
            </div>
        </div>
    );
};

export default CustomerSupport;
