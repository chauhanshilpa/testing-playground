import { useMemo } from "react";
import { Button, Card, Group, Text } from '@mantine/core';
import classes from '../../src/css-module/Card.module.css';
import gridViewIcon from "../../src/assets/grid.svg";
import listViewIcon from "../../src/assets/list.svg";
import greenTick from "../../src/assets/green-tick.svg";
import UseCustomThemes from '../custom-hooks/UseCustomThemes';

interface LayoutEngineProps {
    setLayout: React.Dispatch<React.SetStateAction<string>>;
    selectedPaletteId: number;
    mode: string;
}

const layoutAccessibilityOptionsList = [
    {
        id: 1,
        shortCutKeys: 'Ctrl + G',
        icon: gridViewIcon,
        featureName: 'Grid View'
    },
    {
        id: 2,
        shortCutKeys: 'Ctrl + L',
        icon: listViewIcon,
        featureName: 'List View'
    },
]

const LayoutEngine = ({ setLayout, selectedPaletteId, mode }: LayoutEngineProps) => {
    const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId])
    return (
        <Card withBorder radius="md" p="md" className={classes.card} style={{ color: mode === 'light' ? 'white' : 'black', background: `${theme.color2}50`, }}>
            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        Layout Engine
                    </Text>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={7} mt={5}>
                    <Button
                        radius="l"
                        size="s"
                        pr={14}
                        h={48}
                        styles={{ section: { marginLeft: 22 } }}
                        style={{ background: `${theme.color4}40`, color: mode === 'light' ? 'white' : 'black' }}
                        onClick={() => setLayout('grid')}
                    >
                        <img src={gridViewIcon} alt="icon" width={16} height={16} style={{ filter: mode === 'light' ? '' : 'invert(1)' }} />
                        Grid
                    </Button>
                    <Button
                        radius="l"
                        size="s"
                        pr={14}
                        h={48}
                        styles={{ section: { marginLeft: 22 } }}
                        style={{ background: `${theme.color4}40`, color: mode === 'light' ? 'white' : 'black' }}
                        onClick={() => setLayout('list')}
                    >
                        <img src={listViewIcon} alt="icon" width={16} height={16} style={{ filter: mode === 'light' ? '' : 'invert(1)' }} />
                        List
                    </Button>
                </Group>
            </Card.Section>
            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    {layoutAccessibilityOptionsList.map((option) => {
                        return (
                            <div key={option.id}
                                style={{
                                    background: `${theme.color4}40`,
                                }}
                                className={`option ${mode === 'light' ? 'option-dark' : 'option-light'}`}
                            >
                                <img src={greenTick} alt="icon" width={16} height={16} />
                                {option.shortCutKeys}
                                <img src={option.icon} alt="icon" width={16} height={16} style={{ filter: mode === 'light' ? '' : 'invert(1)' }} />
                                {option.featureName}
                            </div>
                        )
                    })}
                </Group>
            </Card.Section>
        </Card>
    )
}

export default LayoutEngine
