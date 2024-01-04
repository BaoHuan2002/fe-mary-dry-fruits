import { StarCheck, Star } from '@/icons';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentProduct.module.scss';
import axios from '@/service/axios';
import { toast, Flip } from 'react-toastify';
import Button from '@/components/Button/ButtonIndex';

const cx = classNames.bind(styles);

const CommentProduct = ({ id, permission, text, reload }) => {
    const [data, setData] = useState({
        content: '',
        product_id: id,
        star: 0,
    });

    const handleContent = (e) => {
        setData({ ...data, content: e.target.value });
    };
    const handleChooseStar = (index) => {
        setData({ ...data, star: index });
    };

    const handleComment = async () => {
        try {
            toast.dismiss();
            if (!permission) {
                toast.error(text, {
                    transition: Flip,
                    autoClose: 2000,
                });
                return;
            }
            if (data.content.length < 1) {
                toast.error('Please enter content!!', {
                    transition: Flip,
                    autoClose: 2000,
                });
                return;
            }

            let res = await axios.post('/api/review/review', {
                content: data.content,
                star: data.star >= 1 ? data.star : 5,
                product_id: data.product_id,
            });
            reload();
        } catch (error) {
            console.error('Comment error:', error);
        }
    };

    return (
        <div className={cx('container-comment')}>
            <div className={cx('star')}>
                <span className={cx('star-comment')}>Quality Evalution: </span>{' '}
                <div className={cx('star-check')}>
                    {Array.from({ length: 5 }).map((_, index) =>
                        index < data.star ? (
                            <div onClick={() => handleChooseStar(index + 1)} key={index}>
                                <StarCheck className={cx('check')} />
                            </div>
                        ) : (
                            <div onClick={() => handleChooseStar(index + 1)} key={index}>
                                <Star key={index} className={cx('no-check')} />
                            </div>
                        ),
                    )}
                </div>
            </div>
            <div className={cx('comment-product')}>
                <textarea
                    placeholder="Comment"
                    className={cx('comment-area')}
                    value={data.content}
                    onChange={(e) => handleContent(e)}
                ></textarea>
                <div onClick={handleComment} className={cx('comment-btn')}>
                    <Button text={'Submit'} blackText />
                </div>
                {text}
            </div>
        </div>
    );
};

export default CommentProduct;
