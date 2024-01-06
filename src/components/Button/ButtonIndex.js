import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ButtonIndex.module.scss';

const cx = classNames.bind(styles);

function ButtonIndex({
    text,
    link,
    primary = true,
    normal = false,
    big = false,
    smal = false,
    blackText = false,
    active = false,
    disabled = false,
}) {
    return (
        <div className={cx('container')}>
            <div className={cx('btn-wrapper')}>
                <Link
                    to={link}
                    className={cx('btn-link', {
                        primary: primary,
                        normal: normal,
                        big: big,
                        smal: smal,
                        blackText: blackText,
                        active: active,
                        disabled: disabled,
                    })}
                >
                    {text}
                </Link>
            </div>
        </div>
    );
}

export default ButtonIndex;
