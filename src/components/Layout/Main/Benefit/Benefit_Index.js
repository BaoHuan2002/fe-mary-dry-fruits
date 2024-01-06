import { ArrowRotate, Suitcase, Clock } from '@/icons';
import BenefitItem from './Benefit_Item';

import classNames from 'classnames/bind';
import styles from './Benefit.module.scss';

const cx = classNames.bind(styles);

function BenefitIndex() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('benefit')}>
                <BenefitItem
                    title={'Money Back Guarantee'}
                    description={
                        "Our Money Back Guarantee promises a refund if you're not completely satisfied. Shop worry-free with us."
                    }
                    icon={<ArrowRotate />}
                />
                <BenefitItem
                    title={'Free Shipping'}
                    description={
                        'Enjoy the convenience of Free Delivery, bringing the best products right to your door at no additional cost.'
                    }
                    icon={<Suitcase />}
                />
                <BenefitItem
                    title={'24/7 Customer Service'}
                    description={
                        'Our team is available to assist you 24/7, ensuring you have a seamless and satisfying shopping journey.'
                    }
                    icon={<Clock />}
                />
            </div>
        </div>
    );
}

export default BenefitIndex;
