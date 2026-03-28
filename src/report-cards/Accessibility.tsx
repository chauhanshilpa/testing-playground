import { useMemo } from 'react';
import { Card, Group, Text } from '@mantine/core';
import classes from '../../src/css-module/Card.module.css';
import accessibilityIcon from "../../src/assets/accessibility-icon2.svg";
import gridViewIcon from "../../src/assets/grid.svg";
import listViewIcon from "../../src/assets/list.svg";
import chatIcon from "../../src/assets/chat.svg";
import chevronRight from "../../src/assets/chevron-right.svg"
import UseCustomThemes from '../custom-hooks/UseCustomThemes';

interface AccessibilityProps {
  selectedPaletteId: number;
  mode: string;
}

const accessibilityOptionsList = [
  {
    id: 1,
    icon: accessibilityIcon,
    shortCutKeys: 'Ctrl + /',
    featureName: 'Dark Mode'
  },
  {
    id: 2,
    icon: gridViewIcon,
    shortCutKeys: 'Ctrl + G',
    featureName: 'Grid View'
  },
  {
    id: 3,
    icon: listViewIcon,
    shortCutKeys: 'Ctrl + L',
    featureName: 'List View'
  },
  {
    id: 4,
    icon: chatIcon,
    shortCutKeys: 'Ctrl + F',
    featureName: 'Focus Chat'
  }
]

const Accessibility = ({ selectedPaletteId, mode }: AccessibilityProps) => {
  const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId])
  return (
    <Card withBorder radius="md" p="md" className={classes.card} style={{ color: mode === 'light' ? 'white' : 'black', background: `${theme.color2}50` }}>
      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            Accessibilitẏ̇̇
          </Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={7} mt={5}>
          {/* list */}
          {accessibilityOptionsList.map((option) => {
            return (
              <div key={option.id} style={{
                background: `${theme.color4}40`,
              }}
                className={`option ${mode === 'light' ? 'option-dark' : 'option-light'}`}>
                <img src={option.icon} alt="icon" width={16} height={16} style={{ filter: mode === 'light' ? '' : 'invert(1)' }} />
                {option.shortCutKeys}
                <img src={chevronRight} alt="icon" width={16} height={16} style={{ filter: mode === 'light' ? '' : 'invert(1)' }} />
                {option.featureName}
              </div>
            )
          })}
        </Group>
      </Card.Section>
    </Card>
  )
}

export default Accessibility
