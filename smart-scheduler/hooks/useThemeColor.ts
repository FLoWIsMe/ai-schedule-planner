/**
 * This hook provides theme colors for the app.
 * Since the app only supports dark mode, it directly uses dark mode colors.
 */

import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { dark?: string },
  colorName: keyof typeof Colors.dark
) {
  // Always use 'dark' mode, as light mode is not supported.
  const theme = 'dark';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
