import { Card, Icon } from './index.styled';

export interface StartProjectCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const StartProjectCard = ({ icon, title, description }: StartProjectCardProps) => (
    <Card>
        <Icon>{icon}</Icon>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{title}</div>
        <div style={{ color: '#a08b8b', fontSize: 14 }}>{description}</div>
    </Card>
);
