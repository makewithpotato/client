import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import {
    HomeScreen,
    MyProgramBooksScreen,
    MyMoviesScreen,
    SelectMoviesScreen,
    LayoutScreen,
    ReviewScreen,
    MovieUploadScreen,
    MovieAnalyzeScreen,
    LoginScreen,
    ProgramBookDetailScreen,
} from '@/screens';
import { PrivateRoute } from '@/components/PrivateRoute';
import {
    programBookAtom,
    currentMovieLayoutAtom,
    movieDraggedItemsAtom,
    movieLayoutsAtom,
    pdfFilePathAtom,
    selectedLayoutAtom,
} from '@/atoms/programBook';

// Atom 초기화를 위한 컴포넌트
const ResetProgramBookAtoms = () => {
    const setProgramBook = useSetAtom(programBookAtom);
    const setCurrentMovieLayout = useSetAtom(currentMovieLayoutAtom);
    const setMovieDraggedItems = useSetAtom(movieDraggedItemsAtom);
    const setMovieLayouts = useSetAtom(movieLayoutsAtom);
    const setPdfFilePath = useSetAtom(pdfFilePathAtom);
    const setSelectedLayout = useSetAtom(selectedLayoutAtom);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // atom들을 초기값으로 리셋
        setProgramBook({ title: '', description: '', movies: [] });
        setCurrentMovieLayout(null);
        setMovieDraggedItems({});
        setMovieLayouts({});
        setPdfFilePath('');
        setSelectedLayout('1');

        // sessionStorage의 PDF 관련 데이터도 삭제
        sessionStorage.removeItem('pdfFilename');
        sessionStorage.removeItem('pdfBlobSize');

        // select 페이지로 리다이렉트
        if (location.pathname === '/newprogrambook') {
            navigate('/newprogrambook/select', { replace: true });
        }
    }, [
        location.pathname,
        navigate,
        setCurrentMovieLayout,
        setMovieDraggedItems,
        setMovieLayouts,
        setPdfFilePath,
        setProgramBook,
        setSelectedLayout,
    ]);

    return null;
};

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/auth/google/callback" element={<LoginScreen />} />

                {/* Protected Routes */}
                {/* <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomeScreen />
                        </PrivateRoute>
                    }
                /> */}
                <Route
                    path="/myprogrambooks/list"
                    element={
                        <PrivateRoute>
                            <MyProgramBooksScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/mymovies/list"
                    element={
                        <PrivateRoute>
                            <MyMoviesScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/mymovies/upload"
                    element={
                        <PrivateRoute>
                            <MovieUploadScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/mymovies/analyze"
                    element={
                        <PrivateRoute>
                            <MovieAnalyzeScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/mymovies/analyze/:movieId"
                    element={
                        <PrivateRoute>
                            <MovieAnalyzeScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/newprogrambook"
                    element={
                        <PrivateRoute>
                            <ResetProgramBookAtoms />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/newprogrambook/select"
                    element={
                        <PrivateRoute>
                            <SelectMoviesScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/newprogrambook/layout"
                    element={
                        <PrivateRoute>
                            <LayoutScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/newprogrambook/review"
                    element={
                        <PrivateRoute>
                            <ReviewScreen />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/myprogrambooks/detail/:id"
                    element={
                        <PrivateRoute>
                            <ProgramBookDetailScreen />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
