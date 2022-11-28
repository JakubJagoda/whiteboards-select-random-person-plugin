import {
    getBoardUsers, getCurrentBoardUser,
    setPluginBoardData,
    UserData,
    watchPluginBoardData
} from "@whiteboards-io/plugins";
import { useAsync } from "react-async-hook";
import { useCallback, useEffect, useState } from "react";
import Button from "@atlaskit/button";

enum PluginState {
    WAITING,
    RANDOMIZING,
    RESULTS
}

interface PluginData {
    pluginState: PluginState;
    selectedPerson: UserData | null;
}

export const Sidebar = () => {
    const [pluginState, setPluginState] = useState<PluginState>(PluginState.WAITING);
    const [selectedPerson, setSelectedPerson] = useState<UserData | null>(null);
    const boardUsers = useAsync<UserData[]>(getBoardUsers, []);
    const currentUser = useAsync<UserData>(getCurrentBoardUser, []);
    const isLoading = boardUsers.loading || currentUser.loading;

    const performRandomization = useCallback(() => {
        setPluginBoardData<PluginData>({
            pluginState: PluginState.RANDOMIZING,
            selectedPerson: null
        });

        const selectedPerson = boardUsers.result?.[Math.floor(Math.random() * boardUsers.result?.length)];

        setTimeout(() => {
            setPluginBoardData<PluginData>({
                pluginState: PluginState.RESULTS,
                selectedPerson: selectedPerson ?? null,
            });
        }, 2000);
    }, [boardUsers.result]);

    useEffect(() => {
        const cancelCallback = watchPluginBoardData<PluginData>((pluginData) => {
            setPluginState(pluginData.pluginState);
            setSelectedPerson(pluginData.selectedPerson);
        });

        return cancelCallback;
    }, []);

    if (isLoading) {
        return null;
    }

    return <>
        <h1 style={{margin: "0px 0 0 40px"}}>Random person selector</h1>
        <Button
            onClick={performRandomization}
            isDisabled={pluginState === PluginState.RANDOMIZING}
        >
            Select random person
        </Button>
        {pluginState === PluginState.WAITING && <p>Waiting for someone to start randomizing</p>}
        {pluginState === PluginState.RANDOMIZING && <p>The dice have been rolled...</p>}
        {pluginState === PluginState.RESULTS && <p>The algorithm chose {selectedPerson?.id === currentUser.result?.id ? "you" : selectedPerson?.displayName}!</p>}
    </>;
};