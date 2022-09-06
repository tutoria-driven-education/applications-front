import React from 'react'
import { Calendar as BaseCalendar, utils } from 'react-modern-calendar-datepicker'
import { BaseFooter, Container } from './style'

const myCustomLocale = {
    months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    weekDays: [
        {
            name: 'Domingo',
            short: 'DOM',
            isWeekend: true,
        },
        {
            name: 'Segunda',
            short: 'SEG',
        },
        {
            name: 'Terça',
            short: 'TER',
        },
        {
            name: 'Quarta',
            short: 'QUA',
        },
        {
            name: 'QUINTA',
            short: 'QUI',
        },
        {
            name: 'SEXTA',
            short: 'SEX',
        },
        {
            name: 'SÁBADO',
            short: 'SAB',
            isWeekend: true,
        },
    ],

    weekStartingIndex: 0,

    getToday(gregorainTodayObject) {
        return gregorainTodayObject;
    },

    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit) {
        return digit;
    },

    nextMonth: 'Próximo mês',
    previousMonth: 'Mês anterior',
    openMonthSelector: 'Abrir seletor de mês',
    openYearSelector: 'Abrir seletor de ano',
    closeMonthSelector: 'Fechar seletor de mês',
    closeYearSelector: 'Fechar seletor de ano',
    defaultPlaceholder: '',

    from: 'de',
    to: 'até',

    digitSeparator: ',',

    yearLetterSkip: 0,

    isRtl: false,
}

export const Calendar = ({ apply, initialRange = { from: null, to: null } }) => {
    const [range, setRange] = React.useState(initialRange)
    return (
        <Container>
            <BaseCalendar
                value={range}
                onChange={(e) => setRange({ ...e })}
                colorPrimary={'#ff7bbd'}
                colorPrimaryLight="transparent"
                calendarClassName={'custom-calendar background-light'}
                locale={myCustomLocale}
                maximumDate={utils('en').getToday()}
                renderFooter={() => <BaseFooter onClick={() => apply(range)}>Aplicar</BaseFooter>}
            />
        </Container>
    )
}