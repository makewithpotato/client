import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { coverStyles } from '../styles/cover';

interface CoverPageProps {
    title: string;
}

export const CoverPage: React.FC<CoverPageProps> = ({ title }) => (
    <Page size="A4" style={coverStyles.page}>
        <View style={coverStyles.container}>
            <Text style={coverStyles.title}>{title}</Text>
        </View>
    </Page>
);
