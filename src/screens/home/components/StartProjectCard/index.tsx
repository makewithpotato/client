import { Card, Icon, Title, Description } from './index.styled';

export interface StartProjectCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick?: () => void;
}

export const StartProjectCard = ({ icon, title, description, onClick }: StartProjectCardProps) => {
    return (
        <Card onClick={onClick}>
            <Icon>{icon}</Icon>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Card>
    );
};
