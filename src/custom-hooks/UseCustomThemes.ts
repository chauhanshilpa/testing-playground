import { colorSchemeList } from "../../src/constant";

const UseCustomThemes = ({
  selectedPaletteId,
}: {
  selectedPaletteId: number;
}) => {
  return {
    theme: colorSchemeList.find(
      (theme) => theme.paletteId === selectedPaletteId,
    ) as ThemeType,
  };
};

export default UseCustomThemes;
