import { STATIC_FILES } from "./apiURl"

export const StaticLinkProvider=(Link)=>{
    return Link&&`${STATIC_FILES}/${Link.replace('/\/g','/')}`;
}