import { useState, useEffect, useMemo } from "react";
import { Button, Card, Group, Text, Menu } from '@mantine/core';
import classes from '../../src/css-module/Card.module.css';
import translate from "translate";
import interchangeIcon from "../../src/assets/interchangeIcon.svg";
import {
  IconChevronDown,
} from '@tabler/icons-react';
import { languageList } from "../constants";
import UseCustomThemes from "../custom-hooks/UseCustomThemes";

interface LanguageEngineProps {
  selectedPaletteId: number;
  mode: string;
}
const LanguageEngine = ({ selectedPaletteId, mode }: LanguageEngineProps) => {
  const [inputText, setInputText] = useState('Good Morning !')
  const [outputText, setOutputText] = useState('Bonjour!')
  const [lang, setLang] = useState({ firstLanguage: { name: 'English', code: 'en' }, secondLanguage: { name: 'French', code: 'fr' } })
  const { theme } = useMemo(() => UseCustomThemes({ selectedPaletteId }), [selectedPaletteId])

  useEffect(() => {
    (async function () {
      await handleLanguageConversion();
    })()
    //eslint-disable-next-line
  }, [inputText, lang.firstLanguage.code, lang.secondLanguage.code])

  async function handleLanguageConversion() {
    const text = await translate(inputText, { to: lang.secondLanguage.code, from: lang.firstLanguage.code });
    setOutputText(text);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    const value = event.target.value
    setInputText(value)
    if (inputText || value === "") {
      setOutputText("")
    }
  }

  return (
    <>
      <Card withBorder radius="md" p="md" className={classes.card} style={{ color: mode === 'light' ? 'white' : 'black', background: `${theme.color2}50`, }}>
        <Card.Section className={classes.section} mt="md">
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              Language Engine
            </Text>
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group gap={7} mt={14} mb={8} wrap="nowrap">
            {/*  */}
            <Menu
              transitionProps={{ transition: 'pop-top-right' }}
              position="top-end"
              width={220}
              withinPortal
              radius="md"
            >
              <Menu.Target>
                <Button style={{ background: `${theme.color4}40`, color: mode === 'light' ? 'white' : 'black', flex: 1 }} rightSection={<IconChevronDown size={18} stroke={1.5} />} pr={12} radius="md">
                  {lang.firstLanguage.name}
                </Button>
              </Menu.Target>
              <Menu.Dropdown className={classes.languageList}>
                {Object.entries(languageList)
                  .filter(([languageName]) => languageName !== lang.firstLanguage.name && languageName !== lang.secondLanguage.name)
                  .map(([languageName, code]) => (
                    <Menu.Item key={languageName} onClick={() => setLang(prev => ({ ...prev, firstLanguage: { name: languageName, code: code } }))}>
                      {languageName}
                    </Menu.Item>
                  ))}
              </Menu.Dropdown>
            </Menu>
            <div>
              <img src={interchangeIcon} alt="icon" width={16} height={16} style={{ filter: mode === 'light' ? '' : 'invert(1)' }} />
            </div>
            <Menu
              transitionProps={{ transition: 'pop-top-right' }}
              position="top-end"
              width={220}
              withinPortal
              radius="md"
            >
              <Menu.Target>
                <Button style={{ background: `${theme.color4}40`, color: mode === 'light' ? 'white' : 'black', flex: 1 }} rightSection={<IconChevronDown size={18} stroke={1.5} />} pr={12} radius="md">
                  {lang.secondLanguage.name}
                </Button>
              </Menu.Target>
              <Menu.Dropdown className={classes.languageList}>
                {Object.entries(languageList).filter(([languageName]) => lang.secondLanguage.name !== languageName && lang.firstLanguage.name !== languageName).map(([languageName, code]) => {
                  return (
                    <Menu.Item onClick={() => setLang(prev => ({ ...prev, secondLanguage: { name: languageName, code: code } }))}>
                      {languageName}
                    </Menu.Item>
                  )
                })}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>
        <input type="text"
          style={{
            background: `${theme.color4}40`,
            color: mode === 'light' ? 'white' : 'black',
            width: '100%',
            padding: '0.4rem 0.5rem',
            marginTop: '0.75rem',
          }}
          className={classes.languageEngineInput} value={inputText} onChange={(event) => handleInputChange(event)} />
        <p style={{ marginTop: '0.5rem', padding: '0 0.25rem' }}>Translation: {outputText}</p>
      </Card >
    </>
  )
}

export default LanguageEngine
