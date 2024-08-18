'use client';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [saved, setSaved] = useState(false)
    const [image, setImage] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;
    const router = useRouter();

    useEffect(() => {
        if(status === 'authenticated') {
            setUserName(session.data.user.name)
            setImage(session.data.user.image)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin)
                    setProfileFetched(true)
                })
            })
        }
    }, [session, status])

    if(status === 'loading' || !profileFetched) {
        return 'Loading...';
    }
    if(status === 'unauthenticated'){
        router.push('/login');
        return null;
    }
    const userImage = session.data.user.image;

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        setSaved(false)
        setIsSaving(true)
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name:userName, image, streetAddress, phone, postalCode, city, country}),
        })
        setIsSaving(false)
        if(response.ok) {
            setSaved(true)
        }

    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.set('file', files[0]);
            setIsUploading(true)
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            const link = await response.json();
            console.log(link); // Log the link to verify the correct URL is returned
            setImage(`${link}?${new Date().getTime()}`);
            setIsUploading(false)
        }
    }
    return (
        <section className="mt-8">

        <UserTabs isAdmin={isAdmin} />

            <div className="max-w-md mx-auto mt-8">
                {saved && (
                    <SuccessBox>Profile Saved!</SuccessBox>
                )}
                {isSaving && (
                    <InfoBox>Saving...</InfoBox>
                )}
                {isUploading && (
                    <InfoBox>Uploading...</InfoBox>
                )}

                <div className="flex gap-4">
                    <div>
                        {image && (
                            <div className="p-2 rounded-lg relative max-w-[120px]">
                                <Image className="rounded-lg w-full h-full mb-1" width={250} height={250} src={image} alt={'avatar'}/>
                            </div>
                        )}
                        <label>
                            <input type="file" className="hidden" onChange={handleFileChange}/>
                            <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>
                        </label>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and Last name" value={userName} onChange={ev => setUserName(ev.target.value)}/>
                        <input disabled={true} type="text" value={session.data.user.email} placeholder=""/>
                        <input type="tel" placeholder="Phone number" value={phone} onChange={ev => setPhone(ev.target.value)}/>
                        <input type="text" placeholder="Street address" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}/>
                        <div className="flex gap-4">
                            <input type="text" placeholder="Postal code" value={postalCode} onChange={ev => setPostalCode(ev.target.value)}/>
                            <input type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)}/>
                        </div>
                        <input type="text" placeholder="Country" value={country} onChange={ev => setCountry(ev.target.value)}/>
                        <button type="submit">Save</button>
                    </form>

                </div>
            </div>
        </section>
    )
}