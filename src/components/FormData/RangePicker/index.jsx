import "react-modern-calendar-datepicker/lib/DatePicker.css";
import React, { useEffect } from 'react'
import { BiCalendar, BiX } from 'react-icons/bi'
import { BaseInput, ContainerRemove } from './style'
import { Calendar } from './Calendar';
import { ModalGeneric } from '../../ModalGeneric';

const copyOf = (obj) => JSON.parse(JSON.stringify(obj))

const correctDateRange = (date) => {
    if (!date) return ''
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    date = new Date(date)
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
    const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`
    const year = date.getFullYear()
    return `${day} ${months[month - 1]} ${year}`
}

const generateDate = (date) => {
    return date?.day ? new Date(date.year, date.month - 1, date.day) : null
}

const maskDate = ({ from, to }) => {
    const date_from = generateDate(from)
    const date_to = generateDate(to)
    if (from && to) {
        if (date_from?.getTime() === date_to?.getTime()) return `${correctDateRange(date_from)}`
        return `${correctDateRange(date_from)} - ${correctDateRange(date_to)}`
    }
    if (from) return `${correctDateRange(date_from)}`
    if (to) return `${correctDateRange(date_to)}`
    else return ''
}

export const RangePicker = ({ onChange, disabled = false, noRemove = false, initialRange = { from: null, to: null } }) => {
    const [range, setRange] = React.useState(initialRange)
    const [showCalendar, setShowCalendar] = React.useState(false)

    const applyRange = (range) => {
        setRange(range)
        setShowCalendar(false)
    }

    useEffect(() => { onChange(range) }, [range])

    return (
        <>
            <BaseInput disabled={disabled} haveValue={range.from || range.to}>
                <div onClick={() => setShowCalendar(true)} style={{ display: "flex", padding: ".375rem .75rem", flex: 1, height: "100%", alignItems: "center", gap: 5 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <BiCalendar size={19} color={disabled ? '#999999' : "#3a3a3a"} />
                    </div>
                    {(range.from || range.to) &&
                        <div style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
                            {maskDate(range)}
                        </div>
                    }
                </div>
                {(range.from || range.to) && !disabled && !noRemove &&
                    <ContainerRemove onClick={() => setRange({ from: null, to: null })}>
                        <BiX size={22} />
                    </ContainerRemove>
                }
                {/* !range.from?<div className="teste" onClick={() => setShowCalendar(true)} style={{ marginRight:"100px", fontSize:"14px" }}>Data</div>: */}
            </BaseInput>
            <ModalGeneric open={showCalendar} onClose={() => setShowCalendar(false)}>
                <Calendar
                    apply={applyRange}
                    initialRange={copyOf(range)}
                />
            </ModalGeneric>
        </>
    )
}