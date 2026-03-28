import { useMemo } from 'react';
import { Card, Group, Text } from '@mantine/core';
import classes from '../../src/css-module/Card.module.css';
import bot from "../../src/assets/bot.png";
import { useState } from 'react';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { ActionIcon, TextInput } from '@mantine/core';
import {
    GoogleGenAI,
    ThinkingLevel,
} from '@google/genai';
import UseCustomThemes from '../custom-hooks/UseCustomThemes';

interface AiChatAssistanceProps {
    selectedPaletteId: number,
    mode: string,
}

const AiChatAssistance = ({ selectedPaletteId, mode }: AiChatAssistanceProps) => {
    const [inputText, setInputText] = useState('');
    const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId])

    async function handleQuery() {
        const ai = new GoogleGenAI({
            // apiKey: import.meta.env.VITE_GEMINI_API_KEY,
        });
        const tools = [
            {
                googleSearch: {
                }
            },
        ];
        const config = {
            thinkingConfig: {
                thinkingLevel: ThinkingLevel.HIGH,
            },
            tools,
        };
        const model = 'gemini-2.5-flash';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: inputText,
                    },
                ],
            },
        ];
        try {
            const response = await ai.models.generateContentStream({
                model,
                config,
                contents,
            });
            console.log('after response', response);
        } catch (error) {
            console.error('API Error:', error);  // ← This will reveal the real issue
        }
        for await (const chunk of response) {
            console.log('hello', chunk.text);
        }
    }

    return (
        <Card withBorder radius="md" p="md" className={classes.card} style={{ color: mode === 'light' ? 'white' : 'black', background: `${theme.color2}50` }}>
            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        <img src={bot} alt="icon" width={18} height={18} />
                        Hi there!
                    </Text>
                    <Text fz="lg" fw={500}>
                        How can I help you today
                    </Text>
                    <Text fz="lg" fw={500}>
                        <div style={{ '--placeholder-color': mode === 'light' ? 'white' : 'black' } as React.CSSProperties}>
                            <TextInput
                                radius="xl"
                                size="md"
                                value={inputText}
                                styles={{
                                    input: {
                                        backgroundColor: `${theme.color4}40`,
                                        color: mode === 'light' ? 'white' : 'black'
                                    },

                                }}
                                classNames={{ input: classes.chatInput }}
                                onChange={(event) => setInputText(event.target.value)}
                                placeholder="write a text"
                                rightSectionWidth={42}
                                leftSection={<IconSearch size={18} stroke={1.5} style={{ color: mode === 'light' ? 'white' : 'black' }} />}
                                rightSection={
                                    <ActionIcon
                                        size={32}
                                        radius="xl"
                                        color={mode === 'light' ? 'white' : 'black'}
                                        variant="filled"
                                        aria-label="Search"
                                    >
                                        <IconArrowRight size={18} stroke={1.5} onClick={handleQuery} color={mode === 'light' ? 'black' : 'white'} />
                                    </ActionIcon>
                                }
                                aria-label="Search questions"
                            />
                        </div>
                    </Text>
                </Group>
            </Card.Section>

        </Card >
    )
}

export default AiChatAssistance
