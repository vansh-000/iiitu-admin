import { STATIC_FILES } from "./apiURl";

export const StaticLinkProvider = (link) => {
    return link&&`${STATIC_FILES}/${link.replace(/\\/g, '/')}`;
};
