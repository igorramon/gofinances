import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import Storage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  AppleSignIn(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const storageCollectionKey = "@gofinances:user";

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const userLogged = {
          id: String(userInfo.id),
          name: userInfo.name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(userLogged);
        Storage.setItem(storageCollectionKey, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function AppleSignIn(): Promise<void> {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const given_name = credentials.fullName!.givenName!;
        const picture = `https://ui-avatars.com/api/?length=1&background=0D8ABC&color=fff&name=${given_name}`;

        const formattedUser = {
          id: credentials.authorizationCode,
          email: credentials.email,
          name: "Usuário",
          given_name,
          family_name: credentials.fullName!.familyName!,
          picture,
        } as User;

        setUser(formattedUser);
        Storage.setItem(storageCollectionKey, JSON.stringify(formattedUser));
      }
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async function signOut() {
    setUser({} as User);
    await Storage.removeItem(storageCollectionKey)
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await Storage.getItem(storageCollectionKey);
      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    }
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, AppleSignIn, signOut, userStorageLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const content = useContext(AuthContext);
  return content;
}

export { AuthProvider, useAuth };
