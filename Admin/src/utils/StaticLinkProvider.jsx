import { STATIC_FILES } from "./apiURL";

export const StaticLinkProvider = (link) => {
    return `${STATIC_FILES}/${link.replace(/\\/g, '/')}`;
};
