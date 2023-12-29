import { LocalStorageService } from './local-storage.service';
import { ThemeService } from './theme.service';

describe('ThemeServiceTests', () => {
  it("Should initialize the theme with the value 'system'", () => {
    const themeService = new ThemeService(new LocalStorageService());

    const theme = themeService.theme;

    expect(theme).toBe('system').withContext('asdasd');
  });
});
