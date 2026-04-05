import { useMemo, useRef, useEffect, useState } from 'react';
import { Card, Text, ActionIcon, TextInput } from '@mantine/core';
import classes from '../../src/css-module/Card.module.css';
import bot from "../../src/assets/bot.png";
import { IconSend, IconRobot } from '@tabler/icons-react';
import { GoogleGenAI } from '@google/genai';
import UseCustomThemes from '../custom-hooks/UseCustomThemes';
import systemPrompt from "../../src/system-promt.txt?raw"

interface AiChatAssistanceProps {
    selectedPaletteId: number;
    mode: string;
}

interface Message {
    role: 'user' | 'assistant';
    text: string;
}

const AiChatAssistance = ({ selectedPaletteId, mode }: AiChatAssistanceProps) => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [liveReply, setLiveReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId]);
    const scrollAnchorRef = useRef<HTMLDivElement>(null);
    const textColor = mode === 'light' ? 'white' : 'black';

    useEffect(() => {
        scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, liveReply]);

    async function handleQuery() {
        const query = inputText.trim();
        if (!query || isLoading) return;
        setInputText('');
        setMessages(prev => [...prev, { role: 'user', text: query }]);
        const contents = [...messages, { role: 'user', text: query }].map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.text }],
        }));
        try {
            setIsLoading(true);
            setLiveReply('');
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
            const response = await ai.models.generateContentStream({ model: 'gemini-2.5-flash', config: { systemInstruction: systemPrompt }, contents });
            let fullText = '';
            for await (const chunk of response) {
                fullText += chunk.text ?? '';
                setLiveReply(fullText);
            }
            setMessages(prev => [...prev, { role: 'assistant', text: fullText }]);
            setLiveReply('');
        } catch (error) {
            console.error('API Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', text: 'Something went wrong. Please try again.' }]);
            setLiveReply('');
        } finally {
            setIsLoading(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') handleQuery();
    }

    return (
        <Card
            withBorder
            radius="md"
            p={0}
            className={classes.card}
            style={{
                color: textColor,
                background: `${theme.color2}50`,
                display: 'flex',
                flexDirection: 'column',
                height: '420px',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                borderBottom: `1px solid ${textColor}20`,
                flexShrink: 0,
            }}>
                <img src={bot} alt="bot" width={20} height={20} />
                <Text fz="sm" fw={600}>AI Assistant</Text>
                <div style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 11,
                    opacity: 0.6,
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
                    Gemini 2.5 Flash
                </div>
            </div>

            {/* Messages area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
            }}>
                {messages.length === 0 && !isLoading && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        gap: 8,
                        opacity: 0.6,
                    }}>
                        <IconRobot size={36} stroke={1.2} />
                        <Text fz="sm" fw={500}>How can I help you today?</Text>
                        <Text fz="xs" style={{ opacity: 0.7 }}>Curious about the project? Ask away!</Text>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                            alignItems: 'flex-start',
                            gap: 8,
                        }}
                    >
                        {msg.role === 'assistant' && (
                            <img src={bot} alt="bot" width={22} height={22} style={{ flexShrink: 0, marginTop: 2 }} />
                        )}
                        <div style={{
                            maxWidth: '80%',
                            padding: '8px 12px',
                            borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                            background: msg.role === 'user' ? `${theme.color4}80` : `${theme.color3}30`,
                            fontSize: 13,
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Streaming response */}
                {liveReply && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <img src={bot} alt="bot" width={22} height={22} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{
                            maxWidth: '80%',
                            padding: '8px 12px',
                            borderRadius: '18px 18px 18px 4px',
                            background: `${theme.color3}30`,
                            fontSize: 13,
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}>
                            {liveReply}
                        </div>
                    </div>
                )}

                {/* Typing indicator */}
                {isLoading && !liveReply && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src={bot} alt="bot" width={22} height={22} />
                        <div style={{
                            padding: '8px 14px',
                            borderRadius: '18px 18px 18px 4px',
                            background: `${theme.color3}30`,
                            display: 'flex',
                            gap: 4,
                            alignItems: 'center',
                        }}>
                            {[0, 1, 2].map(i => (
                                <div key={i} style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: textColor,
                                    opacity: 0.5,
                                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                                }} />
                            ))}
                        </div>
                    </div>
                )}

                <div ref={scrollAnchorRef} />
            </div>

            {/* bottom input */}
            <div style={{
                padding: '10px 14px',
                borderTop: `1px solid ${textColor}20`,
                flexShrink: 0,
                '--placeholder-color': textColor,
            } as React.CSSProperties}>
                <TextInput
                    radius="xl"
                    size="sm"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message AI Assistant..."
                    styles={{
                        input: {
                            backgroundColor: `${theme.color4}30`,
                            color: textColor,
                            border: `1px solid ${textColor}25`,
                        },
                    }}
                    classNames={{ input: classes.chatInput }}
                    rightSectionWidth={38}
                    rightSection={
                        <ActionIcon
                            size={28}
                            radius="xl"
                            variant="filled"
                            color={textColor}
                            aria-label="Send"
                            onClick={handleQuery}
                            disabled={!inputText.trim() || isLoading}
                        >
                            <IconSend size={14} stroke={1.5} color={mode === 'light' ? 'black' : 'white'} />
                        </ActionIcon>
                    }
                    aria-label="Chat input"
                />
            </div>
        </Card>
    );
};

export default AiChatAssistance;

// todo: 1-input should be text area, 2-on shift enter it should go into next line, 3-send hover
