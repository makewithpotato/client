import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomeScreen, MyProgramBooksScreen } from '@/screens';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/myprogrambooks" element={<MyProgramBooksScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
