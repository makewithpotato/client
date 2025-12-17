import Router from './navigation/Router';
import { useIsMobile } from '@/hooks';
import { MobileBlocker } from '@/components';

function App() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <MobileBlocker />;
    }

    return <Router />;
}

export default App;
