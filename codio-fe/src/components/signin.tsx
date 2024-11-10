import { FormEvent, useState } from 'react'
import { getAuth, sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { App } from '@/lib/auth';


const provider = new GoogleAuthProvider();





type SignInData = {
    email: string,
    password: string
}

export default function Signin() {
    const { toast } = useToast();
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:5173',
        // This must be true.
        handleCodeInApp: true,
    };

    const [formData, setFormData] = useState<SignInData>({
        email: "",
        password: "",
    } as SignInData);
    const auth = getAuth(App);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (!credential) {
                    toast({
                        title: "Failed to send email",
                        description: "Try again, maybe check the email.",
                        variant: "destructive"
                    })
                    return;
                }
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                console.log(user)
                toast({
                    title: "Email has been sent successfully",
                    variant: "default",
                })
            }).catch((error) => {

                toast({
                    title: "Failed to send email",
                    description: "Try again, maybe check the email.",
                    variant: "destructive"
                })
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });


    }
    return (
        <div className='w-[320px] rounded-2xl p-4 border border-black/15'>
            <form onSubmit={handleSubmit} className='w-full h-full flex flex-col items-center justify-center gap-y-4'>
                <p className='w-full text-center text-2xl'>Sign In | Codio</p>
                {/* <label htmlFor="" className='w-full flex flex-col items-start justify-center gap-y-1'>
                    <p>Email</p>
                    <input type="text" className='w-full h-[35px] px-4 border-none rounded-lg' onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                    }} />
                </label> */}
                <button className='h-[35px] rounded-lg px-4 bg-white hover:bg-white/80 transition-colors duration-200'>Login with Google</button>
                <div className='w-full'>
                    
                </div>
            </form>
        </div>
    )
}
