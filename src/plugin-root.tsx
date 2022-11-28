import {useEffect} from "react";
import {registerSidebarTool} from "@whiteboards-io/plugins";
import icon from "./icon.svg";

export const PluginRoot = () => {
    useEffect(() => {
        const baseUrl = window.location.origin + window.location.pathname.replace(/^\/$/, '');
        registerSidebarTool({
            id: "whiteboards-select-random-person",
            icon: baseUrl + icon,
            tooltip: "Select random person",
            contentUrl: baseUrl + "?sidebar",
        });
    }, []);

    return null;
};