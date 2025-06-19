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
} from '@/screens';
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
                <Route path="/myprogrambooks" element={<MyProgramBooksScreen />} />
                <Route path="/mymovies/list" element={<MyMoviesScreen />} />
                <Route path="/mymovies/upload" element={<MovieUploadScreen />} />
                <Route path="/mymovies/analyze" element={<MovieAnalyzeScreen />} />
                <Route path="/mymovies/analyze/:movieId" element={<MovieAnalyzeScreen />} />
                <Route path="/newprogrambook" element={<ResetProgramBookAtoms />} />
                <Route path="/newprogrambook/select" element={<SelectMoviesScreen />} />
                <Route path="/newprogrambook/layout" element={<LayoutScreen />} />
                <Route path="/newprogrambook/review" element={<ReviewScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
