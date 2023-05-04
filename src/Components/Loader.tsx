import React from 'react'
import { useAuth } from '../Contexts/AppContext'

export default function Loader() {
    const {isLightToggled} = useAuth()
    return (
        <div className={`flex items-center justify-center min-h-screen ${isLightToggled ? 'bg-[#f5f4fd]' : 'bg-[#20212C]'}`}>
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
