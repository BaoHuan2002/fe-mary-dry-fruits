import { NormalBanner, ParallaxBanner } from './BannerSale/Banner_Sale_Index';
import BestProducts from './BestProducts/Best_Product_Index';
import Slide from './Slide/Slider_Index';
import PremiumProducts from './PremiumProducts/Premium_Product_Index';
import Benefit from './Benefit/Benefit_Index';
import CategoryProduct from './CategoryProduct/Category_Product';
import { useEffect, useState } from 'react';
import { topProduct, premiumProduct } from '@/service/Product_Service';
import { Banner } from '@/service/Banner_Service';
import FadeLoader from 'react-spinners/FadeLoader';
import classNames from 'classnames/bind';
import styles from '@/components/GlobalStyles/GlobalStyles.scss';

const cx = classNames.bind(styles);

const Main = () => {
    const [products, setProducts] = useState([]);
    const [preProducts, setPreProducts] = useState([]);
    const [sliderBanners, setSliderBanners] = useState([]);
    const [parallaxBanner, setParallaxBanner] = useState([]);
    const [normalBanner, setNormalBanner] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resSliderBanner = await Banner(1);
                const resNormalBanner = await Banner(2);
                const resParallaxBanner = await Banner(3);
                const resTopProduct = await topProduct();
                const resPremiumProduct = await premiumProduct();

                if (resSliderBanner.success && resSliderBanner.response) {
                    setSliderBanners(resSliderBanner.response);
                }

                if (resParallaxBanner.success && resSliderBanner.response) {
                    setParallaxBanner(resParallaxBanner.response);
                }

                if (resNormalBanner.success && resSliderBanner.response) {
                    setNormalBanner(resNormalBanner.response);
                }

                if (resTopProduct.success && resTopProduct.response) {
                    setProducts(resTopProduct.response);
                }

                if (resPremiumProduct.success && resPremiumProduct.response) {
                    setPreProducts(resPremiumProduct.response);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setProducts([]);
                setPreProducts([]);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading === true ? (
                <div className={cx('loading-container')}>
                    <FadeLoader
                        color="#1877f2"
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <div>Loading Data...</div>
                </div>
            ) : (
                <div>
                    <Slide banners={sliderBanners} />
                    <BestProducts products={products} />
                    <ParallaxBanner banners={parallaxBanner} />
                    <CategoryProduct />
                    <NormalBanner banners={normalBanner} />
                    <PremiumProducts premiumProducts={preProducts} />
                    <Benefit />
                </div>
            )}
        </div>
    );
};

export default Main;
