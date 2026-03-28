import "./App.css"
import { useState, useMemo } from "react";
import UseCustomThemes from './custom-hooks/UseCustomThemes';
import { Container, SimpleGrid, Stack } from '@mantine/core';
import TestDashboard from './report-cards/TestDashboard';
import LanguageEngine from './main-components/LanguageEngine';
import AiChatAssistance from './main-components/AiChatAssistance';
import Accessibility from './report-cards/Accessibility';
import ThemeEngine from './main-components/ThemeEngine';
import LayoutEngine from './main-components/LayoutEngine';
import Header from './other-components/Header';
import Footer from './other-components/Footer';

const TestingPlayground = () => {
    const [selectedPaletteId, setSelectedPaletteId] = useState(1);
    const [layout, setLayout] = useState('grid');
    const [mode, setMode] = useState('light')
    const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId])

    return (
        <div
            className={mode === 'light' ? "light-mode-style" : "dark-mode-style"}
            style={{
                background: `linear-gradient(to bottom right, ${theme.color1} 0%, ${theme.color2}, ${theme.color3}, ${theme.color4})`,
            }}>
            <header id="header">
                < Header />
            </header >
            <main id="main-content">
                <Container my="md">
                    <SimpleGrid cols={{ base: 1, xs: 4 }}>
                        <Stack>
                            <TestDashboard selectedPaletteId={selectedPaletteId} mode={mode} />
                            <Accessibility selectedPaletteId={selectedPaletteId} mode={mode} />
                        </Stack>
                        {layout === 'list' ?
                            <Stack>
                                <ThemeEngine selectedPaletteId={selectedPaletteId} setSelectedPaletteId={setSelectedPaletteId} mode={mode} setMode={setMode} />
                                <LayoutEngine setLayout={setLayout} selectedPaletteId={selectedPaletteId} mode={mode} />
                                <LanguageEngine selectedPaletteId={selectedPaletteId} mode={mode} />
                                <AiChatAssistance selectedPaletteId={selectedPaletteId} mode={mode} />
                            </Stack> :
                            <>
                                <Stack>
                                    <ThemeEngine selectedPaletteId={selectedPaletteId} setSelectedPaletteId={setSelectedPaletteId} mode={mode} setMode={setMode} />
                                    <LayoutEngine setLayout={setLayout} selectedPaletteId={selectedPaletteId} mode={mode} />
                                </Stack>
                                <Stack>
                                    <LanguageEngine selectedPaletteId={selectedPaletteId} mode={mode} />
                                </Stack>
                                <Stack>
                                    <AiChatAssistance selectedPaletteId={selectedPaletteId} mode={mode} />
                                </Stack>
                            </>
                        }
                    </SimpleGrid>
                </Container>
            </main>
            <footer id="footer">
                <Footer />
            </footer>
        </div >
    )
}

export default TestingPlayground
