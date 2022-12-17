import { atom, useRecoilState } from "recoil";
import localStorageEffect from "@/states/localStorageEffect";
import { useCallback } from "react";

export const key = "@session";

export const sessionAtom = atom<Session | null>({
    key,
    default: null,
    effects: [localStorageEffect(key)],
});

export function useSession() {
    const [session, setSession] = useRecoilState(sessionAtom);

    const saveToken = useCallback(
        (session: Session) => setSession(session),
        [setSession]
    );
    const logout = useCallback(() => setSession(null), [setSession]);

    return { session, saveToken, logout };
}
