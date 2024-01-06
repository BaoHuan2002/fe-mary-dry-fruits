import classNames from 'classnames/bind';
import styles from '../Profile.module.scss';
import { useEffect, useState } from 'react';
import { dataUser, editDataUser } from '@/service/User_Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Button from '@/components/Button/ButtonIndex';
import images from '@/assets';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';
import { useShoppingContext } from '@/contexts/Shopping_Context';
import NewPass from './New_Pass';

const cx = classNames.bind(styles);

const AccountInformation = () => {
    const [data, getData] = useState('');
    const [avatar, setAvatar] = useState(images.avatar);
    const [isImageError, setIsImageError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [newFullName, setNewFullName] = useState('');

    const [phone, setPhone] = useState(false);
    const [newPhone, setNewPhone] = useState('');

    const [address, setAddress] = useState(false);
    const [newAddress, setNewAddress] = useState('');

    const [errorPhone, setErrorPhone] = useState('');
    const [errorAddress, setErrorAddress] = useState('');

    const navigate = useNavigate();
    const { clearCart } = useShoppingContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await dataUser();
                if (res && res.success === true && res.response.status === 1) {
                    let phone = res.response.phone || '';
                    let address = res.response.address || '';
                    let fullName = res.response.full_name || '';
                    getData(res.response);
                    setNewFullName(fullName);
                    setNewPhone(phone);
                    setNewAddress(address);
                } else {
                    getData([]);
                    localStorage.removeItem('jwt');
                    clearCart();
                    navigate('/account/login');
                }
            } catch (error) {
                navigate('/account/login');
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };
        fetchData();
    }, []);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageError = () => {
        setIsImageError(true);
    };

    const handleEditUser = async () => {
        if (!newFullName) {
            toast.error('Full Name cannot be empty', {
                transition: Flip,
                autoClose: 2000,
            });
            return setNewFullName(data.full_name);
        } else {
            setLoading(true);
            try {
                const res = await editDataUser(newFullName, newPhone, newAddress);
                if (res && res.success === true) {
                    toast.success('Update Full Name Success', {
                        transition: Flip,
                        autoClose: 2000,
                    });
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            } catch (error) {
                toast.error('Update Full Name Failed', {
                    transition: Flip,
                    autoClose: 2000,
                });
            }
        }
    };

    const handleNewPhone = async () => {
        setPhone(!phone);
        if (phone) {
            if (!newPhone || !(newPhone.length >= 10 && newPhone.length <= 11) || isNaN(newPhone) === true) {
                setErrorPhone('Please do not leave blank and your phone number must be valid.');
                setPhone(true);
            } else {
                setErrorPhone(false);
                setLoading(true);
                const res = await editDataUser(newFullName, newPhone, newAddress);
                if (res && res.success === true) {
                    setPhone(false);
                    toast.success('Update Phone Success', {
                        transition: Flip,
                        autoClose: 2000,
                    });
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            }
        }
    };

    const handleNewAddress = async () => {
        setAddress(!address);
        if (address) {
            if (!newAddress) {
                setErrorAddress('Please do not leave blank');
                setAddress(true);
            } else {
                setErrorAddress(false);
                setLoading(true);
                const res = await editDataUser(newFullName, newPhone, newAddress);
                if (res && res.success === true) {
                    setAddress(false);
                    toast.success('Update Address Success', {
                        transition: Flip,
                        autoClose: 2000,
                    });
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            }
        }
    };

    return (
        <>
            {loading === true ? <Loading /> : null}
            <div className={cx('profile-detail-container')}>
                <div className={cx('profile-detail-wrapper')}>
                    <h2 className={cx('profile-detail-heading')}>Account Information</h2>
                    <div className={cx('profile-detail-info')}>
                        <div className={cx('profile-detail-outner-image')}>
                            <img
                                src={isImageError ? images.avatar_default : avatar}
                                alt="avatar"
                                className={cx('profile-detail-image')}
                                onError={handleImageError}
                            />
                            <label htmlFor="avatar">
                                <FontAwesomeIcon
                                    icon={icon({ name: 'pen-to-square', style: 'regular' })}
                                    className={cx('profile-avatar-edit')}
                                />
                            </label>
                        </div>
                        <input type="file" id="avatar" hidden onChange={handleAvatarChange} />
                        <div className={cx('profile-detail-wrap')}>
                            <div className={cx('profile-detail-outner-input')}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className={cx('profile-detail-input')}
                                    value={newFullName}
                                    onChange={(e) => setNewFullName(e.target.value)}
                                />
                            </div>

                            <div className={cx('profile-detail-outner-input')}>
                                <label>Email</label>
                                <input type="text" className={cx('profile-detail-input')} value={data.email || ''} disabled />
                            </div>

                            <div className={cx('profile-detail-outner-input')}>
                                <label>Level</label>
                                <input
                                    type="text"
                                    className={cx('profile-detail-input')}
                                    value={data.level === 1 ? 'Admin' : 'Member'}
                                    disabled
                                />
                            </div>

                            <div className={cx('profile-detail-btn')} onClick={() => handleEditUser()}>
                                <Button text={'Save'} blackText />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('profile-detail-wrapper')}>
                    <div className={cx('profile-detail-main')}>
                        <div className={cx('profile-detail-item')}>
                            <div className={cx('profile-detail-item-left')}>
                                <FontAwesomeIcon
                                    icon={icon({ name: 'phone', style: 'solid' })}
                                    className={cx('profile-detail-icon')}
                                />
                                <p className={cx('profile-detail-title')}>Phone</p>
                                <span className={cx('profile-detail-dots')}>:</span>
                                {phone ? (
                                    <input
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                        className={cx('profile-detail-change')}
                                    />
                                ) : (
                                    <span className={cx('profile-detail-show')}>{newPhone}</span>
                                )}
                            </div>
                            <div onClick={() => handleNewPhone()}>
                                <Button text={phone ? 'Save' : 'Update'} blackText smal />
                            </div>
                        </div>

                        {errorPhone ? <p className={cx('error-mess')}>{errorPhone}</p> : ''}

                        <div className={cx('profile-detail-item')}>
                            <div className={cx('profile-detail-item-left')}>
                                <FontAwesomeIcon
                                    icon={icon({ name: 'map', style: 'solid' })}
                                    className={cx('profile-detail-icon')}
                                />
                                <p className={cx('profile-detail-title')}>Address</p>
                                <span className={cx('profile-detail-dots')}>:</span>
                                {address ? (
                                    <input
                                        value={newAddress}
                                        onChange={(e) => setNewAddress(e.target.value)}
                                        className={cx('profile-detail-change')}
                                    />
                                ) : (
                                    <div className={cx('profile-detail-address')}>
                                        <span className={cx('profile-detail-add')}>{newAddress}</span>
                                    </div>
                                )}
                            </div>

                            <span onClick={() => handleNewAddress()}>
                                <Button text={address ? 'Save' : 'Update'} blackText smal />
                            </span>
                        </div>

                        {errorAddress ? <p className={cx('error-mess')}>{errorAddress}</p> : ''}

                        <NewPass />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountInformation;
