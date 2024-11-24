import { signIn,signOut } from "next-auth/react";

export async function doLogout() {
    await signOut({ redirectTo:"/"});
}

export async function doCredentialLogin(formdata: FormData): Promise<any>{
    const username = formdata.get("username") as string;
    const password = formdata.get("password") as string;

    if (!username || !password) {
        throw new Error("Username or password is missing");
    }
    console.log("Username:",username)
    console.log("Password:",password)
    try {
        const response = await signIn("credentials",{
            redirect: false,
            username,
            password,
            
            

        });
        console.log(response)
        return response; 
    } catch(err:any) {
        throw err;
    }

}