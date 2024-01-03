import { LocalStorageService } from './local-storage.service';
import { ThemeService } from './theme.service';
import { TestBed } from '@angular/core/testing';

describe('ThemeService', () => {
  let themeService: ThemeService;
  let localStorageSpy: any;

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', [
      'getItem',
      'setItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    themeService = TestBed.inject(ThemeService);
  });

  it("Should initialize the theme with the value 'system'", () => {
    const theme = themeService.theme;

    expect(theme).toBe('system');

    expect(localStorageSpy.getItem).toHaveBeenCalledTimes(1);
  });

  it('Should set the theme to a different value', () => {
    const newTheme = 'newTheme';
    themeService.setTheme(newTheme);
    expect(themeService.theme).toBe('newTheme');
    themeService.getTheme$().subscribe((newTheme) => {
      expect(newTheme).toEqual('newTheme');
    });
    expect(localStorageSpy.setItem).toHaveBeenCalledTimes(1);
  });
});
