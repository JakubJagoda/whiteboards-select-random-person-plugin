import { getPluginBoardUserData } from "@whiteboards-io/plugins";
import { useAsync } from "react-async-hook";

export const Sidebar = () => {
    const savedData = useAsync(() => {
        return getPluginBoardUserData();
    }, []);

    if (savedData.loading) {
        return null;
    }

    return <>
        <h1 style={{margin: "0px 0 0 40px"}}>Random person selector</h1>
    </>;
};