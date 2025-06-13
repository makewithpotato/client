import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
    HomeScreen,
    MyProgramBooksScreen,
    MyMoviesScreen,
    SelectMoviesScreen,
    LayoutScreen,
    ReviewScreen,
} from '@/screens';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/myprogrambooks" element={<MyProgramBooksScreen />} />
                <Route path="/mymovies" element={<MyMoviesScreen />} />
                <Route path="/newprogrambook/select" element={<SelectMoviesScreen />} />
                <Route path="/newprogrambook/layout" element={<LayoutScreen />} />
                <Route path="/newprogrambook/review" element={<ReviewScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
