/**
 * @file MenuTypes.ts
 * Type definitions for application menu structure
 * @author Vasile Chifeac
 */

/**
 * Menu Item Configuration
 */
export interface MenuItem {
  id: string;
  title: string;
  caption: string;
  icon: string;
  iconColor: string;
  route: string;
  disabled?: boolean;
  badge?: {
    label: string;
    color: string;
  };
}

/**
 * Menu Section Configuration (Header + Items)
 */
export interface MenuSection {
  header: string;
  icon: string;
  items: MenuItem[];
}

/**
 * Medical Tool Configuration (for homepage search/filter)
 */
export interface MedicalTool {
  id: string;
  title: string;
  description: string;
  categories: string[];
  keywords: string[];
  disabled?: boolean;
}
