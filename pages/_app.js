
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/icons/@fortawesome/fontawesome-free/css/all.min.css';
import '../public/icons/ionicons/css/ionicons.min.css';

import '../public/css/nagoa.css';
import '../public/css/custom.css'
import "swiper/css/bundle";
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from '../redux/store';
import { withRouter, Router } from 'next/router'
import SimpleReactLightbox from 'simple-react-lightbox'
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import MainLayout from '../components/layout/MainLayout';
import OverlayComponent from '../components/overlay/OverlayComponent';


Router.events.on('routeChangeStart', (url) => {
    //console.log(`Loading: ${url}`)
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
function MyApp({ Component, pageProps }) {
    const store = useStore((state) => state);
    return (
        <PersistGate persistor={store.__persistor} >
            <OverlayComponent/>
            <SimpleReactLightbox>
                
                <MainLayout>
                    
                    <Component {...pageProps} />
                   
                </MainLayout>
            </SimpleReactLightbox>
        </PersistGate>
                    
    ) 


}
MyApp.getInitialProps = async ({ Component, ctx }) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps: pageProps };
}
export default withRouter(wrapper.withRedux(MyApp))