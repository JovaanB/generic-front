const supportsRole = (item, userRole) => {
    if (item.authorizedRoles) {
        return item.authorizedRoles.includes(userRole);
    }

    if (item.forbiddenRoles) {
        return !item.forbiddenRoles.includes(userRole);
    }

    return true;
};

const supportsCustomType = (item, customType) => {
    if (item.customTypes) {
        return item.customTypes.includes(customType);
    }

    return true;
};

const supportsCondition = (item, props) => {
    if (typeof item.condition === "function") {
        return item.condition(props);
    }

    return true;
};

export const shouldDisplayItem = (item, props) =>
    supportsRole(item, props.userRole) && supportsCustomType(item, props.customType) && supportsCondition(item, props);

export const isSelected = (item, router) => {
    if (item.path && item.path === router.pathname) {
        return [true, -1];
    }

    if (Array.isArray(item.activePaths)) {
        return [item.activePaths.some((path) => path === router.pathname), -1];
    }

    if (Array.isArray(item.items)) {
        const selectedIndex = item.items.findIndex(
            (subItem) =>
                subItem.path === router.pathname || subItem.activePaths?.some((path) => path === router.pathname)
        );
        return [selectedIndex >= 0, selectedIndex];
    }

    return [false, -1];
};

export const getTitle = (item, props) => {
    if (typeof item.title === "function") {
        return item.title(props);
    }

    return item.title;
};

export const getPath = (item, props) => {
    if (typeof item.path === "function") {
        return item.path(props);
    }

    return item.path;
};
