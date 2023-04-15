import React from 'react';
import {useParams} from "react-router";
import useWebRTC, {LOCAL_VIDEO} from "../../hooks/useWebRTC";

export const Room = () => {
    const {id: roomId} = useParams();
    
    
    const {clients, provideMediaRef} = useWebRTC(roomId);
    
    console.log(clients);
    
    return (
        <div>
            {clients.map((clientId) => {
                return (
                    <div key={clientId}>
                        <video 
                            ref={instance => {
                                provideMediaRef(clientId, instance)
                            }}
                        autoPlay
                        playsInline
                        muted={clientId === LOCAL_VIDEO}
                        />
                    </div>
                )
            })}
        </div>
    );
};
