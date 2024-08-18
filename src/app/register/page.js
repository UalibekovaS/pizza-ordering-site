"use client";
import Image from "next/image"
import { useState } from "react"
import Link from "next/link";
import {signIn} from "next-auth/react";


export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(false)
    const [error, setError] = useState(false)
    async function handleFormSubmit(ev) {
        ev.preventDefault()
        setCreatingUser(true);
        setError(false)
        setUserCreated(false)
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
            setError(true);
        }
        else{
            setUserCreated(true)
        }
        setCreatingUser(false);        
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-red-500 text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">User has been succefully created.<br/>Now you can{' '}
                    <Link className="underline" href={'/login'}>Login</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">An error has occured.<br/>Please try again later
            </div>
            )}

            <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                <input disabled={creatingUser} type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input disabled={creatingUser} type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">or Login with provider</div>
                <button disabled={creatingUser} onClick={() => signIn('google', {callbackUrl: '/'})} className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24}/>
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500">
                    Existing account? <Link className="underline" href={'/login'}>Login Here &raquo;</Link>
                </div>
            </form>

        </section>
    )
}