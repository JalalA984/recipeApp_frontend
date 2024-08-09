import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        router.push("/auth");
    };

    if (!isMounted) {
        return null; // Or a loading spinner, or some placeholder
    }

    return (
        <div className="navbar bg-primary-100 flex justify-center items-center space-x-4">
            <Link href="/" className="btn btn-ghost text-xl">
                Home
            </Link>
            <Link href="/create-recipe" className="btn btn-ghost text-xl">
                Create Recipe
            </Link>

            {
                !cookies.access_token ? (
                    <Link href="/auth" className="btn btn-ghost text-xl">
                        Log in/Sign up
                    </Link>
                ) : (
                    <>

                        <Link href="/saved-recipes" className="btn btn-ghost text-xl">
                            Saved Recipes
                        </Link>
                        <button onClick={logout} className="btn btn-ghost text-xl">
                            Logout
                        </button>
                    </>
                )
            }
        </div>
    );
}
