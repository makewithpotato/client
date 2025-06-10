import { TabBarWrapper, Tab } from './index.styled';

export const TabBar = ({ active, onTab }: { active: 'all' | 'shared'; onTab: (tab: 'all' | 'shared') => void }) => (
    <TabBarWrapper>
        <Tab active={active === 'all'} onClick={() => onTab('all')}>
            All
        </Tab>
        <Tab active={active === 'shared'} onClick={() => onTab('shared')}>
            Shared with me
        </Tab>
    </TabBarWrapper>
);
