import React, { useEffect, useState } from 'react';
import { PolygonLogo } from '../assets';
import { useDisconnect } from '@thirdweb-dev/react';
import "./profile.css";
import { useStateContext } from '../context';

// Import the profile information JSON file
import profileInfo from './profileinfo.json'; // Adjust the path if needed

interface DataType {
    personalInformation: {
        name: {
            first: string,
            last: string
        },
        address: {
            city: string,
            state: string,
            street: string,
            zipCode: string
        },
        age: number,
        email: string,
        phoneNumber: string,
        walletAddress: string
    },
    professionalInformation: {
        department: string,
        employeeId: number,
        hireDate: string,
        isAdmin: boolean,
        position: string,
        salary: string
    },
    emergencyContact: {
        email: string,
        name: {
            first: string,
            last: string
        },
        phoneNumber: string,
        relation: string
    }
}

const ProfilePage = () => {
    const [navTitle, setNavTitle, address, contract, connect] = useStateContext();
    const [isOwner, setIsOwner] = useState({} as any);
    const [ownerData, setOwnerData] = useState<DataType>({
        // ... (rest of your initial data structure)
    });

    useEffect(() => {
        document.title = "SecureChainHR | Profile";
        setNavTitle("View Profile")
    }, []);

    const disconnect = useDisconnect();

    useEffect(() => {
        const getOwnerDetails = async () => {
            try {
                // Fetch the profile information from the imported JSON file
                setOwnerData(profileInfo);
            } catch (err) {
                console.log(err);
            }
        }
        getOwnerDetails();
    }, []);

    return (
        <div className="profile-container">
            {
                address && ownerData.personalInformation.name.first.length > 0
                    ?
                    <div className='ProfileInfo'>
                        <div className="profile-section-owner">
                            <img src={PolygonLogo} alt="Logo" />
                            <div className="profile-main-container">
                                {/* ... (rest of your JSX) */}
                                <button className="btn-connect" onClick={() => disconnect()}>Disconnect</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="without-profile">
                        <img src={PolygonLogo} alt="Logo" />
                        <span style={{ opacity: '0.3', fontSize: '12px' }}>You have not connected your wallet yet.</span>
                        <button className='btn-connect' onClick={() => connect()}>Connect</button>
                    </div>
            }
        </div>
    );
}

export default ProfilePage;
