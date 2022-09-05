import React, { useEffect } from 'react';
import { Box, DateInput } from 'grommet';
import { Container } from './style';

const dateFormat = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
});

export const RangePicker = ({ onChangeValue, initValue }) => {
    const [value, setValue] = React.useState(initValue);

    const onChange = (event) => {
        const nextValue = event.value;
        setValue(nextValue);
    };

    useEffect(() => { onChangeValue(value) }, [value])

    return (
        <Container>
            <Box align="center" pad="large">
                <DateInput
                    value={value}
                    locale="pt-BR"
                    calendarProps={{
                        style: { borderRadius: 5 },
                        locale: 'pt-BR'
                    }}
                    dropProps={{
                        style: { borderRadius: 5, marginTop: 10, maxWidth: 384 },
                    }}
                    buttonProps={{
                        label: `${dateFormat.format(new Date(value[0]))} - ${dateFormat.format(new Date(value[1]))}`,
                    }}
                    onChange={onChange}
                />
            </Box>
        </Container>
    );
};