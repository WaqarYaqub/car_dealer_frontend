import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, signOut, TwitterAuthProvider, getIdToken } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import swal from 'sweetalert';
import { BASE_URL } from '../Utiles/constants';
import { createContext } from 'react';




initializeAuthentication();



const useFirebase = () => {
    const [user, setUser] = useState({})
    const [admin, setAdmin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    console.log("🚀 ~ file: useFirebase.js ~ line 21 ~ useFirebase ~ isSeller", isSeller)

    const [isLoading, setIsLoading] = useState(true);
    const [adminLoading, setAdminLoading] = useState(false);



    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const twitterProvider = new TwitterAuthProvider();

    const auth = getAuth();
    const registerUser = (firstName, lastName, email, password, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const name = firstName + " " + lastName;
                const newUser = { email, displayName: name, isSeller:false };
                setUser(newUser);

                //Add user to db
                saveUserToDb(email, isSeller, name, 'POST');


                // Send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    history.replace('/');
                }).catch((error) => {

                });

            })
            .catch((error) => {
                // ..
            })
            .finally(() => setIsLoading(false));
    }


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoading(true);
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(carIdToken => {
                        localStorage.setItem('carIdToken', carIdToken)

                    })
                fetch(`${BASE_URL}users/${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.admin) {
                            setAdmin(true);
                        }
                        else
                                setIsLoading(false);
                        
                    })
            } else {
                setAdmin(false);
                setUser({})
                setIsLoading(false);
            }

        });
    }, [auth, user.email])
    console.log("user isSeller:",user.isSeller)





    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                //Add user to db
                saveUserToDb(user.email, user.displayName, 'PUT');

                const destination = location?.state?.from || '/';
                history.replace(destination);

            }).catch((error) => {

            })
            .finally(() => setIsLoading(false));
    }
    const signInWithFacebook = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;

                //Add user to db
                saveUserToDb(user.email, user.displayName, 'PUT');

                const destination = location?.state?.from || '/';
                history.replace(destination);

            }).catch((error) => {

            })
            .finally(() => setIsLoading(false));
    }
    const signInWithTwitter = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, twitterProvider)
            .then((result) => {
                const user = result.user;
                //Add user to db
                saveUserToDb(user.email, user.displayName, 'PUT');

                const destination = location?.state?.from || '/';
                history.replace(destination);

            }).catch((error) => {

            })
            .finally(() => setIsLoading(false));
    }


    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //Using location to redirect the user to his/her desired destination if the user was redirected to login page by the system. Doing this to improve the UX of the user.
                const destination = location?.state?.from || '/';
                history.replace(destination);

            })
            .catch((error) => {
                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    swal("Invalid Password!", "Please check your email & password and then try again", "error");
                }
                else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    swal("User Not Found!", "Please check your email & password and then try again", "warning");
                }
            })
            .finally(() => setIsLoading(false));
    }

    const logOut = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            // Sign-out successful.
            setAdmin(false)
            setUser({});
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

const handleonclick=()=>{
    setIsSeller(true)

}
    const becomeASeller=()=>{
        localStorage.setItem('isSeller',true)

        handleonclick()
    fetch(`${BASE_URL}becomeSeller/${user.email}`, {
        method: "put",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({isSeller: true})

    }).then()
    

    

}

    //Function to add users to database MONGO DB
    const saveUserToDb = (email, displayName, method) => {
        const user = { email, displayName };
        fetch(`${BASE_URL}users`, {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }



    return {
        user,
        becomeASeller,
        isSeller,
        admin,
        isLoading,
        adminLoading,
        registerUser,
        loginUser,
        signInWithGoogle,
        signInWithFacebook,
        signInWithTwitter,
        logOut,
    }
};

export default useFirebase;