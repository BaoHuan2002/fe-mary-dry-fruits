import Title from '../Main/Title/Title_Index';
import AboutIntro from './About_Intro';
import AboutItem from './About_Item';
import AboutOutstanding from './About_Outstanding';
import { World, User, Coffee, Eye } from '@/icons';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const About = () => {
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
            <AboutIntro />
            <div className={cx('about-quality-container')}>
                <Title heading={'Product Quality'} description={'Always bring customers the best products.'} />
                <div className={cx('about-quality-wrapper')}>
                    <div>
                        <AboutItem
                            title={'Flavors'}
                            icon={<Coffee className={cx('about-quanlity-icon')} />}
                            text={
                                'Embark on a taste journey with our diverse selection of dry fruits. From sweet to savory, our premium flavors promise a delightful experience for your palate.'
                            }
                        />
                        <AboutItem
                            title={'Cultivation'}
                            icon={<User className={cx('about-quanlity-icon')} />}
                            text={
                                'Experience the essence of quality in our dry fruits, carefully cultivated to perfection. Grown in finest orchards, each piece reflects our dedication to premium cultivation practices.'
                            }
                        />
                    </div>
                    <div>
                        <AboutItem
                            title={'Export'}
                            icon={<World className={cx('about-quanlity-icon')} />}
                            text={
                                'Explore global tastes with our dried fruits. From exotic origins to your doorstep, bringing international flavors to enhance your snacking experience.'
                            }
                        />
                        <AboutItem
                            title={'Testing'}
                            icon={<Eye className={cx('about-quanlity-icon')} />}
                            text={
                                'Trust in excellence. Our dry fruits undergo rigorous testing, meeting the highest standards. Enjoy a wholesome snacking experience with our tested and approved products.'
                            }
                        />
                    </div>
                </div>
            </div>
            <AboutOutstanding />
        </>
    );
};

export default About;
