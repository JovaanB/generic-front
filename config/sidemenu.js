import { Home } from "@mui/icons-material";

/**
 * Callback called with item props to determine wheither it should be displayed or not
 * @name ConditionCallback
 * @function
 * @param {object} props - The item's properties
 * @returns {boolean} - True if the item must be displayed, else false.
 */

/**
 * Callback called with item props to compute its title
 * @name TitleCallback
 * @function
 * @param {object} props - The item's properties
 * @returns {string} - The item's title
 */

/**
 * @typedef {object} SideMenuItem
 * @property {string[]} [activePaths] - Additional list of paths for which the item is active
 * @property {string[]} [authorizedRoles] - List of roles authorized to view/access this item.
 *                                          Incompatible with `forbiddenRoles`: use one of
 *                                         `authoriedRoles`/`forbiddenRoles` but not both.
 * @property {ConditionCallback} [condition] - Function that, based on received props, returns true/false if the item
 *                                             should be visible/hidden
 * @property {string[]} [forbiddenRoles] - List of roles that do not have access to this item.
 *                                         Incompatible with `authorizedRoles`: use one of
 *                                         `authoriedRoles`/`forbiddenRoles` but not both.
 * @property {any} IconComponent - Component used to display the item's icon
 * @property {string} [path] - Path of the item. If specified, the item is displayed as a link to that path.
 *                             Else, the item is a button that shows/hides nested items.
 * @property {(string|TitleCallback)} title - Title/label of the item. You can pass a string directly or
 *                                            a function that receives props and returns a string.
 * @property {string} color - Color of the item
 * @property {SideMenuItem[]} [items] - List of nested items
 * @property {boolean} [openOnExact] - Indicates wheither nested items should be displayed when the path matches
 *                                  exactly the parent's path. Usseful if you want to show nested items only
 *                                  when one of them is active.
 * @property @property {string[]} [openOnPath] - List of paths where items must be opened
 * @property {boolean} [isNew] - Indicates whether there is new things displayed in this element
 */

/**
 * @type {SideMenuItem[]}
 */

export const topItems = [
    {
        IconComponent: Home,
        path: "/",
        title: "Tableau de bord",
        color: "#604DBF",
        altColor: "#BFB8E5",
    },
];
