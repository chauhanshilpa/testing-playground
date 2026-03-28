import { useMemo } from 'react';
import { Card, Group, Text, Switch, Button } from '@mantine/core';
import classes from '../../src/css-module/Card.module.css';
import undoIcon from "../../src/assets/undo.svg"
import redoIcon from "../../src/assets/redo.svg"
import { colorSchemeList } from '../constant';
import UseCustomThemes from '../custom-hooks/UseCustomThemes';

interface ThemeEngineProps {
    selectedPaletteId: number;
    setSelectedPaletteId: React.Dispatch<React.SetStateAction<number>>;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeEngine = ({ selectedPaletteId, setSelectedPaletteId, mode, setMode }: ThemeEngineProps) => {
    const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId])

    return (
        <Card withBorder radius="md" p="md" className={classes.card} style={{ color: mode === 'light' ? 'white' : 'black', background: `${theme.color2}50`, }}>
            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        Theme Engine
                    </Text>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        Dark Mode
                        <Switch
                            styles={{
                                track: {
                                    backgroundColor: `${theme.color4}40`,
                                },
                                trackLabel: {
                                    color: mode === 'light' ? 'white' : 'black'
                                },
                            }}
                            checked={
                                mode === 'light' ?
                                    false
                                    :
                                    true
                            }
                            onLabel="ON"
                            offLabel="OFF"
                            className={classes.switch}
                            size="lg"
                            aria-label='Dark Mode'
                            onChange={() => {
                                if (mode === 'light') {
                                    setMode('dark')
                                } else {
                                    setMode("light")
                                }
                            }}
                        />
                    </Text>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        Color Scheme
                    </Text>
                </Group>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-around' }}>
                    {colorSchemeList.map((palette) => {
                        return (
                            <div key={palette.paletteId} className={classes.palette} onClick={() => setSelectedPaletteId(palette.paletteId)} style={{ background: `linear-gradient(to right, ${palette.color1}, ${palette.color2}, ${palette.color3}, ${palette.color4})` }}>

                            </div>
                        )
                    })}
                </div>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={7} mt={5}>
                    <Button
                        // variant="light"
                        radius="l"
                        size="s"
                        pr={14}
                        h={48}
                        styles={{ section: { marginLeft: 22 } }}
                        style={{ background: `${theme.color4}40`, color: mode === 'light' ? 'white' : 'black' }}
                        onClick={() => {
                            if (mode === 'light') {
                                setMode('dark')
                            } else {
                                setMode("light")
                            }
                        }}
                    >
                        <img src={undoIcon} alt="icon" width={16} height={16} />
                        Undo
                    </Button>
                    <Button
                        // variant="light"
                        radius="l"
                        size="s"
                        pr={14}
                        h={48}
                        styles={{ section: { marginLeft: 22 } }}
                        style={{ background: `${theme.color4}40`, color: mode === 'light' ? 'white' : 'black' }}
                        onClick={() => {
                            if (mode === 'light') {
                                setMode('dark')
                            } else {
                                setMode("light")
                            }
                        }}
                    >
                        <img src={redoIcon} alt="icon" width={16} height={16} />
                        Redo
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    )
}

export default ThemeEngine
