'use client';

import { Palette, Sun, Moon, Coffee, TreePine, Waves, Flower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/lib/theme-provider';

const themes = [
  { name: 'light', label: 'Light', icon: Sun, color: 'bg-white' },
  { name: 'dark', label: 'Dark', icon: Moon, color: 'bg-gray-900' },
  { name: 'sepia', label: 'Sepia', icon: Coffee, color: 'bg-amber-50' },
  { name: 'forest', label: 'Forest', icon: TreePine, color: 'bg-emerald-50' },
  { name: 'ocean', label: 'Ocean', icon: Waves, color: 'bg-blue-50' },
  { name: 'lavender', label: 'Lavender', icon: Flower, color: 'bg-purple-50' },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <DropdownMenuItem
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name as any)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${themeOption.color} border border-border`} />
                <Icon className="h-4 w-4" />
              </div>
              <span className="flex-1">{themeOption.label}</span>
              {theme === themeOption.name && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}