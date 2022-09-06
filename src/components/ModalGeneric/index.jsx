import React from 'react';
import { Modal } from '@mui/material';
import { Container } from './style';

export const ModalGeneric = ({ open, onClose, children, backgroundVisible = false }) => {
    return (
        <Modal
            BackdropProps={{ invisible: backgroundVisible }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            open={open}
            onClose={() => onClose()}
        >
            <Container>
                {children}
            </Container>
        </Modal>
    )
}