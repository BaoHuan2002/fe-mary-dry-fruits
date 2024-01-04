import React from 'react';

import classNames from 'classnames/bind';
import styles from '../Detail.module.scss';

import { Star, StarCheck } from '@/icons';

const cx = classNames.bind(styles);

const DetailComment = ({ content, star, userName }) => {
    return (
        <div className={cx('detail-comment-container')}>
            <div className={cx('detail-comment-wrapper')}>
                <p className={cx('detail-comment-name')}>{userName}</p>
                <div className={cx('detail-comment-star')}>
                    {Array.from({ length: 5 }).map((_, index) =>
                        index < star ? (
                            <StarCheck key={index} className={cx('check')} />
                        ) : (
                            <Star key={index} className={cx('no-check')} />
                        ),
                    )}
                </div>
            </div>
            <p className={cx('detail-comment-text')}>{content}</p>
        </div>
    );
};

export default DetailComment;
