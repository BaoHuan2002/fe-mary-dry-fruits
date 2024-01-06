import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState } from 'react';
import { changePass } from '@/service/User_Service';
import { toast, Flip } from 'react-toastify';
import Button from '@/components/Button/ButtonIndex';
import Loading from '../../Loading/Loading';

import classNames from 'classnames/bind';
import styles from '../Profile.module.scss';

const cx = classNames.bind(styles);

const NewPass = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangeNewPass = async () => {
        if (!currentPass || !newPass || !confirmNewPass) {
            toast.error('The input fields are required and cannot be left blank', {
                transition: Flip,
                autoClose: 2000,
            });
        } else {
            if (newPass === confirmNewPass) {
                if (newPass.length < 8 || confirmNewPass.length < 8) {
                    toast.error('The password field must be at least 8 characterst', {
                        transition: Flip,
                        autoClose: 2000,
                    });
                } else {
                    setLoading(true);
                    try {
                        const res = await changePass(currentPass, newPass, confirmNewPass);
                        if (res && res.response.status_code !== '404') {
                            toast.success(res.response.message, {
                                transition: Flip,
                                autoClose: 2000,
                            });
                            setShowPopup(false);
                            setCurrentPass('');
                            setNewPass('');
                            setConfirmNewPass('');
                            setTimeout(() => {
                                setLoading(false);
                            }, 500);
                        } else {
                            toast.error(res.response.message, {
                                transition: Flip,
                                autoClose: 2000,
                            });
                            setTimeout(() => {
                                setLoading(false);
                            }, 500);
                        }
                    } catch (error) {
                        toast.error(error, {
                            transition: Flip,
                            autoClose: 2000,
                        });
                        setTimeout(() => {
                            setLoading(false);
                        }, 500);
                    }
                }
            } else {
                toast.error('Password confirmation is not correct', {
                    transition: Flip,
                    autoClose: 2000,
                });
            }
        }
    };

    return (
        <>
            {loading ? <Loading /> : null}
            <div className={cx('profile-detail-item')}>
                <div className={cx('profile-detail-item-left')}>
                    <FontAwesomeIcon
                        icon={icon({ name: 'lock', style: 'solid' })}
                        className={cx('profile-detail-icon')}
                    />
                    <p className={cx('profile-detail-title')}>Password</p>
                </div>
                <span onClick={() => setShowPopup(true)}>
                    <Button text={'Update'} blackText smal />
                </span>
            </div>
            {showPopup ? (
                <div className={cx('popup-container')}>
                    <div className={cx('pass-overlay')}></div>
                    <div className={cx('pass-wrapper')}>
                        <div className={cx('pass-position')} onClick={() => setShowPopup(false)}>
                            <FontAwesomeIcon
                                icon={icon({ name: 'xmark', style: 'solid' })}
                                className={cx('pass-close')}
                            />
                        </div>
                        <div className={cx('pass-item')}>
                            <label className={cx('pass-label')}>Current Password</label>
                            <input
                                type={showCurrentPass ? 'text' : 'password'}
                                value={currentPass}
                                onChange={(e) => setCurrentPass(e.target.value)}
                                className={cx('pass-input')}
                            />
                            <span className={cx('pass-show')} onClick={() => setShowCurrentPass(!showCurrentPass)}>
                                {showCurrentPass ? (
                                    <FontAwesomeIcon
                                        icon={icon({ name: 'eye', style: 'regular' })}
                                        className={cx('pass-icon')}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={icon({ name: 'eye-slash', style: 'regular' })}
                                        className={cx('pass-icon')}
                                    />
                                )}
                            </span>
                        </div>
                        <div className={cx('pass-item')}>
                            <label className={cx('pass-label')}>New Password</label>
                            <input
                                type={showNewPass ? 'text' : 'password'}
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                className={cx('pass-input')}
                            />
                            <span className={cx('pass-show')} onClick={() => setShowNewPass(!showNewPass)}>
                                {showNewPass ? (
                                    <FontAwesomeIcon
                                        icon={icon({ name: 'eye', style: 'regular' })}
                                        className={cx('pass-icon')}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={icon({ name: 'eye-slash', style: 'regular' })}
                                        className={cx('pass-icon')}
                                    />
                                )}
                            </span>
                        </div>
                        <div className={cx('pass-item')}>
                            <label className={cx('pass-label')}>Confirm Password</label>
                            <input
                                type={showConfirmPass ? 'text' : 'password'}
                                value={confirmNewPass}
                                onChange={(e) => setConfirmNewPass(e.target.value)}
                                className={cx('pass-input')}
                            />
                            <span className={cx('pass-show')} onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                {showConfirmPass ? (
                                    <FontAwesomeIcon
                                        icon={icon({ name: 'eye', style: 'regular' })}
                                        className={cx('pass-icon')}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={icon({ name: 'eye-slash', style: 'regular' })}
                                        className={cx('pass-icon')}
                                    />
                                )}
                            </span>
                        </div>
                        <div className={cx('pass-btn')} onClick={() => handleChangeNewPass()}>
                            <Button text={'Save'} blackText />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default NewPass;
