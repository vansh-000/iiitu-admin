import { STATIC_FILES } from "./apiURL";

export const StaticLinkProvider = (link) => {
    return link&&`${STATIC_FILES}/${link.replace(/\\/g, '/')}`;
};
