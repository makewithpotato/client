import { Container, Message, Title } from './index.styled';

export const MobileBlocker = () => {
    return (
        <Container>
            <Title>모바일 환경에서는 이용할 수 없습니다</Title>
            <Message>
                원활한 서비스 이용을 위해
                <br />
                PC 접속 또는 브라우저의 '데스크탑 사이트' 기능을 이용해 주세요.
            </Message>
        </Container>
    );
};
