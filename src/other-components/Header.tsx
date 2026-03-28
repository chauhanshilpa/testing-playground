import { useMemo } from "react";
import logo from '../assets/logo.png';
import UseCustomThemes from '../custom-hooks/UseCustomThemes';

interface headerProps {
    mode: string;
    selectedPaletteId: number;
}

const Header = ({ mode, selectedPaletteId }: headerProps) => {
    const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId])

    return (
        <>
            {/* image */}
            <img src={logo} alt="app-logo" />
            {/* app-heading */}
            <div className='app_heading'>
                <h1>Frontend Feature Lab: Testing Playground</h1>
                <h6>Experiment with UI features, built with advanced testing</h6>
            </div>
            {/* pill badge */}
            <div className='status_badge' style={{ backgroundColor: theme.color3, color: mode === 'light' ? 'white' : '#0d0303' }}>
                Tests: { }&nbsp;|&nbsp;Coverage: { }%
            </div>
        </>
    )
}

export default Header
