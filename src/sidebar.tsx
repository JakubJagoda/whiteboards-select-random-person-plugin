import {
    getBoardUsers,
    setPluginBoardData,
    UserData,
    watchPluginBoardData
} from "@whiteboards-io/plugins";
import { useAsync } from "react-async-hook";
import { useEffect, useState } from "react";

enum PluginState {
    WAITING,
    RANDOMIZING,
    RESULTS
}

interface PluginData {
    pluginState: PluginState;
    selectedPerson: string;
}

export const Sidebar = () => {
    const [pluginState, setPluginState] = useState<PluginState>(PluginState.WAITING);
    const [selectedPerson, setSelectedPerson] = useState<string>("");
    const boardUsers = useAsync<UserData[]>(async () => await getBoardUsers(), []);

    useEffect(() => {
        const cancelCallback = watchPluginBoardData<PluginData>((pluginData) => {
            setPluginState(pluginData.pluginState);
            setSelectedPerson(pluginData.selectedPerson);
        });

        return cancelCallback;
    }, [])

    return <>
        <h1 style={{margin: "0px 0 0 40px"}}>Random person selector</h1>
        <button onClick={() => {
            setPluginBoardData<PluginData>({
                pluginState: PluginState.RANDOMIZING,
                selectedPerson: ""
            });

            setTimeout(() => {
                const randomPerson = boardUsers.result?.[Math.floor(Math.random() * boardUsers.result?.length)];
                setPluginBoardData<PluginData>({
                    pluginState: PluginState.RESULTS,
                    selectedPerson: randomPerson?.displayName ?? ""
                });
            }, 3000)
        }} disabled={pluginState === PluginState.RANDOMIZING || boardUsers.loading}>Select random person</button>
        {pluginState === PluginState.WAITING && "Waiting to start randomizing"}
        {pluginState === PluginState.RANDOMIZING && "Randomizing... someone will be picked!"}
        {pluginState === PluginState.RESULTS && `The algorithm chose ${selectedPerson}!`}
    </>;
};