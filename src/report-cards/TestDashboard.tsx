import { useMemo } from 'react';
import { Card, Group, Text } from '@mantine/core';
import classes from '../../src/css-module/Card.module.css';
import greenTick from "../../src/assets/green-tick.svg"
import accessibilityIcon from '../../src/assets/accessibility-icon1.svg';
import UseCustomThemes from '../custom-hooks/UseCustomThemes';

interface TestDashboardProps {
    selectedPaletteId: number;
    mode: string;
}

const dashboardOptionsList = [{
    id: 1,
    icon: greenTick,
    text: 'Unit Test Passed {} / {}',
},
{
    id: 2,
    icon: greenTick,
    text: 'Component Tests Passed {} / {}',
},
{
    id: 3,
    icon: accessibilityIcon,
    text: 'Accessibility: WCAG AA',
}]

const TestDashboard = ({ selectedPaletteId, mode }: TestDashboardProps) => {
    const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId])

    return (
        <>
            <Card withBorder radius="md" p="md" className={classes.card}
                style={{ color: mode === 'light' ? 'white' : 'black', background: `${theme.color2}50`, }}
            >
                <Card.Section className={classes.section} mt="md" >
                    <Group justify="apart">
                        <Text fz="lg" fw={500}>
                            Test Dashboard
                        </Text>
                    </Group>
                </Card.Section >

                <Card.Section className={classes.section}>
                    <Group gap={7} mt={20} mb={14}>
                        {/* list */}
                        {dashboardOptionsList.map((option) => {
                            return (
                                <div key={option.id}
                                    style={{
                                        background: `${theme.color4}40`,
                                    }}
                                    className={`option ${mode === 'light' ? 'option-dark' : 'option-light'}`}>
                                    <img src={option.icon} alt="icon" width={16} height={16} />
                                    {option.text}
                                </div>
                            )
                        })}
                    </Group>
                </Card.Section>
            </Card >
        </>
    )
}

export default TestDashboard


