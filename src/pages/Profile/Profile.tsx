import React, { useEffect, useState } from "react";
import { getProfileInfoApi } from "../../services/profileAPI";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export const elementsStyle: string = "p-4 mb-4 px-4 bg-[#F4F4F4] rounded-xl sm:min-w-[350px]"

export interface IProfile {
    avatar: any | null;
    created: string | null;
    email: string | null;
    id: number | null;
    is_active: boolean | null;
    modified: string | null;
    name: string | null;
    role: string | null;
    type: string | null;
}

interface IResponse {
    success: boolean;
    data: any;
    status: number;
}


const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<IProfile>(
        {
            avatar: '',
            created: '',
            email: '',
            id: -1,
            is_active: true,
            modified: '',
            name: '',
            role: '',
            type: '',
        });
    useEffect(() => {
        getProfileInfo();
    }, [])

    const getProfileInfo = async () => {
        const response: IResponse = await getProfileInfoApi();
        if (response.success) {
            setProfile(response.data)
        }
        else {
            logout();
        }
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/b2bitProject/");
    }
    return (
        <>
            <div className="bg-[#F1F5F9] h-screen">
                <div className="sm:flex sm:flex-row-reverse bg-white mb-24">
                    <button
                        className="sm:m-4 bg-[#02274F] text-white sm:rounded-lg sm:px-32 px-10 py-2"
                        onClick={logout}
                    >Logout</button>
                </div>
                <div className="sm:flex items-center justify-center text-center">
                    <div className="shadow-xl p-4 sm:rounded-xl text-left bg-[#FDFDFD]">
                        <div className="flex flex-col items-center justify-center text-center">
                            <p className="text-semibold text-lg mb-4">Profile picture</p>
                            <div className="bg-[#FDFDFD] w-[90px] h-[90px] sm:rounded-xl">
                                {profile.avatar == null ?
                                    (
                                        <>
                                            <CgProfile size="100%" color="#02274F" />
                                        </>
                                    ) : (
                                        <>
                                            <img src={profile.avatar.high} alt="Profile Avatar" className="w-full h-full object-cover rounded-xl" />
                                        </>
                                    )}
                            </div>
                        </div>
                        <p>Your <strong>Name</strong></p>
                        <div className={elementsStyle}>
                            <p>{profile.name}</p>
                        </div>
                        <p>Your <strong>E-mail</strong></p>
                        <div className={elementsStyle}>
                            <p>{profile.email}</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Profile;