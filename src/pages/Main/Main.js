import React, {useEffect, useRef, useState} from 'react';
import socket from "../../socket";
import ACTIONS from "../../socket/actions";
import {v4} from "uuid";
import {useNavigate} from "react-router";

export const Main = () => {
    const navigate = useNavigate();
    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        });
    }, []);
    
    return (
        <div ref={rootNode}>
            <h1>Available Rooms</h1>
            <button
                onClick={() => {
                    navigate(`/room/${v4()}`)
                }}
            >Create new room
            </button>
            <ul>
                {rooms.map(roomId => (
                    <li key={roomId}>
                        {roomId}
                        <button
                            onClick={() => {
                                navigate(`/room/${roomId}`)
                            }}
                        >Join Room
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
