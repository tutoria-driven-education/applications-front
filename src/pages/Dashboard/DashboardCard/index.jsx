import React from 'react';
import { Container, Title } from './style';

export const DashboardCard = ({ children, title, theme, minWidth }) => {
    return (
        <Container theme={theme} minWidth={minWidth}>
            <Title>{title}</Title>
            {children}
        </Container>
    )
}