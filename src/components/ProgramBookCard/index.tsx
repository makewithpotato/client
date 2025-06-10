import { Card, Poster, Content, Title, Subtitle } from './index.styled';

export interface ProgramBookCardProps {
    image: string;
    title: string;
    subtitle: string;
}

export const ProgramBookCard = ({ image, title, subtitle }: ProgramBookCardProps) => (
    <Card>
        <Poster src={image} alt={title} />
        <Content>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
        </Content>
    </Card>
);
