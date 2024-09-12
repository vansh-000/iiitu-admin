import { STATIC_FILES } from "./apiURl"

export const StaticLinkProvider=(Link)=>{
    return `${STATIC_FILES}/${Link.replace('/\/g','/')}`;
}