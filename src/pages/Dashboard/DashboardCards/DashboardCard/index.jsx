import React from 'react';
import { Container, Title } from './style';

export const DashboardCard = ({ children, title, theme, minWidth, minHeight = null }) => {
    return (
        <Container theme={theme} minWidth={minWidth} minHeight={minHeight}>
            <Title>{title}</Title>
            {children}
        </Container>
    )
}