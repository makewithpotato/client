import { Card, Poster, Content, Title, Subtitle } from './index.styled';

export interface ProgramBookCardProps {
    image: string;
    title: string;
    subtitle?: string;
    onClick?: () => void;
}

export const ProgramBookCard = ({ image, title, subtitle, onClick }: ProgramBookCardProps) => (
    <Card onClick={onClick}>
        <Poster src={image} alt={title} />
        <Content>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Content>
    </Card>
);
