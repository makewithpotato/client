import { privateServerInstance } from '../api/axios';
import type {
    ProgramBookResponse,
    ProgramBookDetailResponse,
    ProgramBookCreateRequest,
    ProgramBookCreateResponse,
} from '@/types/programBook';

const PROGRAMBOOK_API = {
    /**
     * 프로그램북 목록을 가져옵니다.
     * @returns 프로그램북 목록 응답
     * @author 김동현
     */
    getProgramBookList: async (): Promise<ProgramBookResponse> => {
        const response = await privateServerInstance.get<ProgramBookResponse>('/api/programbook');
        return response.data;
    },

    /**
     * 프로그램북 상세 정보를 가져옵니다.
     * @param programbookId 프로그램북 ID
     * @returns 프로그램북 상세 정보 응답
     * @author 김동현
     */
    getProgramBookDetail: async (programbookId: number): Promise<ProgramBookDetailResponse> => {
        const response = await privateServerInstance.get<ProgramBookDetailResponse>(
            `/api/programbook/${programbookId}`
        );
        return response.data;
    },

    /**
     * 프로그램북을 생성합니다.
     * @param data 프로그램북 생성 요청 데이터
     * @returns 프로그램북 생성 응답
     * @author 김동현
     */
    createProgramBook: async (data: ProgramBookCreateRequest): Promise<ProgramBookCreateResponse> => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('pdfFile', data.pdfFile);

        const response = await privateServerInstance.post<ProgramBookCreateResponse>('/api/programbook', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

export default PROGRAMBOOK_API;
